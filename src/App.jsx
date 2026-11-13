import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Sparkles, 
  RotateCcw, 
  Filter, 
  SlidersHorizontal, 
  AlertCircle, 
  Layers, 
  Star, 
  Tag, 
  Award,
  ChevronDown
} from 'lucide-react';
import { 
  fetchProducts, 
  selectAllProducts, 
  selectFilteredProducts, 
  selectProductsStatus, 
  selectProductsError,
  selectSelectedCategory, 
  setSelectedCategory,
  selectCategories,
  selectSortBy,
  setSortBy,
  selectPriceRange,
  setPriceRange,
  selectMinRating,
  setMinRating,
  resetFilters
} from './features/products/productsSlice';

import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductDetailsModal from './components/ProductDetailsModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderHistoryModal from './components/OrderHistoryModal';
import LoginModal from './components/LoginModal';
import ReduxInspector from './components/ReduxInspector';
import TestSuiteModal from './components/TestSuiteModal';
import StudentFooter from './components/StudentFooter';

export default function App() {
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);
  const allProducts = useSelector(selectAllProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);
  const categories = useSelector(selectCategories);
  const selectedCategory = useSelector(selectSelectedCategory);
  const sortBy = useSelector(selectSortBy);
  const priceRange = useSelector(selectPriceRange);
  const minRating = useSelector(selectMinRating);

  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [isTestsOpen, setIsTestsOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-indigo-500 selection:text-white">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white text-xs py-2 px-4 text-center font-medium shadow-sm flex items-center justify-center gap-2">
        <Award className="w-3.5 h-3.5 text-amber-400" />
        <span>
          Techno India University • Redux Toolkit Assignment 12 • Student: <strong className="font-extrabold text-amber-300">Sreeja Sanyal (BCA)</strong> • ID: 231001102019
        </span>
      </div>

      {/* Main Navbar */}
      <Navbar 
        onOpenInspector={() => setIsInspectorOpen(true)}
        onOpenTests={() => setIsTestsOpen(true)}
      />

      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-950 text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute left-10 bottom-0 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="space-y-4 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-indigo-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Modern Redux Toolkit E-Commerce</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Curated Products for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-blue-200 to-white">Next-Gen Shopping</span>
            </h1>
            <p className="text-sm sm:text-base text-indigo-200/90 leading-relaxed font-normal">
              Featuring dynamic product catalog from Fake Store API, normalized state with <code className="text-white font-mono bg-white/10 px-1 py-0.5 rounded">createEntityAdapter</code>, real-time memoized cart calculations, coupon discounts, and order lifecycle.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <button
                onClick={() => setIsInspectorOpen(true)}
                className="px-4 py-2 bg-white text-slate-900 hover:bg-indigo-50 font-bold text-xs rounded-xl shadow-lg transition"
              >
                Inspect Redux State & Actions
              </button>
              <button
                onClick={() => setIsTestsOpen(true)}
                className="px-4 py-2 bg-indigo-700/60 hover:bg-indigo-700 border border-indigo-400/40 text-white font-bold text-xs rounded-xl transition"
              >
                Run RTK Automated Tests
              </button>
            </div>
          </div>

          {/* Student Profile Quick Badge */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex items-center gap-4 max-w-sm w-full shadow-2xl">
            <img 
              src="/student-id.jpg" 
              alt="Sreeja Sanyal" 
              className="w-16 h-20 object-cover rounded-xl border-2 border-indigo-300 shadow-md flex-shrink-0" 
            />
            <div className="text-left text-xs space-y-1">
              <span className="px-2 py-0.5 bg-indigo-500/40 rounded text-[10px] font-bold uppercase tracking-wider text-indigo-200">
                Course Assignment
              </span>
              <h4 className="font-extrabold text-white text-sm">Sreeja Sanyal</h4>
              <p className="text-indigo-200 font-medium text-[11px]">BCA(H) • ID: 231001102019</p>
              <p className="text-indigo-300 text-[10px]">Techno India University, WB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills Navigation */}
      <div className="bg-white border-b border-slate-200/80 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => dispatch(setSelectedCategory(cat))}
                className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* FILTER SIDEBAR (DESKTOP) */}
          <aside className="hidden lg:block lg:col-span-1 space-y-6 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm h-fit sticky top-36">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <Filter className="w-4 h-4 text-indigo-600" /> Filter & Sort
              </h3>
              <button
                onClick={() => dispatch(resetFilters())}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">Sort By</label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => dispatch(setSortBy(e.target.value))}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer"
                >
                  <option value="featured">Featured / Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Highest Rated</option>
                  <option value="title-asc">Product Name (A-Z)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-700">Max Price</label>
                <span className="font-extrabold text-indigo-600">${priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                step="25"
                value={priceRange[1]}
                onChange={(e) => dispatch(setPriceRange([priceRange[0], Number(e.target.value)]))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>$0</span>
                <span>$500</span>
                <span>$1000</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">Minimum Rating</label>
              <div className="space-y-1.5">
                {[0, 3, 4, 4.5].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => dispatch(setMinRating(rate))}
                    className={`w-full px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition ${
                      minRating === rate
                        ? 'bg-amber-50 text-amber-900 border border-amber-300 font-bold'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <Star className={`w-3.5 h-3.5 ${rate > 0 ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
                      {rate === 0 ? 'All Ratings' : `${rate} Stars & Above`}
                    </span>
                    {minRating === rate && <span className="text-amber-600 text-xs">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Active filters status indicator */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-[11px] space-y-1">
              <div className="flex justify-between">
                <span>Total Catalog:</span>
                <span className="font-bold text-slate-700">{allProducts.length} items</span>
              </div>
              <div className="flex justify-between">
                <span>Filtered Results:</span>
                <span className="font-bold text-indigo-600">{products.length} items</span>
              </div>
            </div>
          </aside>

          {/* PRODUCTS SECTION */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Header / Subtotal & Results count */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  {selectedCategory === 'all' ? 'All Products' : selectedCategory.toUpperCase()}
                </h2>
                <p className="text-xs text-slate-500">
                  Showing {products.length} of {allProducts.length} items with Redux memoized filter
                </p>
              </div>

              {/* Mobile Filter Toggle Button */}
              <button
                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                className="lg:hidden flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-sm"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600" />
                <span>Filters & Sorting</span>
              </button>
            </div>

            {/* Mobile Filters Dropdown */}
            {isMobileFiltersOpen && (
              <div className="lg:hidden p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => dispatch(setSortBy(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="featured">Featured / Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating-desc">Highest Rated</option>
                    <option value="title-asc">Product Name (A-Z)</option>
                  </select>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bold text-slate-700">Max Price:</span>
                    <span className="font-bold text-indigo-600">${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="25"
                    value={priceRange[1]}
                    onChange={(e) => dispatch(setPriceRange([priceRange[0], Number(e.target.value)]))}
                    className="w-full accent-indigo-600"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => dispatch(resetFilters())}
                    className="text-xs text-indigo-600 font-bold"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            )}

            {/* LOADING STATE */}
            {status === 'loading' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200 animate-pulse space-y-3">
                    <div className="w-full h-48 bg-slate-200 rounded-xl" />
                    <div className="h-4 bg-slate-200 rounded w-3/4" />
                    <div className="h-4 bg-slate-200 rounded w-1/2" />
                    <div className="h-8 bg-slate-200 rounded-xl mt-4" />
                  </div>
                ))}
              </div>
            )}

            {/* ERROR STATE */}
            {status === 'failed' && (
              <div className="p-6 rounded-3xl bg-amber-50 border border-amber-200 text-center space-y-3">
                <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
                <h3 className="font-bold text-amber-900">API Notice: Using Offline Cached Products</h3>
                <p className="text-xs text-amber-700 max-w-md mx-auto">
                  {error}. The application gracefully activated the built-in 20-item Mock Catalog so testing and shopping remain fully functional!
                </p>
                <button
                  onClick={() => dispatch(fetchProducts())}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md transition"
                >
                  Retry Fetching External API
                </button>
              </div>
            )}

            {/* EMPTY STATE */}
            {status === 'succeeded' && products.length === 0 && (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Tag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">No products match your criteria</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Try adjusting the price slider, changing category, or resetting your search keywords.
                </p>
                <button
                  onClick={() => dispatch(resetFilters())}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-md"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* PRODUCT GRID */}
            {products.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

          </div>

        </div>
      </main>

      {/* MODALS & DRAWERS */}
      <ProductDetailsModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderHistoryModal />
      <LoginModal />
      <ReduxInspector 
        isOpen={isInspectorOpen} 
        onClose={() => setIsInspectorOpen(false)} 
      />
      <TestSuiteModal 
        isOpen={isTestsOpen} 
        onClose={() => setIsTestsOpen(false)} 
      />

      {/* VERIFIED STUDENT FOOTER */}
      <StudentFooter />
    </div>
  );
}
