import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, CreditCard, Truck, ArrowLeft, ArrowRight, Printer, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../../context/CartContext';
import { CustomerDetails, ShippingOption, Order } from '../../types/order';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { items, summary, clearCart } = useCart();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Form states
  const [formData, setFormData] = useState<CustomerDetails>({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    county: '',
    postcode: '',
    country: 'United Kingdom',
    deliveryInstructions: '',
    marketingConsent: false
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Shipping selection
  const shippingOptions: ShippingOption[] = [
    {
      id: 'standard',
      name: 'Royal Mail 48 Tracked',
      carrier: 'Royal Mail',
      estimatedDelivery: '2–3 business days',
      price: summary.isFreeShipping ? 0 : 3.99
    },
    {
      id: 'express',
      name: 'DPD Express Next Working Day',
      carrier: 'DPD UK',
      estimatedDelivery: 'Next business day by 1pm',
      price: 5.99
    }
  ];

  const [selectedShipping, setSelectedShipping] = useState<ShippingOption>(shippingOptions[0]);

  // Payment simulated state
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('123');

  if (!isOpen) return null;

  // UK Postcode Validation
  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.firstName.trim()) errs.firstName = 'First name is required';
    if (!formData.lastName.trim()) errs.lastName = 'Last name is required';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errs.email = 'Valid UK email address is required';
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      errs.phone = 'Valid phone number required for delivery updates';
    }
    if (!formData.addressLine1.trim()) errs.addressLine1 = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'Town/City is required';

    // UK Postcode validation regex
    const ukPostcodeRegex = /^([A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2})$/i;
    if (!formData.postcode.trim() || !ukPostcodeRegex.test(formData.postcode.trim())) {
      errs.postcode = 'Please enter a valid UK postcode (e.g. WV6 0SR, SW1A 1AA)';
    }

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const finalTotal = Number(
    (
      Math.max(0, summary.subtotal - summary.discountAmount) + selectedShipping.price
    ).toFixed(2)
  );

  const handlePlaceOrder = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `BGT-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      const trackingNumber = `GB${Math.floor(100000000 + Math.random() * 900000000)}RM`;

      const newOrder: Order = {
        orderId,
        createdAt: new Date().toISOString(),
        customer: formData,
        items: [...items],
        summary: {
          ...summary,
          shippingFee: selectedShipping.price,
          total: finalTotal
        },
        shippingOption: selectedShipping,
        paymentMethod: 'sandbox_card',
        paymentStatus: 'paid_sandbox',
        fulfillmentStatus: 'processing',
        trackingNumber
      };

      setCreatedOrder(newOrder);
      setIsSubmitting(false);
      setStep(4);
      clearCart();

      // Trigger Confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Secure Checkout"
    >
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-slide-up flex flex-col max-h-[92vh]">
        {/* Checkout Header */}
        <div className="px-6 py-4 border-b border-slate-100 bg-[#F8F9FA] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck size={22} className="text-[#1769D2]" />
            <div>
              <h2 className="text-base font-bold text-[#202329]">
                BlueGate Secure Checkout
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Sandbox Test Mode
                </span>
                <span>•</span>
                <span>256-Bit SSL Encrypted</span>
              </div>
            </div>
          </div>

          {step < 4 && (
            <button
              onClick={onClose}
              aria-label="Close checkout"
              className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-200/60"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Steps Progress Indicator */}
        {step < 4 && (
          <div className="px-6 py-3 bg-white border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
            <span className={step >= 1 ? 'text-[#1769D2]' : ''}>1. UK Delivery</span>
            <span className="text-slate-300">→</span>
            <span className={step >= 2 ? 'text-[#1769D2]' : ''}>2. Shipping Speed</span>
            <span className="text-slate-300">→</span>
            <span className={step >= 3 ? 'text-[#1769D2]' : ''}>3. Payment &amp; Review</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {/* STEP 1: Customer & Delivery Address */}
          {step === 1 && (
            <div className="space-y-5">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <span>Contact &amp; UK Delivery Address</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="e.g. James"
                    className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 border rounded-xl outline-none focus:bg-white ${
                      formErrors.firstName ? 'border-rose-400' : 'border-slate-200 focus:border-[#1769D2]'
                    }`}
                  />
                  {formErrors.firstName && <p className="text-[11px] text-rose-500 mt-1">{formErrors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="e.g. Wilson"
                    className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 border rounded-xl outline-none focus:bg-white ${
                      formErrors.lastName ? 'border-rose-400' : 'border-slate-200 focus:border-[#1769D2]'
                    }`}
                  />
                  {formErrors.lastName && <p className="text-[11px] text-rose-500 mt-1">{formErrors.lastName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="james.wilson@example.co.uk"
                    className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 border rounded-xl outline-none focus:bg-white ${
                      formErrors.email ? 'border-rose-400' : 'border-slate-200 focus:border-[#1769D2]'
                    }`}
                  />
                  {formErrors.email && <p className="text-[11px] text-rose-500 mt-1">{formErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number (for Courier SMS) *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+44 7123 456789"
                    className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 border rounded-xl outline-none focus:bg-white ${
                      formErrors.phone ? 'border-rose-400' : 'border-slate-200 focus:border-[#1769D2]'
                    }`}
                  />
                  {formErrors.phone && <p className="text-[11px] text-rose-500 mt-1">{formErrors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Address Line 1 *</label>
                <input
                  type="text"
                  value={formData.addressLine1}
                  onChange={e => setFormData({ ...formData, addressLine1: e.target.value })}
                  placeholder="Flat, house number and street name"
                  className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 border rounded-xl outline-none focus:bg-white ${
                    formErrors.addressLine1 ? 'border-rose-400' : 'border-slate-200 focus:border-[#1769D2]'
                  }`}
                />
                {formErrors.addressLine1 && <p className="text-[11px] text-rose-500 mt-1">{formErrors.addressLine1}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Town / City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Wolverhampton"
                    className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 border rounded-xl outline-none focus:bg-white ${
                      formErrors.city ? 'border-rose-400' : 'border-slate-200 focus:border-[#1769D2]'
                    }`}
                  />
                  {formErrors.city && <p className="text-[11px] text-rose-500 mt-1">{formErrors.city}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Postcode *</label>
                  <input
                    type="text"
                    value={formData.postcode}
                    onChange={e => setFormData({ ...formData, postcode: e.target.value.toUpperCase() })}
                    placeholder="e.g. WV6 0SR"
                    className={`w-full px-3.5 py-2.5 text-xs bg-slate-50 border rounded-xl outline-none uppercase font-mono focus:bg-white ${
                      formErrors.postcode ? 'border-rose-400' : 'border-slate-200 focus:border-[#1769D2]'
                    }`}
                  />
                  {formErrors.postcode && <p className="text-[11px] text-rose-500 mt-1">{formErrors.postcode}</p>}
                </div>
              </div>

              {/* Explicit GDPR Consent Checkbox (Unticked by default) */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.marketingConsent}
                    onChange={e => setFormData({ ...formData, marketingConsent: e.target.checked })}
                    className="mt-0.5 rounded border-slate-300 text-[#1769D2] focus:ring-[#1769D2]"
                  />
                  <span className="text-xs text-slate-600 leading-snug">
                    I agree to receive occasional BlueGate Trading product releases and exclusive discount codes via email. (Optional • Unsubscribe at any time).
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 2: Shipping Method Selection */}
          {step === 2 && (
            <div className="space-y-5">
              <h3 className="text-base font-bold text-slate-800">
                Choose UK Shipping Speed
              </h3>

              <div className="space-y-3">
                {shippingOptions.map(opt => {
                  const isSelected = selectedShipping.id === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedShipping(opt)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#EBF3FC] border-[#1769D2] ring-1 ring-[#1769D2]'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Truck size={20} className={isSelected ? 'text-[#1769D2]' : 'text-slate-400'} />
                        <div>
                          <p className="text-sm font-bold text-slate-800">{opt.name}</p>
                          <p className="text-xs text-slate-500">{opt.estimatedDelivery}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-slate-900">
                          {opt.price === 0 ? 'FREE' : `£${opt.price.toFixed(2)}`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-200">
                <p className="font-semibold text-slate-700">Delivering to:</p>
                <p>{formData.firstName} {formData.lastName}</p>
                <p>{formData.addressLine1}, {formData.city}, {formData.postcode}</p>
              </div>
            </div>
          )}

          {/* STEP 3: Payment & Final Review */}
          {step === 3 && (
            <div className="space-y-6">
              {/* Sandbox notice */}
              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3 text-xs text-amber-800">
                <AlertCircle size={18} className="shrink-0 mt-0.5 text-amber-600" />
                <div>
                  <p className="font-bold">Sandbox Test Mode Active</p>
                  <p className="text-[11px] mt-0.5 text-amber-700">
                    Live production payment gateways are kept safely disconnected until production keys are linked. You can test complete order generation without any charge.
                  </p>
                </div>
              </div>

              {/* Simulated Card Input */}
              <div className="space-y-3 p-4 rounded-2xl bg-[#F8F9FA] border border-slate-200">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <CreditCard size={16} className="text-[#1769D2]" />
                    Simulated Card Payment
                  </span>
                  <span className="text-slate-400 font-normal">Test credentials pre-filled</span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono bg-white border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={e => setCardExpiry(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-mono bg-white border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">CVV Security Code</label>
                    <input
                      type="text"
                      value={cardCvv}
                      onChange={e => setCardCvv(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-mono bg-white border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Order Items Summary */}
              <div className="space-y-2 border-t border-slate-100 pt-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Review Items ({items.length})
                </p>
                <div className="max-h-36 overflow-y-auto space-y-1.5 text-xs text-slate-700">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between items-center py-1 border-b border-slate-100">
                      <span className="truncate max-w-xs">{item.quantity}x {item.product.title}</span>
                      <span className="font-bold">£{item.lineTotal.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-200 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>£{summary.subtotal.toFixed(2)}</span>
                </div>
                {summary.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount ({summary.appliedPromo?.code})</span>
                    <span>-£{summary.discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping ({selectedShipping.name})</span>
                  <span>{selectedShipping.price === 0 ? 'FREE' : `£${selectedShipping.price.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-[#202329] pt-2 border-t border-slate-200">
                  <span>Total Due</span>
                  <span className="text-[#1769D2]">£{finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Order Confirmation & Receipt */}
          {step === 4 && createdOrder && (
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Order Successfully Placed (Sandbox)
                </span>
                <h3 className="text-2xl font-extrabold text-[#202329] mt-2">
                  Thank You, {createdOrder.customer.firstName}!
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  We've sent a detailed order confirmation and receipt to <strong className="text-slate-700">{createdOrder.customer.email}</strong>
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="p-5 rounded-2xl bg-[#F8F9FA] border border-slate-200 text-left space-y-3 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <div>
                    <p className="text-[11px] text-slate-400">Order Reference</p>
                    <p className="text-sm font-mono font-bold text-[#1769D2]">{createdOrder.orderId}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-slate-400">Royal Mail Tracking</p>
                    <p className="text-sm font-mono font-bold text-slate-800">{createdOrder.trackingNumber}</p>
                  </div>
                </div>

                <div>
                  <p className="font-bold text-slate-700 mb-1">Dispatch Destination:</p>
                  <p className="text-slate-600">
                    {createdOrder.customer.firstName} {createdOrder.customer.lastName}<br />
                    {createdOrder.customer.addressLine1}, {createdOrder.customer.city}, {createdOrder.customer.postcode}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                  <span>Total Amount Paid (Test Mode):</span>
                  <span className="text-[#1769D2]">£{createdOrder.summary.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Printer size={15} />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#1769D2] hover:bg-[#1256B0] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {step < 4 && (
          <div className="px-6 py-4 border-t border-slate-100 bg-[#F8F9FA] flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep(prev => (prev - 1) as any)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
            )}

            {step < 3 ? (
              <button
                onClick={handleNextStep}
                className="px-6 py-2.5 bg-[#1769D2] hover:bg-[#1256B0] text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span>Continue</span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <button
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-[#1769D2] hover:bg-[#1256B0] disabled:bg-slate-300 text-white text-xs font-bold rounded-xl transition-all shadow-apple-md flex items-center gap-2"
              >
                {isSubmitting ? (
                  <span>Authorizing Order...</span>
                ) : (
                  <>
                    <span>Place Sandbox Order (£{finalTotal.toFixed(2)})</span>
                    <ShieldCheck size={15} />
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
