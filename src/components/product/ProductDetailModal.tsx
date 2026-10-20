import React, { useState, useEffect } from 'react';
import { X, Heart, ShieldCheck, Truck, RotateCcw, Check, Plus, Minus, HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { Product } from '../../types/product';
import { StarRating } from '../ui/StarRating';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectRelated: (product: Product) => void;
  allProducts: Product[];
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onSelectRelated,
  allProducts
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'box' | 'delivery' | 'faqs'>('specs');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Initialize variants when product changes
  useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
      setQuantity(1);
      const defaults: Record<string, string> = {};
      if (product.variants) {
        product.variants.forEach(v => {
          if (v.options[0]) {
            defaults[v.id] = v.options[0].value;
          }
        });
      }
      setSelectedVariants(defaults);
    }
  }, [product]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && product) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);

  // Calculate current unit price based on selected variants
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

  // Related products in same category
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={product.title}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-slide-up flex flex-col max-h-[92vh]"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#F8F9FA]">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-1.5 truncate">
            <span>Shop</span>
            <span>/</span>
            <span>{product.categoryLabel}</span>
            <span>/</span>
            <span className="font-semibold text-slate-800 truncate">{product.subcategory}</span>
          </nav>

          <button
            onClick={onClose}
            aria-label="Close product view"
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left Image Gallery (5 cols) */}
            <div className="md:col-span-6 space-y-4">
              {/* Main Stage (Strict 1080x1080 1:1 Square Frame) */}
              <div className="relative aspect-square w-full rounded-2xl bg-slate-100/80 flex items-center justify-center border border-slate-200/70 overflow-hidden">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={`${product.title} view ${activeImageIndex + 1}`}
                  width={1080}
                  height={1080}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full bg-[#1769D2] text-white shadow-sm">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-3">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-square w-16 h-16 rounded-xl bg-slate-100 overflow-hidden border transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#1769D2] ring-2 ring-[#1769D2]/20'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" width={1080} height={1080} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Specifications & Purchase Details (7 cols) */}
            <div className="md:col-span-6 space-y-5">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>{product.brand}</span>
                  <span className="font-mono">{product.sku}</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#202329] leading-snug">
                  {product.title}
                </h1>
                <div className="pt-2 flex items-center gap-3">
                  <StarRating rating={product.rating} reviewCount={product.reviewCount} size={16} />
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {product.stockCount} units in stock
                  </span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="p-4 rounded-2xl bg-[#F5F5F2] border border-[#E3E5E7] flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#1769D2]">
                      £{unitPrice.toFixed(2)}
                    </span>
                    {product.compareAtPrice && (
                      <span className="text-sm text-slate-400 line-through">
                        £{product.compareAtPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Includes 20% UK VAT • Tracked shipping calculated at checkout
                  </p>
                </div>
                {product.compareAtPrice && (
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#FFF0A8] text-[#202329] border border-[#F5D64E]">
                    Save £{(product.compareAtPrice - unitPrice).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Short Description */}
              <p className="text-sm text-[#656A70] leading-relaxed">
                {product.description}
              </p>

              {/* Interactive Variants Selector */}
              {product.variants && product.variants.map(variant => (
                <div key={variant.id} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{variant.name}:</span>
                    <span className="text-slate-500 font-medium">
                      {variant.options.find(o => o.value === selectedVariants[variant.id])?.label}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {variant.options.map(option => {
                      const isSelected = selectedVariants[variant.id] === option.value;
                      return (
                        <button
                          key={option.value}
                          onClick={() => setSelectedVariants(prev => ({ ...prev, [variant.id]: option.value }))}
                          className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all ${
                            isSelected
                              ? 'bg-[#1769D2] text-white border-[#1769D2] shadow-sm'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {option.label}
                          {option.priceDiff ? ` (+£${option.priceDiff})` : ''}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Quantity & Add to Cart Controls */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-200 rounded-xl bg-[#F8F9FA] p-1">
                    <button
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      aria-label="Decrease quantity"
                      className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-white"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center font-bold text-sm tabular-nums text-slate-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(prev => Math.min(product.stockCount, prev + 1))}
                      aria-label="Increase quantity"
                      className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-white"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(product, quantity, selectedVariants);
                    }}
                    className="flex-1 py-3 px-6 bg-[#1769D2] hover:bg-[#1256B0] text-white text-sm font-bold rounded-xl shadow-apple-md hover:shadow-apple-hover transition-all flex items-center justify-center gap-2"
                  >
                    <span>Add to Bag • £{(unitPrice * quantity).toFixed(2)}</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    aria-label="Save to wishlist"
                    className="p-3 border border-slate-200 hover:border-rose-300 rounded-xl text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <Heart
                      size={18}
                      className={isFavorited ? 'fill-rose-500 text-rose-500' : ''}
                    />
                  </button>
                </div>
              </div>

              {/* Delivery & Warranty Trust Row */}
              <div className="pt-2 grid grid-cols-2 gap-3 text-xs text-slate-600 border-t border-slate-100">
                <div className="flex items-start gap-2">
                  <Truck size={16} className="text-[#1769D2] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-800">Tracked UK Shipping</p>
                    <p className="text-[11px] text-slate-500">Free on orders over £40</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <RotateCcw size={16} className="text-[#1769D2] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-800">30-Day Returns</p>
                    <p className="text-[11px] text-slate-500">UK Consumer Rights Compliant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Tab Panels */}
          <div className="pt-6 border-t border-slate-100">
            {/* Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3" role="tablist">
              {[
                { id: 'specs' as const, label: 'Specifications' },
                { id: 'box' as const, label: "What's in the Box" },
                { id: 'delivery' as const, label: 'Shipping & Warranty' },
                { id: 'faqs' as const, label: 'Customer FAQs' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#202329] text-white'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="pt-4 text-xs">
              {activeTab === 'specs' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between p-2.5 rounded-lg bg-[#F8F9FA] border border-slate-100">
                      <span className="font-semibold text-slate-700">{key}:</span>
                      <span className="text-slate-500 font-medium text-right">{val}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'box' && (
                <ul className="space-y-2">
                  {product.includedInBox.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-700">
                      <Check size={14} className="text-[#1769D2] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === 'delivery' && (
                <div className="space-y-3 text-slate-600 leading-relaxed">
                  <div className="p-3 bg-[#EBF3FC] rounded-xl text-[#1769D2] font-medium flex items-start gap-2">
                    <Truck size={16} className="shrink-0 mt-0.5" />
                    <span>{product.deliveryInfo}</span>
                  </div>
                  <div className="p-3 bg-[#F5F5F2] rounded-xl text-slate-700 font-medium flex items-start gap-2">
                    <ShieldCheck size={16} className="shrink-0 mt-0.5 text-[#1769D2]" />
                    <span>{product.warrantyInfo}</span>
                  </div>
                </div>
              )}

              {activeTab === 'faqs' && (
                <div className="space-y-2">
                  {product.faqs && product.faqs.length > 0 ? (
                    product.faqs.map((faq, idx) => {
                      const isOpen = openFaqIndex === idx;
                      return (
                        <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                          <button
                            onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                            className="w-full flex items-center justify-between p-3.5 text-left font-bold text-slate-800 bg-[#F8F9FA] hover:bg-slate-100 transition-colors"
                          >
                            <span>{faq.question}</span>
                            <ChevronDown
                              size={16}
                              className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            />
                          </button>
                          {isOpen && (
                            <div className="p-3.5 bg-white text-slate-600 leading-relaxed border-t border-slate-100">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-slate-400 py-2">
                      Have a specific question about this item? Contact our customer support team directly at +44 7476 623907.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Related Products Rail */}
          {relatedProducts.length > 0 && (
            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-sm font-bold text-[#202329] mb-4 flex items-center gap-1.5">
                <Sparkles size={15} className="text-[#1769D2]" />
                <span>You might also like in {product.categoryLabel}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="p-3 rounded-xl border border-slate-200 hover:border-[#1769D2] cursor-pointer transition-all bg-white hover:shadow-sm flex items-center gap-3"
                  >
                    <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200/80">
                      <img src={rel.images[0]} alt={rel.title} width={1080} height={1080} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-800 truncate">{rel.title}</p>
                      <p className="text-xs font-bold text-[#1769D2]">£{rel.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
