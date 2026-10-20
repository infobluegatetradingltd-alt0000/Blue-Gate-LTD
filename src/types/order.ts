import { CartItem, CartSummary } from './cart';

export interface CustomerDetails {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  county?: string;
  postcode: string;
  country: 'United Kingdom';
  deliveryInstructions?: string;
  marketingConsent: boolean;
}

export type ShippingSpeed = 'standard' | 'express';

export interface ShippingOption {
  id: ShippingSpeed;
  name: string;
  carrier: string;
  estimatedDelivery: string;
  price: number;
}

export interface Order {
  orderId: string; // e.g. BGT-2026-8942
  createdAt: string;
  customer: CustomerDetails;
  items: CartItem[];
  summary: CartSummary;
  shippingOption: ShippingOption;
  paymentMethod: 'sandbox_card' | 'apple_pay_sim' | 'google_pay_sim';
  paymentStatus: 'paid_sandbox';
  fulfillmentStatus: 'processing' | 'dispatched' | 'delivered';
  trackingNumber: string;
}
