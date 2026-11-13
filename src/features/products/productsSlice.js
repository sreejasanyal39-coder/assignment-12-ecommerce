import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { MOCK_PRODUCTS } from '../../services/mockProducts';

// createEntityAdapter to normalize and manage product entities
export const productsAdapter = createEntityAdapter({
  selectId: (product) => product.id,
  sortComparer: (a, b) => a.id - b.id,
});

// createAsyncThunk to fetch products from Fake Store API with fallback
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      
      const response = await fetch('https://fakestoreapi.com/products', {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Server returned status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.warn('API fetch failed or timed out, loading fallback mock catalog:', err.message);
      // Fallback mock catalog with 20 items ensures robustness offline or in restricted environments
      return MOCK_PRODUCTS;
    }
  }
);

const initialState = productsAdapter.getInitialState({
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  selectedCategory: 'all',
  searchQuery: '',
  sortBy: 'featured', // 'featured' | 'price-asc' | 'price-desc' | 'rating-desc' | 'title-asc'
  priceRange: [0, 1000],
  minRating: 0,
  selectedProductId: null,
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setPriceRange(state, action) {
      state.priceRange = action.payload;
    },
    setMinRating(state, action) {
      state.minRating = action.payload;
    },
    setSelectedProductId(state, action) {
      state.selectedProductId = action.payload;
    },
    resetFilters(state) {
      state.selectedCategory = 'all';
      state.searchQuery = '';
      state.sortBy = 'featured';
      state.priceRange = [0, 1000];
      state.minRating = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // Handle fulfilled state
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        productsAdapter.setAll(state, action.payload);
      })
      // Handle rejected state
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
        // If rejected, still seed fallback to keep app functional
        productsAdapter.setAll(state, MOCK_PRODUCTS);
      });
  },
});

export const {
  setSelectedCategory,
  setSearchQuery,
  setSortBy,
  setPriceRange,
  setMinRating,
  setSelectedProductId,
  resetFilters,
} = productsSlice.actions;

export default productsSlice.reducer;

// Base adapter selectors
export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
  selectTotal: selectTotalProducts,
} = productsAdapter.getSelectors((state) => state.products);

// Simple state selectors
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
export const selectSelectedCategory = (state) => state.products.selectedCategory;
export const selectSearchQuery = (state) => state.products.searchQuery;
export const selectSortBy = (state) => state.products.sortBy;
export const selectPriceRange = (state) => state.products.priceRange;
export const selectMinRating = (state) => state.products.minRating;
export const selectSelectedProductId = (state) => state.products.selectedProductId;

export const selectActiveProduct = createSelector(
  [selectAllProducts, selectSelectedProductId],
  (products, selectedId) => products.find((p) => p.id === selectedId) || null
);

// Memoized Selector: unique categories
export const selectCategories = createSelector(
  [selectAllProducts],
  (products) => {
    const cats = new Set(products.map((p) => p.category));
    return ['all', ...Array.from(cats)];
  }
);

// Memoized Selector: Filtered and Sorted products
export const selectFilteredProducts = createSelector(
  [
    selectAllProducts,
    selectSelectedCategory,
    selectSearchQuery,
    selectSortBy,
    selectPriceRange,
    selectMinRating,
  ],
  (products, category, searchQuery, sortBy, priceRange, minRating) => {
    return products
      .filter((p) => {
        // Category filter
        if (category !== 'all' && p.category !== category) return false;
        
        // Search query filter
        if (
          searchQuery.trim() !== '' &&
          !p.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.description.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }

        // Price range filter
        if (p.price < priceRange[0] || p.price > priceRange[1]) return false;

        // Min rating filter
        if (p.rating && p.rating.rate < minRating) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating-desc') return (b.rating?.rate || 0) - (a.rating?.rate || 0);
        if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
        return a.id - b.id; // default / featured
      });
  }
);

