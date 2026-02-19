import React, { useState, useMemo, useEffect } from 'react';
import { ChevronDown, X, ShoppingCart, LayoutGrid, List, ChevronRight } from 'lucide-react';
import { useSupabaseData } from '../hooks/useSupabaseData';
import { fetchProducts, fetchCategories } from '../services/dataService';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';

interface CollectionPageProps {
  onNavigate: (view: 'home' | 'collection' | 'product', slug?: string) => void;
  categorySlug?: string;
}

export const CollectionPage: React.FC<CollectionPageProps> = ({ onNavigate, categorySlug }) => {
  const [showOutOfStock, setShowOutOfStock] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'quick-stock'>('grid');
  const [sortBy, setSortBy] = useState('recommended');
  const [selectedCat, setSelectedCat] = useState<string | undefined>(categorySlug);
  const { addToCart } = useCart();

  useEffect(() => {
    setSelectedCat(categorySlug);
  }, [categorySlug]);

  const { data: categories } = useSupabaseData(() => fetchCategories(), []);
  const { data, loading } = useSupabaseData(() => fetchProducts({ limit: 50 }), []);
  const allProducts = data?.products || [];

  const filteredProducts = useMemo(() => {
    let result = allProducts;
    if (selectedCat) {
      result = result.filter(p => {
        const catMatch = categories?.find(c => c.slug === selectedCat);
        return catMatch ? p.categoryId === catMatch.id : true;
      });
    }
    if (!showOutOfStock) {
      result = result.filter(p => p.stockStatus !== 'out_of_stock');
    }
    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    }
    return result;
  }, [allProducts, selectedCat, showOutOfStock, sortBy, categories]);

  const activeCatName = selectedCat
    ? categories?.find(c => c.slug === selectedCat)?.name || selectedCat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    : 'All Products';

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-10">

          <aside className="w-full md:w-64 shrink-0 font-sans">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Shop By</h2>

            {selectedCat && (
              <div className="bg-[#f2f7fa] p-4 border border-[#d6e3eb] rounded mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black text-[#0f172a] uppercase tracking-wider">Active Filters:</span>
                  <button onClick={() => setSelectedCat(undefined)} className="text-[9px] font-bold text-[#0b668d] hover:underline uppercase">Reset Filters</button>
                </div>
                <div className="bg-[#0b668d] text-white text-[11px] font-bold px-3 py-2 flex items-center justify-between rounded shadow-sm">
                  <span className="uppercase tracking-wide">{activeCatName}</span>
                  <button onClick={() => setSelectedCat(undefined)}><X size={12} /></button>
                </div>
              </div>
            )}

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

            <div className="space-y-1">
              <h3 className="text-sm font-bold text-[#0f172a] mb-3">Categories</h3>
              {(categories || []).map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.slug === selectedCat ? undefined : cat.slug)}
                  className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${cat.slug === selectedCat ? 'bg-[#0b668d] text-white font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-[#0f172a]'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-8">
              <nav className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-4 flex gap-2 items-center">
                <button onClick={() => onNavigate('home')} className="hover:text-[#0b668d]">Home</button> /
                <span className="text-gray-600">{activeCatName}</span>
              </nav>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-black text-[#0f172a] leading-tight tracking-tight uppercase">
                    {activeCatName}
                  </h1>
                  <p className="text-sm text-gray-400 mt-2 font-medium">({filteredProducts.length} items)</p>
                </div>

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
                          <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="appearance-none bg-white border border-gray-300 rounded px-4 py-2 pr-10 text-sm font-bold text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#0b668d] min-w-[200px]"
                          >
                            <option value="recommended">Recommended</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                          </select>
                          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                   </div>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg font-bold text-gray-400 mb-2">No products found</p>
                <p className="text-sm text-gray-400 mb-6">Try adjusting your filters or browse all products</p>
                <button onClick={() => setSelectedCat(undefined)} className="bg-[#0f172a] text-white px-6 py-3 rounded font-bold hover:bg-[#1e293b] transition-colors">
                  View All Products
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="flex flex-col h-full bg-white border border-transparent hover:border-gray-100 hover:shadow-xl transition-all p-4 rounded-xl cursor-pointer" onClick={() => onNavigate('product', product.slug)}>
                      <div className="aspect-square bg-white relative overflow-hidden mb-4 flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                      </div>

                      <div className="flex-1 flex flex-col">
                        <h3 className="text-sm font-bold text-[#0b668d] cursor-pointer leading-snug mb-2 line-clamp-3">
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
                              {product.originalPrice && (
                                <span className="text-[10px] text-gray-400 font-bold uppercase">was ${product.originalPrice.toFixed(2)}</span>
                              )}
                           </div>
                        </div>

                        <button
                          onClick={(e) => handleAddToCart(e, product)}
                          className="w-full bg-[#d8451c] hover:bg-[#b53a18] text-white py-2.5 rounded text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md mt-auto"
                        >
                           <ShoppingCart size={16} /> Add to Cart
                        </button>
                      </div>
                    </div>
                ))}
              </div>
            ) : (
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                   <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                         <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-gray-500">Product</th>
                         <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-gray-500">Price / Case</th>
                         <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-gray-500">Unit Price</th>
                         <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-gray-500">Stock</th>
                         <th className="px-6 py-4 font-black uppercase text-[10px] tracking-widest text-gray-500 w-32">Action</th>
                      </tr>
                   </thead>
                   <tbody>
                      {filteredProducts.map((p) => (
                        <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => onNavigate('product', p.slug)}>
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-4">
                                 <img src={p.image} alt={p.name} className="w-12 h-12 object-contain mix-blend-multiply" />
                                 <span className="font-bold text-[#0b668d] cursor-pointer">{p.name}</span>
                              </div>
                           </td>
                           <td className="px-6 py-4 font-black text-gray-900">${p.price.toFixed(2)}</td>
                           <td className="px-6 py-4 text-gray-500 font-medium">${(p.price / (p.caseQuantity || 1)).toFixed(2)}</td>
                           <td className="px-6 py-4">
                              <span className="text-[10px] font-black uppercase text-green-600 bg-green-50 px-2 py-1 rounded">In Stock</span>
                           </td>
                           <td className="px-6 py-4">
                              <button
                                onClick={(e) => handleAddToCart(e, p)}
                                className="flex items-center gap-2 bg-[#d8451c] text-white px-3 py-2 rounded hover:bg-[#b53a18] text-xs font-bold"
                              >
                                <ShoppingCart size={14}/> Add
                              </button>
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
