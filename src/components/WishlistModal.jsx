import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export default function WishlistModal() {
  const { 
    isWishlistOpen, 
    setIsWishlistOpen, 
    wishlist, 
    toggleWishlist, 
    addToCart,
    setSelectedProduct,
    setCurrentView 
  } = useStore();

  if (!isWishlistOpen) return null;

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    toggleWishlist(product);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-rosewood-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-rosegold-200">
        
        {/* Header */}
        <div className="p-5 border-b border-ivory-200 flex items-center justify-between bg-ivory-50">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rosegold-600 fill-rosegold-600" />
            <h2 className="font-serif text-2xl font-normal text-rosewood-900">
              Your Saved Pieces ({wishlist.length})
            </h2>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-2 rounded-full text-rosewood-600 hover:text-rosegold-600 hover:bg-rosegold-50 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {wishlist.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-ivory-200 flex items-center justify-center text-rosewood-400 mx-auto">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-lg text-rosewood-900 font-medium">Your Wishlist is empty</h4>
              <p className="text-xs text-rosewood-600 max-w-sm mx-auto">
                Save your favourite bridal chokers, solitaires, and bangles to easily view or purchase later.
              </p>
              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  setCurrentView('shop');
                }}
                className="px-6 py-2.5 rounded-full bg-rosewood-900 text-ivory-100 text-xs uppercase tracking-wider font-semibold hover:bg-rosegold-600 transition"
              >
                Browse Jewellery
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl border border-ivory-300 hover:border-rosegold-300 bg-ivory-50/50 flex flex-col justify-between transition-all"
                >
                  <div className="flex gap-3">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl bg-ivory-100 shrink-0 cursor-pointer"
                      onClick={() => {
                        setSelectedProduct(item);
                        setIsWishlistOpen(false);
                      }}
                    />
                    <div className="flex-1">
                      <span className="text-[10px] font-semibold text-rosegold-600 uppercase">
                        {item.metalType}
                      </span>
                      <h4 
                        onClick={() => {
                          setSelectedProduct(item);
                          setIsWishlistOpen(false);
                        }}
                        className="font-serif text-sm font-medium text-rosewood-900 line-clamp-1 cursor-pointer hover:text-rosegold-600"
                      >
                        {item.name}
                      </h4>
                      <div className="font-serif font-bold text-sm text-rosewood-900 mt-1">
                        ₹{item.price.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-rosewood-500">
                        {item.purity}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-ivory-200">
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="flex-1 py-2 px-3 rounded-xl bg-rosegold-600 hover:bg-rosegold-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move To Bag</span>
                    </button>
                    <button
                      onClick={() => toggleWishlist(item)}
                      className="p-2 rounded-xl text-rosewood-400 hover:text-rose-600 hover:bg-white transition"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
