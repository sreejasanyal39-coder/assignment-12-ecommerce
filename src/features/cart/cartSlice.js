import { createSlice, createSelector } from '@reduxjs/toolkit';
import { loadCartState } from '../../services/localStorage';

const savedCart = loadCartState();

const initialState = savedCart || {
  items: [], // Array of { id, title, price, image, category, quantity }
  coupon: null, // { code: 'TECHNO20', rate: 0.20, label: '20% Student Discount' }
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const quantityToAdd = action.payload.quantity || 1;
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += quantityToAdd;
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity: quantityToAdd,
        });
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        const item = state.items.find((i) => i.id === id);
        if (item) {
          item.quantity = quantity;
        }
      }
    },
    clearCart(state) {
      state.items = [];
      state.coupon = null;
    },
    applyCoupon(state, action) {
      const code = (action.payload || '').trim().toUpperCase();
      if (code === 'TECHNO20' || code === 'SREEJA20') {
        state.coupon = { code, rate: 0.20, label: '20% TIU Student Discount' };
      } else if (code === 'WELCOME10') {
        state.coupon = { code, rate: 0.10, label: '10% Welcome Discount' };
      } else {
        state.coupon = null;
      }
    },
    removeCoupon(state) {
      state.coupon = null;
    },
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
    setCartOpen(state, action) {
      state.isOpen = action.payload;
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyCoupon,
  removeCoupon,
  toggleCart,
  setCartOpen,
} = cartSlice.actions;

export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartCoupon = (state) => state.cart.coupon;
export const selectIsCartOpen = (state) => state.cart.isOpen;

// Memoized Selector: Total item count
export const selectCartItemCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((sum, item) => sum + item.quantity, 0)
);

// Memoized Selector: Cart Subtotal
export const selectCartSubtotal = createSelector(
  [selectCartItems],
  (items) => items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

// Memoized Selector: Cart Discount
export const selectCartDiscount = createSelector(
  [selectCartSubtotal, selectCartCoupon],
  (subtotal, coupon) => {
    if (!coupon) return 0;
    return subtotal * coupon.rate;
  }
);

// Memoized Selector: Tax (5% GST)
export const selectCartTax = createSelector(
  [selectCartSubtotal, selectCartDiscount],
  (subtotal, discount) => {
    const discountedTotal = Math.max(0, subtotal - discount);
    return discountedTotal * 0.05; // 5% standard tax
  }
);

// Memoized Selector: Final Total
export const selectCartFinalPrice = createSelector(
  [selectCartSubtotal, selectCartDiscount, selectCartTax],
  (subtotal, discount, tax) => {
    const discounted = Math.max(0, subtotal - discount);
    return Math.round((discounted + tax) * 100) / 100;
  }
);

