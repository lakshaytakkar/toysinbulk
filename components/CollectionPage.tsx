import React, { useState } from 'react';
import { COLLECTION_PRODUCTS } from '../constants';
import { ChevronDown, X, Star, ShoppingCart, Search, Info, Package, Truck, LayoutGrid, List } from 'lucide-react';

export const CollectionPage: React.FC = () => {
  const [showOutOfStock, setShowOutOfStock] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'quick-stock'>('grid');

  return (
    <div className="bg-white min-h-screen">
      {/* Free Shipping Sticky Tab */}
      <div className="fixed bottom-0 left-0 z-50 p-4 hidden md:block">
        <div className="bg-[#0b668d] text-white px-4 py-2 rounded-t-lg shadow-lg flex items-center gap-2 cursor-pointer hover:bg-[#095475] transition-colors border-x border-t border-white/20">
          <Truck size={18} />
          <span className="text-xs font-black uppercase tracking-widest">Free Shipping & More</span>
          <X size={14} className="ml-2 opacity-60" />
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-10">
          
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 shrink-0 font-sans">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Shop By</h2>
            
            {/* Active Filters */}
            <div className="bg-[#f2f7fa] p-4 border border-[#d6e3eb] rounded mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black text-[#0f172a] uppercase tracking-wider">Active Filters:</span>
                <button className="text-[9px] font-bold text-[#0b668d] hover:underline uppercase">Reset Filters</button>
              </div>
              <div className="bg-[#0b668d] text-white text-[11px] font-bold px-3 py-2 flex items-center justify-between rounded shadow-sm">
                <span className="uppercase tracking-wide">Christmas</span>
                <X size={12} className="cursor-pointer" />
              </div>
            </div>

            {/* Out of Stock Toggle */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-gray-100">
               <span className="text-sm font-bold text-[#0f172a]">Out of Stock</span>
               <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-gray-400">HIDE</span>
                  <button 
                    onClick={() => setShowOutOfStock(!showOutOfStock)}
                    className={`w-10 h-5 rounded-full relative transition-colors ${showOutOfStock ? 'bg-[#0b668d]' : 'bg-gray-200'}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${showOutOfStock ? 'left-5' : 'left-0.5'}`} />
                  </button>
                  <span className="text-[10px] font-bold text-gray-400">SHOW</span>
               </div>
            </div>

            {/* Accordion Filters */}
            <div className="space-y-4">
              {[
                { label: 'Special Offers', isOpen: true },
                { label: 'New Arrivals', isOpen: true },
                { label: 'Bulk Assortments', isOpen: true },
                { label: 'Customer Rating', isOpen: true }
              ].map((filter, idx) => (
                <div key={idx} className="border-b border-gray-100 pb-4">
                  <button className="flex items-center justify-between w-full text-left group">
                    <span className="text-sm font-bold text-[#0f172a] group-hover:text-[#0b668d] transition-colors">{filter.label}</span>
                    <ChevronDown size={18} className="text-gray-400" />
                  </button>
                  {filter.isOpen && filter.label === 'Special Offers' && (
                    <div className="mt-4 space-y-3">
                      {['Buy More & Save (6)', 'Clearance (1)', "Flo's Deals (21)", 'Sale (63)'].map((opt) => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                          <div className="w-4 h-4 border-2 border-gray-300 rounded group-hover:border-[#0b668d] transition-colors"></div>
                          <span className="text-sm text-gray-600 group-hover:text-[#0f172a]">{opt}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </aside>

          {/* Product Listing Main Area */}
          <main className="flex-1">
            {/* Header / Breadcrumbs */}
            <div className="mb-8">
              <nav className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-4 flex gap-2">
                <a href="/" className="hover:text-[#0b668d]">Home</a> / 
                <a href="#toys" className="hover:text-[#0b668d]">Toys</a> /
                <span className="text-gray-600">Christmas Plush</span>
              </nav>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-black text-[#0f172a] leading-tight tracking-tight uppercase">
                    Christmas Stuffed Animals & Plush Toys in Bulk
                  </h1>
                  <p className="text-sm text-gray-400 mt-2 font-medium">(149 items)</p>
                </div>

                {/* B2B Variation: Quick Switcher */}
                <div className="flex items-center gap-6">
                   <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                      <button 
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm text-[#0b668d]' : 'text-gray-400 hover:text-gray-600'}`}
                      >
                         <LayoutGrid size={18}/>
                      </button>
                      <button 
                        onClick={() => setViewMode('quick-stock')}
                        className={`p-2 rounded ${viewMode === 'quick-stock' ? 'bg-white shadow-sm text-[#0b668d]' : 'text-gray-400 hover:text-gray-600'}`}
                      >
                         <List size={18}/>
                      </button>
                   </div>
                   <div className="flex items-center gap-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sort By</label>
                      <div className="relative">
                          <select className="appearance-none bg-white border border-gray-300 rounded px-4 py-2 pr-10 text-sm font-bold text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#0b668d] min-w-[200px]">
                            <option>Recommended</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Best Sellers</option>
                          </select>
                          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {/* Grid View */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {COLLECTION_PRODUCTS.map((product) => {
                  const offPercent = Math.round((1 - product.price / (product.originalPrice || 1)) * 100);
                  
                  return (
                    <div key={product.id} className="flex flex-col group h-full bg-white border border-transparent hover:border-gray-100 hover:shadow-xl transition-all p-4 rounded-xl">
                      <div className="aspect-square bg-white relative overflow-hidden mb-4 flex items-center justify-center">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
                        />
                        <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 z-10 group-hover:animate-shine" />
                      </div>

                      <div className="flex-1 flex flex-col">
                        <h3 className="text-sm font-bold text-[#0b668d] hover:underline cursor-pointer leading-snug mb-2 line-clamp-3">
                          {product.name}
                        </h3>
                        
                        <div className="flex items-center gap-2 mb-4">
                           {product.badge === 'FLOS_DEAL' && (
                             <div className="w-8 h-8 rounded-full bg-[#bf2d78] text-white flex flex-col items-center justify-center leading-none">
                               <span className="text-[6px] font-black uppercase">Flo's</span>
                               <span className="text-[8px] font-black uppercase">Deal</span>
                             </div>
                           )}
                           {product.badge === 'ON_SALE' && (
                             <div className="bg-[#cc2b1e] text-white px-2 py-1 rounded-sm text-[8px] font-black uppercase">ON SALE</div>
                           )}
                           <div className="flex flex-col">
                              <span className="text-lg font-black text-[#cc2b1e] tracking-tighter">${product.price.toFixed(2)}</span>
                              <span className="text-[10px] text-gray-400 font-bold uppercase">was ${product.originalPrice}</span>
                           </div>
                        </div>

                        <button className="w-full bg-[#d8451c] hover:bg-[#b53a18] text-white py-2.5 rounded text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md mt-auto">
                           <ShoppingCart size={16} /> Add to Cart
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Quick Stock View Variation */
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                   <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                         <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-gray-500">Product</th>
                         <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-gray-500">Price / Case</th>
                         <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-gray-500">Unit Price</th>
                         <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-gray-500">Stock</th>
                         <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-gray-500 w-32">Quick Qty</th>
                      </tr>
                   </thead>
                   <tbody>
                      {COLLECTION_PRODUCTS.map((p) => (
                        <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-4">
                                 <img src={p.image} className="w-12 h-12 object-contain mix-blend-multiply" />
                                 <span className="font-bold text-[#0b668d] hover:underline cursor-pointer">{p.name}</span>
                              </div>
                           </td>
                           <td className="px-6 py-4 font-black text-gray-900">${p.price.toFixed(2)}</td>
                           <td className="px-6 py-4 text-gray-500 font-medium">${(p.price / (p.caseQuantity || 1)).toFixed(2)}</td>
                           <td className="px-6 py-4">
                              <span className="text-[10px] font-black uppercase text-green-600 bg-green-50 px-2 py-1 rounded">In Stock</span>
                           </td>
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <input type="number" defaultValue={0} min={0} className="w-16 border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-[#0b668d] outline-none" />
                                <button className="p-1.5 bg-[#d8451c] text-white rounded hover:bg-[#b53a18]"><ShoppingCart size={14}/></button>
                              </div>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};