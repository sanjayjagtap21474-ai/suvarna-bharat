import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Truck, 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  User, 
  Phone, 
  Mail,
  Gift,
  Tag
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal() {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartSubtotal, 
    cartDiscount, 
    cartGst, 
    cartGrandTotal, 
    placeOrder,
    appliedReferral,
    setAppliedReferral,
    showToast
  } = useStore();

  const [formData, setFormData] = useState({
    fullName: 'Ananya Deshmukh',
    phone: '9820123456',
    email: 'ananya.deshmukh@example.com',
    address: 'Flat 702, Magnolia Towers, JVLR, Powai',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400076',
    notes: 'Please call before delivery for security gate pass.'
  });

  const [paymentMethod, setPaymentMethod] = useState('razorpay'); // 'razorpay' | 'cod' | 'netbanking'
  const [isProcessing, setIsProcessing] = useState(false);

  // Optional Referral Code State
  const [referralInput, setReferralInput] = useState('');
  const [showReferralInput, setShowReferralInput] = useState(false);
  const referralDiscountAmount = appliedReferral ? 500 : 0; // Extra ₹500 privilege discount if referral code used

  if (!isCheckoutOpen) return null;

  const handleApplyReferral = () => {
    const trimmed = referralInput.trim().toUpperCase();
    if (!trimmed) {
      showToast('Please enter a referral code or leave empty', 'info');
      return;
    }
    if (trimmed.length < 3) {
      showToast('Referral code should be at least 3 characters', 'error');
      return;
    }

    setAppliedReferral(trimmed);
    showToast(`Referral Code "${trimmed}" applied! Extra ₹500 discount unlocked 🎉`);
  };

  const handleRemoveReferral = () => {
    setAppliedReferral(null);
    setReferralInput('');
    showToast('Referral code removed', 'info');
  };

  const finalPayable = Math.max(0, cartGrandTotal - referralDiscountAmount);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.address || !formData.pincode) {
      showToast('Please fill all mandatory delivery details', 'error');
      return;
    }

    setIsProcessing(true);

    // Simulate payment gateway interaction
    setTimeout(() => {
      setIsProcessing(false);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C56F5A', '#E0AA9B', '#D4AF37', '#FAF5EF']
        });
      } catch (err) {
        // ignore if not supported
      }

      placeOrder({
        customer: {
          name: formData.fullName,
          phone: `+91 ${formData.phone}`,
          email: formData.email,
          address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`
        },
        paymentMethod: paymentMethod === 'razorpay' 
          ? 'Razorpay UPI / Cards (Prepaid)' 
          : (paymentMethod === 'cod' ? 'Cash on Delivery (Verified)' : 'Direct Net Banking'),
        referralCode: appliedReferral || null,
        referralDiscount: referralDiscountAmount
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-rosewood-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-rosegold-200 my-6">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-ivory-200 bg-ivory-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-rosegold-500 text-white flex items-center justify-center shadow-md">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-normal text-rosewood-900">
                Secure Luxury Checkout
              </h2>
              <p className="text-xs text-rosewood-600">
                Encrypted 256-bit SSL • 100% Insured Delivery via BlueDart
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-full text-rosewood-600 hover:text-rosegold-600 hover:bg-rosegold-50 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 md:grid-cols-12 max-h-[75vh] overflow-y-auto">
            
            {/* Left Column: Delivery & Payment Details */}
            <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
              
              {/* Shipping Address */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-rosewood-900 font-serif text-lg font-medium">
                  <MapPin className="w-4 h-4 text-rosegold-600" />
                  <span>1. Insured Delivery Address</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-rosewood-700 uppercase mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full pl-8 pr-3 py-2 text-xs bg-ivory-100 border border-ivory-300 rounded-xl text-rosewood-900"
                        placeholder="e.g. Radhika Sharma"
                      />
                      <User className="w-3.5 h-3.5 text-rosewood-400 absolute left-2.5 top-2.5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-rosewood-700 uppercase mb-1">
                      Mobile Number (for OTP & Tracking) *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        required
                        maxLength={10}
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-8 pr-3 py-2 text-xs bg-ivory-100 border border-ivory-300 rounded-xl text-rosewood-900"
                        placeholder="10-digit number"
                      />
                      <Phone className="w-3.5 h-3.5 text-rosewood-400 absolute left-2.5 top-2.5" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-rosewood-700 uppercase mb-1">
                    Email Address (for Digital Hallmark Certificate) *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-8 pr-3 py-2 text-xs bg-ivory-100 border border-ivory-300 rounded-xl text-rosewood-900"
                      placeholder="your.email@example.com"
                    />
                    <Mail className="w-3.5 h-3.5 text-rosewood-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-rosewood-700 uppercase mb-1">
                    Street Address / Villa / Apartment *
                  </label>
                  <textarea
                    name="address"
                    required
                    rows={2}
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-2.5 text-xs bg-ivory-100 border border-ivory-300 rounded-xl text-rosewood-900"
                    placeholder="House/Flat number, Building name, Street"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-rosewood-700 uppercase mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-xs bg-ivory-100 border border-ivory-300 rounded-xl text-rosewood-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-rosewood-700 uppercase mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-xs bg-ivory-100 border border-ivory-300 rounded-xl text-rosewood-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-rosewood-700 uppercase mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      maxLength={6}
                      required
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-xs bg-ivory-100 border border-ivory-300 rounded-xl text-rosewood-900"
                    />
                  </div>
                </div>

              </div>

              {/* Payment Method Selection */}
              <div className="space-y-3 pt-4 border-t border-ivory-200">
                <div className="flex items-center gap-2 text-rosewood-900 font-serif text-lg font-medium">
                  <CreditCard className="w-4 h-4 text-rosegold-600" />
                  <span>2. Payment Method</span>
                </div>

                <div className="space-y-2">
                  {/* Razorpay UPI / Cards */}
                  <label 
                    onClick={() => setPaymentMethod('razorpay')}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition ${
                      paymentMethod === 'razorpay'
                        ? 'border-rosegold-500 bg-rosegold-50/50 shadow-sm'
                        : 'border-ivory-300 hover:border-rosegold-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        paymentMethod === 'razorpay' ? 'border-rosegold-600 bg-rosegold-600' : 'border-rosewood-400'
                      }`}>
                        {paymentMethod === 'razorpay' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-rosewood-900 flex items-center gap-1.5">
                          <span>Razorpay Secure (UPI, GPay, Credit/Debit Cards, EMI)</span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">Recommended</span>
                        </div>
                        <p className="text-[11px] text-rosewood-600">Instant verification & priority dispatch</p>
                      </div>
                    </div>
                    <Smartphone className="w-5 h-5 text-rosegold-600" />
                  </label>

                  {/* Cash on Delivery */}
                  <label 
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition ${
                      paymentMethod === 'cod'
                        ? 'border-rosegold-500 bg-rosegold-50/50 shadow-sm'
                        : 'border-ivory-300 hover:border-rosegold-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        paymentMethod === 'cod' ? 'border-rosegold-600 bg-rosegold-600' : 'border-rosewood-400'
                      }`}>
                        {paymentMethod === 'cod' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-rosewood-900">
                          Cash On Delivery (Insured Armored Transit)
                        </div>
                        <p className="text-[11px] text-rosewood-600">Pay cash or scan QR at door upon delivery</p>
                      </div>
                    </div>
                    <Truck className="w-5 h-5 text-rosewood-500" />
                  </label>
                </div>
              </div>

            </div>

            {/* Right Column: Order Summary */}
            <div className="md:col-span-5 bg-ivory-100/70 p-6 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-ivory-200">
              
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-medium text-rosewood-900 border-b border-ivory-300 pb-2">
                  Order Summary ({cart.length} Items)
                </h3>

                {/* Items preview */}
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex gap-3 text-xs">
                      <img src={item.images[0]} alt="" className="w-12 h-12 object-cover rounded-lg bg-white shrink-0 border border-ivory-200" />
                      <div className="flex-1">
                        <h5 className="font-medium text-rosewood-900 line-clamp-1">{item.name}</h5>
                        <p className="text-[11px] text-rosewood-500">Qty: {item.quantity} • {item.purity}</p>
                        <div className="font-semibold text-rosewood-900 mt-0.5">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Optional Referral Code Box */}
                <div className="p-3 rounded-2xl bg-white border border-ivory-300/80 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-rosewood-800">
                      <Gift className="w-3.5 h-3.5 text-rosegold-600" />
                      <span className="font-medium">Have a Referral Code?</span>
                      <span className="text-[10px] text-rosewood-500 bg-ivory-100 px-1.5 py-0.5 rounded font-medium border border-ivory-200">
                        Optional
                      </span>
                    </div>
                    {!appliedReferral && (
                      <button
                        type="button"
                        onClick={() => setShowReferralInput(!showReferralInput)}
                        className="text-[11px] text-rosegold-600 hover:text-rosegold-700 font-semibold"
                      >
                        {showReferralInput ? 'Close' : '+ Enter Code'}
                      </button>
                    )}
                  </div>

                  {showReferralInput && !appliedReferral && (
                    <div className="mt-2.5 flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. PRIYA10, SU-REF24"
                        value={referralInput}
                        onChange={(e) => setReferralInput(e.target.value.toUpperCase())}
                        className="flex-1 px-3 py-1.5 text-xs bg-ivory-50 border border-ivory-300 rounded-xl text-rosewood-900 uppercase font-mono tracking-wider focus:outline-none focus:border-rosegold-400"
                      />
                      <button
                        type="button"
                        onClick={handleApplyReferral}
                        className="px-3.5 py-1.5 bg-rosewood-900 hover:bg-rosegold-600 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition"
                      >
                        Apply
                      </button>
                    </div>
                  )}

                  {appliedReferral && (
                    <div className="mt-2 flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2 rounded-xl text-xs text-emerald-800">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <div>
                          <span>Referral: <strong className="font-mono">{appliedReferral}</strong></span>
                          <div className="text-[10px] text-emerald-600">Extra ₹500 Referral Privilege applied</div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveReferral}
                        className="text-[11px] text-rose-600 hover:underline font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Detailed calculation */}
                <div className="space-y-2 pt-4 border-t border-ivory-300 text-xs text-rosewood-700">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-rosewood-900">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {cartDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Discount Voucher</span>
                      <span className="font-semibold">-₹{cartDiscount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {referralDiscountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Referral Privilege Benefit</span>
                      <span className="font-semibold">-₹{referralDiscountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>GST (3% Indian Precious Metals)</span>
                    <span>₹{cartGst.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Insured BlueDart Delivery</span>
                    <span className="text-emerald-700 font-semibold">FREE (Covered by Suvarna Bharat)</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-ivory-300 text-base font-bold text-rosewood-900">
                    <span className="font-serif">Total Payable</span>
                    <span className="font-serif text-xl text-rosegold-700">₹{finalPayable.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Assurance box */}
                <div className="p-3 bg-white rounded-xl border border-ivory-200 text-[11px] text-rosewood-700 space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-emerald-800">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Included in every dispatch:</span>
                  </div>
                  <p>• Government BIS 916 Hallmark Assay Certification</p>
                  <p>• Tamper-evident velvet presentation box</p>
                  <p>• GST Tax Invoice with individual HSN codes</p>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-rosegold-600 to-rosegold-500 hover:from-rosegold-700 hover:to-rosegold-600 text-white font-semibold text-xs uppercase tracking-[0.2em] shadow-xl shadow-rosegold-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Securing Your Transaction...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Place Order (₹{finalPayable.toLocaleString('en-IN')})
                    </span>
                  )}
                </button>
              </div>

            </div>

          </div>
        </form>

      </div>

    </div>
  );
}
