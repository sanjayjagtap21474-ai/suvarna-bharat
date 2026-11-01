import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import LiveRateTicker from './components/LiveRateTicker';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import CategoryShowcase from './components/CategoryShowcase';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import WishlistModal from './components/WishlistModal';
import CheckoutModal from './components/CheckoutModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import OrderTrackerModal from './components/OrderTrackerModal';
import ReferralModal from './components/ReferralModal';
import Footer from './components/Footer';
import ShopPage from './pages/ShopPage';
import AdminDashboard from './pages/AdminDashboard';
import { Sparkles, ArrowRight, Star, ShieldCheck, Heart, Award, Gem } from 'lucide-react';

function AppContent() {
  const { 
    currentView, 
    setCurrentView, 
    products, 
    setFilterMetal, 
    toast 
  } = useStore();

  const featuredProducts = products.filter(p => p.featured || p.bestseller).slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col bg-ivory-50 text-rosewood-900 font-sans">
      
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold flex items-center gap-2 border transition-all duration-300 animate-bounce [animation-duration:1s] ${
          toast.type === 'error'
            ? 'bg-rose-50 text-rose-800 border-rose-300'
            : toast.type === 'info'
            ? 'bg-amber-50 text-amber-900 border-amber-300'
            : 'bg-white text-rosewood-900 border-rosegold-400 shadow-rosegold-500/20'
        }`}>
          <Sparkles className="w-4 h-4 text-rosegold-600 shrink-0" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Bullion & Hallmark Ticker */}
      <LiveRateTicker />

      {/* Main Luxury Navigation */}
      <Header />

      {/* Dynamic View Router */}
      <main className="flex-grow">
        {currentView === 'admin' ? (
          <AdminDashboard />
        ) : currentView === 'shop' ? (
          <ShopPage />
        ) : (
          /* HOME VIEW */
          <div>
            {/* Hero Section */}
            <HeroBanner />

            {/* 4 Pillars Category Showcase */}
            <CategoryShowcase />

            {/* Featured & Bestselling Jewellery Grid */}
            <section className="py-16 bg-white border-y border-ivory-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.25em] text-rosegold-600 font-bold">
                      Imperial Selection
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-rosewood-900 mt-1 font-normal">
                      Bestselling Fine Jewellery
                    </h2>
                    <p className="text-xs sm:text-sm text-rosewood-600 mt-2 font-light">
                      Handpicked masterworks cherished by brides and jewellery collectors across India.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setFilterMetal('All');
                      setCurrentView('shop');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-rosegold-700 hover:text-rosewood-900 transition-colors group"
                  >
                    <span>View All Collections</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </div>

                {/* 4x2 Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featuredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

              </div>
            </section>

            {/* Royal Bridal Showcase Banner */}
            <section className="py-20 bg-gradient-to-r from-rosewood-950 via-rosewood-900 to-rosewood-950 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ECC9BF_1px,transparent_1px)] [background-size:16px_16px]"></div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  
                  <div className="lg:col-span-7 space-y-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rosegold-500/20 text-rosegold-300 text-[11px] uppercase font-bold tracking-widest border border-rosegold-400/30">
                      <Sparkles className="w-3.5 h-3.5" />
                      The Suvarna Vivaha Bridal Atelier
                    </span>

                    <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-ivory-50">
                      Crafting Timeless Heirlooms For Your Auspicious Day
                    </h2>

                    <p className="text-xs sm:text-sm text-ivory-300/80 max-w-xl font-light leading-relaxed">
                      From royal Rajasthani Kundan collar chokers to delicate Solitaire engagement rings, discover custom bridal trousseaus accompanied by individual BIS hallmark certificates and laser authentication.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-3">
                      <button
                        onClick={() => {
                          setFilterMetal('Gold');
                          setCurrentView('shop');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rosegold-500 to-rosegold-600 text-white font-medium text-xs uppercase tracking-[0.2em] shadow-xl hover:from-rosegold-600 hover:to-rosegold-700 transition"
                      >
                        Explore Bridal Trousseau
                      </button>
                      
                      <button
                        onClick={() => {
                          setFilterMetal('Fashion / Heritage');
                          setCurrentView('shop');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-8 py-3.5 rounded-full bg-transparent border border-rosegold-300/60 text-ivory-100 font-medium text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition"
                      >
                        Heritage Kundan Sets
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="relative rounded-3xl overflow-hidden border-2 border-rosegold-400/40 shadow-2xl">
                      <img
                        src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80"
                        alt="Suvarna Bridal Collection"
                        className="w-full h-80 sm:h-96 object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-rosewood-950/80 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs">
                        <div className="font-serif text-lg text-ivory-50">Book VIP Video Consultation</div>
                        <p className="text-[11px] text-ivory-200">Connect live with our certified gemologist showroom specialists.</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Testimonials & Trust Carousel */}
            <section className="py-16 bg-ivory-100/50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-xl mx-auto mb-12">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-rosegold-600 font-bold">
                    Patron Stories
                  </span>
                  <h2 className="font-serif text-3xl text-rosewood-900 mt-1 font-normal">
                    Loved by Connoisseurs Across India
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  <div className="bg-white p-6 rounded-3xl border border-ivory-200 shadow-sm space-y-3">
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-rosewood-700 italic leading-relaxed">
                      "Ordered the 22K Royal Rajwada choker for my daughter's wedding in Mumbai. The BIS hallmark was verified immediately at our local jeweler, and the packaging was pure luxury."
                    </p>
                    <div className="pt-2 border-t border-ivory-200">
                      <div className="font-serif font-bold text-sm text-rosewood-900">Dr. Meenakshi Iyer</div>
                      <div className="text-[11px] text-rosewood-500">Bandra, Mumbai</div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-ivory-200 shadow-sm space-y-3">
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-rosewood-700 italic leading-relaxed">
                      "The Empress Rose Gold Solitaire ring arrived in an armored security box within 3 days. The diamond clarity and laser inscription certificate matched the IGI website exactly!"
                    </p>
                    <div className="pt-2 border-t border-ivory-200">
                      <div className="font-serif font-bold text-sm text-rosewood-900">Karanveer Singhania</div>
                      <div className="text-[11px] text-rosewood-500">New Delhi</div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-3xl border border-ivory-200 shadow-sm space-y-3">
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-rosewood-700 italic leading-relaxed">
                      "The 925 sterling silver payal and Saraswati idol are extraordinary. Pure silver weight is exact to the gram and the finish is unmatched in this price range."
                    </p>
                    <div className="pt-2 border-t border-ivory-200">
                      <div className="font-serif font-bold text-sm text-rosewood-900">Pooja Trivedi</div>
                      <div className="text-[11px] text-rosewood-500">Ahmedabad</div>
                    </div>
                  </div>

                </div>

              </div>
            </section>

          </div>
        )}
      </main>

      {/* Global Modals & Drawers */}
      <ProductModal />
      <CartDrawer />
      <WishlistModal />
      <CheckoutModal />
      <OrderSuccessModal />
      <OrderTrackerModal />
      <ReferralModal />

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
