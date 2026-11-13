# Assignment 12: Redux Toolkit E-Commerce Application

**🌐 Live Demo:** [https://assignment-12-ecommerce-three.vercel.app](https://assignment-12-ecommerce-three.vercel.app)  
**📦 GitHub Repository:** [https://github.com/sreejasanyal39-coder/assignment-12-ecommerce](https://github.com/sreejasanyal39-coder/assignment-12-ecommerce)  

**Submitted By:** Sreeja Sanyal  
**Student ID:** 231001102019  
**Program:** BCA(H)  
**Institution:** Techno India University, West Bengal  
**Contact:** 7003021997  
**Valid Till:** 15/09/2026  

---

## 🚀 Features & Redux Toolkit Architecture

This project strictly implements every single requirement outlined in **Assignment 12**:

1. **`configureStore()`**: Configures the root store integrating `products`, `cart`, `auth`, and `orders` slices alongside custom action logging middleware.
2. **`createSlice()`**:
   - `cartSlice`: Manages cart items, coupon application (`TECHNO20`, `WELCOME10`), quantity updates, and clear operations.
   - `authSlice`: Manages simulated authentication sessions, student login state, and protected views.
   - `ordersSlice`: Manages checkout workflows, active orders, and historical orders.
3. **`createEntityAdapter()`**: Normalizes products into an indexed dictionary (`ids` & `entities`) with pre-built selectors (`selectAll`, `selectById`).
4. **`createAsyncThunk()` & `extraReducers`**:
   - `fetchProducts`: Fetches catalog items from Fake Store API (`https://fakestoreapi.com/products`) handling `pending`, `fulfilled`, and `rejected` states with offline fallback resilience.
5. **Memoized Selectors (`createSelector`)**:
   - `selectFilteredProducts`: Multi-faceted filtering (category, search query, price range, minimum rating, and sorting).
   - `selectCartSubtotal`, `selectCartDiscount`, `selectCartTax`, `selectCartFinalPrice`.
6. **Custom Middleware & Dev Inspector**:
   - Custom `loggerMiddleware` logs every dispatched action and state transition.
   - Built-in live **Redux Inspector Drawer** allowing interactive inspection of dispatched actions and state tree.
7. **State Persistence**:
   - Automatically synchronizes cart items and preferences to `localStorage` across page reloads.
8. **Automated RTK Testing Suite**:
   - Interactive in-app unit test runner validating reducers, selectors, and async flows with 100% passing assertions.
9. **Student ID Card & Verified Footer**:
   - Highlights student identity, contact, institutional credentials, and clickable ID card modal.

---

## 🛠️ Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build
```

