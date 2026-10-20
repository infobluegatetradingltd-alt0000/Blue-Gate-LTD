import { PromoCode } from '../types/cart';

export const PROMO_CODES: Record<string, PromoCode> = {
  'BLUEGATE10': {
    code: 'BLUEGATE10',
    discountType: 'percentage',
    discountValue: 10,
    description: '10% off your entire order'
  },
  'WELCOME5': {
    code: 'WELCOME5',
    discountType: 'fixed',
    discountValue: 5.00,
    minSpend: 30.00,
    description: '£5.00 off orders over £30.00'
  },
  'TECH15': {
    code: 'TECH15',
    discountType: 'percentage',
    discountValue: 15,
    minSpend: 60.00,
    description: '15% off orders over £60.00'
  }
};

export const ANNOUNCEMENT_MESSAGES = [
  'Free Tracked UK Delivery on orders over £40 • Dispatched within 24 business hours',
  'Exclusive 10% discount on your first order with code: BLUEGATE10',
  '30-Day Hassle-Free Returns • UK Consumer Rights Act 2015 Compliant'
];
