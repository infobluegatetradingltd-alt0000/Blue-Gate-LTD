import React, { useState } from 'react';
import { Tag, Sparkles, Copy, Check, ArrowRight } from 'lucide-react';
import { Product } from '../../types/product';
import { ProductCard } from '../product/ProductCard';

interface DealsSectionProps {
  dealProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onExploreAllDeals: () => void;
}

export const DealsSection: React.FC<DealsSectionProps> = ({
  dealProducts,
  onSelectProduct,
  onExploreAllDeals
}) => {
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <section aria-label="Active promotions and deals" className="py-16 bg-[#F5F5F2] border-b border-[#E3E5E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Promo Voucher Banner */}
        <div className="bg-[#FFF0A8] rounded-3xl p-6 sm:p-8 border border-[#F5D64E] shadow-apple-md mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#1769D2] bg-white/80 px-2.5 py-0.5 rounded-full border border-white">
              Limited-Time UK Offer
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#202329]">
              Enjoy 10% Off Your Entire First Order
            </h3>
            <p className="text-xs sm:text-sm text-[#656A70]">
              Use promo voucher code at checkout. Valid across all electronics, toys, and lifestyle items.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border border-slate-200/80 shadow-sm shrink-0">
            <div className="text-left">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Voucher Code</span>
              <span className="font-mono text-base font-extrabold text-[#1769D2] tracking-wider">BLUEGATE10</span>
            </div>
            <button
              onClick={() => handleCopy('BLUEGATE10')}
              aria-label="Copy voucher code"
              className="ml-3 p-2 bg-[#F8F9FA] hover:bg-[#1769D2] hover:text-white text-slate-700 rounded-xl transition-colors"
            >
              {copiedCode ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#1769D2] text-xs font-bold border border-[#E3E5E7] mb-2">
              <Tag size={13} />
              <span>Verified Price Reductions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202329] tracking-tight">
              Featured Promotional Deals
            </h2>
          </div>
          <button
            onClick={onExploreAllDeals}
            className="text-xs font-bold text-[#1769D2] hover:underline flex items-center gap-1"
          >
            <span>View all offers</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dealProducts.slice(0, 4).map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
