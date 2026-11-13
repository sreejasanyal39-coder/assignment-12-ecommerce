import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import cartReducer from '../features/cart/cartSlice';
import authReducer from '../features/auth/authSlice';
import ordersReducer from '../features/orders/ordersSlice';
import { customLoggerMiddleware } from '../middleware/loggerMiddleware';
import { saveCartState } from '../services/localStorage';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customLoggerMiddleware),
});

// Subscribe to store updates to persist cart state automatically
let prevCartState = store.getState().cart;
store.subscribe(() => {
  const currentCartState = store.getState().cart;
  if (currentCartState !== prevCartState) {
    saveCartState({
      items: currentCartState.items,
      coupon: currentCartState.coupon,
      isOpen: false,
    });
    prevCartState = currentCartState;
  }
});

export default store;

