import React from 'react';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types/product';
import { PRODUCTS_DATA } from '../../data/products';
import { ProductStudioImage } from '../product/ProductStudioImage';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onExploreProducts: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onExploreProducts
}) => {
  const { wishlistIds, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const wishlistProducts = wishlistIds
    .map(id => PRODUCTS_DATA.find(p => p.id === id))
    .filter((p): p is Product => Boolean(p));

  const handleMoveToBag = (product: Product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  const handleAddAllToBag = () => {
    wishlistProducts.forEach(product => {
      addToCart(product, 1);
    });
    clearWishlist();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end animate-fade-in" role="dialog" aria-modal="true" aria-label="Saved Wishlist">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white shadow-2xl flex flex-col z-10 animate-slide-up h-full">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-[#F8F9FA]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center">
              <Heart size={18} className="fill-rose-500" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#202329]">Saved Wishlist</h3>
              <p className="text-xs text-slate-500">{wishlistProducts.length} items saved</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {wishlistProducts.length > 0 && (
              <button
                onClick={clearWishlist}
                className="text-xs font-semibold text-slate-400 hover:text-rose-600 transition-colors px-2 py-1"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close wishlist drawer"
              className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-200/60 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-20 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                <Heart size={28} />
              </div>
              <h4 className="text-base font-bold text-slate-800">Your wishlist is empty</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Tap the heart on any product to save it for later or compare specifications.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExploreProducts();
                }}
                className="mt-2 px-5 py-2.5 bg-[#1769D2] hover:bg-[#1256B0] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
              >
                Discover Catalogue
              </button>
            </div>
          ) : (
            wishlistProducts.map(product => (
              <div
                key={product.id}
                className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#F8F9FA] border border-slate-200/80 group hover:border-[#1769D2]/30 transition-all"
              >
                {/* 1080x1080 Thumbnail Frame */}
                <div
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="w-20 h-20 rounded-xl overflow-hidden shrink-0 cursor-pointer border border-slate-200"
                >
                  <ProductStudioImage
                    src={product.images[0]}
                    alt={product.title}
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                      {product.brand}
                    </span>
                    <h5
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="text-xs sm:text-sm font-bold text-[#202329] truncate hover:text-[#1769D2] cursor-pointer"
                    >
                      {product.title}
                    </h5>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-sm font-bold text-[#1769D2] font-mono">
                        £{product.price.toFixed(2)}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-xs text-slate-400 line-through font-mono">
                          £{product.compareAtPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 mt-1 border-t border-slate-200/60">
                    <button
                      onClick={() => handleMoveToBag(product)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1769D2] hover:underline"
                    >
                      <ShoppingBag size={13} />
                      <span>Move to Bag</span>
                    </button>

                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      aria-label="Remove item"
                      className="p-1 text-slate-400 hover:text-rose-500 rounded transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistProducts.length > 0 && (
          <div className="p-5 border-t border-slate-100 bg-[#F8F9FA] space-y-3">
            <button
              onClick={handleAddAllToBag}
              className="w-full py-3 bg-[#1769D2] hover:bg-[#1256B0] text-white text-xs font-bold rounded-xl transition-all shadow-apple-md hover:shadow-apple-hover flex items-center justify-center gap-2"
            >
              <span>Move All to Bag ({wishlistProducts.length} Items)</span>
              <ArrowRight size={14} />
            </button>
            <p className="text-[11px] text-center text-slate-400">
              Free Royal Mail tracked UK dispatch automatically applies on orders over £40.00
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
