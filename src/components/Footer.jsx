import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Award, 
  Gem, 
  CreditCard,
  QrCode,
  User
} from 'lucide-react';

export default function Footer() {
  const { setCurrentView, setFilterMetal, setIsReferralOpen, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    showToast('Subscribed! Use coupon code "WELCOME1000" on your first purchase.');
    setNewsletterEmail('');
  };

  const navigateTo = (metal) => {
    setFilterMetal(metal);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-rosewood-950 text-ivory-100 pt-16 pb-8 border-t-2 border-rosegold-500/30">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & VIP Concierge Bar */}
        <div className="p-8 rounded-3xl bg-rosewood-900/90 border border-rosegold-500/20 mb-14 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-rosegold-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Join The Suvarna Bharat Club
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-ivory-50 font-normal">
                Receive ₹1,000 Off Your First Heritage Purchase
              </h3>
              <p className="text-xs text-ivory-300 font-light">
                Subscribe for private showcase invitations, festive bullion forecast alerts, and bridal consultation concierge.
              </p>
            </div>

            <div className="lg:col-span-5">
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your VIP email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-4 py-3 text-xs bg-rosewood-950/80 border border-rosegold-500/30 rounded-2xl text-ivory-100 placeholder-ivory-400/60 focus:outline-none focus:border-rosegold-400"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rosegold-600 to-rosegold-500 hover:from-rosegold-700 hover:to-rosegold-600 text-white text-xs font-semibold uppercase tracking-wider shadow-md transition flex items-center gap-1.5"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* 4 Column Main Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-rosewood-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-rosegold-600 to-amber-300 flex items-center justify-center text-ivory-50">
                <Sparkles className="w-4 h-4 fill-ivory-50" />
              </span>
              <span className="font-serif text-2xl tracking-[0.2em] font-normal text-ivory-50">
                SUVARNA BHARAT
              </span>
            </div>

            <p className="text-xs text-ivory-300/80 leading-relaxed font-light">
              Crafting India's finest 22K Hallmarked gold, rare diamond solitaires, pure 925 sterling silver, and majestic Jaipur Kundan jewellery. Certified trust passed down through generations.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-rosegold-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Govt. Reg. BIS Hallmark License No: HM/C-781920</span>
            </div>
          </div>

          {/* Quick Shop Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-sm uppercase tracking-widest text-rosegold-400 font-semibold">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-ivory-300">
              <li>
                <button onClick={() => navigateTo('Gold')} className="hover:text-rosegold-300 transition">
                  22K Gold Jewellery
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('Diamond')} className="hover:text-rosegold-300 transition">
                  Certified Diamonds
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('Silver')} className="hover:text-rosegold-300 transition">
                  925 Sterling Silver
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('Fashion / Heritage')} className="hover:text-rosegold-300 transition">
                  Kundan & Polki Sets
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('Gold')} className="hover:text-rosegold-300 transition">
                  24K Gold Coins & Bullion
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Policies */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm uppercase tracking-widest text-rosegold-400 font-semibold">
              Assurances & Care
            </h4>
            <ul className="space-y-2 text-xs text-ivory-300">
              <li className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-rosegold-400" />
                <span>100% BIS 916 Hallmarking</span>
              </li>
              <li className="flex items-center gap-2">
                <Gem className="w-3.5 h-3.5 text-rosegold-400" />
                <span>IGI & SGL Diamond Grading</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-rosegold-400" />
                <span>100% Insured Armored Transit</span>
              </li>
              <li>
                <span className="text-ivory-400 hover:text-white cursor-pointer transition">
                  Lifetime Buyback & Exchange Policy
                </span>
              </li>
              <li>
                <button
                  onClick={() => {
                    setIsReferralOpen(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-rosegold-300 hover:text-white cursor-pointer transition flex items-center gap-1.5 font-medium"
                >
                  <User className="w-3.5 h-3.5 text-rosegold-400" />
                  <span>Customer Profile & Refer Hub</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Flagship Showrooms */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm uppercase tracking-widest text-rosegold-400 font-semibold">
              Flagship Showrooms
            </h4>
            <div className="space-y-2.5 text-xs text-ivory-300 font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rosegold-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Mumbai:</strong> Heritage Bhavan, Zaveri Bazaar, Kalbadevi
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rosegold-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Jaipur:</strong> Johari Bazaar, Pink City Heritage Palace
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-rosegold-400 shrink-0 mt-0.5" />
                <div>
                  <strong>VIP Helpline:</strong> 1800-266-GOLD (Toll-Free)
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-rosegold-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Email:</strong> concierge@suvarnabharat.com
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory-400">
          <div>
            © 2026 Suvarna Bharat Jewellers Private Limited. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Hallmark Verification</span>
            <span>•</span>
            <span>GSTIN: 27AABCS1429F1Z4</span>
          </div>
        </div>

      </div>

    </footer>
  );
}
