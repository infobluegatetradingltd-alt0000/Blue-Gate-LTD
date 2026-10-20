import React from 'react';
import { Heart, Plus, Check, Eye } from 'lucide-react';
import { Product } from '../../types/product';
import { StarRating } from '../ui/StarRating';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { addToCart, items } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Check if item is already in cart
  const inCart = items.some(i => i.productId === product.id);
  const isFavorited = isInWishlist(product.id);

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : null;

  return (
    <div className="group relative bg-white rounded-2xl p-4 sm:p-5 border border-[#E3E5E7] hover:border-[#1769D2]/40 shadow-apple-sm hover:shadow-apple-hover transition-all duration-300 flex flex-col h-full">
      {/* Top Tag Badges & Wishlist */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          {product.badge && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#1769D2] text-white">
              {product.badge}
            </span>
          )}
          {discountPercent && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#FFF0A8] text-[#202329] border border-[#F5D64E]">
              Save {discountPercent}%
            </span>
          )}
        </div>

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

      {/* Product Image Stage */}
      <div
        onClick={() => onSelect(product)}
        className="relative aspect-square w-full rounded-xl bg-[#F8F9FA] overflow-hidden cursor-pointer mb-4 p-4 flex items-center justify-center border border-slate-100 group/image"
      >
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover/image:scale-105"
          loading="lazy"
        />

        {/* Hover Quick View Pill */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/95 backdrop-blur-md text-xs font-bold text-slate-800 shadow-md border border-slate-200/80">
          <Eye size={14} className="text-[#1769D2]" />
          <span>Quick Overview</span>
        </div>
      </div>

      {/* Product Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-1.5 mb-3">
          {/* Subcategory & Brand */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="truncate">{product.brand}</span>
            <span className="font-mono text-[11px] text-slate-400">{product.sku}</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelect(product)}
            className="text-sm font-bold text-[#202329] hover:text-[#1769D2] transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {product.title}
          </h3>

          {/* Rating */}
          <div className="pt-1">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-extrabold text-[#1769D2]">
                £{product.price.toFixed(2)}
              </span>
              {product.compareAtPrice && (
                <span className="text-xs text-slate-400 line-through">
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
            onClick={e => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            aria-label={`Add ${product.title} to bag for £${product.price.toFixed(2)}`}
            className={`p-2.5 rounded-xl font-bold transition-all flex items-center justify-center shrink-0 ${
              inCart
                ? 'bg-[#EBF3FC] text-[#1769D2] border border-[#1769D2]/30 hover:bg-[#1769D2] hover:text-white'
                : 'bg-[#202329] text-white hover:bg-[#1769D2] shadow-sm'
            }`}
          >
            {inCart ? <Check size={18} /> : <Plus size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};
