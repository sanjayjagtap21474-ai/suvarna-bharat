import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  X, 
  Coins, 
  Tag, 
  Database, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Truck, 
  DollarSign,
  AlertTriangle,
  RefreshCw,
  Eye,
  Gift
} from 'lucide-react';

export default function AdminDashboard() {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    orders, 
    updateOrderStatus, 
    bullionRates, 
    updateBullionRates,
    coupons,
    isAdminAuthenticated,
    setIsAdminAuthenticated,
    setCurrentView,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState('products'); // 'overview' | 'products' | 'orders' | 'bullion' | 'coupons' | 'firebase'
  const [adminPin, setAdminPin] = useState('');
  
  // New Product Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Necklaces',
    metalType: 'Gold',
    purity: '22K (916 BIS Hallmarked)',
    karat: 22,
    netWeightGrams: 15.0,
    grossWeightGrams: 15.5,
    makingChargePercent: 12,
    gemstoneCost: 0,
    price: 125000,
    originalPrice: 135000,
    inStock: true,
    stockCount: 5,
    featured: false,
    bestseller: false,
    sku: 'SB-GLD-NEW-01',
    hsnCode: '71131910',
    description: 'Handcrafted luxury jewellery piece crafted by master artisans with BIS Hallmark certification.',
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'],
    certification: 'BIS Hallmark 916 & HUID Verified',
    deliveryDays: '3-5 Business Days'
  });

  // Bullion rates local state
  const [rateEdit, setRateEdit] = useState({
    gold24k: bullionRates.gold24k,
    gold22k: bullionRates.gold22k,
    gold18k: bullionRates.gold18k,
    gold14k: bullionRates.gold14k,
    silver925: bullionRates.silver925
  });

  // Calculate KPIs
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalItemsSold = orders.reduce((sum, o) => sum + (o.items ? o.items.length : 1), 0);
  const inStockCount = products.filter(p => p.inStock).length;

  const handleLogin = (e) => {
    e.preventDefault();
    if (adminPin === 'admin123' || adminPin === 'suvarna' || adminPin === '1234') {
      setIsAdminAuthenticated(true);
      showToast('Admin Portal Unlocked successfully!');
    } else {
      showToast('Invalid Admin PIN. Use "admin123"', 'error');
    }
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.name) {
      showToast('Product name is required', 'error');
      return;
    }

    if (editingProduct) {
      updateProduct({ ...productForm, id: editingProduct.id });
      setEditingProduct(null);
    } else {
      addProduct(productForm);
    }

    setShowAddModal(false);
  };

  const openEditModal = (prod) => {
    setEditingProduct(prod);
    setProductForm({ ...prod });
    setShowAddModal(true);
  };

  const handleSaveRates = (e) => {
    e.preventDefault();
    updateBullionRates(rateEdit);
  };

  // Login Gate
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-ivory-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-rosegold-200 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-rosewood-900 text-rosegold-400 flex items-center justify-center mx-auto shadow-lg">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h2 className="font-serif text-3xl text-rosewood-900 font-normal">
              Admin Portal
            </h2>
            <p className="text-xs text-rosewood-600 mt-1">
              Suvarna Bharat Jewellers Internal Management
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="text-left">
              <label className="block text-[11px] font-semibold text-rosewood-700 uppercase mb-1">
                Admin Access PIN / Password
              </label>
              <input
                type="password"
                placeholder="Enter PIN (Default: admin123)"
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                className="w-full px-4 py-2.5 text-xs bg-ivory-100 border border-ivory-300 rounded-xl text-rosewood-900 font-mono focus:outline-none focus:border-rosegold-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-rosewood-900 hover:bg-rosewood-800 text-white text-xs font-semibold uppercase tracking-wider transition shadow-md"
            >
              Unlock Dashboard
            </button>
          </form>

          <div className="pt-2">
            <button
              onClick={() => {
                setAdminPin('admin123');
                setIsAdminAuthenticated(true);
                showToast('Quick Access granted for testing!');
              }}
              className="text-xs text-rosegold-600 hover:underline font-semibold"
            >
              ⚡ Quick Demo Unlock (Click here)
            </button>
          </div>

          <button
            onClick={() => setCurrentView('home')}
            className="text-xs text-rosewood-500 hover:text-rosewood-900 block mx-auto"
          >
            ← Back to Customer Website
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory-100/70 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Admin Header */}
        <div className="bg-white p-6 rounded-3xl border border-ivory-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700">
                Live Store Management
              </span>
            </div>
            <h1 className="font-serif text-3xl text-rosewood-900 font-normal mt-1">
              Suvarna Bharat Admin Suite
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('home')}
              className="px-4 py-2 rounded-xl bg-ivory-100 text-rosewood-800 border border-ivory-300 text-xs font-semibold hover:bg-rosegold-50 transition"
            >
              View Customer Store
            </button>
            <button
              onClick={() => {
                setIsAdminAuthenticated(false);
                showToast('Admin session locked', 'info');
              }}
              className="px-4 py-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold hover:bg-rose-100 transition flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock Admin</span>
            </button>
          </div>
        </div>

        {/* 4 KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white p-5 rounded-2xl border border-ivory-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-rosewood-500">
              <span className="uppercase tracking-wider font-semibold">Total Revenue</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-serif text-2xl font-bold text-rosewood-900">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-emerald-700 font-medium">
              ↑ Includes 3% Precious Jewellery GST
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-ivory-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-rosewood-500">
              <span className="uppercase tracking-wider font-semibold">Total Orders</span>
              <ShoppingBag className="w-4 h-4 text-rosegold-600" />
            </div>
            <div className="font-serif text-2xl font-bold text-rosewood-900">
              {orders.length} Orders
            </div>
            <div className="text-[11px] text-rosewood-600">
              {totalItemsSold} Heirloom items dispatched / queued
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-ivory-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-rosewood-500">
              <span className="uppercase tracking-wider font-semibold">Active Inventory</span>
              <Package className="w-4 h-4 text-amber-600" />
            </div>
            <div className="font-serif text-2xl font-bold text-rosewood-900">
              {products.length} Designs
            </div>
            <div className="text-[11px] text-amber-700 font-medium">
              {inStockCount} in immediate stock
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-ivory-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs text-rosewood-500">
              <span className="uppercase tracking-wider font-semibold">Bullion 24K Rate</span>
              <Coins className="w-4 h-4 text-amber-500" />
            </div>
            <div className="font-serif text-2xl font-bold text-rosewood-900">
              ₹{bullionRates.gold24k.toLocaleString('en-IN')}/g
            </div>
            <div className="text-[11px] text-rosewood-500">
              Updated: {bullionRates.lastUpdated}
            </div>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-ivory-300 pb-2">
          {[
            { id: 'products', label: 'Jewellery Products', icon: Package },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'bullion', label: 'Bullion Rates Manager', icon: Coins },
            { id: 'coupons', label: 'Discounts & Coupons', icon: Tag },
            { id: 'firebase', label: 'Firebase & Cloud Storage', icon: Database }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-semibold tracking-wider transition-all duration-200 flex items-center gap-2 shrink-0 border ${
                  activeTab === tab.id
                    ? 'bg-rosewood-900 text-white border-rosewood-900 shadow-sm'
                    : 'bg-white text-rosewood-800 border-ivory-300 hover:bg-rosegold-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-medium text-rosewood-900">
                Jewellery Catalog ({products.length} Items)
              </h3>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setProductForm({
                    name: '',
                    category: 'Necklaces',
                    metalType: 'Gold',
                    purity: '22K (916 BIS Hallmarked)',
                    karat: 22,
                    netWeightGrams: 15.0,
                    grossWeightGrams: 15.5,
                    makingChargePercent: 12,
                    gemstoneCost: 0,
                    price: 125000,
                    originalPrice: 135000,
                    inStock: true,
                    stockCount: 5,
                    featured: false,
                    bestseller: false,
                    sku: `SB-NEW-${Math.floor(100 + Math.random() * 900)}`,
                    hsnCode: '71131910',
                    description: 'Handcrafted luxury piece with authentic hallmarking.',
                    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'],
                    certification: 'BIS Hallmark 916 & HUID Verified',
                    deliveryDays: '3-5 Business Days'
                  });
                  setShowAddModal(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-rosegold-600 hover:bg-rosegold-700 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Jewellery</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-3xl border border-ivory-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-rosewood-800">
                  <thead className="bg-ivory-100 text-rosewood-700 uppercase tracking-wider text-[10px] border-b border-ivory-200">
                    <tr>
                      <th className="p-4">Item Details</th>
                      <th className="p-4">Metal & Category</th>
                      <th className="p-4">Weight & Karat</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Stock Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ivory-200">
                    {products.map((item) => (
                      <tr key={item.id} className="hover:bg-ivory-50 transition">
                        <td className="p-4 flex items-center gap-3">
                          <img src={item.images[0]} alt="" className="w-12 h-12 object-cover rounded-xl bg-ivory-100 border border-ivory-200 shrink-0" />
                          <div>
                            <div className="font-semibold text-rosewood-900">{item.name}</div>
                            <div className="text-[11px] text-rosewood-500 font-mono">SKU: {item.sku}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="font-semibold text-rosewood-900">{item.metalType}</span>
                          <div className="text-rosewood-500 text-[11px]">{item.category}</div>
                        </td>
                        <td className="p-4">
                          <div>{item.netWeightGrams ? `${item.netWeightGrams}g` : '—'}</div>
                          <div className="text-[11px] text-rosegold-700 font-semibold">{item.purity}</div>
                        </td>
                        <td className="p-4 font-serif font-bold text-sm text-rosewood-900">
                          ₹{item.price.toLocaleString('en-IN')}
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => updateProduct({ ...item, inStock: !item.inStock })}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition ${
                              item.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {item.inStock ? 'In Stock' : 'Out of Stock'}
                          </button>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => openEditModal(item)}
                            className="p-1.5 rounded-lg text-rosewood-600 hover:text-rosegold-600 hover:bg-rosegold-50"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteProduct(item.id)}
                            className="p-1.5 rounded-lg text-rosewood-400 hover:text-rose-600 hover:bg-rose-50"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-medium text-rosewood-900">
              Customer Orders & Dispatch Pipeline
            </h3>

            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.orderId} className="bg-white p-6 rounded-3xl border border-ivory-200 shadow-sm space-y-4">
                  
                  {/* Order header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ivory-200 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="font-mono text-base text-rosewood-900">{order.orderId}</strong>
                        <span className="text-xs text-rosewood-500">
                          • {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="text-xs text-rosewood-600 mt-1">
                        Tracking Code: <span className="font-mono text-rosegold-700 font-semibold">{order.trackingNumber}</span>
                      </div>
                    </div>

                    {/* Status updater */}
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-rosewood-500 font-medium">Fulfillment Status:</span>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.orderId, e.target.value)}
                        className="bg-ivory-100 border border-ivory-300 rounded-xl px-3 py-1.5 text-xs font-semibold text-rosewood-900 focus:outline-none focus:border-rosegold-500"
                      >
                        <option value="Order Placed & Hallmarking Verification">Order Placed & Hallmarking</option>
                        <option value="Hallmarking & Quality Check">Hallmarking & Quality Check</option>
                        <option value="Sealed in Luxury Box">Sealed in Luxury Box</option>
                        <option value="Armored Insured Transit (BlueDart)">Armored Insured Transit</option>
                        <option value="Delivered to Customer">Delivered to Customer</option>
                      </select>
                    </div>
                  </div>

                  {/* Customer and Items info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-2xl bg-ivory-50 border border-ivory-200 space-y-1">
                      <div className="font-bold text-rosewood-900 uppercase tracking-wider text-[10px]">
                        Customer & Shipping Address
                      </div>
                      <div className="font-semibold text-rosewood-900">{order.customer.name}</div>
                      <div className="text-rosewood-600">{order.customer.phone} • {order.customer.email}</div>
                      <div className="text-rosewood-600">{order.customer.address}</div>
                      <div className="pt-2 text-emerald-700 font-semibold">
                        Payment: {order.paymentMethod} ({order.paymentStatus})
                      </div>
                      {order.referralCode && (
                        <div className="pt-1 flex items-center gap-1.5 text-rosegold-700 font-semibold text-[11px]">
                          <Gift className="w-3.5 h-3.5 text-rosegold-600" />
                          <span>Referral Partner: <strong className="font-mono bg-rosegold-100 px-1.5 py-0.5 rounded border border-rosegold-300">{order.referralCode}</strong></span>
                        </div>
                      )}
                    </div>

                    <div className="p-4 rounded-2xl bg-ivory-50 border border-ivory-200 space-y-2">
                      <div className="font-bold text-rosewood-900 uppercase tracking-wider text-[10px] flex justify-between">
                        <span>Items Ordered</span>
                        <span>Total: ₹{order.total?.toLocaleString('en-IN')}</span>
                      </div>
                      {order.items?.map((it, idx) => (
                        <div key={idx} className="flex justify-between text-rosewood-700">
                          <span>{it.name} (x{it.quantity})</span>
                          <span className="font-semibold">₹{(it.price * it.quantity).toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: BULLION RATES MANAGER */}
        {activeTab === 'bullion' && (
          <div className="max-w-2xl bg-white p-8 rounded-3xl border border-ivory-200 shadow-sm space-y-6">
            <div>
              <h3 className="font-serif text-2xl font-normal text-rosewood-900">
                Live Daily Bullion Rates
              </h3>
              <p className="text-xs text-rosewood-600 mt-1">
                Updating these rates updates the live ticker and automatically adjusts pricing across 22K/24K/18K products.
              </p>
            </div>

            <form onSubmit={handleSaveRates} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-rosewood-700 uppercase mb-1">
                    Gold 24K (999 Pure) per gram (₹)
                  </label>
                  <input
                    type="number"
                    value={rateEdit.gold24k}
                    onChange={(e) => setRateEdit({ ...rateEdit, gold24k: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-ivory-100 border border-ivory-300 rounded-xl font-mono text-rosewood-900 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-rosewood-700 uppercase mb-1">
                    Gold 22K (916 BIS Hallmark) per gram (₹)
                  </label>
                  <input
                    type="number"
                    value={rateEdit.gold22k}
                    onChange={(e) => setRateEdit({ ...rateEdit, gold22k: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-ivory-100 border border-ivory-300 rounded-xl font-mono text-rosewood-900 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-rosewood-700 uppercase mb-1">
                    Gold 18K (750 Hallmark) per gram (₹)
                  </label>
                  <input
                    type="number"
                    value={rateEdit.gold18k}
                    onChange={(e) => setRateEdit({ ...rateEdit, gold18k: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-ivory-100 border border-ivory-300 rounded-xl font-mono text-rosewood-900 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-rosewood-700 uppercase mb-1">
                    Silver 925 (Sterling) per gram (₹)
                  </label>
                  <input
                    type="number"
                    value={rateEdit.silver925}
                    onChange={(e) => setRateEdit({ ...rateEdit, silver925: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-ivory-100 border border-ivory-300 rounded-xl font-mono text-rosewood-900 font-semibold"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-rosewood-900 hover:bg-rosegold-600 text-white text-xs font-semibold uppercase tracking-wider transition"
                >
                  Save Bullion Market Rates
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: COUPONS */}
        {activeTab === 'coupons' && (
          <div className="bg-white p-8 rounded-3xl border border-ivory-200 shadow-sm space-y-6">
            <h3 className="font-serif text-2xl font-normal text-rosewood-900">
              Active Promo Codes & Discounts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {coupons.map((c, i) => (
                <div key={i} className="p-4 rounded-2xl bg-ivory-50 border border-ivory-300 space-y-2 text-xs">
                  <div className="font-mono text-sm font-bold text-rosegold-700 bg-white px-2 py-1 rounded inline-block border border-rosegold-200">
                    {c.code}
                  </div>
                  <p className="text-rosewood-700">{c.description}</p>
                  <div className="text-[11px] text-rosewood-500">
                    Min Order: ₹{c.minOrder?.toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: FIREBASE INTEGRATION STATUS */}
        {activeTab === 'firebase' && (
          <div className="bg-white p-8 rounded-3xl border border-ivory-200 shadow-sm space-y-6 max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-normal text-rosewood-900">
                  Firebase & Storage Status
                </h3>
                <p className="text-xs text-rosewood-600">
                  Cloud sync for Firestore, Auth and Cloud Storage
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-1">
              <div className="flex items-center gap-2 font-semibold">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Offline-First Storage Engine Active</span>
              </div>
              <p className="text-[11px]">
                All product modifications, order placements, and cart sessions are currently persisting in high-speed indexed browser storage.
              </p>
            </div>

            <div className="space-y-3 text-xs text-rosewood-700">
              <h4 className="font-bold uppercase tracking-wider text-rosewood-900 text-[11px]">
                To Connect External Firebase Project:
              </h4>
              <p>Add your keys into <code>.env</code> file:</p>
              <pre className="p-3 rounded-xl bg-rosewood-950 text-ivory-100 font-mono text-[11px] overflow-x-auto">
{`VITE_FIREBASE_API_KEY="AIzaSy..."
VITE_FIREBASE_AUTH_DOMAIN="suvarna-bharat.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="suvarna-bharat"
VITE_FIREBASE_STORAGE_BUCKET="suvarna-bharat.appspot.com"`}
              </pre>
            </div>
          </div>
        )}

      </div>

      {/* Modal: Add or Edit Jewellery Product */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-rosewood-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-rosegold-200 space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-ivory-200 pb-3">
              <h3 className="font-serif text-2xl font-normal text-rosewood-900">
                {editingProduct ? 'Edit Jewellery Piece' : 'Add New Jewellery to Catalog'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-full text-rosewood-600 hover:text-rosegold-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-rosewood-700 uppercase mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. Royal 22K Gold Temple Necklace"
                  className="w-full px-3 py-2 bg-ivory-100 border border-ivory-300 rounded-xl text-rosewood-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-rosewood-700 uppercase mb-1">
                    Metal Category
                  </label>
                  <select
                    value={productForm.metalType}
                    onChange={(e) => setProductForm({ ...productForm, metalType: e.target.value })}
                    className="w-full px-3 py-2 bg-ivory-100 border border-ivory-300 rounded-xl text-rosewood-900"
                  >
                    <option value="Gold">Gold</option>
                    <option value="Diamond">Diamond</option>
                    <option value="Silver">Silver</option>
                    <option value="Fashion / Heritage">Fashion / Heritage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-rosewood-700 uppercase mb-1">
                    Jewellery Type
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3 py-2 bg-ivory-100 border border-ivory-300 rounded-xl text-rosewood-900"
                  >
                    <option value="Necklaces">Necklaces</option>
                    <option value="Rings">Rings</option>
                    <option value="Earrings">Earrings</option>
                    <option value="Bangles & Bracelets">Bangles & Bracelets</option>
                    <option value="Coins & Bullion">Coins & Bullion</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-rosewood-700 uppercase mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-ivory-100 border border-ivory-300 rounded-xl text-rosewood-900 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-rosewood-700 uppercase mb-1">
                    Net Weight (Grams)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={productForm.netWeightGrams}
                    onChange={(e) => setProductForm({ ...productForm, netWeightGrams: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-ivory-100 border border-ivory-300 rounded-xl text-rosewood-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-rosewood-700 uppercase mb-1">
                    Karat (e.g. 22, 18, 24)
                  </label>
                  <input
                    type="number"
                    value={productForm.karat}
                    onChange={(e) => setProductForm({ ...productForm, karat: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-ivory-100 border border-ivory-300 rounded-xl text-rosewood-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-rosewood-700 uppercase mb-1">
                  Product Image URL (High Definition)
                </label>
                <input
                  type="text"
                  value={productForm.images[0]}
                  onChange={(e) => setProductForm({ ...productForm, images: [e.target.value] })}
                  className="w-full px-3 py-2 bg-ivory-100 border border-ivory-300 rounded-xl text-rosewood-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-rosewood-700 uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-ivory-100 border border-ivory-300 rounded-xl text-rosewood-900"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-ivory-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-rosewood-600 hover:bg-ivory-100 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-rosegold-600 hover:bg-rosegold-700 text-white text-xs font-semibold uppercase tracking-wider shadow-md"
                >
                  {editingProduct ? 'Save Changes' : 'Publish Jewellery'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
