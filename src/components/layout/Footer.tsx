import React from 'react';
import { ShieldCheck, Phone, MapPin, FileText, CheckCircle, RefreshCw } from 'lucide-react';
import { COMPANY_DETAILS } from '../../data/policies';
import { ProductCategory } from '../../types/product';
import { useCookie } from '../../context/CookieContext';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory | 'all' | 'deals' | 'bestsellers') => void;
  onOpenPolicy: (type: 'about' | 'delivery' | 'returns' | 'privacy' | 'terms' | 'safety') => void;
  onOpenContact: () => void;
  onOpenTracking: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenPolicy,
  onOpenContact,
  onOpenTracking
}) => {
  const { openPrefsModal } = useCookie();

  return (
    <footer className="bg-[#202329] text-white pt-16 pb-12 border-t border-slate-800" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-slate-800/80">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#1769D2]/20 border border-[#1769D2]/30 flex items-center justify-center text-[#38BDF8] shrink-0">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">UK Registered Business</h4>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                BLUEGATE TRADING LTD (Co. No. 16997836). Dunstall Hill, Wolverhampton.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#F5D64E]/20 border border-[#F5D64E]/30 flex items-center justify-center text-[#F5D64E] shrink-0">
              <RefreshCw size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">30-Day UK Returns</h4>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                Full compliance with the UK Consumer Rights Act 2015.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/20 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] shrink-0">
              <Phone size={19} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Customer Support</h4>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                Direct phone: <a href={`tel:${COMPANY_DETAILS.phone}`} className="text-[#38BDF8] hover:underline font-semibold">{COMPANY_DETAILS.phone}</a>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <CheckCircle size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">UKCA / CE Certified</h4>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                All electronics &amp; toys adhere to British BS EN 71 safety directives.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="./images/bluegate-logo-white.svg"
                alt="BlueGate Trading"
                className="h-9 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm mb-4">
              {COMPANY_DETAILS.tagline} We deliver curated electronics, creative toys &amp; games, and modern living accessories directly to UK households with tracked logistics.
            </p>
            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-[#38BDF8] shrink-0" />
                <span>{COMPANY_DETAILS.registeredOffice}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText size={13} className="text-[#38BDF8] shrink-0" />
                <span>SIC Codes: 47190, 47910, 73110</span>
              </div>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3.5">
              Categories
            </h5>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onSelectCategory('all')}
                  className="hover:text-[#38BDF8] transition-colors"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('electronics')}
                  className="hover:text-[#38BDF8] transition-colors"
                >
                  Electronics &amp; Technology
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('toys')}
                  className="hover:text-[#38BDF8] transition-colors"
                >
                  Toys &amp; Games
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('home')}
                  className="hover:text-[#38BDF8] transition-colors"
                >
                  Home &amp; Everyday Essentials
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('lifestyle')}
                  className="hover:text-[#38BDF8] transition-colors"
                >
                  Lifestyle &amp; Personal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('deals')}
                  className="hover:text-[#F5D64E] text-[#F5D64E] font-semibold transition-colors"
                >
                  Deals &amp; Offers
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3.5">
              Customer Care
            </h5>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={onOpenTracking}
                  className="hover:text-[#38BDF8] transition-colors"
                >
                  Track Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('delivery')}
                  className="hover:text-[#38BDF8] transition-colors"
                >
                  Shipping &amp; Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('returns')}
                  className="hover:text-[#38BDF8] transition-colors"
                >
                  Returns &amp; Refunds (30 Days)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-[#38BDF8] transition-colors"
                >
                  Contact Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('safety')}
                  className="hover:text-[#38BDF8] transition-colors"
                >
                  Product Safety (BS EN 71)
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3.5">
              Legal &amp; Trust
            </h5>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onOpenPolicy('about')}
                  className="hover:text-[#38BDF8] transition-colors"
                >
                  About BlueGate Trading
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('terms')}
                  className="hover:text-[#38BDF8] transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('privacy')}
                  className="hover:text-[#38BDF8] transition-colors"
                >
                  Privacy &amp; Cookie Policy
                </button>
              </li>
              <li>
                <button
                  onClick={openPrefsModal}
                  className="hover:text-[#38BDF8] transition-colors text-left"
                >
                  Cookie Settings
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Notice on registered office vs returns */}
        <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 mb-8 text-xs text-slate-300 leading-relaxed">
          <p className="font-semibold text-slate-200 mb-1">
            Statutory Company &amp; Returns Notice:
          </p>
          <p>
            {COMPANY_DETAILS.ownerFlags.returnsFacility.notice}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; 2026 {COMPANY_DETAILS.legalName}. All rights reserved. Registered in England &amp; Wales.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">Secure 256-Bit SSL Checkout:</span>
            <div className="flex items-center gap-1.5 font-mono text-[10px] bg-slate-800 px-2.5 py-1 rounded border border-slate-700 text-slate-300">
              <span>Visa</span>
              <span>•</span>
              <span>Mastercard</span>
              <span>•</span>
              <span>Apple Pay</span>
              <span>•</span>
              <span>Google Pay</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
