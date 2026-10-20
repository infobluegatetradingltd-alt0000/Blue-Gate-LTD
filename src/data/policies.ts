export interface CompanyDetails {
  brandName: string;
  legalName: string;
  companiesHouseNumber: string;
  incorporationDate: string;
  status: string;
  registeredOffice: string;
  phone: string;
  sicCodes: { code: string; label: string }[];
  tagline: string;
  ownerFlags: {
    domain: { current: string; status: 'awaiting_owner_dns' };
    vatNumber: { current: string; status: 'pending_vat_threshold_or_registration' };
    returnsFacility: { notice: string; status: 'requires_rma_portal' };
  };
}

export const COMPANY_DETAILS: CompanyDetails = {
  brandName: 'BlueGate Trading',
  legalName: 'BLUEGATE TRADING LTD',
  companiesHouseNumber: '16997836',
  incorporationDate: '29 January 2026',
  status: 'Active',
  registeredOffice: 'Office 760, 85 Dunstall Hill, Wolverhampton, United Kingdom, WV6 0SR',
  phone: '+44 7476 623907',
  sicCodes: [
    { code: '47190', label: 'Other retail sale in non-specialised stores' },
    { code: '47910', label: 'Retail sale via mail order houses or via Internet' },
    { code: '73110', label: 'Advertising agencies' }
  ],
  tagline: 'Smart Finds. Better Everyday Shopping.',
  ownerFlags: {
    domain: {
      current: 'bluegatetrading.co.uk (Placeholder deployment target)',
      status: 'awaiting_owner_dns'
    },
    vatNumber: {
      current: 'VAT registration not yet published / Exempt pending HMRC registration',
      status: 'pending_vat_threshold_or_registration'
    },
    returnsFacility: {
      notice: 'Note: The registered office address is for statutory corporate mail and does NOT accept customer drop-in returns. All returns must use the online Return Merchandise Authorisation (RMA) process for our designated logistics depot.',
      status: 'requires_rma_portal'
    }
  }
};

