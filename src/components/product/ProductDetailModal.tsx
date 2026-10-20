import React, { useState, useEffect, useRef } from 'react';
import { X, Heart, ShieldCheck, Truck, RotateCcw, Check, Plus, Minus, ChevronDown, Sparkles, MapPin, ZoomIn } from 'lucide-react';
import { Product } from '../../types/product';
import { StarRating } from '../ui/StarRating';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { saveRecentlyViewedId } from '../home/RecentlyViewed';
import { ProductStudioImage } from './ProductStudioImage';

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
  const [activeTab, setActiveTab] = useState<'specs' | 'box' | 'delivery' | 'reviews' | 'faqs'>('specs');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [justAdded, setJustAdded] = useState(false);

  // Zoom lens state
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  // Postcode checker state
  const [postcode, setPostcode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState<string | null>(null);

  // Initialize variants and save to recently viewed when product opens
  useEffect(() => {
    if (product) {
      saveRecentlyViewedId(product.id);
      setActiveImageIndex(0);
      setQuantity(1);
      setDeliveryResult(null);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handleCheckPostcode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postcode.trim()) return;
    setDeliveryResult('Royal Mail 48 Tracked dispatch available. Estimated arrival in 2 business days.');
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariants);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  // Related products in same category
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  // Star Rating breakdown percentages
  const ratingBreakdown = [
    { stars: 5, pct: 84 },
    { stars: 4, pct: 11 },
    { stars: 3, pct: 3 },
    { stars: 2, pct: 1 },
    { stars: 1, pct: 1 }
  ];

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
        className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-slide-up flex flex-col max-h-[92vh]"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#F8F9FA]">
          <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-1.5 truncate">
            <span>Catalogue</span>
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
            
            {/* Left Image Gallery (5 cols) with Zoom Preview */}
            <div className="md:col-span-6 space-y-4">
              {/* Main Stage with Zoom Lens */}
              <div
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
                onMouseMove={handleMouseMove}
                className="relative aspect-square w-full rounded-2xl bg-[#F6F6F4] flex items-center justify-center border border-slate-200 overflow-hidden cursor-crosshair group/zoom"
              >
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={`${product.title} view ${activeImageIndex + 1}`}
                  width={1080}
                  height={1080}
                  className={`w-full h-full object-cover transition-transform duration-200 ${
                    isZooming ? 'scale-150' : 'scale-100'
                  }`}
                  style={
                    isZooming
                      ? {
                          transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
                        }
                      : undefined
                  }
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none z-10">
                  {product.badge && (
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#1769D2] text-white shadow-sm">
                      {product.badge}
                    </span>
                  )}
                  {product.compareAtPrice && (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#FFF0A8] text-[#202329] border border-[#F5D64E] shadow-sm">
                      Save £{(product.compareAtPrice - product.price).toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Zoom Hint Icon */}
                <div className="absolute bottom-3 right-3 p-2 rounded-xl bg-white/80 backdrop-blur-sm text-slate-600 opacity-70 group-hover/zoom:opacity-100 transition-opacity pointer-events-none">
                  <ZoomIn size={16} />
                </div>
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

              {/* Verified Trust Strip */}
              <div className="pt-2 grid grid-cols-3 gap-2 text-center text-slate-600 text-xs">
                <div className="p-2.5 rounded-xl bg-[#F8F9FA] border border-slate-200/80">
                  <Truck size={16} className="text-[#1769D2] mx-auto mb-1" />
                  <p className="font-bold text-[11px] text-slate-800">Tracked Shipping</p>
                  <p className="text-[10px] text-slate-500">Royal Mail 48 / DPD</p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F8F9FA] border border-slate-200/80">
                  <RotateCcw size={16} className="text-emerald-600 mx-auto mb-1" />
                  <p className="font-bold text-[11px] text-slate-800">30-Day Returns</p>
                  <p className="text-[10px] text-slate-500">Hassle-Free Policy</p>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F8F9FA] border border-slate-200/80">
                  <ShieldCheck size={16} className="text-amber-600 mx-auto mb-1" />
                  <p className="font-bold text-[11px] text-slate-800">UK Compliance</p>
                  <p className="text-[10px] text-slate-500">BS EN Tested</p>
                </div>
              </div>
            </div>

            {/* Right Details (6 cols) */}
            <div className="md:col-span-6 space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span className="font-bold text-[#1769D2] uppercase tracking-wider">{product.brand}</span>
                  <span className="font-mono">{product.sku}</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#202329] leading-snug">
                  {product.title}
                </h1>
                
                {/* Rating & Review Summary */}
                <div className="flex items-center gap-3 pt-2">
                  <StarRating rating={product.rating} reviewCount={product.reviewCount} />
                  <span className="text-xs text-slate-300">|</span>
                  <span className="text-xs font-semibold text-emerald-600">
                    Verified Customer Purchases
                  </span>
                </div>
              </div>

              {/* Price & Savings */}
              <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-slate-200/80 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#1769D2] font-mono">
                      £{unitPrice.toFixed(2)}
                    </span>
                    {product.compareAtPrice && (
                      <span className="text-sm text-slate-400 line-through font-mono">
                        £{product.compareAtPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Price includes 20% UK VAT. Free UK tracked shipping on orders over £40.00.
                  </p>
                </div>

                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    In Stock ({product.stockCount} left)
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Variant Selectors */}
              {product.variants && product.variants.map(variant => (
                <div key={variant.id} className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>Select {variant.name}:</span>
                    <span className="text-[#1769D2] font-semibold">
                      {variant.options.find(o => o.value === selectedVariants[variant.id])?.label}
                    </span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {variant.options.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setSelectedVariants(prev => ({ ...prev, [variant.id]: opt.value }))}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          selectedVariants[variant.id] === opt.value
                            ? 'border-[#1769D2] bg-[#EBF3FC] text-[#1769D2] shadow-sm'
                            : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {opt.priceDiff ? ` (+£${opt.priceDiff.toFixed(2)})` : ''}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Quantity & Actions */}
              <div className="pt-2 flex items-center gap-3">
                <div className="flex items-center border border-slate-200 rounded-xl bg-white p-1">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-3.5 text-xs font-bold text-slate-800 font-mono">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => Math.min(product.stockCount, q + 1))}
                    aria-label="Increase quantity"
                    className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 px-5 rounded-xl text-xs font-bold transition-all shadow-apple-md hover:shadow-apple-hover flex items-center justify-center gap-2 ${
                    justAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#1769D2] hover:bg-[#1256B0] text-white'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check size={16} />
                      <span>Added to Shopping Bag</span>
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      <span>Add to Bag • £{(unitPrice * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
                  className={`p-3 rounded-xl border transition-colors ${
                    isFavorited
                      ? 'border-rose-200 bg-rose-50 text-rose-500'
                      : 'border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-rose-50'
                  }`}
                >
                  <Heart size={18} className={isFavorited ? 'fill-rose-500' : ''} />
                </button>
              </div>

              {/* Postcode Delivery Estimator */}
              <div className="p-3.5 rounded-xl bg-[#F8F9FA] border border-slate-200/80 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <MapPin size={14} className="text-[#1769D2]" />
                  <span>Check UK Delivery Availability:</span>
                </div>
                <form onSubmit={handleCheckPostcode} className="flex gap-2">
                  <input
                    type="text"
                    value={postcode}
                    onChange={e => setPostcode(e.target.value.toUpperCase())}
                    placeholder="e.g. WV6 0SR, SW1A 1AA"
                    className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:border-[#1769D2]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-slate-800 hover:bg-[#1769D2] text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    Check
                  </button>
                </form>
                {deliveryResult && (
                  <p className="text-[11px] text-emerald-600 font-medium animate-fade-in flex items-center gap-1">
                    <Check size={12} />
                    <span>{deliveryResult}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Detailed Tabbed Sections */}
          <div className="pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1" role="tablist">
              {[
                { id: 'specs' as const, label: 'Technical Specs' },
                { id: 'box' as const, label: "What's in the Box" },
                { id: 'delivery' as const, label: 'Delivery & Warranty' },
                { id: 'reviews' as const, label: 'Customer Reviews' },
                { id: 'faqs' as const, label: 'FAQs' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-[#1769D2] text-[#1769D2]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="py-5">
              {activeTab === 'specs' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="p-3 bg-[#F8F9FA] rounded-xl flex items-center justify-between border border-slate-100">
                      <span className="font-semibold text-slate-500">{key}</span>
                      <span className="font-bold text-slate-800 text-right">{val}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'box' && (
                <ul className="space-y-2 text-xs text-slate-700">
                  {product.includedInBox.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1769D2]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === 'delivery' && (
                <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                  <div className="p-3 bg-[#F8F9FA] rounded-xl border border-slate-100 space-y-1">
                    <p className="font-bold text-slate-800">Dispatch & Fulfilment:</p>
                    <p>{product.deliveryInfo}</p>
                  </div>
                  <div className="p-3 bg-[#F8F9FA] rounded-xl border border-slate-100 space-y-1">
                    <p className="font-bold text-slate-800">UK Warranty Guarantee:</p>
                    <p>{product.warrantyInfo}</p>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {/* Rating Breakdown Bars */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-4 bg-[#F8F9FA] rounded-2xl border border-slate-100">
                    <div className="md:col-span-4 text-center md:text-left space-y-1">
                      <div className="text-4xl font-extrabold text-[#202329] font-mono">
                        {product.rating.toFixed(1)}
                      </div>
                      <StarRating rating={product.rating} />
                      <p className="text-xs text-slate-500">Based on {product.reviewCount} customer reviews</p>
                    </div>

                    <div className="md:col-span-8 space-y-1.5">
                      {ratingBreakdown.map(r => (
                        <div key={r.stars} className="flex items-center gap-2 text-xs">
                          <span className="w-8 font-semibold text-slate-600">{r.stars} ★</span>
                          <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-400 rounded-full" style={{ width: `${r.pct}%` }} />
                          </div>
                          <span className="w-8 font-mono text-slate-400 text-right">{r.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sample Customer Feedback */}
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800">David M. (London)</span>
                        <span className="text-emerald-600 font-semibold">✓ Verified UK Purchase</span>
                      </div>
                      <StarRating rating={5} />
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Extremely impressed with the build quality and rapid dispatch from Wolverhampton. Solid engineering and exactly as described.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'faqs' && (
                <div className="space-y-2">
                  {product.faqs.map((faq, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                        className="w-full p-3 text-left font-bold text-xs text-slate-800 flex items-center justify-between bg-[#F8F9FA]"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown size={14} className={`transition-transform ${openFaqIndex === idx ? 'rotate-180' : ''}`} />
                      </button>
                      {openFaqIndex === idx && (
                        <div className="p-3 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Related Products in Same Category (1080x1080 Frames) */}
          {relatedProducts.length > 0 && (
            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-1.5">
                <Sparkles size={15} className="text-[#1769D2]" />
                <span>Frequently Paired in {product.categoryLabel}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="p-3 rounded-xl border border-slate-200 hover:border-[#1769D2] cursor-pointer transition-all bg-white hover:shadow-sm flex items-center gap-3"
                  >
                    <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                      <ProductStudioImage src={rel.images[0]} alt={rel.title} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-800 truncate">{rel.title}</p>
                      <p className="text-xs font-bold text-[#1769D2] font-mono">£{rel.price.toFixed(2)}</p>
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
