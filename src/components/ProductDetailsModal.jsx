import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, Star, ShoppingCart, ShieldCheck, Truck, RotateCcw, Plus, Minus, Check } from 'lucide-react';
import { selectActiveProduct, setSelectedProductId } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';

export default function ProductDetailsModal() {
  const dispatch = useDispatch();
  const product = useSelector(selectActiveProduct);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleClose = () => {
    dispatch(setSelectedProductId(null));
    setQuantity(1);
    setAdded(false);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-scale-up max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-slate-700 bg-white/80 hover:bg-slate-100 rounded-full transition shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Section */}
        <div className="md:w-1/2 p-8 flex items-center justify-center bg-slate-50 border-b md:border-b-0 md:border-r border-slate-100">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-72 max-w-full object-contain filter hover:scale-105 transition duration-300"
          />
        </div>

        {/* Product Details Section */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-indigo-50 text-indigo-700 uppercase tracking-wide">
                {product.category}
              </span>
              <div className="flex items-center text-amber-500 text-xs font-bold gap-1 ml-auto">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.rating?.rate}</span>
                <span className="text-slate-400 font-normal">({product.rating?.count} reviews)</span>
              </div>
            </div>

            <h2 className="text-xl font-extrabold text-slate-900 leading-snug">
              {product.title}
            </h2>

            <div className="mt-3 text-2xl font-black text-indigo-600">
              ${Number(product.price).toFixed(2)}
            </div>

            <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
              {product.description}
            </p>

            {/* Quality assurances */}
            <div className="mt-4 grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-slate-600 text-[11px]">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-indigo-600" />
                <span>Free Express</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-indigo-600" />
                <span>30-Day Returns</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                <span>Authentic</span>
              </div>
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="mt-6 pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Quantity:</span>
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-slate-600 hover:bg-slate-200 transition"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-sm font-bold text-slate-800">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-slate-600 hover:bg-slate-200 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition duration-200 ${
                added 
                  ? 'bg-emerald-600 text-white shadow-emerald-500/25' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/25 active:scale-98'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" /> Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" /> Add to Cart • ${(product.price * quantity).toFixed(2)}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
