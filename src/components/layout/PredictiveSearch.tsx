import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Package } from 'lucide-react';
import { Product } from '../../types/product';
import { PRODUCTS_DATA } from '../../data/products';

interface PredictiveSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onSearchSubmit: (query: string) => void;
}

export const PredictiveSearch: React.FC<PredictiveSearchProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSearchSubmit
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(-1);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      setResults([]);
      return;
    }
    const filtered = PRODUCTS_DATA.filter(p =>
      p.title.toLowerCase().includes(trimmed) ||
      p.categoryLabel.toLowerCase().includes(trimmed) ||
      p.subcategory.toLowerCase().includes(trimmed) ||
      p.brand.toLowerCase().includes(trimmed) ||
      p.sku.toLowerCase().includes(trimmed)
    ).slice(0, 6);
    setResults(filtered);
    setSelectedIndex(-1);
  }, [query]);

  // Handle outside click & escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          onSelectProduct(results[selectedIndex]);
          onClose();
        } else if (query.trim()) {
          onSearchSubmit(query.trim());
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, query, onClose, onSelectProduct, onSearchSubmit]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-slide-down flex flex-col max-h-[85vh]"
        role="dialog"
        aria-modal="true"
        aria-label="Product search"
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-100 bg-[#F8F9FA]">
          <Search size={20} className="text-[#1769D2] shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search headphones, toys, chargers, smartwatches, SKU..."
            className="w-full bg-transparent text-[#202329] placeholder:text-slate-400 text-base font-medium outline-none pr-8"
            aria-autocomplete="list"
            aria-controls="search-results-list"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Clear query"
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg mr-2"
            >
              <X size={16} />
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close search"
            className="text-xs font-semibold px-2.5 py-1 text-slate-500 hover:text-slate-900 bg-slate-200/60 rounded-md"
          >
            ESC
          </button>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto p-4 flex-1">
          {query.trim() === '' ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Popular Collections
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Noise-Cancelling Headphones', 'STEM Toys', 'Gaming Controller', 'Desk Lamp', '65W Power Bank', 'Smartwatch'].map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-[#ECEDE8] text-[#202329] hover:bg-[#1769D2] hover:text-white transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
              <div className="p-3 bg-[#EBF3FC] rounded-xl text-xs text-[#1769D2] flex items-center gap-2">
                <Package size={16} />
                <span>Tip: You can search directly by SKU code (e.g. BGT-AUD-9001) or category.</span>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Products ({results.length})
                </span>
                <button
                  onClick={() => {
                    onSearchSubmit(query);
                    onClose();
                  }}
                  className="text-xs font-semibold text-[#1769D2] hover:underline flex items-center gap-1"
                >
                  View all results <ArrowRight size={12} />
                </button>
              </div>
              <ul id="search-results-list" role="listbox" className="space-y-1.5">
                {results.map((product, idx) => (
                  <li
                    key={product.id}
                    role="option"
                    aria-selected={selectedIndex === idx}
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className={`flex items-center gap-3.5 p-2.5 rounded-xl cursor-pointer transition-colors ${
                      selectedIndex === idx ? 'bg-[#EBF3FC] ring-1 ring-[#1769D2]' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200/80">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-[#202329] truncate">
                        {product.title}
                      </h4>
                      <p className="text-xs text-slate-500 flex items-center gap-2">
                        <span>{product.subcategory}</span>
                        <span>•</span>
                        <span className="font-mono text-slate-400">{product.sku}</span>
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-bold text-[#1769D2]">
                        £{product.price.toFixed(2)}
                      </span>
                      {product.compareAtPrice && (
                        <p className="text-[11px] text-slate-400 line-through">
                          £{product.compareAtPrice.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center py-8">
              <Package size={36} className="text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No matching products found</p>
              <p className="text-xs text-slate-500 mt-1">
                We couldn't find anything matching "{query}". Try checking your spelling or using broader search terms.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
