import React, { useState } from 'react';
import { Heart, Plus, Check, Truck, ShieldCheck } from 'lucide-react';
import { Product } from '../../types/product';
import { StarRating } from '../ui/StarRating';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { ProductStudioImage } from './ProductStudioImage';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  layout?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  layout = 'grid'
}) => {
  const { addToCart, items } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Variant & image state
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  // Check if item is already in cart
  const inCart = items.some(i => i.productId === product.id);
  const isFavorited = isInWishlist(product.id);

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null;

  // Extract color options if available
  const colorVariant = product.variants?.find(v => v.id === 'color');
  const colorOptions = colorVariant?.options || [];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const selectedVariants: Record<string, string> = {};
    if (colorVariant && colorOptions[selectedColorIndex]) {
      selectedVariants[colorVariant.id] = colorOptions[selectedColorIndex].label;
    }
    addToCart(product, 1, selectedVariants);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  // Image to display (can cycle if variant has multiple images)
  const currentImage = product.images[selectedColorIndex] || product.images[0];

  // List Layout (Catalogue view)
  if (layout === 'list') {
    return (
      <div
        onClick={() => onSelect(product)}
        className="group relative bg-white rounded-2xl p-4 sm:p-5 border border-[#E3E5E7] hover:border-[#1769D2]/40 shadow-apple-sm hover:shadow-apple-hover transition-all duration-300 flex flex-col sm:flex-row gap-5 cursor-pointer"
      >
        {/* Left 1080x1080 Studio Image Frame */}
        <div className="w-full sm:w-56 shrink-0">
          <ProductStudioImage
            src={currentImage}
            alt={product.title}
            badge={product.badge}
            discountPercent={discountPercent}
            onQuickView={() => onSelect(product)}
          />
        </div>

        {/* Right Info Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-600 uppercase tracking-wider text-[11px] font-mono">
                {product.brand} • {product.subcategory}
              </span>
              <span className="font-mono text-[11px] text-slate-400">SKU: {product.sku}</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-[#202329] group-hover:text-[#1769D2] transition-colors leading-snug">
              {product.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed">
              {product.shortDescription}
            </p>

            <div className="flex items-center gap-3 pt-1">
              <StarRating rating={product.rating} reviewCount={product.reviewCount} />
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <Truck size={13} className="text-[#1769D2]" />
                {product.price >= 40 ? 'FREE UK Tracked Delivery' : 'Royal Mail 48 Tracked'}
              </span>
            </div>

            {/* Color Swatches if available */}
            {colorOptions.length > 0 && (
              <div className="flex items-center gap-2 pt-2">
                <span className="text-xs font-semibold text-slate-500">Finish:</span>
                <div className="flex items-center gap-1.5">
                  {colorOptions.map((opt, idx) => (
                    <button
                      key={opt.value}
                      onClick={e => {
                        e.stopPropagation();
                        setSelectedColorIndex(idx);
                      }}
                      title={opt.label}
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border transition-all ${
                        selectedColorIndex === idx
                          ? 'border-[#1769D2] bg-[#EBF3FC] text-[#1769D2]'
                          : 'border-slate-200 text-slate-600 hover:border-slate-400 bg-white'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pricing & Add to Bag Row */}
          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-extrabold text-[#1769D2] font-mono">
                  £{product.price.toFixed(2)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-xs text-slate-400 line-through font-mono">
                    £{product.compareAtPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-[11px] font-medium text-emerald-600 flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                In stock ({product.stockCount} units available)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={e => {
                  e.stopPropagation();
                  toggleWishlist(product);
                }}
                aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
                className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-200 transition-colors"
              >
                <Heart size={18} className={isFavorited ? 'fill-rose-500 text-rose-500' : ''} />
              </button>

              <button
                onClick={handleAddToCart}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  justAdded
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : inCart
                    ? 'bg-[#EBF3FC] text-[#1769D2] border border-[#1769D2]/30 hover:bg-[#1769D2] hover:text-white'
                    : 'bg-[#202329] text-white hover:bg-[#1769D2] shadow-sm'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check size={16} />
                    <span>Added to Bag</span>
                  </>
                ) : inCart ? (
                  <>
                    <Check size={16} />
                    <span>In Bag • Add More</span>
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard Grid Card (Strict 1080x1080 Frame)
  return (
    <div className="group relative bg-white rounded-2xl p-4 sm:p-5 border border-[#E3E5E7] hover:border-[#1769D2]/40 shadow-apple-sm hover:shadow-apple-hover transition-all duration-300 flex flex-col h-full">
      {/* Top Wishlist & Brand Bar */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono truncate">
          {product.brand}
        </span>

        <button
          onClick={e => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          className="p-1.5 rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors shrink-0"
        >
          <Heart
            size={18}
            className={isFavorited ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}
          />
        </button>
      </div>

      {/* Centralized 1080x1080 Studio Image Frame */}
      <div className="mb-4">
        <ProductStudioImage
          src={currentImage}
          alt={product.title}
          badge={product.badge}
          discountPercent={discountPercent}
          onQuickView={() => onSelect(product)}
        />
      </div>

      {/* Product Content Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-1.5 mb-3">
          {/* Subcategory & SKU */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="truncate">{product.subcategory}</span>
            <span className="font-mono text-[11px] text-slate-400">{product.sku}</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelect(product)}
            className="text-sm font-bold text-[#202329] hover:text-[#1769D2] transition-colors cursor-pointer line-clamp-2 leading-snug min-h-[2.5rem]"
          >
            {product.title}
          </h3>

          {/* Star Rating */}
          <div className="pt-1">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />
          </div>

          {/* Optional Color Variant Swatches */}
          {colorOptions.length > 0 && (
            <div className="pt-2 flex items-center gap-1.5">
              {colorOptions.slice(0, 3).map((opt, idx) => (
                <button
                  key={opt.value}
                  onClick={e => {
                    e.stopPropagation();
                    setSelectedColorIndex(idx);
                  }}
                  title={opt.label}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all ${
                    selectedColorIndex === idx
                      ? 'border-[#1769D2] bg-[#EBF3FC] text-[#1769D2]'
                      : 'border-slate-200 text-slate-500 hover:border-slate-400 bg-slate-50'
                  }`}
                >
                  {opt.label.split(' ')[0]}
                </button>
              ))}
              {colorOptions.length > 3 && (
                <span className="text-[10px] text-slate-400 font-medium">
                  +{colorOptions.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Pricing, Stock & Quick Add */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-extrabold text-[#1769D2] font-mono">
                £{product.price.toFixed(2)}
              </span>
              {product.compareAtPrice && (
                <span className="text-xs text-slate-400 line-through font-mono">
                  £{product.compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>
            <p className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              In stock ({product.stockCount} left)
            </p>
          </div>

          {/* Quick Add Button */}
          <button
            onClick={handleAddToCart}
            aria-label={`Add ${product.title} to bag for £${product.price.toFixed(2)}`}
            className={`p-2.5 rounded-xl font-bold transition-all flex items-center justify-center shrink-0 ${
              justAdded
                ? 'bg-emerald-600 text-white shadow-sm scale-105'
                : inCart
                ? 'bg-[#EBF3FC] text-[#1769D2] border border-[#1769D2]/30 hover:bg-[#1769D2] hover:text-white'
                : 'bg-[#202329] text-white hover:bg-[#1769D2] shadow-sm'
            }`}
          >
            {justAdded ? <Check size={18} /> : inCart ? <Check size={18} /> : <Plus size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};
