# 👑 SUVARNA BHARAT — Fine & Royal Jewellery E-Commerce Platform

> **"Elegance In Every Carat, Pure Indian Royalty In Every Design."**

Suvarna Bharat is a modern, high-conversion, luxury jewellery e-commerce platform built with React 19, Tailwind CSS, and Vite. Designed specifically for fine Indian jewellery retail with a **Rose Gold & Ivory** aesthetic, live bullion market tickers, transparent metal & making charge price calculators, and an internal administrative suite.

---

## ✨ Key Features

### 🛍️ 1. Customer Shopping Portal
- **Design Aesthetic:** Luxury **Rose Gold & Ivory Silk** theme (`#FAF8F5`, `#C56F5A`, `#22161A`) with Cormorant Garamond & Playfair Display typography.
- **Live Bullion Rate Ticker:** Real-time updates for **Gold 24K, 22K (916), 18K (750)** and **Silver 925** per gram with live timestamps.
- **Multi-Category Catalog:**
  - **Gold Jewellery:** 22K BIS Hallmarked Chokers, Bangles, Jhumkas, Mangalsutra, 24K Investment Coins.
  - **Diamond Solitaires:** Natural VVS/VS Diamonds, Engagement Rings, Tennis Bracelets, Chandelier Drops.
  - **925 Pure Silver:** Sterling Silver Bridal Payals, Modern CZ Bands, 999 Fine Silver Idols.
  - **Heritage Kundan & Polki:** Imperial Jadau Bridal Sets and Jaipur Meenakari Earrings.
- **Transparent Price Breakdown:** Automatic calculation showing:
  $$\text{Gold Weight (g)} \times \text{Current Bullion Rate} + \text{Gemstone/Diamond Value} + \text{Making Charges (\%)} + \text{3\% GST}$$
- **Interactive Ring Size Selector** (Standard Indian sizes: 10, 12, 14, 16, 18, 20).
- **Pincode Delivery Estimator:** Check delivery dates with BlueDart Insured Courier.
- **Dynamic Cart Drawer & Wishlist:**
  - Real-time coupon engine (`SUVARNA10`, `BRIDAL5000`, `WELCOME1000`).
  - Complimentary 100% Insured Delivery across India.
- **Checkout & Simulated Razorpay Gateway:**
  - Indian address form with Pincode & Mobile OTP verification.
  - Razorpay UPI / Cards / Net Banking & Armored Cash on Delivery.
  - Celebration confetti on order placement!
- **Order Tracking:** Interactive step-by-step order journey:
  *Order Placed → BIS Hallmarking & QA → Sealed in Tamper-Proof Box → Armored Insured Transit → Delivered*.

---

### 🛡️ 2. Admin Management Suite (`/admin`)
- **Protected Access:** Passcode / PIN gated access (`admin123` or one-click demo unlock).
- **Executive KPI Dashboard:** Real-time metrics for Gross Revenue, Order Volume, Catalog Stock Health, and Live Gold Bullion Rate.
- **Product Catalog Manager:**
  - Add new jewellery items with image URLs, metal type, category, net weight, karat purity, and making charge %.
  - Instant stock status toggle (*In Stock* / *Out of Stock*).
  - Edit and Delete items.
- **Order Fulfillment Pipeline:**
  - View customer name, shipping address, contact, and purchased items.
  - Live status transition dropdown with immediate customer tracking sync.
- **Bullion Rates Manager:** Admin can update today's 24K, 22K, 18K gold and silver market rates; the live ticker and catalog prices sync automatically.
- **Promotions & Coupons:** View and manage discount codes.
- **Firebase Status & Cloud Integration:** Offline-first Indexed LocalStorage engine ready, with plug-and-play `.env` support for Firebase Firestore and Authentication.

---

## 🚀 Getting Started

The development server is currently live:
- **Local URL:** [http://localhost:3000](http://localhost:3000)

### Manual Terminal Commands
```bash
# Install dependencies
npm.cmd install

# Start development server
npm.cmd run dev

# Build for production
npm.cmd run build
```

---

## 🔐 Admin Portal Credentials
- **Access URL:** Click **"Admin Panel"** in the top navigation bar or go to the dashboard.
- **Default PIN:** `admin123` (or click *"⚡ Quick Demo Unlock"*).
