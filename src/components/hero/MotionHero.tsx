import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play, ShieldCheck, Zap, Sparkles, Volume2, VolumeX, Eye } from 'lucide-react';
import { Product } from '../../types/product';
import { PRODUCTS_DATA } from '../../data/products';
import { useCart } from '../../context/CartContext';

interface MotionHeroProps {
  onShopBestSellers: () => void;
  onExploreCategories: () => void;
  onSelectProduct: (product: Product) => void;
}

// Claude-Motion Synthetic Sound Engine (Pure Web Audio API, Zero Assets Required)
class SoundFX {
  private ctx: AudioContext | null = null;
  public enabled = true;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  // Soft tactile pop/tick (used in claude-motion / sfx)
  public playPop() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, t);
      osc.frequency.exponentialRampToValueAtTime(140, t + 0.04);

      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.04);
    } catch {
      // Audio not permitted yet
    }
  }

  // Smooth whoosh for slide transitions
  public playWhoosh() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, t);
      osc.frequency.exponentialRampToValueAtTime(80, t + 0.08);

      gain.gain.setValueAtTime(0.04, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.08);
    } catch {
      // Ignore audio block
    }
  }
}

const sfx = new SoundFX();

export const MotionHero: React.FC<MotionHeroProps> = ({
  onShopBestSellers,
  onExploreCategories,
  onSelectProduct
}) => {
  const heroProducts = PRODUCTS_DATA.filter(p =>
    ['bgt-anc-900', 'bgt-ctrl-800', 'bgt-watch-500', 'bgt-toy-101'].includes(p.id)
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { addToCart } = useCart();

  // 3D Parallax & Specular Light Coordinates
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // Auto advance carousel with timeline hold
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveIndex(prev => {
        const next = (prev + 1) % heroProducts.length;
        sfx.playWhoosh();
        return next;
      });
    }, 6000);
    return () => clearInterval(timer);
  }, [isPlaying, heroProducts.length]);

  const activeProduct = heroProducts[activeIndex] || heroProducts[0];

  // Mouse Parallax Calculation (Apple / Claude-Motion Taste)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max rotation 8 degrees for tasteful, subtle depth
    const rotX = -((y - centerY) / centerY) * 7;
    const rotY = ((x - centerX) / centerX) * 7;

    setRotateX(rotX);
    setRotateY(rotY);
    setLightPos({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100)
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setLightPos({ x: 50, y: 50 });
  };

  const handleStep = (newIndex: number) => {
    sfx.playPop();
    setActiveIndex(newIndex);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sfx.enabled = next;
    if (next) sfx.playPop();
  };

  return (
    <section
      aria-label="Featured showcase"
      className="relative bg-gradient-to-b from-[#F5F5F2] via-white to-[#F8F9FA] pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden border-b border-[#E3E5E7]"
    >
      {/* Texture: Subtle Drifting Dot Grid (Claude-Motion Taste: 'Nothing is dead-still') */}
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      {/* Ambient Breathing Light Spots */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-[#1769D2]/6 rounded-full blur-[90px] pointer-events-none animate-pulse duration-1000" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-[#FFF0A8]/50 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Editorial Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tagline Badge with Monospace British Retail Stamp */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0A8]/90 border border-[#F5D64E] text-[#202329] text-xs font-bold shadow-sm backdrop-blur-sm">
              <Sparkles size={14} className="text-[#1769D2]" />
              <span className="font-mono tracking-[0.2em] uppercase text-[11px] font-bold">
                BLUEGATE TRADING LTD
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1769D2]" />
              <span className="text-[#656A70] font-medium">UK Retailer No. 16997836</span>
            </div>

            {/* Masked Headline Reveals (Claude-Motion Stagger: 0.09s per word, easeOut: cubic-bezier(0.16, 1, 0.3, 1)) */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#202329] tracking-tight leading-[1.12]">
              <span className="inline-block overflow-hidden pb-1">
                <span className="inline-block animate-[slideUp_0.75s_cubic-bezier(0.16,1,0.3,1)_forwards]">
                  Elevate Your Everyday
                </span>
              </span>{' '}
              <br className="hidden sm:inline" />
              <span className="inline-block overflow-hidden pb-1">
                <span className="inline-block text-[#1769D2] animate-[slideUp_0.85s_cubic-bezier(0.16,1,0.3,1)_0.09s_forwards]">
                  Tech &amp; Play
                </span>
              </span>{' '}
              <span className="inline-block overflow-hidden pb-1">
                <span className="inline-block animate-[slideUp_0.95s_cubic-bezier(0.16,1,0.3,1)_0.18s_forwards]">
                  Essentials.
                </span>
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#656A70] max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Curated acoustic audio, Hall-Effect gaming precision, creative STEM kits, and modern home gadgets. Tested for durability, certified to British standards, and delivered with Royal Mail tracked UK dispatch.
            </p>

            {/* Action Buttons with Spring Feedback */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => {
                  sfx.playPop();
                  onShopBestSellers();
                }}
                className="px-6 py-3.5 bg-[#1769D2] hover:bg-[#1256B0] text-white text-sm font-bold rounded-xl shadow-apple-md hover:shadow-apple-hover transition-all duration-300 flex items-center gap-2 group focus-ring active:scale-95"
              >
                <span>Shop Best Sellers</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  sfx.playPop();
                  onExploreCategories();
                }}
                className="px-6 py-3.5 bg-white hover:bg-[#ECEDE8] text-[#202329] text-sm font-bold rounded-xl border border-[#E3E5E7] transition-all shadow-sm focus-ring active:scale-95"
              >
                <span>Explore Categories</span>
              </button>

              {/* Sound Experience Toggle (Claude-Motion Sound Engine) */}
              <button
                onClick={toggleSound}
                title={soundEnabled ? 'Mute motion sound effects' : 'Enable motion sound effects'}
                aria-label="Toggle motion UI sound"
                className="p-3 bg-white hover:bg-slate-100 text-slate-500 hover:text-[#1769D2] rounded-xl border border-[#E3E5E7] transition-all shadow-sm focus-ring"
              >
                {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-slate-200/80 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#1769D2] shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Tracked UK Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-[#F5D64E] shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Same-Day Dispatch</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-xs font-semibold text-slate-700">30-Day UK Returns</span>
              </div>
            </div>
          </div>

          {/* Right Motion Product Stage (5 cols) with 3D Parallax & Specular Sheen */}
          <div className="lg:col-span-5 relative perspective-[1200px]">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.015 : 1})`,
                transition: isHovered
                  ? 'transform 0.08s ease-out'
                  : 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-apple-lg border border-[#E3E5E7] overflow-hidden will-change-transform cursor-pointer group"
            >
              {/* Dynamic Specular Sheen Following Mouse (Claude-Motion Light Principle) */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                  background: isHovered
                    ? `radial-gradient(circle 350px at ${lightPos.x}% ${lightPos.y}%, rgba(23, 105, 210, 0.08), transparent 70%)`
                    : 'none'
                }}
              />

              {/* Product Badge & Department */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#1769D2] text-white shadow-sm animate-[fadeIn_0.4s_ease-out]">
                  {activeProduct.badge || 'Flagship Choice'}
                </span>
                <span className="font-mono uppercase tracking-[0.2em] text-[10px] text-slate-400 font-bold">
                  {activeProduct.subcategory}
                </span>
              </div>

              {/* Product Image Stage with Smooth Scale & Morph */}
              <div
                onClick={() => {
                  sfx.playPop();
                  onSelectProduct(activeProduct);
                }}
                className="relative aspect-square w-full rounded-2xl bg-[#F5F5F2] overflow-hidden flex items-center justify-center p-4 mb-5 border border-slate-100 group/stage"
              >
                <img
                  key={activeProduct.id}
                  src={activeProduct.images[0]}
                  alt={activeProduct.title}
                  className="w-full h-full object-contain mix-blend-multiply transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/stage:scale-105"
                  loading="eager"
                />

                {/* Quick Overview Pill on Hover */}
                <div className="absolute bottom-3 left-3 right-3 py-2 px-3.5 rounded-xl bg-white/95 backdrop-blur-md text-xs font-semibold text-slate-700 flex items-center justify-between border border-white/80 shadow-md opacity-90 group-hover/stage:opacity-100 transition-opacity">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <Eye size={14} className="text-[#1769D2]" />
                    <span>Quick Overview</span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-[#1769D2]">
                    SKU: {activeProduct.sku}
                  </span>
                </div>
              </div>

              {/* Product Metadata & Price Landing */}
              <div className="space-y-2 relative z-10">
                <div className="flex items-start justify-between gap-3">
                  <h3
                    onClick={() => {
                      sfx.playPop();
                      onSelectProduct(activeProduct);
                    }}
                    className="text-base sm:text-lg font-bold text-[#202329] hover:text-[#1769D2] transition-colors line-clamp-1"
                  >
                    {activeProduct.title}
                  </h3>
                  <div className="text-right shrink-0">
                    <span className="text-lg font-extrabold text-[#1769D2] tabular-nums">
                      £{activeProduct.price.toFixed(2)}
                    </span>
                    {activeProduct.compareAtPrice && (
                      <p className="text-xs text-slate-400 line-through tabular-nums">
                        £{activeProduct.compareAtPrice.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {activeProduct.shortDescription}
                </p>

                {/* Direct Action Buttons */}
                <div className="pt-3 flex items-center gap-2.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sfx.playPop();
                      addToCart(activeProduct, 1);
                    }}
                    className="flex-1 py-2.5 px-4 bg-[#202329] hover:bg-[#1769D2] text-white text-xs font-bold rounded-xl transition-all shadow-sm focus-ring active:scale-95"
                  >
                    Add to Bag • £{activeProduct.price.toFixed(2)}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sfx.playPop();
                      onSelectProduct(activeProduct);
                    }}
                    className="py-2.5 px-3.5 bg-[#ECEDE8] hover:bg-slate-200 text-[#202329] text-xs font-semibold rounded-xl transition-colors active:scale-95"
                  >
                    Details
                  </button>
                </div>
              </div>

              {/* Slider Dots & Autoplay Controls */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2" role="tablist" aria-label="Hero carousel navigation">
                  {heroProducts.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStep(idx);
                      }}
                      role="tab"
                      aria-selected={activeIndex === idx}
                      aria-label={`Slide ${idx + 1}: ${p.title}`}
                      className={`h-2 rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        activeIndex === idx
                          ? 'w-7 bg-[#1769D2]'
                          : 'w-2 bg-slate-200 hover:bg-slate-300'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1 text-slate-500">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStep((activeIndex - 1 + heroProducts.length) % heroProducts.length);
                    }}
                    aria-label="Previous product"
                    className="p-1 hover:text-[#1769D2] transition-colors rounded hover:bg-slate-100"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sfx.playPop();
                      setIsPlaying(!isPlaying);
                    }}
                    aria-label={isPlaying ? 'Pause product slider' : 'Play product slider'}
                    className="p-1 hover:text-[#1769D2] transition-colors rounded hover:bg-slate-100 text-xs"
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStep((activeIndex + 1) % heroProducts.length);
                    }}
                    aria-label="Next product"
                    className="p-1 hover:text-[#1769D2] transition-colors rounded hover:bg-slate-100"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
