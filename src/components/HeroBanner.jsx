import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, ShieldCheck, Gem, RefreshCw, ArrowRight, Award } from 'lucide-react';

export default function HeroBanner() {
  const { setCurrentView, setFilterMetal } = useStore();

  const handleExplore = (metal = 'All') => {
    setFilterMetal(metal);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-ivory-100 via-ivory-50 to-ivory-200/50 border-b border-ivory-300/60 pt-6 pb-16 lg:py-20">
      
      {/* Decorative Rose Gold ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-rosegold-200/20 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-100/30 rounded-full blur-2xl pointer-events-none -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rosegold-100/80 border border-rosegold-300/60 text-rosegold-800 text-xs font-semibold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-rosegold-600 animate-sparkle" />
              <span>Diwali & Royal Wedding Collection 2026</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-rosewood-900 leading-[1.15] font-normal tracking-tight">
              Elegance In Every Carat, <br />
              <span className="italic font-serif text-rosegold-600">Pure Indian Royalty</span> In Every Design.
            </h1>

            <p className="text-rosewood-700/80 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Step into the magnificent world of <strong>Suvarna Bharat</strong>. Certified 22K Hallmarked gold, rare VVS solitaires, handcrafted Jaipur Kundan, and pure 925 sterling silver crafted for timeless memories.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <button
                onClick={() => handleExplore('All')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-rosegold-600 to-rosegold-500 text-white font-medium text-xs uppercase tracking-[0.2em] shadow-lg shadow-rosegold-500/25 hover:from-rosegold-700 hover:to-rosegold-600 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handleExplore('Gold')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-ivory-50 text-rosewood-900 border border-rosegold-300 font-medium text-xs uppercase tracking-[0.2em] hover:bg-rosegold-50 hover:border-rosegold-400 transition-all duration-300"
              >
                22K Gold Collection
              </button>
            </div>

            {/* Customer Assurance Stats */}
            <div className="pt-6 border-t border-ivory-300/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div>
                <div className="font-serif text-2xl sm:text-3xl text-rosewood-900 font-medium">100%</div>
                <div className="text-[11px] text-rosewood-600 uppercase tracking-wider">BIS Hallmarked</div>
              </div>
              <div className="border-l border-ivory-300 pl-4">
                <div className="font-serif text-2xl sm:text-3xl text-rosewood-900 font-medium">50,000+</div>
                <div className="text-[11px] text-rosewood-600 uppercase tracking-wider">Happy Families</div>
              </div>
              <div className="border-l border-ivory-300 pl-4">
                <div className="font-serif text-2xl sm:text-3xl text-rosewood-900 font-medium">Zero</div>
                <div className="text-[11px] text-rosewood-600 uppercase tracking-wider">Transit Risk (Insured)</div>
              </div>
            </div>

          </div>

          {/* Right Hero Image Card Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Luxury Frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-rosewood-900/10 border-4 border-ivory-100 bg-white group">
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85"
                  alt="Suvarna Bharat Royal Choker"
                  className="w-full h-[450px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-rosewood-950/80 via-transparent to-black/10"></div>

                {/* Overlay Floating Card */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-ivory-200 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-rosegold-600 bg-rosegold-50 px-2 py-0.5 rounded">
                        Flagship Heritage
                      </span>
                      <h4 className="font-serif text-base text-rosewood-900 font-medium mt-1">
                        The Royal Rajwada 22K Choker
                      </h4>
                      <p className="text-xs text-rosewood-600">28.5g • 916 BIS Hallmark • Natural Rubies</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-rosewood-500 line-through">₹2,48,000</div>
                      <div className="font-serif text-lg font-bold text-rosewood-900">₹2,36,400</div>
                    </div>
                  </div>
                </div>

                {/* Verified Hallmark Badge */}
                <div className="absolute top-4 left-4 bg-rosewood-900/90 backdrop-blur-sm text-ivory-100 px-3 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1.5 border border-rosegold-400/40">
                  <ShieldCheck className="w-4 h-4 text-amber-300" />
                  <span>BIS HUID Verified</span>
                </div>
              </div>

              {/* Floating Diamond Accent badge */}
              <div className="absolute -top-4 -right-4 bg-ivory-50 p-3 rounded-2xl shadow-xl border border-rosegold-200 hidden sm:flex items-center gap-2.5 animate-bounce [animation-duration:4s]">
                <div className="w-10 h-10 rounded-full bg-rosegold-500 text-white flex items-center justify-center">
                  <Gem className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-rosewood-900">IGI / GIA</div>
                  <div className="text-[10px] text-rosewood-600">Certified Solitaires</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Trust Badges Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 pt-8 border-t border-ivory-300/80">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          
          <div className="flex flex-col items-center space-y-2 p-3 rounded-xl bg-ivory-100/60 border border-ivory-200">
            <Award className="w-6 h-6 text-rosegold-600" />
            <h5 className="font-medium text-xs uppercase tracking-wider text-rosewood-900">BIS 916 Hallmarked</h5>
            <p className="text-[11px] text-rosewood-600">Every single gold piece tested & stamped</p>
          </div>

          <div className="flex flex-col items-center space-y-2 p-3 rounded-xl bg-ivory-100/60 border border-ivory-200">
            <Gem className="w-6 h-6 text-rosegold-600" />
            <h5 className="font-medium text-xs uppercase tracking-wider text-rosewood-900">100% Natural Diamonds</h5>
            <p className="text-[11px] text-rosewood-600">Certified with individual authenticity reports</p>
          </div>

          <div className="flex flex-col items-center space-y-2 p-3 rounded-xl bg-ivory-100/60 border border-ivory-200">
            <ShieldCheck className="w-6 h-6 text-rosegold-600" />
            <h5 className="font-medium text-xs uppercase tracking-wider text-rosewood-900">100% Insured Delivery</h5>
            <p className="text-[11px] text-rosewood-600">Dispatched via secure armored couriers</p>
          </div>

          <div className="flex flex-col items-center space-y-2 p-3 rounded-xl bg-ivory-100/60 border border-ivory-200">
            <RefreshCw className="w-6 h-6 text-rosegold-600" />
            <h5 className="font-medium text-xs uppercase tracking-wider text-rosewood-900">Lifetime Exchange</h5>
            <p className="text-[11px] text-rosewood-600">Guaranteed buyback & upgrade policy</p>
          </div>

        </div>
      </div>

    </div>
  );
}
