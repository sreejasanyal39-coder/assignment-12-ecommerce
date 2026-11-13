import { createSlice } from '@reduxjs/toolkit';
import { loadOrdersState, saveOrdersState } from '../../services/localStorage';

const initialOrders = loadOrdersState();

const initialState = {
  orders: initialOrders || [],
  currentOrder: null,
  isCheckoutOpen: false,
  isOrderHistoryOpen: false,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    placeOrder(state, action) {
      const { items, subtotal, discount, tax, finalPrice, shippingAddress, paymentMethod, user } = action.payload;
      const order = {
        id: 'TIU-' + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toISOString(),
        items,
        subtotal,
        discount,
        tax,
        finalPrice,
        shippingAddress,
        paymentMethod,
        user: user || { name: 'Sreeja Sanyal' },
        status: 'Confirmed',
      };
      state.orders.unshift(order);
      state.currentOrder = order;
      saveOrdersState(state.orders);
    },
    clearCurrentOrder(state) {
      state.currentOrder = null;
    },
    setCheckoutOpen(state, action) {
      state.isCheckoutOpen = action.payload;
    },
    setOrderHistoryOpen(state, action) {
      state.isOrderHistoryOpen = action.payload;
    }
  },
});

export const {
  placeOrder,
  clearCurrentOrder,
  setCheckoutOpen,
  setOrderHistoryOpen,
} = ordersSlice.actions;

export default ordersSlice.reducer;

export const selectOrders = (state) => state.orders.orders;
export const selectCurrentOrder = (state) => state.orders.currentOrder;
export const selectIsCheckoutOpen = (state) => state.orders.isCheckoutOpen;
export const selectIsOrderHistoryOpen = (state) => state.orders.isOrderHistoryOpen;

