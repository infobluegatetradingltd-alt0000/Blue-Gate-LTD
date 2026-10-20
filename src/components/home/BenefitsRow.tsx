import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Headphones, Award } from 'lucide-react';
import { COMPANY_DETAILS } from '../../data/policies';

export const BenefitsRow: React.FC = () => {
  return (
    <section aria-label="Customer benefits and service promises" className="py-14 bg-white border-b border-[#E3E5E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 1. Tracked Delivery */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF3FC] text-[#1769D2] flex items-center justify-center shrink-0 border border-[#1769D2]/20">
              <Truck size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#202329]">Tracked UK Delivery</h3>
              <p className="text-xs text-[#656A70] mt-1 leading-relaxed">
                Free on orders £40+. Dispatched within 24 hours via Royal Mail &amp; DPD with full SMS tracking.
              </p>
            </div>
          </div>

          {/* 2. 30-Day Returns */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF9DB] text-[#F5D64E] flex items-center justify-center shrink-0 border border-[#F5D64E]/40">
              <RotateCcw size={22} className="text-amber-700" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#202329]">30-Day Returns Policy</h3>
              <p className="text-xs text-[#656A70] mt-1 leading-relaxed">
                UK Consumer Rights Act 2015 compliant. Straightforward online RMA return authorization.
              </p>
            </div>
          </div>

          {/* 3. Tested Safety */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#202329]">UKCA &amp; CE Compliant</h3>
              <p className="text-xs text-[#656A70] mt-1 leading-relaxed">
                Rigorous BS EN 71 toy safety directives and certified battery thermal protection circuits.
              </p>
            </div>
          </div>

          {/* 4. Direct Support */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200">
              <Headphones size={22} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#202329]">Direct UK Support</h3>
              <p className="text-xs text-[#656A70] mt-1 leading-relaxed">
                Speak directly with our team at <span className="font-semibold text-slate-900">{COMPANY_DETAILS.phone}</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
