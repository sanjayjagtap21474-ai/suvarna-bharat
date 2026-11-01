import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { 
  Filter, 
  SlidersHorizontal, 
  Search, 
  X, 
  Sparkles, 
  ChevronDown,
  RotateCcw
} from 'lucide-react';

const METALS = ['All', 'Gold', 'Diamond', 'Silver', 'Fashion / Heritage'];
const CATEGORIES = ['All', 'Necklaces', 'Rings', 'Earrings', 'Bangles & Bracelets', 'Coins & Bullion'];

export default function ShopPage() {
  const { 
    products, 
    filterMetal, 
    setFilterMetal, 
    filterCategory, 
    setFilterCategory, 
    searchQuery, 
    setSearchQuery,
    sortBy,
    setSortBy
  } = useStore();

  const [maxPrice, setMaxPrice] = useState(300000);
  const [selectedKarat, setSelectedKarat] = useState('All');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchCategory = item.category.toLowerCase().includes(query);
        const matchMetal = item.metalType.toLowerCase().includes(query);
        const matchDesc = item.description?.toLowerCase().includes(query);
        if (!matchName && !matchCategory && !matchMetal && !matchDesc) return false;
      }

      // Metal Filter
      if (filterMetal !== 'All' && item.metalType !== filterMetal) {
        return false;
      }

      // Category Filter
      if (filterCategory !== 'All' && item.category !== filterCategory) {
        return false;
      }

      // Karat Filter
      if (selectedKarat !== 'All') {
        if (item.karat !== parseInt(selectedKarat)) return false;
      }

      // Price Filter
      if (item.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0; // default featured
    });
  }, [products, filterMetal, filterCategory, searchQuery, selectedKarat, maxPrice, sortBy]);

  const handleResetFilters = () => {
    setFilterMetal('All');
    setFilterCategory('All');
    setSearchQuery('');
    setSelectedKarat('All');
    setMaxPrice(300000);
    setSortBy('featured');
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Breadcrumbs */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] uppercase tracking-[0.25em] text-rosegold-600 font-bold">
            The Royal Catalog
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-rosewood-900 mt-1 font-normal">
            {filterMetal === 'All' ? 'All Precious Collections' : `${filterMetal} Jewellery`}
          </h1>
          <p className="text-xs text-rosewood-600 mt-2 font-light">
            Explore 100% BIS Hallmarked gold, certified solitaires, and heirloom handcrafted treasures.
          </p>
        </div>

        {/* Metal Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
          {METALS.map((metal) => (
            <button
              key={metal}
              onClick={() => setFilterMetal(metal)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 shrink-0 border ${
                filterMetal === metal
                  ? 'bg-rosewood-900 text-ivory-50 border-rosewood-900 shadow-md shadow-rosewood-900/10'
                  : 'bg-white text-rosewood-800 border-ivory-300 hover:border-rosegold-400 hover:bg-rosegold-50'
              }`}
            >
              {metal === 'Fashion / Heritage' ? 'Kundan & Polki' : metal}
            </button>
          ))}
        </div>

        {/* Top Control Bar: Total Count, Search, Sort & Filter Drawer Toggle */}
        <div className="bg-white p-4 rounded-2xl border border-ivory-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Result Count */}
          <div className="text-xs text-rosewood-700 font-medium">
            Showing <strong className="text-rosewood-900 font-bold">{filteredProducts.length}</strong> heirloom designs
          </div>

          {/* Search in Catalog */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search by name, weight, style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-ivory-100 border border-ivory-300 rounded-xl text-rosewood-900 focus:outline-none focus:border-rosegold-400"
            />
            <Search className="w-3.5 h-3.5 text-rosewood-400 absolute left-3 top-2.5 pointer-events-none" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-rosewood-400 hover:text-rosewood-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sorting & Filter toggle */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            
            {/* Sort Dropdown */}
            <div className="relative flex items-center gap-1.5 text-xs text-rosewood-700">
              <span className="hidden sm:inline font-medium">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-ivory-100 border border-ivory-300 rounded-xl px-3 py-2 text-xs font-semibold text-rosewood-900 focus:outline-none focus:border-rosegold-400 cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden p-2 rounded-xl bg-ivory-100 text-rosewood-800 border border-ivory-300 flex items-center gap-1 text-xs font-semibold"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-rosegold-600" />
              <span>Filters</span>
            </button>

          </div>

        </div>

        {/* Main Grid & Desktop Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Desktop Sidebar Filters */}
          <div className={`lg:col-span-3 space-y-6 bg-white p-6 rounded-3xl border border-ivory-200/90 shadow-sm ${
            showMobileFilters ? 'block' : 'hidden lg:block'
          }`}>
            
            <div className="flex items-center justify-between pb-4 border-b border-ivory-200">
              <div className="flex items-center gap-2 font-serif text-lg font-medium text-rosewood-900">
                <SlidersHorizontal className="w-4 h-4 text-rosegold-600" />
                <span>Refine Selection</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-[11px] text-rosegold-600 hover:underline flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-2.5">
              <h4 className="text-xs uppercase font-bold tracking-wider text-rosewood-700">
                Jewellery Type
              </h4>
              <div className="space-y-1 text-xs">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-xl transition flex items-center justify-between ${
                      filterCategory === cat
                        ? 'bg-rosegold-50 text-rosegold-700 font-bold border border-rosegold-200'
                        : 'text-rosewood-700 hover:bg-ivory-100'
                    }`}
                  >
                    <span>{cat}</span>
                    {filterCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-rosegold-600"></span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Karat / Purity Filter (for Gold & Solitaires) */}
            <div className="space-y-2.5 pt-4 border-t border-ivory-200">
              <h4 className="text-xs uppercase font-bold tracking-wider text-rosewood-700">
                Gold Karat Purity
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['All', '24', '22', '18'].map((k) => (
                  <button
                    key={k}
                    onClick={() => setSelectedKarat(k)}
                    className={`py-2 px-3 rounded-xl border text-center font-semibold transition ${
                      selectedKarat === k
                        ? 'bg-rosewood-900 text-white border-rosewood-900'
                        : 'bg-ivory-50 text-rosewood-800 border-ivory-300 hover:border-rosegold-400'
                    }`}
                  >
                    {k === 'All' ? 'All Karats' : `${k}K (${k === '24' ? '999' : k === '22' ? '916' : '750'})`}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-3 pt-4 border-t border-ivory-200">
              <div className="flex justify-between items-center text-xs">
                <span className="uppercase font-bold tracking-wider text-rosewood-700">
                  Max Price
                </span>
                <span className="font-serif font-bold text-sm text-rosegold-700">
                  ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min={2000}
                max={300000}
                step={5000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full accent-rosegold-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-rosewood-400">
                <span>₹2,000</span>
                <span>₹3,00,000+</span>
              </div>
            </div>

            {/* Hallmark Assurance card */}
            <div className="p-4 rounded-2xl bg-ivory-100 border border-ivory-200 text-xs space-y-1.5 text-rosewood-700">
              <div className="flex items-center gap-1.5 font-bold text-rosewood-900">
                <Sparkles className="w-3.5 h-3.5 text-rosegold-600" />
                <span>The Suvarna Pledge</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Zero synthetic or lab-grown mixing. 100% natural diamonds with laser-inscribed girdle numbers.
              </p>
            </div>

          </div>

          {/* Right Product Grid */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-ivory-200 space-y-4">
                <div className="w-16 h-16 rounded-full bg-ivory-100 flex items-center justify-center mx-auto text-rosewood-400">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-normal text-rosewood-900">
                  No matching jewellery pieces found
                </h3>
                <p className="text-xs text-rosewood-600 max-w-sm mx-auto">
                  Try adjusting your price range or clearing search keywords to view our complete fine catalogue.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-full bg-rosewood-900 text-white text-xs uppercase tracking-wider font-semibold hover:bg-rosegold-600 transition"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
