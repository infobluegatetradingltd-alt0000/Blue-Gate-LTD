import React, { useState } from 'react';
import { Eye, Sparkles } from 'lucide-react';

interface ProductStudioImageProps {
  src: string;
  alt: string;
  badge?: string;
  discountPercent?: number | null;
  onQuickView?: () => void;
  aspectRatio?: 'square' | 'wide';
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}

/**
 * ProductStudioImage
 * Centralized design token component enforcing strict 1080x1080 1:1 studio presentation.
 * Features:
 * - Unified neutral studio background token (#F6F6F4 with subtle ambient vignette)
 * - Anti-aliased retina rendering with lazy-loading skeleton
 * - Normalized object-cover positioning with hover zoom micro-interaction
 * - Floating status badges (Best Seller, Limited UK Offer, Discount)
 * - Quick-view button overlay
 */
export const ProductStudioImage: React.FC<ProductStudioImageProps> = ({
  src,
  alt,
  badge,
  discountPercent,
  onQuickView,
  aspectRatio = 'square',
  className = '',
  imageClassName = '',
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Normalize image URL to strict 1080x1080 square if Unsplash URL
  const normalizedSrc = React.useMemo(() => {
    if (src.includes('images.unsplash.com') && !src.includes('w=1080')) {
      return src.replace(/w=\d+(&h=\d+)?/, 'w=1080&h=1080&fit=crop&crop=center');
    }
    return src;
  }, [src]);

  return (
    <div
      onClick={onQuickView}
      className={`relative w-full overflow-hidden rounded-2xl bg-[#F6F6F4] border border-[#E8E8E4] cursor-pointer group/studio transition-all duration-300 ${
        aspectRatio === 'square' ? 'aspect-square' : 'aspect-4/3'
      } ${className}`}
    >
      {/* Subtle Studio Ambient Lighting Vignette */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-black/5 z-0"
        aria-hidden="true"
      />

      {/* Loading Skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-200/70 to-slate-100 animate-pulse z-10" />
      )}

      {/* Main Studio Product Image */}
      <img
        src={hasError ? '/images/bluegate-logo.png' : normalizedSrc}
        alt={alt}
        width={1080}
        height={1080}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        className={`w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/studio:scale-105 relative z-0 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${imageClassName}`}
      />

      {/* Top Left Badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-20 pointer-events-none">
        {badge && (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#1769D2] text-white shadow-sm backdrop-blur-sm">
            <Sparkles size={11} className="shrink-0" />
            <span>{badge}</span>
          </span>
        )}
        {discountPercent && discountPercent > 0 && (
          <span className="inline-block text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-[#FFF0A8] text-[#202329] border border-[#F5D64E] shadow-sm">
            Save {discountPercent}%
          </span>
        )}
      </div>

      {/* Quick View Pill on Desktop Hover */}
      {onQuickView && (
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover/studio:opacity-100 transition-all duration-300 translate-y-2 group-hover/studio:translate-y-0 hidden sm:flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/95 backdrop-blur-md text-xs font-bold text-slate-800 shadow-lg border border-slate-200/80 z-20">
          <Eye size={14} className="text-[#1769D2]" />
          <span>Quick Overview</span>
        </div>
      )}
    </div>
  );
};
