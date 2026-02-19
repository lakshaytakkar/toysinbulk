import React from 'react';
import { ShoppingCart, Package } from 'lucide-react';
import { useSupabaseData } from '../hooks/useSupabaseData';
import { fetchProducts } from '../services/dataService';

interface ProductCarouselProps {
  onNavigate: (view: 'home' | 'collection' | 'product') => void;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ onNavigate }) => {
  const { data } = useSupabaseData(() => fetchProducts({ featured: true, limit: 5 }), []);
  const products = data?.products || [];

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-16 border-b border-gray-200" id="deals">
      <div className="flex justify-between items-end mb-10">
        <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-[#dc2626] rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                <Package size={12}/> Limited Inventory
            </div>
            <h2 className="text-3xl font-extrabold text-[#0f172a] mb-2 tracking-tight">Weekly Wholesale Closeouts</h2>
            <p className="text-gray-500 font-medium">Bulk lots priced to move. Immediate shipping available.</p>
        </div>
        <button onClick={() => onNavigate('collection')} className="border-2 border-[#0f172a] text-[#0f172a] px-8 py-3 rounded-md font-bold hover:bg-[#0f172a] hover:text-white transition-all">
            View Full Manifest
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {products.map((product) => {
            const unitPrice = (product.price / (product.caseQuantity || 1)).toFixed(2);

            return (
                <div key={product.id} onClick={() => onNavigate('product')} className="bg-white rounded-xl border border-gray-200 hover:border-[#dc2626]/40 hover:shadow-xl transition-all p-5 flex flex-col group relative overflow-hidden cursor-pointer">

                    {product.badge && (
                    <span className="absolute top-4 left-4 bg-[#dc2626] text-white text-[10px] font-black px-3 py-1 uppercase tracking-wide z-10 rounded-sm">
                        {product.badge}
                    </span>
                    )}

                    <div className="aspect-square mb-6 overflow-hidden bg-gray-50 rounded-lg p-6 relative">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">CASE QTY: {product.caseQuantity}</span>
                        <div className="flex items-center gap-1 text-[10px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            IN STOCK
                        </div>
                    </div>

                    <h3 className="text-sm font-bold text-[#0f172a] line-clamp-2 h-10 mb-4 group-hover:text-[#dc2626] transition-colors leading-snug" title={product.name}>
                        {product.name}
                    </h3>

                    <div className="mt-auto pt-4 border-t border-gray-100">
                        <div className="bg-gray-50 p-3 rounded-lg mb-4">
                            <div className="flex justify-between items-baseline">
                                <span className="text-[10px] text-gray-500 font-bold uppercase">Case Price</span>
                                <span className="text-xl font-black text-[#0f172a]">${product.price.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center mt-1 pt-1 border-t border-gray-200/50">
                                <span className="text-[10px] text-[#dc2626] font-bold uppercase">Cost / Unit</span>
                                <span className="text-sm font-bold text-[#dc2626]">${unitPrice}</span>
                            </div>
                        </div>

                        <button className="w-full bg-[#0f172a] text-white py-3 rounded-md text-xs font-black uppercase tracking-widest hover:bg-[#dc2626] transition-all flex items-center justify-center gap-2 shadow-sm">
                            <ShoppingCart size={14} /> Add to Order
                        </button>
                    </div>
                </div>
            );
        })}
      </div>
    </div>
  );
};
