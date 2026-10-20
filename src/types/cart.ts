import { Product } from './product';

export interface CartItem {
  id: string; // unique item composite id: productId_selectedVariantValues
  productId: string;
  product: Product;
  selectedVariants: Record<string, string>; // variantId -> optionValue
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend?: number;
  description: string;
}

export interface CartSummary {
  subtotal: number;
  discountAmount: number;
  appliedPromo: PromoCode | null;
  shippingFee: number;
  isFreeShipping: boolean;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  estimatedVat: number; // 20% UK VAT included in price
  total: number;
  itemCount: number;
}
