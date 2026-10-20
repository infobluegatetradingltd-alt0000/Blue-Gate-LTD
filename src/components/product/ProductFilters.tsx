import React from 'react';
import { Filter, RotateCcw, Check } from 'lucide-react';
import { ProductCategory } from '../../types/product';

export interface FilterState {
  category: ProductCategory | 'all' | 'deals' | 'bestsellers';
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  minRating: number;
  selectedBrand: string | 'all';
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

interface ProductFiltersProps {
  filters: FilterState;
  onChangeFilters: (filters: FilterState) => void;
  onResetFilters: () => void;
  availableBrands: string[];
  totalMatches: number;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onChangeFilters,
  onResetFilters,
  availableBrands,
  totalMatches
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-[#E3E5E7] shadow-apple-sm space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-[#1769D2]" />
          <h3 className="text-sm font-bold text-[#202329]">Refine Selection</h3>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs text-slate-500 hover:text-[#1769D2] flex items-center gap-1 font-semibold transition-colors"
        >
          <RotateCcw size={12} />
          <span>Reset</span>
        </button>
      </div>

      {/* Category selector */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Department
        </label>
        <div className="space-y-1 text-xs">
          {[
            { id: 'all' as const, label: 'All Departments' },
            { id: 'electronics' as const, label: 'Electronics & Tech' },
            { id: 'toys' as const, label: 'Toys & Games' },
            { id: 'home' as const, label: 'Home & Living' },
            { id: 'lifestyle' as const, label: 'Lifestyle & Travel' },
            { id: 'deals' as const, label: 'Deals & Offers' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => onChangeFilters({ ...filters, category: cat.id })}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-colors ${
                filters.category === cat.id
                  ? 'bg-[#EBF3FC] text-[#1769D2] font-bold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{cat.label}</span>
              {filters.category === cat.id && <Check size={14} />}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
          <span>Max Price</span>
          <span className="text-[#1769D2] font-extrabold text-sm">£{filters.maxPrice}</span>
        </div>
        <input
          type="range"
          min={10}
          max={120}
          step={5}
          value={filters.maxPrice}
          onChange={e => onChangeFilters({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-[#1769D2] cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-400">
          <span>£10</span>
          <span>£60</span>
          <span>£120</span>
        </div>
      </div>

      {/* In-Stock Toggle */}
      <div className="pt-3 border-t border-slate-100">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-xs font-bold text-slate-700">In-Stock Items Only</span>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={e => onChangeFilters({ ...filters, inStockOnly: e.target.checked })}
            className="rounded border-slate-300 text-[#1769D2] focus:ring-[#1769D2] w-4 h-4 cursor-pointer"
          />
        </label>
      </div>

      {/* Minimum Rating */}
      <div className="space-y-2 pt-3 border-t border-slate-100">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Customer Rating
        </label>
        <div className="grid grid-cols-3 gap-1.5 text-xs">
          {[
            { label: 'Any', val: 0 },
            { label: '4.5+ ★', val: 4.5 },
            { label: '4.8+ ★', val: 4.8 }
          ].map(r => (
            <button
              key={r.val}
              onClick={() => onChangeFilters({ ...filters, minRating: r.val })}
              className={`py-1.5 px-2 rounded-lg font-semibold border transition-all ${
                filters.minRating === r.val
                  ? 'bg-[#202329] text-white border-[#202329]'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      {availableBrands.length > 0 && (
        <div className="space-y-2 pt-3 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            Brand
          </label>
          <select
            value={filters.selectedBrand}
            onChange={e => onChangeFilters({ ...filters, selectedBrand: e.target.value })}
            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#1769D2]"
          >
            <option value="all">All Brands</option>
            {availableBrands.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      )}

      {/* Matches count footer */}
      <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 text-center">
        Showing {totalMatches} qualifying product{totalMatches === 1 ? '' : 's'}
      </div>
    </div>
  );
};
