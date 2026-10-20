import React, { useEffect, useState } from 'react';
import { Clock, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../../types/product';
import { PRODUCTS_DATA } from '../../data/products';
import { ProductCard } from '../product/ProductCard';

interface RecentlyViewedProps {
  onSelectProduct: (product: Product) => void;
  currentProductId?: string;
}

const STORAGE_KEY = 'bluegate_recently_viewed';

export const saveRecentlyViewedId = (id: string) => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const existing: string[] = raw ? JSON.parse(raw) : [];
    const updated = [id, ...existing.filter(item => item !== id)].slice(0, 8);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // LocalStorage quota or access error
  }
};

export const RecentlyViewed: React.FC<RecentlyViewedProps> = ({
  onSelectProduct,
  currentProductId
}) => {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  const loadRecents = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const ids: string[] = JSON.parse(raw);
      const filtered = ids
        .filter(id => id !== currentProductId)
        .map(id => PRODUCTS_DATA.find(p => p.id === id))
        .filter((p): p is Product => Boolean(p))
        .slice(0, 4);
      setRecentProducts(filtered);
    } catch {
      // Ignore parse errors
    }
  };

  useEffect(() => {
    loadRecents();
    window.addEventListener('storage', loadRecents);
    return () => window.removeEventListener('storage', loadRecents);
  }, [currentProductId]);

  const handleClear = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setRecentProducts([]);
    } catch {
      // Ignore
    }
  };

  if (recentProducts.length === 0) return null;

  return (
    <section aria-label="Recently viewed items" className="py-12 bg-white border-b border-[#E3E5E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-[#1769D2]" />
            <h3 className="text-base sm:text-lg font-bold text-[#202329]">
              Recently Viewed Products
            </h3>
            <span className="text-xs font-mono text-slate-400">({recentProducts.length})</span>
          </div>

          <button
            onClick={handleClear}
            className="text-xs font-semibold text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-1"
          >
            <Trash2 size={13} />
            <span>Clear History</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentProducts.map(product => (
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
