import React from 'react';
import { X, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (view: 'home' | 'collection' | 'product', slug?: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose, onNavigate }) => {
  const { items, updateQuantity, removeFromCart, totalAmount, totalItems, clearCart } = useCart();

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/40 z-[60]" onClick={onClose} />
      )}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-5 h-5 text-[#0f172a]" />
              <h2 className="text-lg font-black uppercase tracking-wide text-[#0f172a]">Your Cart ({totalItems})</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <ShoppingCart className="w-16 h-16 text-gray-200 mb-4" />
                <p className="text-lg font-bold text-gray-400 mb-2">Your cart is empty</p>
                <p className="text-sm text-gray-400 mb-6">Browse our wholesale catalog to add items</p>
                <button
                  onClick={() => { onClose(); onNavigate('collection'); }}
                  className="bg-[#dc2626] text-white px-6 py-3 rounded font-bold hover:bg-[#b91c1c] transition-colors"
                >
                  Shop Now
                </button>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {items.map(item => (
                  <div key={item.product.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-20 h-20 bg-white rounded border border-gray-100 p-2 shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-[#0f172a] line-clamp-2 mb-1">{item.product.name}</h4>
                      <p className="text-sm font-black text-[#cc2b1e] mb-2">${item.product.price.toFixed(2)}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-gray-100 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 text-sm font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-gray-100 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-gray-200 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Subtotal ({totalItems} items)</span>
                <span className="text-lg font-black text-[#0f172a]">${totalAmount.toFixed(2)}</span>
              </div>
              {totalAmount >= 250 && (
                <div className="bg-green-50 border border-green-200 rounded p-3 text-center">
                  <span className="text-xs font-bold text-green-700">You qualify for FREE SHIPPING!</span>
                </div>
              )}
              {totalAmount < 250 && (
                <div className="bg-blue-50 border border-blue-200 rounded p-3 text-center">
                  <span className="text-xs font-bold text-blue-700">Add ${(250 - totalAmount).toFixed(2)} more for FREE SHIPPING</span>
                </div>
              )}
              <button className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white py-4 rounded font-black uppercase tracking-wider transition-colors">
                Proceed to Checkout
              </button>
              <button
                onClick={() => { onClose(); onNavigate('collection'); }}
                className="w-full text-center text-sm font-bold text-[#0f172a] hover:underline"
              >
                Continue Shopping
              </button>
              <button
                onClick={clearCart}
                className="w-full text-center text-xs text-gray-400 hover:text-red-500 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
