import React from 'react';
import { X, ChevronRight, Phone, ShieldCheck, Sparkles, Headphones, Gamepad2, Home, Compass, Truck, Heart } from 'lucide-react';
import { ProductCategory } from '../../types/product';
import { COMPANY_DETAILS } from '../../data/policies';
import { useWishlist } from '../../context/WishlistContext';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: ProductCategory | 'all' | 'deals' | 'bestsellers';
  onSelectCategory: (cat: ProductCategory | 'all' | 'deals' | 'bestsellers') => void;
  onOpenPolicy: (type: 'about' | 'delivery' | 'returns' | 'privacy' | 'terms' | 'safety') => void;
  onOpenContact: () => void;
  onOpenWishlist?: () => void;
  onOpenTracking?: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  activeCategory,
  onSelectCategory,
  onOpenPolicy,
  onOpenContact,
  onOpenWishlist,
  onOpenTracking
}) => {
  const { wishlistCount } = useWishlist();

  if (!isOpen) return null;

  const categories = [
    { id: 'all' as const, label: 'All Products', desc: 'Browse the complete catalogue' },
    { id: 'electronics' as const, label: 'Electronics & Tech', icon: Headphones, desc: 'Audio, wearables & peripherals' },
    { id: 'toys' as const, label: 'Toys & Games', icon: Gamepad2, desc: 'STEM robotics, building & strategy' },
    { id: 'home' as const, label: 'Home & Living', icon: Home, desc: 'Desk lighting, gadgets & precision scales' },
    { id: 'lifestyle' as const, label: 'Lifestyle & Travel', icon: Compass, desc: 'Everyday carry, wallets & flasks' },
    { id: 'deals' as const, label: 'Deals & Offers', icon: Sparkles, desc: 'Seasonal promotions & discounts', badge: 'Special' }
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-up">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="h-8">
            <img
              src="./images/bluegate-logo.png"
              alt="BlueGate Trading"
              className="h-7 w-auto object-contain"
            />
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Utility Actions */}
        <div className="grid grid-cols-2 gap-2 p-3 bg-[#F8F9FA] border-b border-slate-100">
          <button
            onClick={() => {
              onClose();
              if (onOpenWishlist) onOpenWishlist();
            }}
            className="flex items-center justify-center gap-1.5 p-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:text-[#1769D2]"
          >
            <Heart size={14} className={wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : ''} />
            <span>Wishlist ({wishlistCount})</span>
          </button>

          <button
            onClick={() => {
              onClose();
              if (onOpenTracking) onOpenTracking();
            }}
            className="flex items-center justify-center gap-1.5 p-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:text-[#1769D2]"
          >
            <Truck size={14} className="text-[#1769D2]" />
            <span>Track Order</span>
          </button>
        </div>

        {/* Scrollable Categories */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 block">
              Departments
            </span>
            <div className="space-y-1">
              {categories.map(cat => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      onClose();
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all ${
                      isActive
                        ? 'bg-[#1769D2] text-white shadow-sm'
                        : 'text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {Icon && <Icon size={18} className={isActive ? 'text-white' : 'text-[#1769D2]'} />}
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold">{cat.label}</span>
                          {cat.badge && (
                            <span className="text-[10px] bg-[#FFF0A8] text-[#202329] px-1.5 py-0.2 rounded font-extrabold">
                              {cat.badge}
                            </span>
                          )}
                        </div>
                        <p className={`text-[11px] ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                          {cat.desc}
                        </p>
                      </div>
                    </div>
                    <ChevronRight size={16} className={isActive ? 'text-white' : 'text-slate-400'} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick links & support */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 block">
              Customer Support
            </span>
            <button
              onClick={() => {
                onOpenContact();
                onClose();
              }}
              className="w-full flex items-center gap-2.5 p-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Phone size={16} className="text-[#1769D2]" />
              <span>Contact Support ({COMPANY_DETAILS.phone})</span>
            </button>
            <button
              onClick={() => {
                onOpenPolicy('delivery');
                onClose();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <span>UK Delivery & Shipping</span>
              <ChevronRight size={14} className="text-slate-400" />
            </button>
            <button
              onClick={() => {
                onOpenPolicy('returns');
                onClose();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <span>30-Day Returns Policy</span>
              <ChevronRight size={14} className="text-slate-400" />
            </button>
            <button
              onClick={() => {
                onOpenPolicy('about');
                onClose();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <span>About BlueGate Trading</span>
              <ChevronRight size={14} className="text-slate-400" />
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-[#F8F9FA] border-t border-slate-100 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 text-slate-700 font-semibold mb-1">
            <ShieldCheck size={14} className="text-[#1769D2]" />
            <span>BLUEGATE TRADING LTD</span>
          </div>
          <p>Companies House No: 16997836</p>
          <p className="text-[11px] text-slate-400 mt-1">Dunstall Hill, Wolverhampton, WV6 0SR</p>
        </div>
      </div>
    </div>
  );
};
