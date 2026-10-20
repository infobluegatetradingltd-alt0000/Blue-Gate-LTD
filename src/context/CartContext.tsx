import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/product';
import { CartItem, CartSummary, PromoCode } from '../types/cart';
import { PROMO_CODES } from '../data/promotions';

const CART_STORAGE_KEY = 'bluegate_cart_v1';
const PROMO_STORAGE_KEY = 'bluegate_promo_v1';
const FREE_SHIPPING_THRESHOLD = 40.00;
const STANDARD_SHIPPING_FEE = 3.99;

interface CartContextType {
  items: CartItem[];
  summary: CartSummary;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, quantity?: number, selectedVariants?: Record<string, string>) => void;
  updateQuantity: (itemId: string, newQty: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  toastMessage: string | null;
  dismissToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(() => {
    try {
      const stored = localStorage.getItem(PROMO_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persist items
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to persist cart:', e);
    }
  }, [items]);

  // Persist promo
  useEffect(() => {
    try {
      if (appliedPromo) {
        localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(appliedPromo));
      } else {
        localStorage.removeItem(PROMO_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to persist promo:', e);
    }
  }, [appliedPromo]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const dismissToast = () => {
    setToastMessage(null);
  };

  const addToCart = (product: Product, quantity = 1, selectedVariants: Record<string, string> = {}) => {
    // Determine composite ID
    const variantKeys = Object.keys(selectedVariants).sort();
    const variantSuffix = variantKeys.map(k => `${k}:${selectedVariants[k]}`).join('|');
    const compositeId = variantSuffix ? `${product.id}_${variantSuffix}` : product.id;

    // Check price adjustment from variants if any
    let unitPrice = product.price;
    if (product.variants) {
      for (const v of product.variants) {
        const chosenVal = selectedVariants[v.id];
        if (chosenVal) {
          const opt = v.options.find(o => o.value === chosenVal);
          if (opt && opt.priceDiff) {
            unitPrice += opt.priceDiff;
          }
        }
      }
    }

    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(i => i.id === compositeId);
      if (existingIndex > -1) {
        const existing = prevItems[existingIndex];
        const newQty = Math.min(existing.quantity + quantity, product.stockCount);
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...existing,
          quantity: newQty,
          lineTotal: Number((unitPrice * newQty).toFixed(2))
        };
        return updated;
      } else {
        const initialQty = Math.min(quantity, product.stockCount);
        const newItem: CartItem = {
          id: compositeId,
          productId: product.id,
          product,
          selectedVariants,
          quantity: initialQty,
          unitPrice: Number(unitPrice.toFixed(2)),
          lineTotal: Number((unitPrice * initialQty).toFixed(2))
        };
        return [...prevItems, newItem];
      }
    });

    showToast(`Added "${product.title.slice(0, 32)}..." to your bag`);
    setIsCartOpen(true);
  };

  const updateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id === itemId) {
          const cappedQty = Math.min(newQty, item.product.stockCount);
          return {
            ...item,
            quantity: cappedQty,
            lineTotal: Number((item.unitPrice * cappedQty).toFixed(2))
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (itemId: string) => {
    setItems(prevItems => prevItems.filter(i => i.id !== itemId));
    showToast('Item removed from your shopping bag');
  };

  const clearCart = () => {
    setItems([]);
    setAppliedPromo(null);
  };

  const applyPromoCode = (inputCode: string): { success: boolean; message: string } => {
    const cleanCode = inputCode.trim().toUpperCase();
    const promo = PROMO_CODES[cleanCode];
    if (!promo) {
      return { success: false, message: 'Invalid discount code. Try BLUEGATE10 for 10% off.' };
    }

    const currentSubtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
    if (promo.minSpend && currentSubtotal < promo.minSpend) {
      return {
        success: false,
        message: `Code requires a minimum spend of £${promo.minSpend.toFixed(2)}. Add £${(promo.minSpend - currentSubtotal).toFixed(2)} more to qualify.`
      };
    }

    setAppliedPromo(promo);
    return { success: true, message: `Promo code "${cleanCode}" applied! ${promo.description}` };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promotion code removed');
  };

  // Deterministic Cart Summary Calculation
  const subtotal = Number(items.reduce((acc, item) => acc + item.lineTotal, 0).toFixed(2));
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  let discountAmount = 0;
  if (appliedPromo && subtotal > 0) {
    if (!appliedPromo.minSpend || subtotal >= appliedPromo.minSpend) {
      if (appliedPromo.discountType === 'percentage') {
        discountAmount = Number(((subtotal * appliedPromo.discountValue) / 100).toFixed(2));
      } else if (appliedPromo.discountType === 'fixed') {
        discountAmount = Math.min(subtotal, appliedPromo.discountValue);
      }
    }
  }

  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const isFreeShipping = discountedSubtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0;
  const shippingFee = items.length === 0 ? 0 : isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const amountNeededForFreeShipping = Math.max(0, Number((FREE_SHIPPING_THRESHOLD - discountedSubtotal).toFixed(2)));
  const total = Number((discountedSubtotal + shippingFee).toFixed(2));
  // 20% UK VAT included in retail price
  const estimatedVat = Number((discountedSubtotal - (discountedSubtotal / 1.20)).toFixed(2));

  const summary: CartSummary = {
    subtotal,
    discountAmount,
    appliedPromo,
    shippingFee,
    isFreeShipping,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    amountNeededForFreeShipping,
    estimatedVat,
    total,
    itemCount
  };

  return (
    <CartContext.Provider
      value={{
        items,
        summary,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen(!isCartOpen),
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyPromoCode,
        removePromoCode,
        toastMessage,
        dismissToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
};
