import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product, ProductCategory } from '../../types/product';
import { ProductCard } from '../product/ProductCard';

interface FeaturedSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onViewAll: () => void;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({
  products,
  onSelectProduct,
  onViewAll
}) => {
  const [filterTab, setFilterTab] = useState<'all' | ProductCategory>('all');

  const filtered = products.filter(p => {
    if (filterTab === 'all') return p.isFeatured || p.isBestSeller;
    return p.category === filterTab;
  }).slice(0, 8);

  return (
    <section aria-label="Featured products" className="py-16 bg-[#F8F9FA] border-b border-[#E3E5E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0A8] text-[#202329] text-xs font-bold border border-[#F5D64E] mb-2">
              <Sparkles size={13} className="text-[#1769D2]" />
              <span>Curated Selection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#202329] tracking-tight">
              Best Sellers &amp; Top Picks
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0" role="tablist">
            {[
              { id: 'all' as const, label: 'Top Highlights' },
              { id: 'electronics' as const, label: 'Tech & Audio' },
              { id: 'toys' as const, label: 'Toys & STEM' },
              { id: 'home' as const, label: 'Home & Living' },
              { id: 'lifestyle' as const, label: 'Lifestyle' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterTab(tab.id)}
                role="tab"
                aria-selected={filterTab === tab.id}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all shrink-0 ${
                  filterTab === tab.id
                    ? 'bg-[#1769D2] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-[#ECEDE8] text-[#202329] text-sm font-bold rounded-xl border border-[#E3E5E7] shadow-sm hover:shadow-apple-md transition-all group"
          >
            <span>View Full {products.length}-Product Catalogue</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
