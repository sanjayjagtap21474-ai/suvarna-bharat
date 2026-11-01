import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/initialProducts';
import { defaultBullionRates } from '../data/bullionRates';

const StoreContext = createContext();

const STORAGE_KEYS = {
  PRODUCTS: 'sb_jewellery_products_v1',
  CART: 'sb_jewellery_cart_v1',
  WISHLIST: 'sb_jewellery_wishlist_v1',
  ORDERS: 'sb_jewellery_orders_v1',
  BULLION: 'sb_jewellery_bullion_v1',
  COUPONS: 'sb_jewellery_coupons_v1',
  ADMIN_AUTH: 'sb_jewellery_admin_auth_v1'
};

const DEFAULT_COUPONS = [
  { code: 'SUVARNA10', discountPercent: 10, maxDiscount: 15000, minOrder: 10000, description: '10% Off on Precious Jewellery (Max ₹15,000)' },
  { code: 'BRIDAL5000', flatDiscount: 5000, minOrder: 50000, description: 'Flat ₹5,000 Off on Bridal & High-Value Sets' },
  { code: 'WELCOME1000', flatDiscount: 1000, minOrder: 5000, description: 'Flat ₹1,000 Off on your first order' }
];

export function StoreProvider({ children }) {
  // Products
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return saved ? JSON.parse(saved) : initialProducts;
  });

  // Bullion Rates
  const [bullionRates, setBullionRates] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BULLION);
    return saved ? JSON.parse(saved) : defaultBullionRates;
  });

  // Cart
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CART);
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
    return saved ? JSON.parse(saved) : [];
  });

  // Orders
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (saved) return JSON.parse(saved);
    // Seed initial mock order for immediate demonstration
    return [
      {
        orderId: 'SB-ORD-98421',
        createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
        customer: {
          name: 'Radhika Sharma',
          phone: '+91 98765 43210',
          email: 'radhika.sharma@example.com',
          address: 'Villa 14, Royal Palm Meadows, Bandra West, Mumbai, 400050'
        },
        items: [
          {
            id: 'SBJ-DMD-001',
            name: 'The Empress Solitaire Rose Gold Diamond Ring',
            price: 178500,
            quantity: 1,
            selectedRingSize: '14',
            image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80'
          }
        ],
        subtotal: 178500,
        discount: 15000,
        couponCode: 'SUVARNA10',
        gst: 4905, // 3%
        insuredShipping: 0,
        total: 168405,
        paymentMethod: 'Prepaid (Razorpay / UPI)',
        paymentStatus: 'Paid',
        status: 'Hallmarking & Quality Check',
        trackingNumber: 'BLUEDART-SEC-49281729'
      }
    ];
  });

  // Coupons
  const [coupons, setCoupons] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COUPONS);
    return saved ? JSON.parse(saved) : DEFAULT_COUPONS;
  });

  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Referral State (supporting URL query param ?ref=...)
  const [appliedReferral, setAppliedReferral] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const refParam = params.get('ref');
      if (refParam) {
        const clean = refParam.trim().toUpperCase();
        localStorage.setItem('sb_applied_referral', clean);
        return clean;
      }
      return localStorage.getItem('sb_applied_referral') || null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    if (appliedReferral) {
      localStorage.setItem('sb_applied_referral', appliedReferral);
    } else {
      localStorage.removeItem('sb_applied_referral');
    }
  }, [appliedReferral]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refParam = params.get('ref');
    if (refParam) {
      const clean = refParam.trim().toUpperCase();
      setTimeout(() => {
        showToast(`Referral Code "${clean}" applied! Extra ₹500 discount unlocked 🎉`);
      }, 1200);
    }
  }, []);

  // Admin Auth
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  });

  // UI Navigation & Modals
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'shop' | 'admin'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [trackerOrderId, setTrackerOrderId] = useState('');
  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);

  // Customer Profile & Referral Hub State
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const isReferralOpen = isProfileOpen;
  const setIsReferralOpen = setIsProfileOpen;

  const [customerProfile, setCustomerProfile] = useState(() => {
    const saved = localStorage.getItem('sb_customer_profile_v1');
    return saved ? JSON.parse(saved) : {
      name: localStorage.getItem('sb_account_name') || 'Sanjay Jagtap',
      phone: '+91 98230 45678',
      email: 'sanjay.jagtap@example.com',
      address: '104, Royal Heritage Residency, MG Road',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001',
      referralCode: localStorage.getItem('sb_referral_code') || 'SB-SANJAY789'
    };
  });

  useEffect(() => {
    localStorage.setItem('sb_customer_profile_v1', JSON.stringify(customerProfile));
  }, [customerProfile]);

  const [toast, setToast] = useState(null);

  // Filters for Shop page
  const [filterMetal, setFilterMetal] = useState('All'); // 'All' | 'Gold' | 'Diamond' | 'Silver' | 'Fashion / Heritage'
  const [filterCategory, setFilterCategory] = useState('All'); // 'All' | 'Rings' | 'Necklaces' | 'Earrings' | 'Bangles & Bracelets' | 'Coins & Bullion'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-low' | 'price-high' | 'rating'

  // Persist to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BULLION, JSON.stringify(bullionRates));
  }, [bullionRates]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, isAdminAuthenticated.toString());
  }, [isAdminAuthenticated]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // Cart Management
  const addToCart = (product, quantity = 1, options = {}) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => 
        item.id === product.id && 
        item.selectedRingSize === options.selectedRingSize &&
        item.selectedKarat === options.selectedKarat
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }

      return [...prev, {
        ...product,
        quantity,
        selectedRingSize: options.selectedRingSize || (product.ringSizes ? product.ringSizes[0] : null),
        selectedKarat: options.selectedKarat || product.karat || 22,
        customEngraving: options.customEngraving || ''
      }];
    });

    showToast(`Added "${product.name}" to your luxury cart!`);
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (index, delta) => {
    setCart(prev => {
      const next = [...prev];
      const newQty = next[index].quantity + delta;
      if (newQty <= 0) {
        return prev.filter((_, i) => i !== index);
      }
      next[index].quantity = newQty;
      return next;
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist Management
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        showToast(`Removed from Wishlist: ${product.name}`, 'info');
        return prev.filter(item => item.id !== product.id);
      } else {
        showToast(`Saved to Wishlist: ${product.name}`);
        return [...prev, product];
      }
    });
  };

  const isProductInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // Pricing calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Calculate discount
  let cartDiscount = 0;
  if (appliedCoupon) {
    if (cartSubtotal >= (appliedCoupon.minOrder || 0)) {
      if (appliedCoupon.flatDiscount) {
        cartDiscount = appliedCoupon.flatDiscount;
      } else if (appliedCoupon.discountPercent) {
        const pct = (cartSubtotal * appliedCoupon.discountPercent) / 100;
        cartDiscount = appliedCoupon.maxDiscount ? Math.min(pct, appliedCoupon.maxDiscount) : pct;
      }
    }
  }

  // Jewellery standard GST is 3% in India
  const taxableAmount = Math.max(0, cartSubtotal - cartDiscount);
  const cartGst = Math.round(taxableAmount * 0.03);
  const insuredShippingFee = taxableAmount > 0 ? 0 : 0; // Free fully-insured delivery across India
  const cartGrandTotal = taxableAmount + cartGst + insuredShippingFee;

  // Coupon Application
  const applyCouponCode = (codeStr) => {
    const clean = codeStr.trim().toUpperCase();
    const found = coupons.find(c => c.code === clean);
    if (!found) {
      showToast('Invalid Coupon Code', 'error');
      return false;
    }
    if (cartSubtotal < (found.minOrder || 0)) {
      showToast(`Minimum order of ₹${(found.minOrder).toLocaleString('en-IN')} required for this coupon`, 'error');
      return false;
    }
    setAppliedCoupon(found);
    showToast(`Coupon "${clean}" applied successfully!`);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Order Placement
  const placeOrder = (orderData) => {
    const orderId = `SB-${Math.floor(100000 + Math.random() * 900000)}`;
    const referralDiscount = orderData.referralDiscount || 0;
    const finalTotal = Math.max(0, cartGrandTotal - referralDiscount);

    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      customer: orderData.customer,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount + referralDiscount,
      couponCode: appliedCoupon ? appliedCoupon.code : null,
      referralCode: orderData.referralCode || null,
      referralDiscount,
      gst: cartGst,
      insuredShipping: insuredShippingFee,
      total: finalTotal,
      paymentMethod: orderData.paymentMethod || 'Razorpay Prepaid',
      paymentStatus: orderData.paymentMethod === 'Cash on Delivery' ? 'Pending Verification' : 'Paid',
      status: 'Order Placed & Hallmarking Verification',
      trackingNumber: `SB-EXP-${Math.floor(10000000 + Math.random() * 90000000)}`
    };

    setOrders(prev => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    showToast(`Order #${orderId} placed successfully! 🎉`);
    return newOrder;
  };

  // Admin Actions
  const addProduct = (newProd) => {
    const id = `SBJ-${Date.now().toString().slice(-6)}`;
    const productToAdd = {
      ...newProd,
      id,
      rating: 5.0,
      reviewsCount: 1,
      inStock: true
    };
    setProducts(prev => [productToAdd, ...prev]);
    showToast(`Added new jewellery item: ${newProd.name}`);
  };

  const updateProduct = (updatedProd) => {
    setProducts(prev => prev.map(p => p.id === updatedProd.id ? updatedProd : p));
    showToast(`Updated "${updatedProd.name}"`);
  };

  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToast('Jewellery piece removed from catalog', 'info');
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o));
    showToast(`Order ${orderId} status changed to "${newStatus}"`);
  };

  const updateBullionRates = (rates) => {
    setBullionRates({
      ...rates,
      lastUpdated: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    });
    showToast('Live bullion market rates updated successfully!');
  };

  return (
    <StoreContext.Provider value={{
      products,
      bullionRates,
      cart,
      wishlist,
      orders,
      coupons,
      appliedCoupon,
      appliedReferral,
      currentView,
      selectedProduct,
      isCartOpen,
      isWishlistOpen,
      isCheckoutOpen,
      isTrackerOpen,
      trackerOrderId,
      lastPlacedOrder,
      isReferralOpen,
      isProfileOpen,
      customerProfile,
      toast,
      isAdminAuthenticated,
      filterMetal,
      filterCategory,
      searchQuery,
      sortBy,
      cartSubtotal,
      cartDiscount,
      cartGst,
      cartGrandTotal,
      insuredShippingFee,
      // setters & actions
      setCurrentView,
      setSelectedProduct,
      setIsCartOpen,
      setIsWishlistOpen,
      setIsCheckoutOpen,
      setIsTrackerOpen,
      setIsReferralOpen,
      setIsProfileOpen,
      setCustomerProfile,
      setTrackerOrderId,
      setLastPlacedOrder,
      setIsAdminAuthenticated,
      setFilterMetal,
      setFilterCategory,
      setSearchQuery,
      setSortBy,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      toggleWishlist,
      isProductInWishlist,
      applyCouponCode,
      removeCoupon,
      setAppliedReferral,
      placeOrder,
      addProduct,
      updateProduct,
      deleteProduct,
      updateOrderStatus,
      updateBullionRates,
      showToast
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
