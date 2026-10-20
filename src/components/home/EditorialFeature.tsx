import React from 'react';
import { ArrowRight, Cpu, BatteryCharging, Headphones, Volume2 } from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';

interface EditorialFeatureProps {
  flagshipProduct: Product;
  onSelectProduct: (product: Product) => void;
}

export const EditorialFeature: React.FC<EditorialFeatureProps> = ({
  flagshipProduct,
  onSelectProduct
}) => {
  const { addToCart } = useCart();

  return (
    <section aria-label="Editorial feature" className="py-16 bg-white border-b border-[#E3E5E7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F5F5F2] rounded-3xl border border-[#E3E5E7] overflow-hidden p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E3E5E7] text-[#1769D2] text-xs font-bold">
                <Headphones size={14} />
                <span>Editorial Spotlight • Acoustic Architecture</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#202329] tracking-tight leading-tight">
                Studio-Grade Acoustic Fidelity, Engineered for the British Commute.
              </h2>

              <p className="text-sm sm:text-base text-[#656A70] leading-relaxed">
                We believe exceptional audio shouldn't require paying a four-figure luxury markup. The BlueGate AcousticPro combines custom 40mm beryllium diaphragm drivers with hybrid active noise cancellation capable of suppressing 38dB of ambient London Underground and street roar.
              </p>

              {/* 4 Feature Callouts */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 bg-white rounded-xl border border-slate-200/80">
                  <Cpu size={18} className="text-[#1769D2] mb-1.5" />
                  <p className="text-xs font-bold text-slate-800">Beryllium Drivers</p>
                  <p className="text-[11px] text-slate-500">Unmatched acoustic transient response</p>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-slate-200/80">
                  <BatteryCharging size={18} className="text-[#1769D2] mb-1.5" />
                  <p className="text-xs font-bold text-slate-800">42-Hour Battery</p>
                  <p className="text-[11px] text-slate-500">Fast charge: 10m = 5h playback</p>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-slate-200/80">
                  <Volume2 size={18} className="text-[#1769D2] mb-1.5" />
                  <p className="text-xs font-bold text-slate-800">-38dB Hybrid ANC</p>
                  <p className="text-[11px] text-slate-500">Dual feedforward/feedback mics</p>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-slate-200/80">
                  <span className="text-xs font-bold text-[#1769D2] block mb-1">UKCA / CE</span>
                  <p className="text-xs font-bold text-slate-800">UK Certified</p>
                  <p className="text-[11px] text-slate-500">BS EN compliance standards</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => addToCart(flagshipProduct, 1)}
                  className="px-6 py-3 bg-[#1769D2] hover:bg-[#1256B0] text-white text-xs font-bold rounded-xl shadow-apple-md hover:shadow-apple-hover transition-all flex items-center gap-2"
                >
                  <span>Order Now • £{flagshipProduct.price.toFixed(2)}</span>
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => onSelectProduct(flagshipProduct)}
                  className="px-5 py-3 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 transition-colors"
                >
                  View Full Technical Specs
                </button>
              </div>
            </div>

            {/* Right Stage (6 cols) */}
            <div className="lg:col-span-6">
              <div
                onClick={() => onSelectProduct(flagshipProduct)}
                className="relative aspect-square w-full rounded-2xl bg-slate-100/80 overflow-hidden flex items-center justify-center border border-[#E3E5E7] shadow-apple-md cursor-pointer group"
              >
                <img
                  src={flagshipProduct.images[0]}
                  alt="BlueGate AcousticPro Headphones"
                  width={1080}
                  height={1080}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-4 right-4 bg-[#FFF0A8] text-[#202329] text-xs font-extrabold px-3 py-1 rounded-full border border-[#F5D64E]">
                  Save £30.00
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-slate-800">BlueGate AcousticPro</p>
                    <p className="text-slate-500">Royal Mail 48 Tracked (FREE)</p>
                  </div>
                  <span className="font-mono font-bold text-[#1769D2]">SKU: {flagshipProduct.sku}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
