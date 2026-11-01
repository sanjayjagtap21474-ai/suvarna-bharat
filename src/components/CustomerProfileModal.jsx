import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  User,
  Phone,
  Mail,
  MapPin,
  QrCode,
  Copy,
  Check,
  MessageSquareShare,
  ShoppingBag,
  ShieldCheck,
  Sparkles,
  Edit3,
  Save,
  Award,
  Gift
} from 'lucide-react';

export default function CustomerProfileModal() {
  const store = useStore() || {};
  const {
    isProfileOpen = false,
    setIsProfileOpen = () => {},
    customerProfile = {},
    setCustomerProfile = () => {},
    orders = [],
    showToast = () => {}
  } = store;

  const profile = {
    name: customerProfile.name || 'Sanjay Jagtap',
    phone: customerProfile.phone || '+91 98230 45678',
    email: customerProfile.email || 'sanjay.jagtap@example.com',
    address: customerProfile.address || '104, Royal Heritage Residency, MG Road',
    city: customerProfile.city || 'Pune',
    state: customerProfile.state || 'Maharashtra',
    pincode: customerProfile.pincode || '411001',
    referralCode: customerProfile.referralCode || 'SB-SANJAY789'
  };

  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'referral' | 'orders'
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [copied, setCopied] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isProfileOpen) return null;

  const referralUrl = `https://suvarna-bharat.netlify.app/?ref=${profile.referralCode}`;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = {
      ...formData,
      referralCode: (formData.referralCode || 'SB-VIP888').trim().toUpperCase()
    };
    setCustomerProfile(updated);
    localStorage.setItem('sb_account_name', updated.name);
    localStorage.setItem('sb_referral_code', updated.referralCode);
    setIsEditing(false);
    showToast('Customer profile & referral details updated successfully!');
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    showToast('Referral link copied to clipboard!');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(profile.referralCode);
    setCopiedCode(true);
    showToast(`Referral code "${profile.referralCode}" copied!`);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Namaste! Discover exquisite certified 22K gold & diamond heritage jewellery at Suvarna Bharat. Use my referral link to join and unlock exclusive ₹500 privilege benefits: ${referralUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-rosewood-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-rosewood-900 via-rosewood-950 to-rosewood-950 border border-rosegold-500/40 rounded-3xl shadow-2xl text-ivory-50 overflow-hidden flex flex-col max-h-[90vh]">

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-rosewood-800 bg-rosewood-950/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rosegold-600 to-amber-400 flex items-center justify-center shadow-lg shadow-rosegold-500/25">
              <User className="w-5 h-5 text-ivory-50" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl tracking-wider text-rosegold-300 font-medium">
                Customer VIP Profile & Referral Hub
              </h3>
              <p className="text-[11px] text-ivory-300/70 font-light">
                Manage your royal account details, addresses, and earnings
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsProfileOpen(false)}
            className="p-2 rounded-full bg-rosewood-800/60 text-ivory-300 hover:text-white hover:bg-rosewood-700 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-rosewood-800 bg-rosewood-950/60 px-6 gap-6 text-xs uppercase tracking-widest font-medium">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3.5 border-b-2 transition relative flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'border-rosegold-400 text-rosegold-300 font-semibold'
                : 'border-transparent text-ivory-400 hover:text-ivory-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Address</span>
          </button>

          <button
            onClick={() => setActiveTab('referral')}
            className={`py-3.5 border-b-2 transition relative flex items-center gap-2 ${
              activeTab === 'referral'
                ? 'border-rosegold-400 text-rosegold-300 font-semibold'
                : 'border-transparent text-ivory-400 hover:text-ivory-200'
            }`}
          >
            <Gift className="w-4 h-4" />
            <span>Refer & Earn Hub</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3.5 border-b-2 transition relative flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'border-rosegold-400 text-rosegold-300 font-semibold'
                : 'border-transparent text-ivory-400 hover:text-ivory-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>My Orders ({orders.length})</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">

          {/* TAB 1: PROFILE & ADDRESS */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-fadeIn">

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-base text-ivory-50">Personal & Delivery Details</h4>
                  <p className="text-xs text-ivory-300/70">Your registered contact information and shipping address for armored transit.</p>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => {
                      setFormData(profile);
                      setIsEditing(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rosegold-600 hover:bg-rosegold-500 text-white text-xs font-semibold uppercase tracking-wider transition shadow"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSaveProfile} className="bg-rosewood-900/90 border border-rosegold-500/30 p-5 rounded-2xl space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-rosegold-400 font-semibold mb-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 text-xs bg-rosewood-950 border border-rosegold-500/30 rounded-xl text-ivory-100"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-rosegold-400 font-semibold mb-1">Phone Number</label>
                      <input
                        type="text"
                        name="phone"
                        required
                        value={formData.phone || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 text-xs bg-rosewood-950 border border-rosegold-500/30 rounded-xl text-ivory-100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-rosegold-400 font-semibold mb-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 text-xs bg-rosewood-950 border border-rosegold-500/30 rounded-xl text-ivory-100"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-rosegold-400 font-semibold mb-1">Referral Code</label>
                      <input
                        type="text"
                        name="referralCode"
                        required
                        value={formData.referralCode || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 text-xs font-mono bg-rosewood-950 border border-rosegold-500/30 rounded-xl text-ivory-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-rosegold-400 font-semibold mb-1">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 text-xs bg-rosewood-950 border border-rosegold-500/30 rounded-xl text-ivory-100"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-rosegold-400 font-semibold mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 text-xs bg-rosewood-950 border border-rosegold-500/30 rounded-xl text-ivory-100"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-rosegold-400 font-semibold mb-1">State</label>
                      <input
                        type="text"
                        name="state"
                        required
                        value={formData.state || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 text-xs bg-rosewood-950 border border-rosegold-500/30 rounded-xl text-ivory-100"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-rosegold-400 font-semibold mb-1">Pincode</label>
                      <input
                        type="text"
                        name="pincode"
                        required
                        value={formData.pincode || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 text-xs bg-rosewood-950 border border-rosegold-500/30 rounded-xl text-ivory-100"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rosegold-600 to-rosegold-500 text-white text-xs font-semibold uppercase tracking-wider shadow"
                    >
                      Save Profile
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-5 py-2.5 rounded-xl bg-rosewood-800 text-ivory-300 text-xs font-medium hover:bg-rosewood-700 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-rosewood-900/60 border border-rosegold-500/20 space-y-3">
                    <div className="flex items-center gap-2.5 text-rosegold-300 text-xs font-semibold uppercase tracking-wider">
                      <User className="w-4 h-4" />
                      <span>Account Information</span>
                    </div>
                    <div className="space-y-1 text-xs text-ivory-200">
                      <p><strong className="text-ivory-400">Name:</strong> {profile.name}</p>
                      <p><strong className="text-ivory-400">Phone:</strong> {profile.phone}</p>
                      <p><strong className="text-ivory-400">Email:</strong> {profile.email}</p>
                      <p><strong className="text-ivory-400">VIP Referral Code:</strong> <span className="font-mono bg-rosegold-500/20 px-2 py-0.5 rounded text-rosegold-300">{profile.referralCode}</span></p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-rosewood-900/60 border border-rosegold-500/20 space-y-3">
                    <div className="flex items-center gap-2.5 text-rosegold-300 text-xs font-semibold uppercase tracking-wider">
                      <MapPin className="w-4 h-4" />
                      <span>Default Delivery Address</span>
                    </div>
                    <div className="space-y-1 text-xs text-ivory-200">
                      <p>{profile.address}</p>
                      <p>{profile.city}, {profile.state} - {profile.pincode}</p>
                      <div className="pt-2 flex items-center gap-1.5 text-emerald-400 text-[11px]">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Eligible for 100% Insured Armored Transit</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: REFER & EARN HUB */}
          {activeTab === 'referral' && (
            <div className="space-y-6 animate-fadeIn">

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

                {/* Left: QR Code Box */}
                <div className="md:col-span-5 flex flex-col items-center bg-gradient-to-b from-ivory-50 to-ivory-100 p-5 rounded-2xl border border-rosegold-200 shadow-inner">
                  <div className="w-40 h-40 bg-white p-3 rounded-xl shadow-md border border-rosegold-100 relative flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-rosewood-950 fill-current">
                      <rect x="5" y="5" width="25" height="25" rx="4" className="fill-rosewood-950" />
                      <rect x="9" y="9" width="17" height="17" rx="2" className="fill-white" />
                      <rect x="13" y="13" width="9" height="9" rx="1" className="fill-rosegold-600" />

                      <rect x="70" y="5" width="25" height="25" rx="4" className="fill-rosewood-950" />
                      <rect x="74" y="9" width="17" height="17" rx="2" className="fill-white" />
                      <rect x="78" y="13" width="9" height="9" rx="1" className="fill-rosegold-600" />

                      <rect x="5" y="70" width="25" height="25" rx="4" className="fill-rosewood-950" />
                      <rect x="9" y="74" width="17" height="17" rx="2" className="fill-white" />
                      <rect x="13" y="78" width="9" height="9" rx="1" className="fill-rosegold-600" />

                      <rect x="35" y="8" width="6" height="6" />
                      <rect x="45" y="5" width="8" height="6" className="fill-rosegold-700" />
                      <rect x="58" y="8" width="6" height="6" />
                      <rect x="35" y="18" width="6" height="10" />
                      <rect x="44" y="16" width="10" height="6" />
                      <rect x="57" y="18" width="8" height="8" className="fill-rosegold-700" />

                      <rect x="8" y="35" width="6" height="8" />
                      <rect x="18" y="34" width="8" height="6" className="fill-rosegold-700" />
                      <rect x="34" y="34" width="6" height="12" />
                      <rect x="45" y="32" width="12" height="8" />
                      <rect x="62" y="34" width="6" height="14" className="fill-rosegold-700" />
                      <rect x="73" y="35" width="8" height="6" />
                      <rect x="86" y="32" width="6" height="10" />

                      <rect x="5" y="50" width="12" height="6" />
                      <rect x="22" y="52" width="6" height="8" className="fill-rosegold-700" />
                      <rect x="35" y="50" width="8" height="6" />
                      <rect x="48" y="48" width="6" height="12" className="fill-rosegold-700" />
                      <rect x="58" y="50" width="10" height="6" />
                      <rect x="74" y="48" width="6" height="12" />
                      <rect x="85" y="48" width="10" height="8" className="fill-rosegold-700" />

                      <rect x="35" y="65" width="10" height="8" />
                      <rect x="48" y="66" width="8" height="6" />
                      <rect x="60" y="65" width="6" height="12" className="fill-rosegold-700" />
                      <rect x="72" y="68" width="14" height="6" />

                      <rect x="36" y="82" width="8" height="10" className="fill-rosegold-700" />
                      <rect x="48" y="80" width="12" height="6" />
                      <rect x="65" y="82" width="8" height="10" />
                      <rect x="78" y="84" width="14" height="8" className="fill-rosegold-700" />
                    </svg>

                    <div className="absolute w-9 h-9 rounded-full bg-gradient-to-tr from-rosegold-600 to-amber-500 border-2 border-white shadow-md flex items-center justify-center text-white font-serif text-xs font-bold tracking-wider">
                      SB
                    </div>
                  </div>
                  <p className="text-[11px] text-rosewood-700 font-medium mt-2 text-center">
                    Scan via camera to join Suvarna Bharat
                  </p>
                </div>

                {/* Right: Referral Details & Sharing */}
                <div className="md:col-span-7 space-y-4">
                  <div>
                    <h4 className="font-serif text-lg text-rosegold-300">Invite Friends & Earn Privileges</h4>
                    <p className="text-xs text-ivory-300/80">
                      Share your unique referral code or link with friends. When they join and purchase, they unlock an instant ₹500 privilege discount.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-rosegold-400 font-semibold mb-1">
                      Your Referral Code
                    </label>
                    <div className="flex items-center justify-between px-3 py-2.5 bg-rosewood-900/90 border border-rosegold-500/30 rounded-xl">
                      <span className="font-mono text-sm font-bold text-ivory-50 tracking-wider">
                        {profile.referralCode}
                      </span>
                      <button
                        onClick={handleCopyCode}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rosegold-600 hover:bg-rosegold-500 text-white text-xs font-medium transition shadow"
                      >
                        {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-rosegold-400 font-semibold mb-1">
                      Direct Enrolment URL
                    </label>
                    <div className="px-3 py-2 bg-rosewood-900/90 border border-rosegold-500/30 rounded-xl text-[11px] font-mono text-ivory-200 truncate select-all">
                      {referralUrl}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={handleCopyUrl}
                      className="py-2.5 px-3 rounded-xl bg-rosewood-800 hover:bg-rosewood-700 text-ivory-100 text-xs font-semibold uppercase tracking-wider border border-rosegold-500/30 flex items-center justify-center gap-1.5 transition"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-rosegold-400" />}
                      <span>{copied ? 'Copied' : 'Copy Link'}</span>
                    </button>

                    <button
                      onClick={handleWhatsAppShare}
                      className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition shadow"
                    >
                      <MessageSquareShare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 3: MY ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4 animate-fadeIn">
              <h4 className="font-serif text-base text-ivory-50">Your Recent Heirloom Orders</h4>

              {orders.length === 0 ? (
                <p className="text-xs text-ivory-300">No orders placed yet.</p>
              ) : (
                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div key={ord.orderId} className="p-4 rounded-2xl bg-rosewood-900/60 border border-rosegold-500/20 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-rosegold-300">{ord.orderId}</span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] uppercase font-semibold">
                          {ord.status}
                        </span>
                      </div>
                      <div className="text-xs text-ivory-200">
                        <p><strong>Items:</strong> {ord.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}</p>
                        <p><strong>Total Paid:</strong> ₹{ord.total.toLocaleString('en-IN')} ({ord.paymentMethod})</p>
                        {ord.referralCode && (
                          <p className="text-emerald-400 text-[11px]">Referral Applied: {ord.referralCode} (-₹500 privilege)</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
