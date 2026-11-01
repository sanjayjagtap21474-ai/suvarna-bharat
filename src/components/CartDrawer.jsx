import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  Sparkles,
  Check
} from 'lucide-react';

export default function CartDrawer() {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    cartSubtotal, 
    cartDiscount, 
    cartGst, 
    cartGrandTotal, 
    appliedCoupon, 
    applyCouponCode, 
    removeCoupon,
    setIsCheckoutOpen,
    coupons
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const success = applyCouponCode(inputCoupon);
    if (success) setInputCoupon('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-rosewood-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        
        <div className="w-screen max-w-md bg-ivory-50 shadow-2xl flex flex-col justify-between border-l border-rosegold-200">
          
          {/* Header */}
          <div className="p-5 border-b border-ivory-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-rosegold-600" />
              <h2 className="font-serif text-xl font-normal text-rosewood-900">
                Your Luxury Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full text-rosewood-600 hover:text-rosegold-600 hover:bg-rosegold-50 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Insured Shipping Banner */}
          <div className="bg-rosegold-100/70 px-5 py-2.5 border-b border-rosegold-200 text-xs text-rosewood-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-rosegold-600 shrink-0" />
            <span>Complimentary 100% Insured Delivery across India.</span>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-ivory-200 flex items-center justify-center text-rosewood-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-rosewood-900 font-medium">Your bag is empty</h4>
                  <p className="text-xs text-rosewood-600 mt-1 max-w-xs">
                    Explore our exquisite collection of 22K gold, certified diamonds, and 925 silver.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-rosewood-900 text-ivory-100 text-xs uppercase tracking-wider font-semibold hover:bg-rosegold-600 transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <div 
                  key={`${item.id}-${index}`} 
                  className="p-3.5 rounded-2xl bg-white border border-ivory-200/90 shadow-sm flex gap-3.5 relative group"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl bg-ivory-100 shrink-0 border border-ivory-200"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif text-sm text-rosewood-900 font-medium line-clamp-1">
                        {item.name}
                      </h4>
                      <div className="text-[11px] text-rosewood-500 mt-0.5 space-x-2">
                        <span>{item.purity}</span>
                        {item.selectedRingSize && (
                          <span>• Size: {item.selectedRingSize}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-serif font-bold text-sm text-rosewood-900">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>

                      {/* Quantity Controller */}
                      <div className="flex items-center border border-ivory-300 rounded-lg bg-ivory-50">
                        <button
                          onClick={() => updateCartQuantity(index, -1)}
                          className="p-1 hover:text-rosegold-600 transition"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-rosewood-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(index, 1)}
                          className="p-1 hover:text-rosegold-600 transition"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-rosewood-300 hover:text-rose-600 transition p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer: Coupon Code & Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-ivory-300 bg-white space-y-4">
              
              {/* Promo Code Box */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Coupon: {appliedCoupon.code}</span>
                      <span className="text-[11px] font-normal text-emerald-600">
                        (-₹{cartDiscount.toLocaleString('en-IN')})
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-rose-600 hover:underline font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Promo Code (e.g. SUVARNA10)"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                        className="flex-1 px-3 py-2 text-xs bg-ivory-100 border border-ivory-300 rounded-xl uppercase tracking-wider text-rosewood-900"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-rosegold-600 hover:bg-rosegold-700 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition"
                      >
                        Apply
                      </button>
                    </form>

                    {/* Quick Suggestions */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {coupons.slice(0, 2).map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => applyCouponCode(c.code)}
                          className="text-[10px] bg-ivory-100 hover:bg-rosegold-100 text-rosegold-700 px-2 py-0.5 rounded-md border border-ivory-200"
                        >
                          Use {c.code}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-rosewood-600 pt-2 border-t border-ivory-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-rosewood-900">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Coupon Discount</span>
                    <span className="font-semibold">-₹{cartDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Jewellery GST (3%)</span>
                  <span>₹{cartGst.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Insured Express Shipping</span>
                  <span className="text-emerald-700 font-medium">FREE</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-ivory-300 text-base font-bold text-rosewood-900">
                  <span className="font-serif">Grand Total</span>
                  <span className="font-serif text-lg text-rosegold-600">
                    ₹{cartGrandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Proceed Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rosegold-600 to-rosegold-500 hover:from-rosegold-700 hover:to-rosegold-600 text-white font-semibold text-xs uppercase tracking-[0.18em] shadow-lg shadow-rosegold-500/25 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Proceed To Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