export const POLICY_DOCS = {
  about: {
    title: 'About BlueGate Trading',
    subtitle: 'Smart Finds. Better Everyday Shopping.',
    sections: [
      {
        heading: 'Our Story & Purpose',
        content: `BlueGate Trading is a premier UK multi-category retailer incorporated in England & Wales (Company No. 16997836). We curate modern electronics, tech accessories, creative STEM toys & games, and minimalist home essentials. We focus on products that offer tangible utility, exceptional build standards, and reliable performance.`
      },
      {
        heading: 'UK Based & Transparent',
        content: `Unlike anonymous dropshipping storefronts, BlueGate Trading operates with complete statutory transparency. We are registered with Companies House, headquartered at Dunstall Hill, Wolverhampton, and maintain direct support for our UK customers.`
      },
      {
        heading: 'Our 4 Quality Pillars',
        points: [
          'Deterministic Sizing & Specs: What you see on our specification sheets matches the physical product down to millimeters and battery capacity.',
          'UK Tracked Logistics: Every order is tracked from dispatch to your doorstep via recognized UK national carriers.',
          'Tested Safety & Compliance: We only stock items adhering strictly to British & European safety standards, including UKCA, CE, and BS EN 71 toy directives.',
          '30-Day Customer Promise: Clear, transparent returns and dedicated support when you need assistance.'
        ]
      }
    ]
  },

  delivery: {
    title: 'UK Shipping & Delivery Policy',
    subtitle: 'Transparent, reliable tracked delivery across the United Kingdom',
    sections: [
      {
        heading: 'Dispatch Times & Order Processing',
        content: `All orders placed before 2:00 PM GMT Monday through Friday are processed and dispatched on the same business day. Orders placed after 2:00 PM or during weekends/bank holidays are dispatched on the following working day.`
      },
      {
        heading: 'Shipping Options & Rates',
        points: [
          'Royal Mail 48 Tracked (Standard): £3.99 — Estimated 2–3 working days delivery with end-to-end online tracking.',
          'Free Standard Delivery: Orders with a cart subtotal of £40.00 or greater qualify automatically for FREE Royal Mail 48 Tracked shipping.',
          'DPD Express Next Working Day: £5.99 — Guaranteed next business day delivery with 1-hour delivery window SMS/email alerts.'
        ]
      },
      {
        heading: 'Tracking Your Package',
        content: `Once your parcel is scanned into the national carrier network, you will automatically receive an email and SMS with your unique tracking reference number and direct tracking link.`
      },
      {
        heading: 'Delivery Destinations',
        content: `We ship to all postal addresses across England, Wales, Scotland, and Northern Ireland. Certain remote Scottish Highlands and Islands postcodes may require an additional 24–48 hours in transit.`
      }
    ]
  },

  returns: {
    title: 'Returns & Refunds Policy',
    subtitle: 'In full accordance with the UK Consumer Rights Act 2015 & Consumer Contracts Regulations',
    sections: [
      {
        heading: '30-Day Change of Mind Guarantee',
        content: `You have 30 days from the date of parcel receipt to return any unused item in its original condition, with original packaging and all accessories intact, for a full refund.`
      },
      {
        heading: 'Faulty or Damaged Goods (Statutory Rights)',
        content: `If an item arrives damaged or develops a manufacturing fault, you are entitled to a full refund, repair, or replacement in accordance with the UK Consumer Rights Act 2015. BlueGate Trading covers all return postage costs for verified faulty or misdescribed items.`
      },
      {
        heading: 'How to Initiate a Return',
        points: [
          'Step 1: Contact our customer care team via phone (+44 7476 623907) or through our Contact & Support portal with your Order Reference Number.',
          'Step 2: You will receive an RMA (Return Merchandise Authorisation) number and a pre-addressed return shipping label for our central logistics warehouse.',
          'Step 3: Securely package the item and hand it to your local Post Office branch or arrange courier collection.',
          'Step 4: Once inspected at our depot (typically 48 hours from delivery), your refund is issued directly to your original payment method within 3–5 working days.'
        ]
      },
      {
        heading: 'Important Notice Regarding Registered Office',
        content: `Please note: Office 760, 85 Dunstall Hill, Wolverhampton, WV6 0SR is our registered legal entity address and does NOT accept customer drop-off returns. Parcels sent without an approved RMA slip to the corporate address cannot be processed.`
      }
    ]
  },

  privacy: {
    title: 'Privacy & Cookie Notice',
    subtitle: 'Compliant with UK GDPR, Data Protection Act 2018 & PECR Regulations',
    sections: [
      {
        heading: 'Data Controller Identity',
        content: `BLUEGATE TRADING LTD (Company No. 16997836), registered at Office 760, 85 Dunstall Hill, Wolverhampton, WV6 0SR, is the data controller responsible for your personal information.`
      },
      {
        heading: 'Information We Collect',
        content: `We only collect information strictly necessary to process your transactions, deliver your orders, and provide customer support: your name, billing and shipping address, email address, telephone number, and order history. We NEVER store raw credit or debit card numbers on our servers.`
      },
      {
        heading: 'Payment Security',
        content: `All payments are tokenized and processed through PCI-DSS Level 1 certified third-party payment gateways (Stripe / Apple Pay / Google Pay). Your financial credentials are encrypted in transit via 256-bit SSL.`
      },
      {
        heading: 'Cookies & Tracking',
        content: `We utilize essential session cookies for your shopping cart functionality and security. Non-essential analytical cookies are only activated after you provide explicit affirmative consent through our Cookie Banner. You can modify your preferences at any time.`
      },
      {
        heading: 'Your Rights Under UK GDPR',
        points: [
          'Right to access: You may request a copy of the personal data we hold about you.',
          'Right to rectification: You may request corrections to inaccurate or incomplete information.',
          'Right to erasure ("Right to be Forgotten"): You may request deletion of your data where no overriding statutory retention obligation exists.',
          'Right to withdraw consent: You may unsubscribe from marketing notifications at any time.'
        ]
      }
    ]
  },

  terms: {
    title: 'Terms of Service',
    subtitle: 'Governing Law: England and Wales',
    sections: [
      {
        heading: '1. Introduction & Agreement',
        content: `These terms govern the use of the BlueGate Trading website and all purchases made through it. By placing an order with BLUEGATE TRADING LTD, you enter into a legally binding contract subject to the laws of England and Wales.`
      },
      {
        heading: '2. Pricing and Payment',
        content: `All prices are listed in Pounds Sterling (GBP £) and include UK Value Added Tax (VAT) where applicable. We reserve the right to correct accidental pricing errors before order dispatch.`
      },
      {
        heading: '3. Order Acceptance',
        content: `Order confirmation emails signify receipt of your order request; the formal contract of sale is established once your order has been dispatched from our depot.`
      },
      {
        heading: '4. Limitation of Liability',
        content: `Nothing in these terms limits or excludes liability for fraud, gross negligence, or death/personal injury caused by negligence, or any statutory consumer rights that cannot be contracted out of under English law.`
      }
    ]
  },

  safety: {
    title: 'Product Safety & Compliance Standards',
    subtitle: 'Meeting and exceeding British & European regulatory standards',
    sections: [
      {
        heading: 'UKCA & CE Compliance',
        content: `All electronic accessories and toys supplied by BlueGate Trading carry valid UKCA (UK Conformity Assessed) and CE markings demonstrating compliance with British and European electromagnetic, low voltage, and safety directives.`
      },
      {
        heading: 'Toy Safety (BS EN 71)',
        content: `All children\'s products and STEM kits undergo independent laboratory testing to BS EN 71 standards (Mechanical/Physical Properties, Flammability, and Migration of Certain Elements). Non-toxic virgin ABS plastics and lead-free components are strictly enforced.`
      },
      {
        heading: 'Battery & Lithium Cell Safety',
        content: `Lithium-ion cells in our power banks, smartwatches, and wireless audio equipment incorporate multi-layer BMS (Battery Management System) protection against over-current, over-voltage, short-circuit, and thermal runaway.`
      }
    ]
  }
};
