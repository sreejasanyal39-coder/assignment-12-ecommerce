import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  X, 
  Check, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  ShoppingBag, 
  ArrowRight, 
  ArrowLeft, 
  Lock, 
  Sparkles,
  UserCheck
} from 'lucide-react';
import { 
  selectIsCheckoutOpen, 
  setCheckoutOpen, 
  placeOrder, 
  selectCurrentOrder, 
  clearCurrentOrder 
} from '../features/orders/ordersSlice';
import { 
  selectCartItems, 
  selectCartSubtotal, 
  selectCartDiscount, 
  selectCartTax, 
  selectCartFinalPrice, 
  clearCart 
} from '../features/cart/cartSlice';
import { selectCurrentUser, selectIsAuthenticated, login } from '../features/auth/authSlice';

export default function CheckoutModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsCheckoutOpen);
  const currentOrder = useSelector(selectCurrentOrder);
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const discount = useSelector(selectCartDiscount);
  const tax = useSelector(selectCartTax);
  const finalPrice = useSelector(selectCartFinalPrice);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Confirmation
  const [shipping, setShipping] = useState({
    fullName: user?.name || 'Sreeja Sanyal',
    email: user?.email || 'sreeja.sanyal@technoindia.edu.in',
    phone: '7003021997',
    address: 'Techno India University Campus, EM-4/1, Sector-V, Salt Lake',
    city: 'Kolkata',
    state: 'West Bengal',
    pincode: '700091',
  });

  const [paymentMethod, setPaymentMethod] = useState('upi'); // upi, card, cod

  if (!isOpen && !currentOrder) return null;

  const handleClose = () => {
    dispatch(setCheckoutOpen(false));
    dispatch(clearCurrentOrder());
    setStep(1);
  };

  const handleAutoLogin = () => {
    dispatch(login({
      name: 'Sreeja Sanyal',
      email: 'sreeja.sanyal@technoindia.edu.in'
    }));
  };

  const handlePlaceOrder = () => {
    dispatch(placeOrder({
      items,
      subtotal,
      discount,
      tax,
      finalPrice,
      shippingAddress: shipping,
      paymentMethod,
      user: user || { name: 'Sreeja Sanyal', studentId: '231001102019' },
    }));
    dispatch(clearCart());
    setStep(3); // Confirmation
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-scale-up max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ORDER CONFIRMATION SCREEN (STEP 3) */}
        {step === 3 && currentOrder ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700">
                Order Confirmed!
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                Thank You for Your Order!
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Order ID: <span className="font-mono font-bold text-slate-800">{currentOrder.id}</span>
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left space-y-3">
              <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-200">
                <span className="text-slate-500">Student & Customer</span>
                <span className="font-bold text-slate-800">{currentOrder.user.name} ({shipping.phone})</span>
              </div>
              <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-200">
                <span className="text-slate-500">Delivery Address</span>
                <span className="font-medium text-slate-700 text-right max-w-xs">{shipping.address}, {shipping.city} - {shipping.pincode}</span>
              </div>
              <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-200">
                <span className="text-slate-500">Payment Simulation</span>
                <span className="font-bold text-indigo-600 uppercase">{currentOrder.paymentMethod} (Authorized)</span>
              </div>
              <div className="flex justify-between items-center text-sm font-extrabold text-slate-900 pt-1">
                <span>Total Paid</span>
                <span className="text-indigo-600">${currentOrder.finalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Step indicator header */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Checkout Workflow</h2>
                  <p className="text-xs text-slate-500">Assignment 12 Protected Checkout Flow</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Step {step} of 2</span>
                </div>
              </div>

              {/* Authentication check notice */}
              {!isAuthenticated && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between text-xs text-amber-800">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <span>Protected Route: You are continuing as guest or simulate student login.</span>
                  </div>
                  <button
                    onClick={handleAutoLogin}
                    className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition text-[11px]"
                  >
                    Quick Login as Sreeja
                  </button>
                </div>
              )}
            </div>

            {/* STEP 1: SHIPPING INFORMATION */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-indigo-600" /> Shipping & Delivery Information
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      value={shipping.fullName}
                      onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-indigo-500 font-semibold text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={shipping.phone}
                      onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-indigo-500 font-semibold text-slate-800"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-slate-600 font-medium mb-1">Email Address</label>
                    <input
                      type="email"
                      value={shipping.email}
                      onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-indigo-500 font-semibold text-slate-800"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-slate-600 font-medium mb-1">Address</label>
                    <input
                      type="text"
                      value={shipping.address}
                      onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-indigo-500 font-semibold text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">City</label>
                    <input
                      type="text"
                      value={shipping.city}
                      onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-indigo-500 font-semibold text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-medium mb-1">PIN Code</label>
                    <input
                      type="text"
                      value={shipping.pincode}
                      onChange={(e) => setShipping({ ...shipping, pincode: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-indigo-500 font-semibold text-slate-800"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: PAYMENT & CONFIRMATION */}
            {step === 2 && (
              <div className="space-y-5">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-indigo-600" /> Select Payment Simulation
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between ${
                      paymentMethod === 'upi' ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-slate-900">Instant UPI</div>
                    <div className="text-[11px] text-slate-500 mt-1">GPay / PhonePe / Paytm</div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between ${
                      paymentMethod === 'card' ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-slate-900">Credit / Debit Card</div>
                    <div className="text-[11px] text-slate-500 mt-1">Visa / Mastercard / RuPay</div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between ${
                      paymentMethod === 'cod' ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-slate-900">Cash on Delivery</div>
                    <div className="text-[11px] text-slate-500 mt-1">Pay when item arrives</div>
                  </div>
                </div>

                {/* Order Summary box */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <div className="font-bold text-slate-800 pb-1 border-b border-slate-200">
                    Order Summary ({items.length} items)
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Discount:</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Tax (5%):</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-1 border-t border-slate-200">
                    <span>Total Amount Payable:</span>
                    <span className="text-indigo-600 text-base">${finalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold transition"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>

                  <button
                    onClick={handlePlaceOrder}
                    className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/25 transition active:scale-98"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Authorize & Place Order</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

