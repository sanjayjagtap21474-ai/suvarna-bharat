import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle, Sparkles, Printer, ArrowRight, ShieldCheck, Truck, Package } from 'lucide-react';

export default function OrderSuccessModal() {
  const { 
    lastPlacedOrder, 
    setLastPlacedOrder, 
    setIsTrackerOpen, 
    setTrackerOrderId,
    setCurrentView 
  } = useStore();

  if (!lastPlacedOrder) return null;

  const handleTrack = () => {
    setTrackerOrderId(lastPlacedOrder.orderId);
    setLastPlacedOrder(null);
    setIsTrackerOpen(true);
  };

  const handleContinueShopping = () => {
    setLastPlacedOrder(null);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-rosewood-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-rosegold-300 my-8">
        
        {/* Celebration Header */}
        <div className="p-8 text-center bg-gradient-to-b from-rosegold-100/90 to-ivory-50 border-b border-rosegold-200 relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rosegold-600 to-amber-400 text-white flex items-center justify-center mx-auto shadow-xl shadow-rosegold-500/30 mb-4 animate-bounce [animation-duration:3s]">
            <Sparkles className="w-8 h-8" />
          </div>

          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-rosegold-600">
            Auspicious Congratulations
          </span>
          <h2 className="font-serif text-3xl text-rosewood-900 mt-1 font-normal">
            Your Order Has Been Placed!
          </h2>
          <p className="text-xs text-rosewood-600 mt-2 max-w-md mx-auto">
            Thank you for trusting <strong>Suvarna Bharat Jewellers</strong>. Your heirloom piece is being prepped for hallmark verification and insured transit.
          </p>

          <div className="mt-4 inline-block px-4 py-1.5 rounded-full bg-white/90 border border-rosegold-300 text-xs font-mono font-bold text-rosewood-900 shadow-sm">
            Order Reference: {lastPlacedOrder.orderId}
          </div>
        </div>

        {/* Order Details Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          <div className="p-4 rounded-2xl bg-ivory-100 border border-ivory-200 text-xs space-y-2">
            <div className="flex justify-between text-rosewood-600">
              <span>Customer:</span>
              <strong className="text-rosewood-900">{lastPlacedOrder.customer.name}</strong>
            </div>
            <div className="flex justify-between text-rosewood-600">
              <span>Delivery To:</span>
              <span className="text-rosewood-900 text-right max-w-xs">{lastPlacedOrder.customer.address}</span>
            </div>
            <div className="flex justify-between text-rosewood-600">
              <span>Payment Mode:</span>
              <strong className="text-emerald-700">{lastPlacedOrder.paymentMethod} ({lastPlacedOrder.paymentStatus})</strong>
            </div>
            <div className="flex justify-between text-rosewood-600">
              <span>Tracking Code:</span>
              <span className="font-mono font-semibold text-rosewood-900">{lastPlacedOrder.trackingNumber}</span>
            </div>
            {lastPlacedOrder.referralCode && (
              <div className="flex justify-between text-rosewood-600">
                <span>Referral Applied:</span>
                <span className="font-mono font-bold text-rosegold-700 bg-rosegold-50 px-2 py-0.5 rounded border border-rosegold-200">
                  {lastPlacedOrder.referralCode} (Verified)
                </span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-ivory-300 font-serif text-base font-bold text-rosewood-900">
              <span>Total Paid:</span>
              <span className="text-rosegold-700">₹{lastPlacedOrder.total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3">
            <button
              onClick={handleTrack}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rosegold-600 to-rosegold-500 hover:from-rosegold-700 hover:to-rosegold-600 text-white text-xs font-semibold uppercase tracking-wider shadow-lg shadow-rosegold-500/25 transition flex items-center justify-center gap-2"
            >
              <Truck className="w-4 h-4" />
              <span>Track Delivery Status</span>
            </button>

            <button
              onClick={handleContinueShopping}
              className="w-full py-3 rounded-2xl bg-ivory-100 hover:bg-rosegold-50 text-rosewood-800 border border-ivory-300 text-xs font-semibold uppercase tracking-wider transition"
            >
              Continue Shopping
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-[11px] text-rosewood-500 text-center">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Digital invoice & BIS Hallmark assay report sent to your email.</span>
          </div>

        </div>

      </div>

    </div>
  );
}
