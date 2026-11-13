const CART_STORAGE_KEY = 'assignment12_cart';
const PREFS_STORAGE_KEY = 'assignment12_prefs';
const ORDERS_STORAGE_KEY = 'assignment12_orders';

export const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem(CART_STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.warn('Could not load cart from localStorage:', err);
    return undefined;
  }
};

export const saveCartState = (cartState) => {
  try {
    const serializedState = JSON.stringify(cartState);
    localStorage.setItem(CART_STORAGE_KEY, serializedState);
  } catch (err) {
    console.warn('Could not save cart to localStorage:', err);
  }
};

export const loadOrdersState = () => {
  try {
    const serialized = localStorage.getItem(ORDERS_STORAGE_KEY);
    return serialized ? JSON.parse(serialized) : [];
  } catch (err) {
    return [];
  }
};

export const saveOrdersState = (orders) => {
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch (err) {
    console.warn('Could not save orders:', err);
  }
};

