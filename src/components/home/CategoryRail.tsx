import React from 'react';
import { Headphones, Gamepad2, Home, Compass, ArrowRight } from 'lucide-react';
import { CATEGORIES_DATA } from '../../data/products';
import { ProductCategory } from '../../types/product';

interface CategoryRailProps {
  onSelectCategory: (cat: ProductCategory) => void;
}

export const CategoryRail: React.FC<CategoryRailProps> = ({ onSelectCategory }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Headphones':
        return <Headphones size={22} className="text-[#1769D2]" />;
      case 'Gamepad2':
        return <Gamepad2 size={22} className="text-[#1769D2]" />;
      case 'Home':
        return <Home size={22} className="text-[#1769D2]" />;
      case 'Compass':
      default:
        return <Compass size={22} className="text-[#1769D2]" />;
    }
  };

  return (
    <section aria-label="Shop by category" className="py-12 bg-white border-b border-[#E3E5E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1769D2] bg-[#EBF3FC] px-2.5 py-1 rounded-full">
              Department Navigation
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202329] tracking-tight mt-2">
              Explore Our Core Catalogues
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#656A70] max-w-md">
            Four specialized collections rigorously vetted for build quality, everyday utility, and UK safety conformity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES_DATA.map(cat => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative bg-[#F8F9FA] hover:bg-white rounded-2xl p-6 border border-[#E3E5E7] hover:border-[#1769D2]/40 shadow-apple-sm hover:shadow-apple-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-200/80 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {getIcon(cat.iconName)}
                </div>
                <h3 className="text-base font-bold text-[#202329] group-hover:text-[#1769D2] transition-colors mb-1">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#656A70] line-clamp-2 leading-relaxed mb-4">
                  {cat.tagline}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-bold pt-3 border-t border-slate-200/60 text-[#1769D2]">
                <span>{cat.productCount} Curated Products</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
