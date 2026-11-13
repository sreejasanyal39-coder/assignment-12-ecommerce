import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  ShoppingBag, 
  Search, 
  User, 
  LogOut, 
  Clock, 
  Terminal, 
  CheckCircle2, 
  SlidersHorizontal,
  GraduationCap
} from 'lucide-react';
import { selectCartItemCount, toggleCart } from '../features/cart/cartSlice';
import { 
  selectSearchQuery, 
  setSearchQuery, 
  selectSelectedCategory, 
  setSelectedCategory,
  selectCategories,
  resetFilters 
} from '../features/products/productsSlice';
import { selectCurrentUser, selectIsAuthenticated, logout, setLoginModalOpen } from '../features/auth/authSlice';
import { setOrderHistoryOpen } from '../features/orders/ordersSlice';

export default function Navbar({ onOpenInspector, onOpenTests }) {
  const dispatch = useDispatch();
  const itemCount = useSelector(selectCartItemCount);
  const searchQuery = useSelector(selectSearchQuery);
  const selectedCategory = useSelector(selectSelectedCategory);
  const categories = useSelector(selectCategories);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Student Sub-Brand */}
          <div className="flex items-center gap-3 cursor-pointer flex-shrink-0" onClick={() => dispatch(resetFilters())}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-900 bg-clip-text text-transparent">
                  NexStore
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                  RTK
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                <GraduationCap className="w-3 h-3 text-indigo-600" /> Sreeja Sanyal • BCA(H)
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search products by title or keyword..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className="w-full pl-9 pr-4 py-2 bg-slate-100 hover:bg-slate-100/80 focus:bg-white text-sm rounded-xl border border-transparent focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
              />
              {searchQuery && (
                <button 
                  onClick={() => dispatch(setSearchQuery(''))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Navigation & Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Redux Inspector Toggle */}
            <button
              onClick={onOpenInspector}
              title="Redux Action Inspector (View Dispatched Actions & State Tree)"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition"
            >
              <Terminal className="w-3.5 h-3.5 text-indigo-600" />
              <span>Redux Live</span>
            </button>

            {/* Test Suite Runner Button */}
            <button
              onClick={onOpenTests}
              title="Run Automated Redux Tests"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>RTK Tests</span>
            </button>

            {/* Orders History Button */}
            <button
              onClick={() => dispatch(setOrderHistoryOpen(true))}
              title="View Order History"
              className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition"
            >
              <Clock className="w-5 h-5" />
            </button>

            {/* Cart Button */}
            <button
              onClick={() => dispatch(toggleCart())}
              className="relative p-2 text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-xl transition"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1 bg-indigo-600 text-white text-[11px] font-extrabold rounded-full shadow-sm animate-pulse">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Auth Button */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-indigo-300 ring-2 ring-indigo-50 flex items-center justify-center bg-indigo-100">
                  <img src="/student-id.jpg" alt="Sreeja Sanyal" className="w-full h-full object-cover" />
                </div>
                <div className="hidden xl:block text-left">
                  <p className="text-xs font-bold text-slate-800 leading-none">Sreeja Sanyal</p>
                  <p className="text-[10px] text-indigo-600 font-medium">BCA Student</p>
                </div>
                <button
                  onClick={() => dispatch(logout())}
                  title="Logout simulated session"
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => dispatch(setLoginModalOpen(true))}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm transition"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
            )}

          </div>

        </div>

        {/* Mobile Search input */}
        <div className="md:hidden py-2 border-t border-slate-100">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-100 text-xs rounded-lg border-none focus:ring-1 focus:ring-indigo-400"
            />
          </div>
        </div>

      </div>
    </header>
  );
}

