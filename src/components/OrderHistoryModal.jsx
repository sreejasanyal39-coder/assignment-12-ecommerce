import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, Clock, PackageCheck, Calendar, ArrowRight } from 'lucide-react';
import { selectOrders, selectIsOrderHistoryOpen, setOrderHistoryOpen } from '../features/orders/ordersSlice';

export default function OrderHistoryModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOrderHistoryOpen);
  const orders = useSelector(selectOrders);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-scale-up max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-extrabold text-slate-800">Order History</h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700">
              {orders.length} Orders
            </span>
          </div>
          <button
            onClick={() => dispatch(setOrderHistoryOpen(false))}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <PackageCheck className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-600">No past orders yet</p>
              <p className="text-xs text-slate-400">Place an order to see its receipt and fulfillment tracking here.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div 
                key={order.id}
                className="bg-slate-50/70 border border-slate-200 rounded-2xl p-4 space-y-3 hover:border-indigo-200 transition"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/80 text-xs">
                  <div>
                    <span className="font-mono font-bold text-slate-800">{order.id}</span>
                    <span className="text-slate-400 ml-2">
                      {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                    {order.status}
                  </span>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 truncate max-w-sm">
                        <span className="font-semibold text-slate-800">{item.quantity}x</span>
                        <span className="text-slate-600 truncate">{item.title}</span>
                      </div>
                      <span className="font-medium text-slate-700 ml-2">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-200/80 text-xs">
                  <span className="text-slate-500">Paid via {order.paymentMethod?.toUpperCase()}</span>
                  <span className="font-extrabold text-indigo-600 text-sm">Total: ${order.finalPrice.toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => dispatch(setOrderHistoryOpen(false))}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
