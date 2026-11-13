import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Check, 
  ShieldAlert, 
  CheckCircle2 
} from 'lucide-react';
import { 
  selectCartItems, 
  selectCartSubtotal, 
  selectCartDiscount, 
  selectCartTax, 
  selectCartFinalPrice, 
  selectCartCoupon, 
  selectIsCartOpen, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  applyCoupon, 
  removeCoupon, 
  setCartOpen 
} from '../features/cart/cartSlice';
import { setCheckoutOpen } from '../features/orders/ordersSlice';
import { selectIsAuthenticated, setLoginModalOpen } from '../features/auth/authSlice';

export default function CartDrawer() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsCartOpen);
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const discount = useSelector(selectCartDiscount);
  const tax = useSelector(selectCartTax);
  const finalPrice = useSelector(selectCartFinalPrice);
  const coupon = useSelector(selectCartCoupon);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (code === 'TECHNO20' || code === 'SREEJA20' || code === 'WELCOME10') {
      dispatch(applyCoupon(code));
      setCouponCode('');
    } else {
      setCouponError('Invalid coupon code. Try TECHNO20 or WELCOME10');
    }
  };

  const handleProceedToCheckout = () => {
    if (items.length === 0) return;
    dispatch(setCartOpen(false));
    dispatch(setCheckoutOpen(true));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => dispatch(setCartOpen(false))}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-indigo-600" />
              <h2 className="font-extrabold text-slate-800 text-lg">Shopping Cart</h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => dispatch(setCartOpen(false))}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-slate-700">Your cart is empty</h3>
                <p className="text-xs text-slate-400 max-w-xs">
                  Browse products and add items to your cart. Cart state is persisted across page refreshes!
                </p>
                <button
                  onClick={() => dispatch(setCartOpen(false))}
                  className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-indigo-700 transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div 
                  key={item.id} 
                  className="flex gap-4 p-3 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:border-indigo-200 transition"
                >
                  <div className="w-16 h-16 bg-white rounded-xl p-2 flex items-center justify-center flex-shrink-0 border border-slate-100">
                    <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-slate-800 line-clamp-1">{item.title}</h4>
                      <p className="text-xs text-indigo-600 font-extrabold mt-0.5">${Number(item.price).toFixed(2)}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden shadow-xs">
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                          className="px-2 py-1 text-slate-600 hover:bg-slate-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-800">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                          className="px-2 py-1 text-slate-600 hover:bg-slate-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-slate-400 hover:text-rose-600 p-1 transition"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Calculations */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50/50 space-y-3">
              
              {/* Promo code */}
              <form onSubmit={handleApplyCoupon} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Coupon: TECHNO20"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded-lg border border-slate-200 focus:outline-none focus:border-indigo-500 uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg transition"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-[11px] text-rose-500">{couponError}</p>}
                
                {coupon && (
                  <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-700 p-2 rounded-lg border border-emerald-200">
                    <span className="flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {coupon.label} ({coupon.code})
                    </span>
                    <button
                      type="button"
                      onClick={() => dispatch(removeCoupon())}
                      className="text-xs text-emerald-800 hover:underline font-bold"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </form>

              {/* Calculations breakdown */}
              <div className="space-y-1.5 text-xs border-t border-slate-200 pt-3">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount (Promo)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Tax (5% GST)</span>
                  <span className="font-semibold text-slate-800">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-slate-900 border-t border-slate-200 pt-2">
                  <span>Total Amount</span>
                  <span className="text-indigo-600 text-base">${finalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition active:scale-98"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                  <button
                    onClick={() => dispatch(clearCart())}
                    className="hover:text-rose-600 transition"
                  >
                    Clear Cart
                  </button>
                  <span>Persistent Storage Enabled</span>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

