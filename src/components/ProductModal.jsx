import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  Sparkles, 
  Truck, 
  CheckCircle2, 
  RotateCcw, 
  Award, 
  HelpCircle,
  MapPin,
  ChevronRight
} from 'lucide-react';

export default function ProductModal() {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    addToCart, 
    toggleWishlist, 
    isProductInWishlist,
    bullionRates,
    setIsCheckoutOpen,
    showToast 
  } = useStore();

  if (!selectedProduct) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedRingSize, setSelectedRingSize] = useState(
    selectedProduct.ringSizes ? selectedProduct.ringSizes[0] : null
  );
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState(null);
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(true);

  const isLiked = isProductInWishlist(selectedProduct.id);

  // Price breakdown calculations
  let goldRate = bullionRates.gold22k;
  if (selectedProduct.karat === 24) goldRate = bullionRates.gold24k;
  if (selectedProduct.karat === 18) goldRate = bullionRates.gold18k;
  if (selectedProduct.karat === 14) goldRate = bullionRates.gold14k;

  const goldComponentVal = selectedProduct.netWeightGrams 
    ? Math.round(selectedProduct.netWeightGrams * goldRate) 
    : 0;

  const stoneVal = selectedProduct.gemstoneCost || 0;
  const makingChargeVal = selectedProduct.makingChargePercent 
    ? Math.round((goldComponentVal * selectedProduct.makingChargePercent) / 100) 
    : 0;
  const gstVal = Math.round(selectedProduct.price * 0.03);

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6) {
      showToast('Please enter a valid 6-digit Indian Pincode', 'error');
      return;
    }
    setDeliveryStatus({
      available: true,
      message: `Delivery available by ${new Date(Date.now() + 4 * 24 * 3600 * 1000).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })} via BlueDart Insured Express.`
    });
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, 1, { selectedRingSize });
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-rosewood-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-rosegold-200/80 my-8">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 text-rosewood-800 hover:text-rosegold-600 hover:bg-rosegold-50 border border-ivory-200 shadow-md transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
          
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 bg-ivory-100 p-6 flex flex-col justify-between">
            <div>
              {/* Main Preview Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-sm border border-ivory-200">
                <img
                  src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover object-center"
                />
                
                {/* BIS Hallmark Badge */}
                <div className="absolute top-3 left-3 bg-rosewood-900/90 text-ivory-100 text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-rosegold-400/40">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                  <span>{selectedProduct.certification || 'BIS Hallmark 916'}</span>
                </div>
              </div>

              {/* Thumbnail Selector */}
              {selectedProduct.images.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
                  {selectedProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        activeImageIndex === idx ? 'border-rosegold-500 scale-105 shadow-md' : 'border-ivory-300 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Trust Assurances */}
            <div className="mt-6 pt-6 border-t border-ivory-300/80 grid grid-cols-3 gap-2 text-center text-rosewood-700">
              <div className="flex flex-col items-center">
                <Award className="w-5 h-5 text-rosegold-600 mb-1" />
                <span className="text-[10px] font-bold uppercase">100% Certified</span>
              </div>
              <div className="flex flex-col items-center border-l border-ivory-300">
                <Truck className="w-5 h-5 text-rosegold-600 mb-1" />
                <span className="text-[10px] font-bold uppercase">Insured Transit</span>
              </div>
              <div className="flex flex-col items-center border-l border-ivory-300">
                <RotateCcw className="w-5 h-5 text-rosegold-600 mb-1" />
                <span className="text-[10px] font-bold uppercase">Lifetime Buyback</span>
              </div>
            </div>

          </div>

          {/* Right Column: Specs, Breakdown & Buy */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              {/* Category & SKU */}
              <div className="flex items-center justify-between text-xs text-rosewood-500">
                <span className="uppercase tracking-widest text-[11px] font-bold text-rosegold-600">
                  {selectedProduct.metalType} • {selectedProduct.category}
                </span>
                <span>SKU: {selectedProduct.sku}</span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl sm:text-3xl text-rosewood-900 font-normal leading-tight">
                {selectedProduct.name}
              </h2>

              {/* Price Row */}
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl font-bold text-rosewood-900">
                  ₹{selectedProduct.price.toLocaleString('en-IN')}
                </span>
                {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                  <span className="text-base text-rosewood-400 line-through">
                    ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-200">
                  In Stock & Ready to Ship
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-rosewood-700 leading-relaxed font-light">
                {selectedProduct.description}
              </p>

              {/* Metal & Purity Details */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-ivory-100 border border-ivory-200 text-xs">
                <div>
                  <span className="text-rosewood-500 block text-[11px]">Purity Standard:</span>
                  <strong className="text-rosewood-900 font-semibold">{selectedProduct.purity}</strong>
                </div>
                <div>
                  <span className="text-rosewood-500 block text-[11px]">Net Metal Weight:</span>
                  <strong className="text-rosewood-900 font-semibold">{selectedProduct.netWeightGrams} Grams</strong>
                </div>
                {selectedProduct.diamondWeightCarats && (
                  <div>
                    <span className="text-rosewood-500 block text-[11px]">Diamond Weight:</span>
                    <strong className="text-rosewood-900 font-semibold">{selectedProduct.diamondWeightCarats} Carats ({selectedProduct.diamondClarity})</strong>
                  </div>
                )}
                <div>
                  <span className="text-rosewood-500 block text-[11px]">HSN Code:</span>
                  <strong className="text-rosewood-900 font-semibold">{selectedProduct.hsnCode}</strong>
                </div>
              </div>

              {/* Ring Size Selector if applicable */}
              {selectedProduct.ringSizes && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-rosewood-900">Select Ring Size (Indian Standard):</span>
                    <span className="text-rosegold-600 underline cursor-pointer text-[11px]">Size Guide</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.ringSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedRingSize(size)}
                        className={`w-10 h-10 rounded-xl text-xs font-semibold flex items-center justify-center transition-all ${
                          selectedRingSize === size
                            ? 'bg-rosewood-900 text-white shadow-md'
                            : 'bg-ivory-100 text-rosewood-800 border border-ivory-300 hover:border-rosegold-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Transparent Price Breakdown Accordion */}
              <div className="border border-ivory-300 rounded-2xl overflow-hidden bg-white">
                <button
                  onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
                  className="w-full px-4 py-2.5 bg-ivory-100 text-left text-xs font-semibold uppercase tracking-wider text-rosewood-800 flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-rosegold-600" />
                    Transparent Price Breakdown
                  </span>
                  <span className="text-rosegold-600 text-xs">{showPriceBreakdown ? 'Hide' : 'View'}</span>
                </button>

                {showPriceBreakdown && (
                  <div className="p-4 space-y-2 text-xs text-rosewood-700 bg-white">
                    {selectedProduct.netWeightGrams > 0 && (
                      <div className="flex justify-between">
                        <span>Gold Component ({selectedProduct.netWeightGrams}g @ ₹{goldRate}/g)</span>
                        <span className="font-medium">₹{goldComponentVal.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    {stoneVal > 0 && (
                      <div className="flex justify-between">
                        <span>Gemstones & Certified Solitaire value</span>
                        <span className="font-medium">₹{stoneVal.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    {selectedProduct.makingChargePercent && (
                      <div className="flex justify-between text-rosewood-600">
                        <span>Making Charges ({selectedProduct.makingChargePercent}%)</span>
                        <span className="font-medium">₹{makingChargeVal.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-rosewood-600">
                      <span>GST (3% on precious jewellery)</span>
                      <span className="font-medium">₹{gstVal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-ivory-300 font-semibold text-rosewood-900">
                      <span>Total Price</span>
                      <span className="text-sm font-bold text-rosegold-700">₹{selectedProduct.price.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Pincode Delivery Check */}
              <form onSubmit={handlePincodeCheck} className="space-y-1.5 pt-1">
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="Enter 6-digit Pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                      className="w-full pl-8 pr-3 py-2 text-xs bg-ivory-100 border border-ivory-300 rounded-xl text-rosewood-900"
                    />
                    <MapPin className="w-3.5 h-3.5 text-rosewood-400 absolute left-2.5 top-2.5" />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-rosewood-900 text-white rounded-xl text-xs font-semibold hover:bg-rosewood-800 transition"
                  >
                    Check
                  </button>
                </div>
                {deliveryStatus && (
                  <p className="text-[11px] text-emerald-700 flex items-center gap-1 font-medium mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{deliveryStatus.message}</span>
                  </p>
                )}
              </form>

            </div>

            {/* Action Buttons: Add to Bag & Buy Now */}
            <div className="pt-4 border-t border-ivory-300 space-y-2.5">
              <div className="flex gap-3">
                <button
                  onClick={() => addToCart(selectedProduct, 1, { selectedRingSize })}
                  className="flex-1 py-3.5 rounded-2xl bg-ivory-100 hover:bg-rosegold-500 hover:text-white text-rosewood-900 border border-rosegold-300 hover:border-rosegold-500 text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <ShoppingBag className="w-4 h-4 text-rosegold-600 group-hover:text-white" />
                  <span>Add To Bag</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-rosegold-600 to-rosegold-500 hover:from-rosegold-700 hover:to-rosegold-600 text-white text-xs font-semibold uppercase tracking-wider shadow-lg shadow-rosegold-500/25 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Buy Now</span>
                </button>

                <button
                  onClick={() => toggleWishlist(selectedProduct)}
                  className={`p-3.5 rounded-2xl border transition ${
                    isLiked
                      ? 'bg-rose-50 border-rose-300 text-rose-600'
                      : 'bg-ivory-100 border-ivory-300 text-rosewood-700 hover:text-rosegold-600'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-rose-600' : ''}`} />
                </button>
              </div>

              <div className="text-center text-[11px] text-rosewood-500">
                🔒 Protected by 100% Transit Insurance & Tamper-Proof Packaging
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
