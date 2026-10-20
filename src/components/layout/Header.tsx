import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, Menu, PhoneCall, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { ProductCategory } from '../../types/product';
import { COMPANY_DETAILS } from '../../data/policies';

interface HeaderProps {
  activeCategory: ProductCategory | 'all' | 'deals' | 'bestsellers';
  onSelectCategory: (cat: ProductCategory | 'all' | 'deals' | 'bestsellers') => void;
  onOpenSearch: () => void;
  onOpenMobileMenu: () => void;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenSearch,
  onOpenMobileMenu,
  onOpenContact
}) => {
  const { summary, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: ProductCategory | 'all' | 'deals'; label: string; highlight?: boolean }[] = [
    { id: 'all', label: 'Shop All' },
    { id: 'electronics', label: 'Electronics & Tech' },
    { id: 'toys', label: 'Toys & Games' },
    { id: 'home', label: 'Home & Living' },
    { id: 'lifestyle', label: 'Lifestyle' },
    { id: 'deals', label: 'Deals & Offers', highlight: true }
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'glass-panel shadow-sm border-b border-[#E3E5E7]'
          : 'bg-white border-b border-[#E3E5E7]/70'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Mobile Menu Trigger & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenMobileMenu}
              aria-label="Open navigation menu"
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-[#1769D2] hover:bg-slate-100 transition-colors"
            >
              <Menu size={24} />
            </button>

            {/* BlueGate Logo */}
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                onSelectCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-[#1769D2] rounded-lg"
              aria-label="BlueGate Trading Home"
            >
              {/* High-res transparent vector logo */}
              <div className="h-10 sm:h-12 flex items-center">
                <img
                  src="./images/bluegate-logo.svg"
                  alt="BlueGate Trading Ltd - Smart Finds. Better Everyday Shopping."
                  className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main shop navigation"
            className="hidden lg:flex items-center space-x-1 xl:space-x-2"
          >
            {navItems.map(item => {
              const isActive = activeCategory === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectCategory(item.id)}
                  className={`px-3.5 py-2 text-sm font-semibold rounded-full transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#1769D2] text-white shadow-sm'
                      : item.highlight
                      ? 'text-[#202329] bg-[#FFF0A8]/70 hover:bg-[#FFF0A8] border border-[#F5D64E]/60'
                      : 'text-[#202329] hover:text-[#1769D2] hover:bg-[#F5F5F2]'
                  }`}
                >
                  {item.highlight && <Sparkles size={14} className="text-[#1769D2]" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Quick Contact Link (Direct Phone) */}
            <button
              onClick={onOpenContact}
              title={`Call support: ${COMPANY_DETAILS.phone}`}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-[#1769D2] hover:bg-slate-100 rounded-full transition-colors border border-slate-200"
            >
              <PhoneCall size={13} className="text-[#1769D2]" />
              <span>Support</span>
            </button>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              aria-label="Search catalog"
              className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 text-slate-600 hover:text-[#1769D2] hover:bg-slate-100 rounded-full sm:rounded-xl transition-all sm:border sm:border-slate-200"
            >
              <Search size={19} className="text-slate-600" />
              <span className="hidden xl:inline text-xs font-medium text-slate-400">Search products...</span>
              <kbd className="hidden xl:inline text-[10px] bg-slate-200/80 text-slate-600 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
            </button>

            {/* Wishlist Indicator */}
            <button
              onClick={() => onSelectCategory('all')}
              aria-label={`Wishlist (${wishlistCount} items)`}
              className="relative p-2 text-slate-600 hover:text-[#1769D2] hover:bg-slate-100 rounded-full transition-colors"
            >
              <Heart size={20} className={wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : ''} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              aria-label={`Shopping bag containing ${summary.itemCount} items with subtotal £${summary.subtotal.toFixed(2)}`}
              className="relative flex items-center gap-2 px-3 py-2 bg-[#1769D2] hover:bg-[#1256B0] text-white rounded-xl shadow-sm transition-all focus-ring group"
            >
              <ShoppingBag size={18} className="group-hover:scale-105 transition-transform" />
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold leading-none">{summary.itemCount}</span>
                <span className="hidden sm:inline text-xs font-medium opacity-90">| £{summary.total.toFixed(2)}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
