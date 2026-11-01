import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Sparkles, Truck, Search, HelpCircle } from 'lucide-react';

export default function LiveRateTicker() {
  const { bullionRates, setIsTrackerOpen } = useStore();

  return (
    <div className="bg-rosewood-900 text-ivory-100 text-xs border-b border-rosegold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          
          {/* Live Bullion Ticker */}
          <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto scrollbar-none py-0.5">
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-rosegold-500/30 text-rosegold-200 font-semibold uppercase tracking-wider text-[10px] shrink-0 border border-rosegold-400/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Rates
            </span>

            <div className="flex items-center gap-4 text-[11px] text-ivory-200 shrink-0 font-medium">
              <div>
                <span className="text-rosegold-300">Gold 24K:</span> ₹{bullionRates.gold24k.toLocaleString('en-IN')}/g
              </div>
              <span className="text-rosegold-400/40">|</span>
              <div>
                <span className="text-rosegold-300">Gold 22K (916):</span> ₹{bullionRates.gold22k.toLocaleString('en-IN')}/g
              </div>
              <span className="text-rosegold-400/40">|</span>
              <div>
                <span className="text-rosegold-300">Gold 18K:</span> ₹{bullionRates.gold18k.toLocaleString('en-IN')}/g
              </div>
              <span className="text-rosegold-400/40">|</span>
              <div>
                <span className="text-rosegold-300">Silver 925:</span> ₹{bullionRates.silver925.toLocaleString('en-IN')}/g
              </div>
            </div>
          </div>

          {/* Value propositions & Track Order */}
          <div className="flex items-center gap-5 text-[11px] text-ivory-300 shrink-0">
            <div className="hidden lg:flex items-center gap-1.5 text-rosegold-200">
              <ShieldCheck className="w-3.5 h-3.5 text-rosegold-400" />
              <span>100% BIS Hallmarked & Certified</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-rosegold-400" />
              <span>Complimentary Insured Shipping</span>
            </div>
            <button 
              onClick={() => setIsTrackerOpen(true)}
              className="hover:text-rosegold-300 flex items-center gap-1 transition-colors underline decoration-rosegold-400/50 underline-offset-2"
            >
              <Search className="w-3 h-3" />
              <span>Track Your Order</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
