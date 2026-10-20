import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { Product } from '../../types/product';
import { PRODUCTS_DATA } from '../../data/products';
import { useCart } from '../../context/CartContext';

interface MotionHeroProps {
  onShopBestSellers: () => void;
  onExploreCategories: () => void;
  onSelectProduct: (product: Product) => void;
}

export const MotionHero: React.FC<MotionHeroProps> = ({
  onShopBestSellers,
  onExploreCategories,
  onSelectProduct
}) => {
  // Highlight 4 flagship hero products across key categories
  const heroProducts = PRODUCTS_DATA.filter(p =>
    ['bgt-anc-900', 'bgt-ctrl-800', 'bgt-watch-500', 'bgt-toy-101'].includes(p.id)
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % heroProducts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPlaying, heroProducts.length]);

  const activeProduct = heroProducts[activeIndex] || heroProducts[0];

  return (
    <section
      aria-label="Featured showcase"
      className="relative bg-gradient-to-b from-[#F5F5F2] via-white to-[#F8F9FA] pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden border-b border-[#E3E5E7]"
    >
      {/* Decorative ambient subtle lights (refined Apple/glass aesthetic) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#1769D2]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-[#FFF0A8]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Editorial Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0A8]/90 border border-[#F5D64E] text-[#202329] text-xs font-bold shadow-sm">
              <Sparkles size={14} className="text-[#1769D2]" />
              <span>Smart Finds. Better Everyday Shopping.</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1769D2]" />
              <span className="text-[#656A70] font-normal">UK Retailer</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#202329] tracking-tight leading-[1.12]">
              Elevate Your Everyday <br className="hidden sm:inline" />
              <span className="text-[#1769D2]">Tech &amp; Play</span> Essentials.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#656A70] max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Curated audio, gaming precision, creative STEM kits, and modern home gadgets. Tested for durability, certified to British standards, and delivered with Royal Mail tracked UK dispatch.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onShopBestSellers}
                className="px-6 py-3.5 bg-[#1769D2] hover:bg-[#1256B0] text-white text-sm font-bold rounded-xl shadow-apple-md hover:shadow-apple-hover transition-all flex items-center gap-2 group focus-ring"
              >
                <span>Shop Best Sellers</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreCategories}
                className="px-6 py-3.5 bg-white hover:bg-[#ECEDE8] text-[#202329] text-sm font-bold rounded-xl border border-[#E3E5E7] transition-all shadow-sm focus-ring"
              >
                <span>Explore Categories</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-slate-200/80 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#1769D2] shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Tracked UK Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-[#F5D64E] shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Same-Day Dispatch</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-xs font-semibold text-slate-700">30-Day Returns</span>
              </div>
            </div>
          </div>

          {/* Right Motion Product Stage (5 cols) */}
          <div className="lg:col-span-5 relative">
            {/* Cinematic Product Stage Card */}
            <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-apple-lg border border-[#E3E5E7] transition-all duration-500">
              {/* Product Badge & Category */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#1769D2] text-white">
                  {activeProduct.badge || 'Flagship Choice'}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  {activeProduct.categoryLabel}
                </span>
              </div>

              {/* Product Image Stage with smooth transition */}
              <div
                onClick={() => onSelectProduct(activeProduct)}
                className="cursor-pointer group relative aspect-square w-full rounded-2xl bg-[#F5F5F2] overflow-hidden flex items-center justify-center p-4 mb-5 border border-slate-100"
              >
                <img
                  src={activeProduct.images[0]}
                  alt={activeProduct.title}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />

                {/* Quick overlay tag */}
                <div className="absolute bottom-3 left-3 right-3 py-1.5 px-3 rounded-xl bg-white/90 backdrop-blur-md text-[11px] font-semibold text-slate-700 flex items-center justify-between border border-white/60 shadow-sm opacity-90 group-hover:opacity-100 transition-opacity">
                  <span>Click to view details</span>
                  <span className="text-[#1769D2] font-bold">SKU: {activeProduct.sku}</span>
                </div>
              </div>

              {/* Product Metadata & Price */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <h3
                    onClick={() => onSelectProduct(activeProduct)}
                    className="text-base sm:text-lg font-bold text-[#202329] hover:text-[#1769D2] transition-colors cursor-pointer line-clamp-1"
                  >
                    {activeProduct.title}
                  </h3>
                  <div className="text-right shrink-0">
                    <span className="text-lg font-extrabold text-[#1769D2]">
                      £{activeProduct.price.toFixed(2)}
                    </span>
                    {activeProduct.compareAtPrice && (
                      <p className="text-xs text-slate-400 line-through">
                        £{activeProduct.compareAtPrice.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {activeProduct.shortDescription}
                </p>

                {/* Direct Hero CTA Button */}
                <div className="pt-3 flex items-center gap-2.5">
                  <button
                    onClick={() => addToCart(activeProduct, 1)}
                    className="flex-1 py-2.5 px-4 bg-[#202329] hover:bg-[#1769D2] text-white text-xs font-bold rounded-xl transition-colors shadow-sm focus-ring"
                  >
                    Add to Bag • £{activeProduct.price.toFixed(2)}
                  </button>
                  <button
                    onClick={() => onSelectProduct(activeProduct)}
                    className="py-2.5 px-3.5 bg-[#ECEDE8] hover:bg-slate-200 text-[#202329] text-xs font-semibold rounded-xl transition-colors"
                  >
                    Details
                  </button>
                </div>
              </div>

              {/* Slider Dots & Autoplay Controls */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5" role="tablist" aria-label="Hero carousel navigation">
                  {heroProducts.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => setActiveIndex(idx)}
                      role="tab"
                      aria-selected={activeIndex === idx}
                      aria-label={`Slide ${idx + 1}: ${p.title}`}
                      className={`h-2 rounded-full transition-all ${
                        activeIndex === idx ? 'w-6 bg-[#1769D2]' : 'w-2 bg-slate-200 hover:bg-slate-300'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1 text-slate-500">
                  <button
                    onClick={() => setActiveIndex(prev => (prev - 1 + heroProducts.length) % heroProducts.length)}
                    aria-label="Previous product"
                    className="p-1 hover:text-[#1769D2] transition-colors rounded hover:bg-slate-100"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    aria-label={isPlaying ? 'Pause product slider' : 'Play product slider'}
                    className="p-1 hover:text-[#1769D2] transition-colors rounded hover:bg-slate-100 text-xs"
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                  </button>
                  <button
                    onClick={() => setActiveIndex(prev => (prev + 1) % heroProducts.length)}
                    aria-label="Next product"
                    className="p-1 hover:text-[#1769D2] transition-colors rounded hover:bg-slate-100"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
