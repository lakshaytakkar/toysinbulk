import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BRANDS } from '../data/staticData';

interface BrandGridProps {
  onNavigate: (view: 'home' | 'collection' | 'product', slug?: string) => void;
}

export const BrandGrid: React.FC<BrandGridProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white py-24 border-b border-gray-200" id="brands">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold text-[#0f172a] mb-4 tracking-tight">Shop Your Favorite Brands</h2>
            <p className="text-gray-600 font-medium">Explore licensed merchandise from top toy manufacturers. Authorized distribution of the world's most popular entertainment properties.</p>
          </div>
          <button onClick={() => onNavigate('collection')} className="text-[#dc2626] font-bold text-sm hover:underline flex items-center gap-2 group whitespace-nowrap">
            Explore All Brand Partners <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {BRANDS.map((brand) => (
            <button
              key={brand.id}
              onClick={() => onNavigate('collection')}
              className="group relative bg-white border border-gray-100 rounded-xl p-6 flex items-center justify-center aspect-square shadow-sm hover:shadow-md hover:border-[#dc2626]/20 transition-all duration-300 overflow-hidden"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.brand-fallback')) {
                    const fallback = document.createElement('span');
                    fallback.className = 'brand-fallback text-lg font-black text-gray-400 uppercase tracking-tight';
                    fallback.textContent = brand.name;
                    parent.appendChild(fallback);
                  }
                }}
              />

              <div className="absolute inset-x-0 bottom-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-bold text-[#dc2626] uppercase tracking-widest">Shop {brand.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
