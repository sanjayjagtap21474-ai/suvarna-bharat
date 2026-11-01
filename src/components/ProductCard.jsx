import React from 'react';
import { useStore } from '../context/StoreContext';
import { Heart, ShoppingBag, Eye, Star, ShieldCheck, Sparkles } from 'lucide-react';

export default function ProductCard({ product }) {
  const { 
    setSelectedProduct, 
    addToCart, 
    toggleWishlist, 
    isProductInWishlist 
  } = useStore();

  const isLiked = isProductInWishlist(product.id);
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-ivory-200/90 shadow-sm hover:shadow-luxury-hover hover:border-rosegold-300 transition-all duration-300 flex flex-col h-full">
      
      {/* Product Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-ivory-100 cursor-pointer" onClick={() => setSelectedProduct(product)}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />

        {/* Second Image hover swap if available */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.bestseller && (
            <span className="px-2 py-0.5 rounded-full bg-rosewood-900/90 text-ivory-100 text-[10px] uppercase font-bold tracking-wider backdrop-blur-sm border border-rosegold-500/40">
              Bestseller
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-rosegold-500 text-white text-[10px] uppercase font-bold tracking-wider shadow-sm">
              {discountPercent}% Off
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 shadow-sm ${
            isLiked 
              ? 'bg-rose-50 text-rose-600' 
              : 'bg-white/80 text-rosewood-700 hover:text-rosegold-600 hover:bg-white'
          }`}
          title={isLiked ? "Remove from Wishlist" : "Save to Wishlist"}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="pointer-events-auto w-full py-2.5 px-4 bg-white/95 backdrop-blur-md text-rosewood-900 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md hover:bg-rosewood-900 hover:text-white transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View & Price Details</span>
          </button>
        </div>

        {/* Purity & Weight Tag at Bottom */}
        <div className="absolute bottom-2 left-2 z-10 group-hover:opacity-0 transition-opacity duration-200">
          <span className="bg-white/90 backdrop-blur-sm text-rosewood-800 text-[10px] font-medium px-2 py-0.5 rounded-md border border-ivory-300">
            {product.netWeightGrams ? `${product.netWeightGrams}g` : ''} {product.karat ? `${product.karat}K Gold` : product.metalType}
          </span>
        </div>

      </div>

      {/* Product Details info */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between bg-white">
        
        <div>
          {/* Metal type & Rating */}
          <div className="flex items-center justify-between text-[11px] text-rosewood-500 mb-1">
            <span className="uppercase tracking-widest text-[10px] font-semibold text-rosegold-600">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-rosewood-800">{product.rating || '4.9'}</span>
              <span className="text-rosewood-400">({product.reviewsCount || 12})</span>
            </div>
          </div>

          {/* Name */}
          <h3 
            onClick={() => setSelectedProduct(product)}
            className="font-serif text-base text-rosewood-900 font-normal leading-snug line-clamp-2 hover:text-rosegold-600 cursor-pointer transition-colors"
          >
            {product.name}
          </h3>

          {/* Purity Verification Subline */}
          <div className="flex items-center gap-1 text-[11px] text-emerald-800 mt-1 font-medium">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span className="truncate">{product.certification || '100% Certified Genuine'}</span>
          </div>
        </div>

        {/* Price & Add to Cart */}
        <div className="pt-3 mt-3 border-t border-ivory-200">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold text-rosewood-900">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xs text-rosewood-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-rosewood-400 block -mt-0.5">
                (Inclusive of all taxes & making charges)
              </span>
            </div>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="w-full py-2.5 px-3 rounded-xl bg-ivory-100 hover:bg-rosegold-500 hover:text-white text-rosewood-800 border border-ivory-300 hover:border-rosegold-500 text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 group/btn"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-rosegold-600 group-hover/btn:text-white transition-colors" />
            <span>Add To Bag</span>
          </button>
        </div>

      </div>

    </div>
  );
}
