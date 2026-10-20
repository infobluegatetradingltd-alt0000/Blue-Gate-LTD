import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play, ShieldCheck, Zap, Sparkles, Volume2, VolumeX, Eye, ArrowUpRight } from 'lucide-react';
import { Product } from '../../types/product';
import { PRODUCTS_DATA } from '../../data/products';
import { useCart } from '../../context/CartContext';

interface MotionHeroProps {
  onShopBestSellers: () => void;
  onExploreCategories: () => void;
  onSelectProduct: (product: Product) => void;
}

// ==========================================
// 1. CLAUDE-MOTION TACTILE SOUND ENGINE
// ==========================================
class MotionAudio {
  private ctx: AudioContext | null = null;
  public enabled = true;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  // Tactile notch pop (claude-motion / sfx / pop)
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
      osc.frequency.setValueAtTime(460, t);
      osc.frequency.exponentialRampToValueAtTime(140, t + 0.045);

      gain.gain.setValueAtTime(0.09, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.045);
    } catch {
      // Audio autoplay policy
    }
  }

  // Smooth slide whoosh (claude-motion / sfx / whoosh)
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
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(90, t + 0.09);

      gain.gain.setValueAtTime(0.045, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.09);
    } catch {
      // Audio autoplay policy
    }
  }
}

const sfx = new MotionAudio();

// ==========================================
// 2. CLAUDE-MOTION SIGNATURE SPARK COMPONENT
// ==========================================
const RAYS = [1, 0.74, 0.93, 0.68, 0.98, 0.8, 0.9, 0.7, 1, 0.78, 0.88, 0.72];

const ClaudeSpark: React.FC<{
  size: number;
  rotate?: number;
  color?: string;
  weight?: number;
  k?: number;
}> = ({ size, rotate = 0, color = '#1769D2', weight = 7, k = 1 }) => (
  <svg
    width={size}
    height={size}
    viewBox="-50 -50 100 100"
    style={{ overflow: 'visible', display: 'block' }}
    aria-hidden="true"
  >
    <g transform={`rotate(${rotate})`}>
      {RAYS.map((len, i) => {
        const a = (i / RAYS.length) * 360;
        return (
          <line
            key={i}
            x1={0}
            y1={-5}
            x2={0}
            y2={-5 - 38 * len * k}
            transform={`rotate(${a})`}
            stroke={color}
            strokeWidth={weight}
            strokeLinecap="round"
          />
        );
      })}
    </g>
  </svg>
);

// ==========================================
// 3. CLAUDE-MOTION MASKED TEXT COMPONENT
// ==========================================
const MaskedWord: React.FC<{
  children: React.ReactNode;
  delay?: number;
  tilt?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, tilt = 5, style }) => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span
      style={{
        display: 'inline-block',
        overflow: 'hidden',
        verticalAlign: 'bottom',
        padding: '0.06em 0.08em 0.18em',
        margin: '-0.06em -0.08em -0.18em',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          transform: revealed
            ? 'translateY(0%) rotate(0deg)'
            : `translateY(118%) rotate(${tilt}deg)`,
          transformOrigin: '0% 100%',
          transition: 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.85s ease-out',
          opacity: revealed ? 1 : 0,
          ...style,
        }}
      >
        {children}
      </span>
    </span>
  );
};

