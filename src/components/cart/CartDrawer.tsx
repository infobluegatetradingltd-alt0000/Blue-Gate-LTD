import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag, Check, Lock, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { ProductStudioImage } from '../product/ProductStudioImage';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
  onExploreProducts: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onProceedToCheckout,
  onExploreProducts
}) => {
  const {
    items,
    summary,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    applyPromoCode,
    removePromoCode
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (code: string) => {
    const res = applyPromoCode(code);
    setPromoMessage({ text: res.message, isError: !res.success });
    if (res.success) setPromoInput('');
  };

  // Free shipping progress percentage
  const freeShippingProgress = Math.min(
    100,
    Math.round(((summary.freeShippingThreshold - summary.amountNeededForFreeShipping) / summary.freeShippingThreshold) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end animate-fade-in" role="dialog" aria-modal="true" aria-label="Shopping Cart">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-up">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-[#F8F9FA]">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-[#1769D2]" />
            <h2 className="text-base font-bold text-[#202329]">
              Your Shopping Bag ({summary.itemCount})
            </h2>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="p-4 bg-[#EBF3FC] border-b border-[#1769D2]/10">
          <div className="flex items-center justify-between text-xs font-bold text-[#1769D2] mb-1.5">
            <span>
              {summary.isFreeShipping
                ? '🎉 You have qualified for FREE Tracked UK Delivery!'
                : `Add £${summary.amountNeededForFreeShipping.toFixed(2)} more for FREE UK Delivery`}
            </span>
            <span className="font-mono">{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-2 bg-[#D0E2FA] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#1769D2] to-[#38BDF8] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                <ShoppingBag size={28} />
              </div>
              <h3 className="text-base font-bold text-slate-800">Your bag is empty</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Discover our curated tech accessories, toys, and lifestyle essentials with fast UK delivery.
              </p>
              <button
                onClick={() => {
                  closeCart();
                  onExploreProducts();
                }}
                className="mt-2 px-5 py-2.5 bg-[#1769D2] hover:bg-[#1256B0] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
              >
                Browse Products
              </button>
            </div>
          ) : (
            items.map(item => (
              <div
                key={item.id}
                className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#F8F9FA] border border-slate-200/80 group hover:border-[#1769D2]/30 transition-all"
              >
                {/* 1080x1080 Thumb Frame */}
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                  <ProductStudioImage
                    src={item.product.images[0]}
                    alt={item.product.title}
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-[#202329] truncate">
                    {item.product.title}
                  </h4>

                  {/* Variants */}
                  {Object.keys(item.selectedVariants).length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {Object.entries(item.selectedVariants).map(([key, val]) => (
                        <span key={key} className="text-[10px] text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                          {val}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-xs font-extrabold text-[#1769D2] font-mono">
                      £{item.unitPrice.toFixed(2)}
                    </span>
                    <span className="text-[11px] text-slate-400">× {item.quantity}</span>
                  </div>

                  {/* Stepper & Remove */}
                  <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-200/60">
                    <div className="flex items-center border border-slate-200 rounded-lg bg-white p-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="p-1 text-slate-500 hover:text-slate-800 rounded hover:bg-slate-100"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-2 text-xs font-bold text-slate-800 font-mono">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                        className="p-1 text-slate-500 hover:text-slate-800 rounded hover:bg-slate-100"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                      className="p-1 text-slate-400 hover:text-rose-500 rounded transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer (Summary & Checkout) */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-100 bg-[#F8F9FA] space-y-4">
            {/* Promo Code Input & Quick-Chips */}
            <div className="space-y-2">
              <form onSubmit={e => { e.preventDefault(); handleApplyPromo(promoInput); }} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={e => setPromoInput(e.target.value.toUpperCase())}
                    placeholder="Enter voucher code"
                    className="w-full pl-8 pr-3 py-2 text-xs uppercase font-mono font-semibold bg-white border border-slate-200 rounded-xl outline-none focus:border-[#1769D2]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 hover:bg-[#1769D2] text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                >
                  Apply
                </button>
              </form>

              {/* Quick Clickable Voucher Chips */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] text-slate-400 font-medium">Quick tap:</span>
                <button
                  type="button"
                  onClick={() => handleApplyPromo('BLUEGATE10')}
                  className="text-[10px] font-bold px-2 py-0.5 bg-[#FFF0A8] text-[#202329] border border-[#F5D64E] rounded-md hover:bg-[#F5D64E] transition-colors"
                >
                  BLUEGATE10 (10% Off)
                </button>
                <button
                  type="button"
                  onClick={() => handleApplyPromo('WELCOME5')}
                  className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md hover:bg-emerald-100 transition-colors"
                >
                  WELCOME5 (£5 Off)
                </button>
              </div>

              {promoMessage && (
                <p className={`text-xs ${promoMessage.isError ? 'text-rose-600' : 'text-emerald-600 font-semibold'}`}>
                  {promoMessage.text}
                </p>
              )}

              {/* Applied Promo Code */}
              {summary.appliedPromo && (
                <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 text-emerald-800 text-xs border border-emerald-200">
                  <div className="flex items-center gap-1.5">
                    <Check size={14} />
                    <span>Code <strong>{summary.appliedPromo.code}</strong> applied</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-xs text-rose-600 hover:underline font-semibold"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200/60">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono font-bold text-slate-800">£{summary.subtotal.toFixed(2)}</span>
              </div>

              {summary.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount ({summary.appliedPromo?.code})</span>
                  <span className="font-mono">-£{summary.discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Tracked UK Shipping</span>
                <span className="font-mono font-bold text-slate-800">
                  {summary.shippingFee === 0 ? (
                    <span className="text-emerald-600">FREE</span>
                  ) : (
                    `£${summary.shippingFee.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Estimated 20% UK VAT (Included)</span>
                <span className="font-mono">£{summary.estimatedVat.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-base font-extrabold text-[#202329] pt-2 border-t border-slate-200">
                <span>Total Amount</span>
                <span className="text-[#1769D2] font-mono">£{summary.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => {
                closeCart();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 bg-[#1769D2] hover:bg-[#1256B0] text-white text-xs font-bold rounded-xl shadow-apple-md hover:shadow-apple-hover transition-all flex items-center justify-center gap-2 group"
            >
              <Lock size={14} />
              <span>Proceed to Secure Checkout • £{summary.total.toFixed(2)}</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Trust Seal */}
            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
              <ShieldCheck size={13} className="text-[#1769D2]" />
              <span>256-Bit SSL Encryption • Official UK Merchant No. 16997836</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
