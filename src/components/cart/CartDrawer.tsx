import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

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

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
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
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-200/60"
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
            <span>{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-2 bg-[#D0E2FA] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1769D2] rounded-full transition-all duration-500 ease-out"
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
                className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#F8F9FA] border border-slate-200/80"
              >
                {/* Thumb */}
                <div className="w-16 h-16 rounded-xl bg-white p-1.5 shrink-0 border border-slate-200 overflow-hidden flex items-center justify-center">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-full h-full object-contain mix-blend-multiply"
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

                  <div className="flex items-center justify-between mt-2">
                    {/* Qty Selector */}
                    <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="p-1 text-slate-500 hover:text-slate-800"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-7 text-center text-xs font-bold text-slate-800 tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                        className="p-1 text-slate-500 hover:text-slate-800"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <span className="text-sm font-bold text-[#1769D2]">
                        £{item.lineTotal.toFixed(2)}
                      </span>
                      {item.quantity > 1 && (
                        <span className="block text-[10px] text-slate-400">
                          (£{item.unitPrice.toFixed(2)} ea)
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                  className="p-1 text-slate-400 hover:text-rose-500 transition-colors rounded"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Calculations */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-[#F8F9FA] space-y-3.5">
            {/* Promo Code Input */}
            <div>
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={e => setPromoInput(e.target.value)}
                    placeholder="Discount code (e.g. BLUEGATE10)"
                    className="w-full pl-8 pr-3 py-2 text-xs uppercase font-medium bg-white border border-slate-200 rounded-xl outline-none focus:border-[#1769D2]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#202329] hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Apply
                </button>
              </form>
              {promoMessage && (
                <p className={`text-[11px] mt-1.5 ${promoMessage.isError ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {promoMessage.text}
                </p>
              )}
              {summary.appliedPromo && (
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200 mt-2">
                  <span>Applied: {summary.appliedPromo.code}</span>
                  <button
                    onClick={removePromoCode}
                    className="text-emerald-700 hover:text-rose-600 font-bold ml-2 underline text-[11px]"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600 pt-1 border-t border-slate-200">
              <div className="flex justify-between">
                <span>Bag Subtotal</span>
                <span className="font-semibold text-slate-800">£{summary.subtotal.toFixed(2)}</span>
              </div>
              {summary.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount</span>
                  <span>-£{summary.discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>UK Tracked Shipping</span>
                <span className="font-semibold text-slate-800">
                  {summary.isFreeShipping ? (
                    <span className="text-emerald-600 font-bold uppercase text-[11px]">Free</span>
                  ) : (
                    `£${summary.shippingFee.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>Estimated UK VAT (20% included)</span>
                <span>£{summary.estimatedVat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-extrabold text-[#202329] pt-2 border-t border-slate-200">
                <span>Total</span>
                <span className="text-[#1769D2]">£{summary.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => {
                closeCart();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 px-4 bg-[#1769D2] hover:bg-[#1256B0] text-white text-sm font-bold rounded-xl shadow-apple-md hover:shadow-apple-hover transition-all flex items-center justify-center gap-2 group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck size={13} className="text-emerald-500" />
              <span>PCI-DSS Compliant 256-bit Encrypted Checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
