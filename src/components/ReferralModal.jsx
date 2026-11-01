import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, QrCode, Copy, Check, Share2, Sparkles, MessageSquareShare, Edit3 } from 'lucide-react';

export default function ReferralModal() {
  const { isReferralOpen, setIsReferralOpen, showToast } = useStore();
  const [copied, setCopied] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Dynamic / Editable Account Name and Referral Code
  const [accountName, setAccountName] = useState(() => {
    return localStorage.getItem('sb_account_name') || 'Valued Customer';
  });

  const [referralCode, setReferralCode] = useState(() => {
    return localStorage.getItem('sb_referral_code') || 'SB-VIP888';
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(accountName);
  const [tempCode, setTempCode] = useState(referralCode);

  if (!isReferralOpen) return null;

  const referralUrl = `https://suvarna-bharat.netlify.app/?ref=${referralCode}`;

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const cleanName = tempName.trim() || 'Valued Customer';
    const cleanCode = tempCode.trim().toUpperCase() || 'SB-VIP888';

    setAccountName(cleanName);
    setReferralCode(cleanCode);

    localStorage.setItem('sb_account_name', cleanName);
    localStorage.setItem('sb_referral_code', cleanCode);

    setIsEditing(false);
    showToast('Referral profile updated successfully!');
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    showToast('Referral link copied to clipboard!');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    showToast(`Referral code "${referralCode}" copied!`);
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
      <div className="relative w-full max-w-md bg-gradient-to-b from-rosewood-900 via-rosewood-950 to-rosewood-950 border border-rosegold-500/40 rounded-3xl shadow-2xl text-ivory-50 overflow-hidden p-6 sm:p-8">

        {/* Close Button */}
        <button
          onClick={() => setIsReferralOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-rosewood-800/60 text-ivory-300 hover:text-white hover:bg-rosewood-700 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6 pr-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rosegold-600 to-amber-400 flex items-center justify-center shadow-lg shadow-rosegold-500/25">
              <QrCode className="w-5 h-5 text-ivory-50" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl tracking-wider text-rosegold-300 font-medium">
                REFERRAL QR & LINK
              </h3>
              {!isEditing ? (
                <div className="flex items-center gap-2">
                  <p className="text-[11px] text-ivory-300/70 font-light">
                    Account: <span className="text-ivory-100 font-medium">{accountName}</span>
                  </p>
                  <button
                    onClick={() => {
                      setTempName(accountName);
                      setTempCode(referralCode);
                      setIsEditing(true);
                    }}
                    className="text-rosegold-400 hover:text-white transition"
                    title="Edit Name & Code"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Editing Form */}
        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="mb-6 p-4 bg-rosewood-900/90 border border-rosegold-500/40 rounded-2xl space-y-3">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-rosegold-400 font-semibold mb-1">
                Your Name / Account Name
              </label>
              <input
                type="text"
                required
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-rosewood-950 border border-rosegold-500/30 rounded-xl text-ivory-100 focus:outline-none focus:border-rosegold-400"
                placeholder="Enter your name..."
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-rosegold-400 font-semibold mb-1">
                Your Referral Code
              </label>
              <input
                type="text"
                required
                value={tempCode}
                onChange={(e) => setTempCode(e.target.value.toUpperCase())}
                className="w-full px-3 py-2 text-xs font-mono bg-rosewood-950 border border-rosegold-500/30 rounded-xl text-ivory-100 focus:outline-none focus:border-rosegold-400"
                placeholder="e.g. SB-NAME123"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                className="flex-1 py-2 rounded-xl bg-rosegold-600 hover:bg-rosegold-500 text-white text-xs font-semibold uppercase tracking-wider transition shadow"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-2 rounded-xl bg-rosewood-800 text-ivory-300 text-xs font-medium hover:bg-rosewood-700 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : null}

        {/* QR Code Container */}
        <div className="bg-gradient-to-b from-ivory-50 to-ivory-100 p-6 rounded-2xl shadow-inner flex flex-col items-center justify-center mb-6 relative border border-rosegold-200">

          {/* QR Code SVG Visual */}
          <div className="w-48 h-48 bg-white p-3 rounded-xl shadow-md border border-rosegold-100 relative flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full text-rosewood-950 fill-current">
              {/* Corner squares */}
              <rect x="5" y="5" width="25" height="25" rx="4" className="fill-rosewood-950" />
              <rect x="9" y="9" width="17" height="17" rx="2" className="fill-white" />
              <rect x="13" y="13" width="9" height="9" rx="1" className="fill-rosegold-600" />

              <rect x="70" y="5" width="25" height="25" rx="4" className="fill-rosewood-950" />
              <rect x="74" y="9" width="17" height="17" rx="2" className="fill-white" />
              <rect x="78" y="13" width="9" height="9" rx="1" className="fill-rosegold-600" />

              <rect x="5" y="70" width="25" height="25" rx="4" className="fill-rosewood-950" />
              <rect x="9" y="74" width="17" height="17" rx="2" className="fill-white" />
              <rect x="13" y="78" width="9" height="9" rx="1" className="fill-rosegold-600" />

              {/* Data dots / pattern */}
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

            {/* Center Logo Badge */}
            <div className="absolute w-10 h-10 rounded-full bg-gradient-to-tr from-rosegold-600 to-amber-500 border-2 border-white shadow-md flex items-center justify-center text-white font-serif text-xs font-bold tracking-wider">
              SB
            </div>
          </div>

          <p className="text-[11px] text-rosewood-700 font-medium mt-3 tracking-wide">
            Scan via camera or phone to join directly
          </p>
        </div>

        {/* Your Referral Code Box */}
        <div className="mb-4">
          <label className="block text-[10px] uppercase tracking-widest text-rosegold-400 font-semibold mb-1.5">
            Your Referral Code
          </label>
          <div className="flex items-center justify-between px-4 py-3 bg-rosewood-900/90 border border-rosegold-500/30 rounded-xl">
            <span className="font-mono text-sm sm:text-base font-bold text-ivory-50 tracking-wider">
              {referralCode}
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

        {/* Direct Enrolment URL */}
        <div className="mb-6">
          <label className="block text-[10px] uppercase tracking-widest text-rosegold-400 font-semibold mb-1.5">
            Direct Enrolment URL
          </label>
          <div className="px-3 py-2.5 bg-rosewood-900/90 border border-rosegold-500/30 rounded-xl text-[11px] font-mono text-ivory-200 truncate select-all">
            {referralUrl}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handleCopyUrl}
            className="w-full py-3 px-4 rounded-xl bg-rosewood-800 hover:bg-rosewood-700 text-ivory-100 text-xs font-semibold uppercase tracking-wider border border-rosegold-500/30 flex items-center justify-center gap-2 transition shadow"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-rosegold-400" />}
            <span>{copied ? 'Copied Full URL!' : 'Copy Full URL'}</span>
          </button>

          <button
            onClick={handleWhatsAppShare}
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-900/30"
          >
            <MessageSquareShare className="w-4 h-4" />
            <span>Share WhatsApp</span>
          </button>
        </div>

      </div>
    </div>
  );
}
