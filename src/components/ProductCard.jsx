import React from 'react';
import { useDispatch } from 'react-redux';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { addToCart } from '../features/cart/cartSlice';
import { setSelectedProductId } from '../features/products/productsSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const handleOpenDetails = () => {
    dispatch(setSelectedProductId(product.id));
  };

  return (
    <div 
      onClick={handleOpenDetails}
      className="group relative flex flex-col bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Category Tag */}
      <div className="absolute top-3 left-3 z-10">
        <span className="px-2.5 py-1 text-[11px] font-semibold capitalize rounded-full bg-slate-900/80 backdrop-blur-md text-white shadow-sm">
          {product.category}
        </span>
      </div>

      {/* Quick View Floating Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleOpenDetails();
        }}
        title="Quick view"
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-md text-slate-700 shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-600 hover:text-white"
      >
        <Eye className="w-4 h-4" />
      </button>

      {/* Image Container with White Background for FakeStore API products */}
      <div className="w-full h-56 p-6 flex items-center justify-center bg-white group-hover:scale-105 transition-transform duration-500 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain filter group-hover:brightness-95"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col justify-between border-t border-slate-100 bg-slate-50/30">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="text-xs font-bold text-slate-800">
              {product.rating?.rate || '4.0'}
            </span>
            <span className="text-[11px] text-slate-400">
              ({product.rating?.count || 100})
            </span>
          </div>

          {/* Title */}
          <h3 
            className="font-bold text-slate-800 text-sm line-clamp-2 leading-snug group-hover:text-indigo-600 transition"
            title={product.title}
          >
            {product.title}
          </h3>
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Price</span>
            <span className="text-lg font-extrabold text-slate-900">
              ${Number(product.price).toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-500/20 transition"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
