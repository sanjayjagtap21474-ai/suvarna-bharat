import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles, 
  SlidersHorizontal,
  Compass,
  QrCode,
  User
} from 'lucide-react';

export default function Header() {
  const { 
    currentView, 
    setCurrentView, 
    cart, 
    wishlist, 
    setIsCartOpen, 
    setIsWishlistOpen,
    setIsReferralOpen,
    searchQuery,
    setSearchQuery,
    setFilterMetal,
    setFilterCategory
  } = useStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navigateToCategory = (metal) => {
    setFilterMetal(metal);
    setFilterCategory('All');
    setCurrentView('shop');
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToView = (view) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-ivory-50/95 backdrop-blur-md border-b border-ivory-300/80 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-rosewood-800 hover:text-rosegold-600 hover:bg-rosegold-50 transition"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex flex-col items-center cursor-pointer group" onClick={() => navigateToView('home')}>
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-rosegold-600 via-rosegold-400 to-amber-300 flex items-center justify-center text-ivory-50 shadow-md shadow-rosegold-400/30 group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-4 h-4 fill-ivory-50" />
              </span>
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] font-medium text-rosewood-900 group-hover:text-rosegold-600 transition-colors">
                SUVARNA BHARAT
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.35em] text-rosegold-500 font-semibold -mt-0.5">
              Royal Heritage Jewellers
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs uppercase tracking-[0.18em] font-medium text-rosewood-700">
            <button 
              onClick={() => navigateToView('home')}
              className={`hover:text-rosegold-600 transition-colors py-2 relative ${currentView === 'home' ? 'text-rosegold-600 font-semibold' : ''}`}
            >
              Home
              {currentView === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rosegold-500 rounded-full"></span>
              )}
            </button>

            <button 
              onClick={() => navigateToCategory('All')}
              className={`hover:text-rosegold-600 transition-colors py-2 relative ${currentView === 'shop' ? 'text-rosegold-600 font-semibold' : ''}`}
            >
              All Jewellery
              {currentView === 'shop' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-rosegold-500 rounded-full"></span>
              )}
            </button>

            <button 
              onClick={() => navigateToCategory('Gold')}
              className="hover:text-rosegold-600 transition-colors py-2 flex items-center gap-1 group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 opacity-80 group-hover:scale-125 transition-transform"></span>
              Gold (22K)
            </button>

            <button 
              onClick={() => navigateToCategory('Diamond')}
              className="hover:text-rosegold-600 transition-colors py-2 flex items-center gap-1 group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-300 opacity-80 group-hover:scale-125 transition-transform"></span>
              Diamond Solitaires
            </button>

            <button 
              onClick={() => navigateToCategory('Silver')}
              className="hover:text-rosegold-600 transition-colors py-2 flex items-center gap-1 group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 opacity-80 group-hover:scale-125 transition-transform"></span>
              925 Silver
            </button>

            <button 
              onClick={() => navigateToCategory('Fashion / Heritage')}
              className="hover:text-rosegold-600 transition-colors py-2 flex items-center gap-1 group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-80 group-hover:scale-125 transition-transform"></span>
              Kundan & Polki
            </button>
          </nav>

          {/* Right Action Icons (Search, Wishlist, Cart, Admin) */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Search Button / Input */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search rings, necklaces, 22K..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentView !== 'shop') setCurrentView('shop');
                }}
                className="w-48 lg:w-56 pl-9 pr-3 py-1.5 text-xs bg-ivory-100 border border-ivory-300/80 rounded-full focus:outline-none focus:border-rosegold-400 focus:w-64 transition-all duration-300 text-rosewood-900 placeholder-rosewood-400"
              />
              <Search className="w-3.5 h-3.5 text-rosewood-400 absolute left-3 top-2.5 pointer-events-none" />
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 rounded-full text-rosewood-700 hover:text-rosegold-600 hover:bg-rosegold-50 transition"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rosegold-500 text-ivory-50 text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full text-rosewood-700 hover:text-rosegold-600 hover:bg-rosegold-50 transition"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rosegold-600 text-ivory-50 text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm animate-pulse">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Profile Icon Button (Visible on all screens) */}
            <button
              onClick={() => setIsReferralOpen(true)}
              className="relative p-2.5 rounded-full text-rosewood-700 hover:text-rosegold-600 hover:bg-rosegold-50 transition border border-rosegold-300/60 bg-rosegold-50/50"
              title="Customer Profile & Refer Hub"
            >
              <User className="w-5 h-5 text-rosegold-700" />
            </button>

            {/* Profile & Refer Button */}
            <button
              onClick={() => setIsReferralOpen(true)}
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rosegold-50 hover:bg-rosegold-100 text-rosegold-700 border border-rosegold-300 text-xs font-semibold uppercase tracking-wider transition shadow-sm"
              title="Customer Profile & Refer Hub"
            >
              <User className="w-3.5 h-3.5 text-rosegold-600" />
              <span>My Profile & Refer</span>
            </button>

            {/* Admin Portal Toggle */}
            <button
              onClick={() => navigateToView(currentView === 'admin' ? 'home' : 'admin')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 border flex items-center gap-1.5 ${
                currentView === 'admin'
                  ? 'bg-rosewood-900 text-ivory-100 border-rosewood-900 shadow-md'
                  : 'bg-ivory-100 text-rosewood-800 border-rosegold-300 hover:bg-rosegold-500 hover:text-white hover:border-rosegold-500'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{currentView === 'admin' ? 'Store Front' : 'Admin Panel'}</span>
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-ivory-100 border-b border-ivory-300 px-4 pt-3 pb-6 space-y-3">
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Search jewellery..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentView !== 'shop') setCurrentView('shop');
              }}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-ivory-300 rounded-lg text-rosewood-900"
            />
            <Search className="w-4 h-4 text-rosewood-400 absolute left-3 top-2.5" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-medium uppercase tracking-wider text-rosewood-800">
            <button
              onClick={() => navigateToView('home')}
              className="p-2.5 text-left rounded-lg bg-ivory-50 hover:bg-rosegold-50"
            >
              Home
            </button>
            <button
              onClick={() => navigateToCategory('All')}
              className="p-2.5 text-left rounded-lg bg-ivory-50 hover:bg-rosegold-50"
            >
              Shop All
            </button>
            <button
              onClick={() => navigateToCategory('Gold')}
              className="p-2.5 text-left rounded-lg bg-ivory-50 hover:bg-rosegold-50 text-amber-700"
            >
              Gold (22K Hallmark)
            </button>
            <button
              onClick={() => navigateToCategory('Diamond')}
              className="p-2.5 text-left rounded-lg bg-ivory-50 hover:bg-rosegold-50 text-blue-700"
            >
              Diamond Solitaires
            </button>
            <button
              onClick={() => navigateToCategory('Silver')}
              className="p-2.5 text-left rounded-lg bg-ivory-50 hover:bg-rosegold-50 text-slate-700"
            >
              925 Sterling Silver
            </button>
            <button
              onClick={() => navigateToCategory('Fashion / Heritage')}
              className="p-2.5 text-left rounded-lg bg-ivory-50 hover:bg-rosegold-50 text-emerald-800"
            >
              Kundan & Polki
            </button>
            <button
              onClick={() => {
                setIsReferralOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="col-span-2 p-3 text-center rounded-lg bg-gradient-to-r from-rosegold-600 to-rosegold-500 text-white font-semibold flex items-center justify-center gap-2 shadow"
            >
              <QrCode className="w-4 h-4" />
              <span>Refer & Earn (Get QR & Link)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
