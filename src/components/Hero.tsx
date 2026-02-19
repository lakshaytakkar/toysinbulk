import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useSupabaseData } from '../hooks/useSupabaseData';
import { fetchBanners } from '../services/dataService';

interface HeroProps {
  onNavigate: (view: 'home' | 'collection' | 'product') => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { data: heroBanners } = useSupabaseData(() => fetchBanners('hero'), []);
  const banner = heroBanners?.[0];

  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[500px]">

            <div className="md:col-span-5 bg-white flex flex-col justify-center p-8 md:p-16 lg:p-20 z-10">
                <div className="inline-flex items-center gap-2 mb-6">
                     <span className="bg-[#0f172a] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest rounded-sm">{banner?.subtitle || 'Wholesale Only'}</span>
                     <span className="text-xs text-gray-500 font-semibold tracking-wide uppercase">Est. 1998</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0f172a] leading-[1.1] mb-6">
                    {banner?.title ? (
                      <>
                        {banner.title.split(' ').slice(0, 2).join(' ')} <br/>
                        <span className="text-[#dc2626]">{banner.title.split(' ').slice(2).join(' ')}</span>
                      </>
                    ) : (
                      <>Maximize Your <br/><span className="text-[#dc2626]">Retail Margins</span></>
                    )}
                </h1>

                <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-md">
                    {banner?.description || "Direct-to-business pricing on over 10,000 SKUs. We supply schools, non-profits, and retailers across the USA."}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button onClick={() => onNavigate('collection')} className="bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold py-4 px-8 rounded-md transition-colors flex items-center justify-center gap-2">
                        {banner?.ctaText || 'Shop Holiday Deals'} <ChevronRight size={18} />
                    </button>
                    <button onClick={() => onNavigate('collection')} className="bg-white border-2 border-[#0f172a] text-[#0f172a] hover:bg-gray-50 font-bold py-4 px-8 rounded-md transition-colors">
                        View Catalog
                    </button>
                </div>

                <div className="mt-12 flex items-center gap-8 text-sm font-semibold text-gray-500">
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        In Stock Ready to Ship
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Volume Discounts
                     </div>
                </div>
            </div>

            <div className="md:col-span-7 bg-gray-100 relative overflow-hidden h-full min-h-[300px]">
                 <img
                    src={banner?.imageUrl || '/images/hero-banner.png'}
                    alt="Wholesale Toys Warehouse Distribution Center"
                    className="w-full h-full object-cover object-center"
                    style={{clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0% 100%)'}}
                 />
                 <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent pointer-events-none md:hidden"></div>
            </div>
        </div>
      </div>
    </div>
  );
};
