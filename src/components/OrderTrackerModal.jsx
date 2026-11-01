import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Search, 
  Package, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Sparkles
} from 'lucide-react';

const TRACKING_STEPS = [
  { title: "Order Placed", desc: "Order details verified & scheduled for master artisan preparation" },
  { title: "Hallmarking & Purity QA", desc: "Assayed at BIS recognized hallmarking centre & HUID engraved" },
  { title: "Sealed in Luxury Box", desc: "Tamper-evident sealed packaging under 24/7 CCTV surveillance" },
  { title: "Armored Insured Transit", desc: "Dispatched via BlueDart Secure Express with OTP delivery" },
  { title: "Delivered", desc: "Safely received and verified by customer" }
];

export default function OrderTrackerModal() {
  const { 
    isTrackerOpen, 
    setIsTrackerOpen, 
    trackerOrderId, 
    setTrackerOrderId, 
    orders 
  } = useStore();

  const [searchId, setSearchId] = useState(trackerOrderId || '');
  const [activeOrder, setActiveOrder] = useState(() => {
    if (trackerOrderId) {
      return orders.find(o => o.orderId.toLowerCase() === trackerOrderId.toLowerCase()) || null;
    }
    return orders[0] || null;
  });

  if (!isTrackerOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    const found = orders.find(o => o.orderId.toLowerCase() === searchId.trim().toLowerCase());
    setActiveOrder(found || null);
  };

  const getStepProgress = (status) => {
    if (!status) return 1;
    const lower = status.toLowerCase();
    if (lower.includes('delivered')) return 5;
    if (lower.includes('transit') || lower.includes('shipped') || lower.includes('courier')) return 4;
    if (lower.includes('sealed') || lower.includes('packaging')) return 3;
    if (lower.includes('hallmark') || lower.includes('quality') || lower.includes('qa')) return 2;
    return 1;
  };

  const currentStep = activeOrder ? getStepProgress(activeOrder.status) : 1;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-rosewood-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-rosegold-200 my-8">
        
        {/* Header */}
        <div className="p-6 border-b border-ivory-200 bg-ivory-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-rosegold-500 text-white flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-normal text-rosewood-900">
                Track Your Precious Order
              </h2>
              <p className="text-xs text-rosewood-600">
                Live insured consignment tracking & hallmarking verification
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsTrackerOpen(false)}
            className="p-2 rounded-full text-rosewood-600 hover:text-rosegold-600 hover:bg-rosegold-50 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter Order ID (e.g. SB-ORD-98421)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-ivory-100 border border-ivory-300 rounded-xl uppercase tracking-wider text-rosewood-900 font-mono"
              />
              <Search className="w-4 h-4 text-rosewood-400 absolute left-3 top-3" />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-rosewood-900 text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-rosegold-600 transition"
            >
              Track
            </button>
          </form>

          {/* Result view */}
          {activeOrder ? (
            <div className="space-y-6">
              
              {/* Order Meta Header */}
              <div className="p-4 rounded-2xl bg-ivory-100 border border-ivory-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-rosewood-500 block text-[11px]">Order Reference:</span>
                  <strong className="font-mono text-sm text-rosewood-900">{activeOrder.orderId}</strong>
                </div>
                <div>
                  <span className="text-rosewood-500 block text-[11px]">Consignment No:</span>
                  <strong className="font-mono text-rosegold-700">{activeOrder.trackingNumber || 'BLUEDART-SEC-9281'}</strong>
                </div>
                <div>
                  <span className="text-rosewood-500 block text-[11px]">Current Status:</span>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-rosegold-100 text-rosegold-800 font-bold border border-rosegold-200">
                    {activeOrder.status}
                  </span>
                </div>
              </div>

              {/* Visual Step Progress Tracker */}
              <div className="py-2">
                <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-ivory-300">
                  {TRACKING_STEPS.map((step, idx) => {
                    const stepNum = idx + 1;
                    const isDone = currentStep >= stepNum;
                    const isCurrent = currentStep === stepNum;

                    return (
                      <div key={idx} className="relative flex items-start gap-4 pl-1">
                        
                        {/* Dot / Check Icon */}
                        <div className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm ${
                          isDone 
                            ? 'bg-rosegold-600 text-white' 
                            : 'bg-ivory-200 text-rosewood-400 border border-ivory-300'
                        } ${isCurrent ? 'ring-4 ring-rosegold-200 animate-pulse' : ''}`}>
                          {isDone ? <CheckCircle2 className="w-4 h-4" /> : stepNum}
                        </div>

                        {/* Text */}
                        <div className="flex-1 -mt-0.5">
                          <h4 className={`text-xs font-semibold ${isDone ? 'text-rosewood-900' : 'text-rosewood-400'}`}>
                            {step.title}
                          </h4>
                          <p className="text-[11px] text-rosewood-500 mt-0.5 font-light">
                            {step.desc}
                          </p>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Package Summary Box */}
              <div className="p-4 rounded-2xl bg-white border border-ivory-300 text-xs space-y-2">
                <div className="font-semibold text-rosewood-900 border-b border-ivory-200 pb-1.5 flex justify-between">
                  <span>Ordered Jewellery Items ({activeOrder.items?.length || 1})</span>
                  <span>₹{activeOrder.total?.toLocaleString('en-IN')}</span>
                </div>
                {activeOrder.items?.map((item, i) => (
                  <div key={i} className="flex justify-between text-rosewood-700">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

            </div>
          ) : (
            <div className="p-8 text-center bg-ivory-50 rounded-2xl border border-ivory-200 space-y-2">
              <AlertCircle className="w-8 h-8 text-rosewood-400 mx-auto" />
              <h4 className="text-sm font-semibold text-rosewood-800">No order found with that ID</h4>
              <p className="text-xs text-rosewood-500">
                Please double-check your order ID (e.g. <code>SB-ORD-98421</code>) sent via email or SMS.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