export const MotionHero: React.FC<MotionHeroProps> = ({
  onShopBestSellers,
  onExploreCategories,
  onSelectProduct
}) => {
  const heroProducts = useMemo(
    () =>
      PRODUCTS_DATA.filter(p =>
        ['bgt-anc-900', 'bgt-ctrl-800', 'bgt-watch-500', 'bgt-toy-101'].includes(p.id)
      ),
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [time, setTime] = useState(0);
  const { addToCart } = useCart();

  // 3D Parallax & Specular Light Coordinates
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // Time-driven loop for continuous background drift (Claude-Motion principle: "nothing is dead-still")
  useEffect(() => {
    let animId: number;
    let start = performance.now();
    const loop = (now: number) => {
      setTime((now - start) / 1000);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Auto advance carousel with timeline hold (6 seconds per beat)
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

  // Mouse Parallax Calculation (Claude-Motion & Apple Polish)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 7.5;
    const rotY = ((x - centerX) / centerX) * 7.5;

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

  // Slider notch labels
  const steps = [
    { label: '01 ANC Audio', sub: 'Flagship' },
    { label: '02 Hall-Effect', sub: 'Gaming' },
    { label: '03 AMOLED GPS', sub: 'Wearable' },
    { label: '04 STEM Robotic', sub: 'Creative' },
  ];

  return (
    <section
      aria-label="Featured showcase"
      className="relative bg-gradient-to-b from-[#F5F5F2] via-white to-[#F8F9FA] pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden border-b border-[#E3E5E7]"
    >
      {/* =========================================================================
          CLAUDE-MOTION SIGNATURE BACKGROUND: DRIFTING SVG DOT GRID WITH RADIAL MASK
          ========================================================================= */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.45]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="claude-hero-dots"
            width="36"
            height="36"
            patternUnits="userSpaceOnUse"
            patternTransform={`translate(${(-time * 5) % 36} ${(-time * 8) % 36})`}
          >
            <circle cx="18" cy="18" r="1.2" fill="#1769D2" opacity="0.35" />
          </pattern>
          <radialGradient id="claude-gridFade" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="70%" stopColor="#fff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="claude-gridMask">
            <rect width="100%" height="100%" fill="url(#claude-gridFade)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#claude-hero-dots)" mask="url(#claude-gridMask)" />
      </svg>

      {/* Ambient Breathing Light Spots */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-[#1769D2]/7 rounded-full blur-[100px] pointer-events-none"
        style={{
          transform: `translate(-50%, -50%) scale(${1 + Math.sin(time * 0.8) * 0.05})`,
          transition: 'transform 0.5s ease-out',
        }}
      />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-[#FFF0A8]/50 rounded-full blur-[80px] pointer-events-none" />

      {/* =========================================================================
          HERO CONTENT CONTAINER
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Editorial Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline Badge with Rotating Claude Spark */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#E3E5E7] text-[#202329] text-xs font-bold shadow-sm backdrop-blur-sm group">
              <div className="shrink-0 transition-transform duration-300 group-hover:scale-110">
                <ClaudeSpark size={18} rotate={time * 35} color="#1769D2" weight={8} />
              </div>
              <span className="font-mono tracking-[0.24em] uppercase text-[11px] font-bold text-[#202329]">
                BLUEGATE TRADING LTD
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1769D2]" />
              <span className="text-[#656A70] font-mono text-[11px] font-medium">COMPANIES HOUSE 16997836</span>
            </div>

            {/* Masked Headline Reveals (Claude-Motion: Instrument Serif, 0.09s Stagger, 5° Tilt) */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#202329] leading-[1.05]">
              <span className="block font-sans font-extrabold text-[#202329]">
                <MaskedWord delay={0.05} tilt={4}>
                  Elevate Your
                </MaskedWord>
              </span>
              <span className="block font-['Instrument_Serif',serif] italic font-normal text-[#1769D2] tracking-normal mt-1">
                <MaskedWord delay={0.14} tilt={6} style={{ color: '#1769D2' }}>
                  Everyday Living.
                </MaskedWord>
              </span>
            </h1>

            {/* Supporting Copy with Mono Precision Tag */}
            <p className="text-base sm:text-lg text-[#656A70] max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Curated acoustic audio, Hall-Effect precision controllers, STEM robotics, and home essentials. Tested to British safety standards with tracked Royal Mail UK dispatch.
            </p>

            {/* =========================================================================
                CLAUDE-MOTION EFFORT / NOTCH PROGRESS SLIDER (Direct from EffortSlider.tsx)
                ========================================================================= */}
            <div className="pt-2 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center justify-between font-mono text-xs mb-2">
                <span className="tracking-[0.22em] text-[#656A70] uppercase font-bold text-[11px]">
                  CURATED LINEUP
                </span>
                <span className="text-[#1769D2] font-semibold text-[11px]">
                  FEATURED <span className="font-bold underline">{steps[activeIndex].sub}</span>
                </span>
              </div>

              {/* Slider Track with Glowing Progression */}
              <div className="relative h-2 bg-[#E3E5E7] rounded-full overflow-visible mb-3">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#1769D2]/70 to-[#1769D2] rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    width: `${((activeIndex + 1) / steps.length) * 100}%`,
                    boxShadow: '0 0 12px rgba(23, 105, 210, 0.45)',
                  }}
                />

                {/* Step Knots */}
                {steps.map((s, idx) => (
                  <button
                    key={s.label}
                    onClick={() => handleStep(idx)}
                    aria-label={`Jump to ${s.label}`}
                    style={{ left: `${(idx / (steps.length - 1)) * 100}%` }}
                    className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-all duration-300 focus-ring ${
                      idx <= activeIndex
                        ? 'bg-[#1769D2] border-white shadow-md scale-110'
                        : 'bg-white border-[#CBD5E1] hover:border-[#1769D2]'
                    }`}
                  />
                ))}
              </div>

              {/* Step Labels */}
              <div className="grid grid-cols-4 gap-1 text-center font-mono text-[10px]">
                {steps.map((s, idx) => (
                  <button
                    key={s.label}
                    onClick={() => handleStep(idx)}
                    className={`py-1 rounded transition-colors text-left ${
                      idx === activeIndex
                        ? 'text-[#1769D2] font-bold'
                        : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

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
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-slate-200/80 max-w-lg mx-auto lg:mx-0 text-left font-sans">
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

          {/* =========================================================================
              RIGHT MOTION PRODUCT STAGE (5 cols) WITH 3D PARALLAX & SPECULAR SHEEN
              ========================================================================= */}
          <div className="lg:col-span-5 relative perspective-[1200px]">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.018 : 1})`,
                transition: isHovered
                  ? 'transform 0.08s ease-out'
                  : 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-apple-lg border border-[#E3E5E7] overflow-hidden will-change-transform cursor-pointer group"
            >
              {/* Dynamic Specular Sheen Following Mouse (Claude-Motion Light Principle) */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-20"
                style={{
                  background: isHovered
                    ? `radial-gradient(circle 350px at ${lightPos.x}% ${lightPos.y}%, rgba(23, 105, 210, 0.12), transparent 70%)`
                    : 'none',
                }}
              />

              {/* Decorative Corner Claude Spark */}
              <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-80 transition-opacity z-10 pointer-events-none">
                <ClaudeSpark size={24} rotate={time * 60} color="#1769D2" weight={6} />
              </div>

              {/* Product Badge & Department */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#1769D2] text-white shadow-sm">
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
                className="relative aspect-square w-full rounded-2xl bg-slate-100/80 overflow-hidden flex items-center justify-center mb-5 border border-slate-200/70 group/stage"
              >
                <img
                  key={activeProduct.id}
                  src={activeProduct.images[0]}
                  alt={activeProduct.title}
                  width={1080}
                  height={1080}
                  className="w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/stage:scale-105"
                  loading="eager"
                />

                {/* Quick Overview Pill on Hover */}
                <div className="absolute bottom-3 left-3 right-3 py-2 px-3.5 rounded-xl bg-white/95 backdrop-blur-md text-xs font-semibold text-slate-700 flex items-center justify-between border border-white/80 shadow-md opacity-90 group-hover/stage:opacity-100 transition-opacity z-10">
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
                    <span className="text-lg font-extrabold text-[#1769D2] tabular-nums font-mono">
                      £{activeProduct.price.toFixed(2)}
                    </span>
                    {activeProduct.compareAtPrice && (
                      <p className="text-xs text-slate-400 line-through tabular-nums font-mono">
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
                    className="flex-1 py-2.5 px-4 bg-[#202329] hover:bg-[#1769D2] text-white text-xs font-bold rounded-xl transition-all shadow-sm focus-ring active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <span>Add to Bag</span>
                    <span className="font-mono">• £{activeProduct.price.toFixed(2)}</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sfx.playPop();
                      onSelectProduct(activeProduct);
                    }}
                    className="py-2.5 px-3.5 bg-[#ECEDE8] hover:bg-slate-200 text-[#202329] text-xs font-semibold rounded-xl transition-colors active:scale-95 flex items-center gap-1"
                  >
                    <span>Details</span>
                    <ArrowUpRight size={13} />
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
