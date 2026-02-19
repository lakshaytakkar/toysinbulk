import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, Share2, Printer, Mail, ChevronRight, ChevronDown, ChevronUp, Package, Truck, ShieldCheck } from 'lucide-react';
import { useSupabaseData } from '../hooks/useSupabaseData';
import { fetchProductBySlug, fetchRelatedProducts } from '../services/dataService';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';

interface ProductPageProps {
  onNavigate: (view: 'home' | 'collection' | 'product', slug?: string) => void;
  productSlug?: string;
}

export const ProductPage: React.FC<ProductPageProps> = ({ onNavigate, productSlug }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ details: true, specs: true });
  const { addToCart } = useCart();

  const { data: product } = useSupabaseData(
    () => productSlug ? fetchProductBySlug(productSlug) : Promise.resolve(null),
    [productSlug]
  );

  const { data: relatedData } = useSupabaseData(
    () => product ? fetchRelatedProducts(product.id, product.categoryId, 4) : Promise.resolve([]),
    [product?.id]
  );
  const relatedProducts = relatedData || [];

  const handleAddToCart = (product: Product, qty: number) => {
    addToCart(product, qty);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleRelatedAddToCart = (e: React.MouseEvent, p: Product) => {
    e.stopPropagation();
    addToCart(p);
  };

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!product) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
        </div>
      </div>
    );
  }

  const thumbnails = product.images && product.images.length > 0
    ? product.images.map(img => img.imageUrl)
    : [product.image];

  const categoryName = product.categoryName || 'All Products';
  const categorySlug = product.categoryId ? undefined : undefined;
  const unitPrice = product.costPerUnit || (product.caseQuantity ? product.price / product.caseQuantity : product.price);
  const retailEstimate = product.originalPrice || (product.price * 2.5);
  const estimatedProfit = (retailEstimate - product.price) * quantity;

  return (
    <div className="bg-white min-h-screen font-sans text-[#0f172a]">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-8">
        <nav className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-8 flex items-center gap-2">
            <button onClick={() => onNavigate('home')} className="hover:text-[#0b668d]">Home</button> <ChevronRight size={10}/>
            <button onClick={() => onNavigate('collection')} className="hover:text-[#0b668d]">All Products</button> <ChevronRight size={10}/>
            <button onClick={() => onNavigate('collection', categoryName.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-'))} className="hover:text-[#0b668d]">{categoryName}</button> <ChevronRight size={10}/>
            <span className="text-gray-600">{product.name.length > 40 ? product.name.substring(0, 40) + '...' : product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-6">
            <div className="order-2 md:order-1 flex md:flex-col gap-3">
              {thumbnails.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 h-16 md:w-20 md:h-20 border-2 rounded overflow-hidden p-2 bg-gray-50 transition-all ${selectedImage === idx ? 'border-[#0b668d] shadow-md' : 'border-transparent hover:border-gray-200'}`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-contain mix-blend-multiply" />
                </button>
              ))}
            </div>
            <div className="order-1 md:order-2 flex-1 relative bg-white border border-gray-100 rounded-lg p-10 flex items-center justify-center">
               <img src={thumbnails[selectedImage] || product.image} alt={product.name} className="max-w-full max-h-[500px] object-contain mix-blend-multiply" />
            </div>
          </div>

          <div className="lg:col-span-5">
            <h1 className="text-2xl md:text-3xl font-black leading-tight tracking-tight uppercase mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6">
               <div className="flex items-center gap-1">
                 {[...Array(5)].map((_, i) => (
                   <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-[#f4a100] text-[#f4a100]" : "text-gray-200"} />
                 ))}
                 <span className="text-xs text-[#0b668d] font-bold ml-1">{product.reviews} Reviews</span>
               </div>
               <span className="text-gray-300">|</span>
               <span className="text-xs text-gray-500 font-bold">SKU: {product.sku || product.id.slice(0, 8)}</span>
            </div>

            <div className="flex items-start gap-6 mb-8">
               {product.badge === 'FLOS_DEAL' && (
               <div className="w-14 h-14 rounded-full bg-[#bf2d78] text-white flex flex-col items-center justify-center leading-none shadow-sm">
                 <span className="text-[10px] font-black uppercase tracking-tighter">Flo's</span>
                 <span className="text-[12px] font-black uppercase tracking-tighter">Deal</span>
               </div>
               )}
               {product.badge === 'BUY_MORE_SAVE' && (
               <div className="bg-[#0b668d] text-white px-3 py-2 rounded text-xs font-black uppercase">Buy More & Save</div>
               )}
               <div className="flex flex-col">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-[#cc2b1e] tracking-tighter">${product.price.toFixed(2).split('.')[0]}.<span className="text-xl">{product.price.toFixed(2).split('.')[1]}</span></span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 font-bold uppercase line-through">was ${product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  {product.originalPrice && (
                    <span className="text-xs text-[#cc2b1e] font-bold uppercase">{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF</span>
                  )}
                  {product.caseQuantity && (
                    <span className="text-xs text-gray-500 font-medium mt-1">Unit price: ${unitPrice.toFixed(2)} | Case of {product.caseQuantity}</span>
                  )}
               </div>
            </div>

            <div className="flex gap-4 mb-8">
               <div className="flex border border-gray-300 rounded overflow-hidden">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="bg-gray-50 px-4 hover:bg-gray-100 transition-colors border-r border-gray-300">-</button>
                  <input type="number" value={quantity} readOnly className="w-16 text-center text-sm font-bold focus:outline-none" />
                  <button onClick={() => setQuantity(quantity + 1)} className="bg-gray-50 px-4 hover:bg-gray-100 transition-colors border-l border-gray-300">+</button>
               </div>
               <button
                 onClick={() => handleAddToCart(product, quantity)}
                 className={`flex-1 py-4 rounded font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-colors shadow-lg ${addedToCart ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-[#d8451c] hover:bg-[#b53a18] text-white'}`}
               >
                  <ShoppingCart size={20} /> {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
               </button>
            </div>

            <div className="flex flex-wrap items-center gap-6 mb-10 pb-8 border-b border-gray-100">
                <button className="flex items-center gap-2 text-xs font-bold text-[#0b668d] hover:underline uppercase tracking-widest">
                   <Heart size={14}/> Add to Wish List
                </button>
                <div className="flex gap-4 opacity-50">
                   <Share2 size={16} className="cursor-pointer hover:opacity-100" />
                   <Printer size={16} className="cursor-pointer hover:opacity-100" />
                   <Mail size={16} className="cursor-pointer hover:opacity-100" />
                </div>
            </div>

            <div className="space-y-2">
               <div className="border-b border-gray-100">
                  <button
                    onClick={() => toggleSection('details')}
                    className="w-full flex justify-between items-center py-4 font-bold uppercase tracking-widest text-sm hover:text-[#0b668d] transition-colors"
                  >
                     Product Details
                     {openSections.details ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {openSections.details && product.description && (
                     <div className="pb-6 text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                        {product.description}
                     </div>
                  )}
               </div>

               {product.specifications && Object.keys(product.specifications).length > 0 && (
               <div className="border-b border-gray-100">
                  <button
                    onClick={() => toggleSection('specs')}
                    className="w-full flex justify-between items-center py-4 font-bold uppercase tracking-widest text-sm hover:text-[#0b668d] transition-colors"
                  >
                     Specifications
                     {openSections.specs ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {openSections.specs && (
                     <div className="pb-6">
                        <table className="w-full text-sm">
                          <tbody>
                            {Object.entries(product.specifications).map(([key, value], idx) => (
                              <tr key={key} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                <td className="py-2.5 px-4 font-bold text-gray-700 w-40">{key}</td>
                                <td className="py-2.5 px-4 text-gray-600">{value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                     </div>
                  )}
               </div>
               )}

               <div className="border-b border-gray-100">
                  <button
                    onClick={() => toggleSection('shipping')}
                    className="w-full flex justify-between items-center py-4 font-bold uppercase tracking-widest text-sm hover:text-[#0b668d] transition-colors"
                  >
                     Shipping & Returns
                     {openSections.shipping ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {openSections.shipping && (
                     <div className="pb-6 text-sm text-gray-600 leading-relaxed space-y-2">
                        <p>Free standard shipping on orders over $250.</p>
                        <p>110% Price match guarantee.</p>
                        <p>Ships within 1 business day from our North Carolina warehouse.</p>
                     </div>
                  )}
               </div>
            </div>
          </div>
        </div>

        <div className="bg-[#f2f7fa] border border-[#d6e3eb] rounded-xl p-8 mb-16 shadow-inner">
           <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-md">
                 <h3 className="text-xl font-black uppercase tracking-tight text-[#0f172a] mb-2 flex items-center gap-2">
                    <ShieldCheck className="text-green-600"/> Wholesale ROI Calculator
                 </h3>
                 <p className="text-sm text-gray-600">See your potential margins based on estimated retail pricing.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full md:w-auto">
                 <div className="bg-white p-4 rounded-lg shadow-sm">
                    <span className="text-[10px] font-black uppercase text-gray-400 block mb-1">Retail Estimate</span>
                    <span className="text-xl font-bold text-gray-900">${(retailEstimate * quantity).toFixed(2)}</span>
                 </div>
                 <div className="bg-white p-4 rounded-lg shadow-sm">
                    <span className="text-[10px] font-black uppercase text-gray-400 block mb-1">Wholesale Cost</span>
                    <span className="text-xl font-bold text-[#cc2b1e]">${(product.price * quantity).toFixed(2)}</span>
                 </div>
                 <div className="bg-green-600 p-4 rounded-lg shadow-md col-span-2 md:col-span-1">
                    <span className="text-[10px] font-black uppercase text-white/70 block mb-1">Estimated Profit</span>
                    <span className="text-xl font-black text-white">${estimatedProfit > 0 ? estimatedProfit.toFixed(2) : '—'}</span>
                 </div>
              </div>
           </div>
        </div>

        {relatedProducts.length > 0 && (
        <div className="mb-16">
           <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-[#0f172a]">
              <h2 className="text-xl font-black uppercase tracking-widest">Customers Also Bought</h2>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {relatedProducts.map((p) => (
                <div key={p.id} className="cursor-pointer" onClick={() => onNavigate('product', p.slug)}>
                   <div className="aspect-square bg-white border border-gray-100 rounded p-4 mb-4 relative overflow-hidden hover:shadow-md transition-all">
                      <img src={p.image} alt={p.name} className="w-full h-full object-contain mix-blend-multiply" />
                      {p.badge === 'FLOS_DEAL' && <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-[#bf2d78] text-white flex flex-col items-center justify-center leading-none text-[6px] font-black uppercase"><span className="scale-[0.8]">Flo's</span><span className="scale-[0.8]">Deal</span></div>}
                      {p.badge === 'ON_SALE' && <div className="absolute top-2 left-2 bg-[#cc2b1e] text-white px-1 py-0.5 text-[6px] font-black uppercase leading-none rounded-sm">ON SALE</div>}
                   </div>
                   <h4 className="text-[11px] font-bold text-[#0b668d] mb-2 line-clamp-2 h-8">{p.name}</h4>
                   <div className="flex items-center justify-between">
                      <span className="font-black text-sm text-[#cc2b1e]">${p.price.toFixed(2)}</span>
                      <button onClick={(e) => handleRelatedAddToCart(e, p)} className="bg-[#d8451c] text-white p-2 rounded hover:bg-[#b53a18] transition-colors"><ShoppingCart size={12}/></button>
                   </div>
                </div>
              ))}
           </div>
        </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-12 border-y border-gray-100 bg-gray-50 -mx-4 md:-mx-8 px-8">
            <div className="flex items-center gap-4">
                <Truck className="text-[#0f172a]" />
                <div className="leading-tight">
                    <p className="text-[10px] font-black uppercase">We Are Fast!</p>
                    <p className="text-[9px] text-gray-500">Ships in 1 Business Day</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <ShieldCheck className="text-[#0f172a]" />
                <div className="leading-tight">
                    <p className="text-[10px] font-black uppercase">110% Lowest Price</p>
                    <p className="text-[9px] text-gray-500">Guaranteed to Get More</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Package className="text-[#0f172a]" />
                <div className="leading-tight">
                    <p className="text-[10px] font-black uppercase">25+ Years</p>
                    <p className="text-[9px] text-gray-500">US Owned in North Carolina</p>
                </div>
            </div>
             <div className="flex items-center gap-4">
                <Star className="text-[#0f172a]" />
                <div className="leading-tight">
                    <p className="text-[10px] font-black uppercase">Award Winning</p>
                    <p className="text-[9px] text-gray-500">Exceptional Customer Service</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
