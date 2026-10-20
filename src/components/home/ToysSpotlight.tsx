import React from 'react';
import { Gamepad2, ArrowRight, ShieldCheck, Sparkles, Brain, Cpu, Blocks } from 'lucide-react';
import { Product } from '../../types/product';
import { ProductCard } from '../product/ProductCard';

interface ToysSpotlightProps {
  toyProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onExploreToys: () => void;
}

export const ToysSpotlight: React.FC<ToysSpotlightProps> = ({
  toyProducts,
  onSelectProduct,
  onExploreToys
}) => {
  return (
    <section aria-label="Toys and games spotlight" className="py-16 bg-[#FFFDF0]/60 border-b border-[#E3E5E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0A8] border border-[#F5D64E] text-[#202329] text-xs font-bold mb-2">
              <Gamepad2 size={14} className="text-[#1769D2]" />
              <span>STEM Discovery &amp; Creative Engineering</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#202329] tracking-tight">
              Toys &amp; Games Built to Inspire
            </h2>
            <p className="text-xs sm:text-sm text-[#656A70] mt-2 max-w-xl">
              From programmable obstacle-avoidance coding robots to 1,200-piece modular architectural skylines and handcrafted wooden strategy boards.
            </p>
          </div>

          {/* Standards Badge */}
          <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-amber-200/80 shadow-sm shrink-0">
            <ShieldCheck size={20} className="text-amber-600 shrink-0" />
            <div className="text-xs">
              <p className="font-bold text-slate-800">BS EN 71 Tested</p>
              <p className="text-[11px] text-slate-500">Non-toxic virgin ABS plastics</p>
            </div>
          </div>
        </div>

        {/* 3 Pillars Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-white border border-amber-200/60 shadow-apple-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FFF0A8] flex items-center justify-center text-[#1769D2] shrink-0">
              <Brain size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Cognitive &amp; Problem Solving</p>
              <p className="text-[11px] text-slate-500">Hands-on spatial &amp; logic puzzles</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-amber-200/60 shadow-apple-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#EBF3FC] flex items-center justify-center text-[#1769D2] shrink-0">
              <Cpu size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Robotics &amp; Coding</p>
              <p className="text-[11px] text-slate-500">Scratch &amp; Python block logic</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-amber-200/60 shadow-apple-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
              <Blocks size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Precision Architecture</p>
              <p className="text-[11px] text-slate-500">Interlocking micro-brick systems</p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {toyProducts.slice(0, 3).map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-8 text-center">
          <button
            onClick={onExploreToys}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#202329] hover:bg-[#1769D2] text-white text-xs font-bold rounded-xl transition-all shadow-sm group"
          >
            <span>Explore All Toys &amp; Games</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
