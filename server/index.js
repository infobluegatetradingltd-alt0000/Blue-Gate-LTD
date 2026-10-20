import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static frontend files in production
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
}

// Data persistence paths
const ORDERS_FILE = path.join(__dirname, 'data/orders.json');
const INQUIRIES_FILE = path.join(__dirname, 'data/inquiries.json');

// Ensure database files exist
if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify([]));
}
if (!fs.existsSync(INQUIRIES_FILE)) {
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([]));
}

// Helper: Read / Write DB
const getOrders = () => {
  try {
    return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf-8'));
  } catch {
    return [];
  }
};

const saveOrder = (order) => {
  const current = getOrders();
  current.unshift(order);
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(current, null, 2));
};

const saveInquiry = (inquiry) => {
  try {
    const list = JSON.parse(fs.readFileSync(INQUIRIES_FILE, 'utf-8'));
    list.unshift(inquiry);
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(list, null, 2));
  } catch (e) {
    console.error('Inquiry save failed:', e);
  }
};

// ================= API ENDPOINTS =================

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'BlueGate Trading Commerce API',
    legalEntity: 'BLUEGATE TRADING LTD',
    companiesHouseNumber: '16997836'
  });
});

// 2. Company statutory info
app.get('/api/company', (req, res) => {
  res.json({
    brand: 'BlueGate Trading',
    legalName: 'BLUEGATE TRADING LTD',
    companyNumber: '16997836',
    status: 'Active',
    incorporationDate: '29 January 2026',
    registeredOffice: 'Office 760, 85 Dunstall Hill, Wolverhampton, United Kingdom, WV6 0SR',
    phone: '+44 7476 623907',
    sicCodes: ['47190', '47910', '73110'],
    tagline: 'Smart Finds. Better Everyday Shopping.'
  });
});

// 3. Deterministic Cart Pricing Calculation Engine
app.post('/api/cart/calculate', (req, res) => {
  const { items, promoCode } = req.body;
  if (!Array.isArray(items)) {
    return res.status(400).json({ error: 'Items array is required' });
  }

  // Calculate Subtotal deterministically
  let subtotal = 0;
  for (const item of items) {
    const qty = Number(item.quantity) || 0;
    const price = Number(item.unitPrice) || 0;
    subtotal += qty * price;
  }
  subtotal = Number(subtotal.toFixed(2));

  // Evaluate promo codes
  let discountAmount = 0;
  let appliedPromo = null;

  if (promoCode) {
    const code = promoCode.trim().toUpperCase();
    if (code === 'BLUEGATE10') {
      discountAmount = Number(((subtotal * 10) / 100).toFixed(2));
      appliedPromo = { code: 'BLUEGATE10', type: 'percentage', value: 10 };
    } else if (code === 'WELCOME5' && subtotal >= 30.00) {
      discountAmount = 5.00;
      appliedPromo = { code: 'WELCOME5', type: 'fixed', value: 5.00 };
    }
  }

  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const FREE_SHIPPING_THRESHOLD = 40.00;
  const isFreeShipping = discountedSubtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0;
  const shippingFee = items.length === 0 ? 0 : isFreeShipping ? 0 : 3.99;
  const total = Number((discountedSubtotal + shippingFee).toFixed(2));
  const estimatedVat = Number((discountedSubtotal - (discountedSubtotal / 1.20)).toFixed(2));

  res.json({
    subtotal,
    discountAmount,
    appliedPromo,
    shippingFee,
    isFreeShipping,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    amountNeededForFreeShipping: Math.max(0, Number((FREE_SHIPPING_THRESHOLD - discountedSubtotal).toFixed(2))),
    estimatedVat,
    total,
    itemCount: items.reduce((acc, i) => acc + (Number(i.quantity) || 0), 0)
  });
});

// 4. Deterministic Checkout & Order Creation Engine
app.post('/api/checkout', (req, res) => {
  const { customer, items, shippingOption, promoCode } = req.body;

  if (!customer || !customer.firstName || !customer.lastName || !customer.postcode) {
    return res.status(400).json({ error: 'Missing mandatory customer address details' });
  }

  // UK Postcode Validation Regex
  const ukPostcodeRegex = /^([A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2})$/i;
  if (!ukPostcodeRegex.test(customer.postcode.trim())) {
    return res.status(400).json({ error: 'Invalid UK Postcode format' });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Shopping cart is empty' });
  }

  // Calculate authoritative order summary
  let subtotal = 0;
  for (const item of items) {
    subtotal += (Number(item.quantity) || 1) * (Number(item.unitPrice) || 0);
  }
  subtotal = Number(subtotal.toFixed(2));

  let discount = 0;
  if (promoCode && promoCode.toUpperCase() === 'BLUEGATE10') {
    discount = Number(((subtotal * 10) / 100).toFixed(2));
  }

  const discounted = Math.max(0, subtotal - discount);
  const shippingFee = shippingOption?.price !== undefined ? Number(shippingOption.price) : (discounted >= 40 ? 0 : 3.99);
  const finalTotal = Number((discounted + shippingFee).toFixed(2));

  const orderId = `BGT-2026-${Math.floor(10000 + Math.random() * 90000)}`;
  const trackingNumber = `GB${Math.floor(100000000 + Math.random() * 900000000)}RM`;

  const order = {
    orderId,
    createdAt: new Date().toISOString(),
    customer: {
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone,
      addressLine1: customer.addressLine1,
      city: customer.city,
      postcode: customer.postcode.trim().toUpperCase(),
      country: 'United Kingdom',
      marketingConsent: Boolean(customer.marketingConsent)
    },
    items,
    summary: {
      subtotal,
      discountAmount: discount,
      shippingFee,
      total: finalTotal,
      estimatedVat: Number((discounted - (discounted / 1.20)).toFixed(2))
    },
    shippingOption: shippingOption || { name: 'Royal Mail 48 Tracked', price: shippingFee },
    paymentMethod: 'sandbox_simulated',
    paymentStatus: 'paid_sandbox',
    fulfillmentStatus: 'processing',
    trackingNumber
  };

  saveOrder(order);

  res.status(201).json({
    success: true,
    message: 'Order created successfully (Sandbox Mode)',
    order
  });
});

// 5. Order Lookup
app.get('/api/orders/:id', (req, res) => {
  const orders = getOrders();
  const order = orders.find(o => o.orderId.toUpperCase() === req.params.id.toUpperCase() || o.trackingNumber.toUpperCase() === req.params.id.toUpperCase());
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

// 6. Contact Inquiries
app.post('/api/contact', (req, res) => {
  const { name, email, topic, orderRef, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  const ticketId = `TKT-${Math.floor(10000 + Math.random() * 90000)}`;
  const ticket = {
    ticketId,
    createdAt: new Date().toISOString(),
    name,
    email,
    topic: topic || 'general',
    orderRef: orderRef || null,
    message,
    status: 'open'
  };

  saveInquiry(ticket);

  res.status(201).json({
    success: true,
    message: 'Inquiry received. A support agent will contact you within 24h.',
    ticketId
  });
});

// Catch-all middleware to serve SPA frontend
app.use((req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.json({ message: 'BlueGate Trading API running. Build frontend with `npm run build`.' });
  }
});

// Start listening if run directly
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`BlueGate Trading Server running on port ${PORT}`);
  });
}

export default app;
