import React from 'react';
import { BRANDS } from '../constants';
import { ArrowRight } from 'lucide-react';

interface BrandGridProps {
  onNavigate: (view: 'home' | 'collection' | 'product') => void;
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
              />

              <div className="absolute inset-x-0 bottom-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-bold text-[#dc2626] uppercase tracking-widest">Shop {brand.name}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-16 bg-gray-50 rounded-2xl p-8 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 shrink-0">
                    <span className="text-[#dc2626] font-black text-xl">!</span>
                </div>
                <div>
                    <h4 className="font-bold text-[#0f172a] text-lg">Looking for a specific license?</h4>
                    <p className="text-sm text-gray-500">Our procurement team can source specific bulk characters or properties for your event.</p>
                </div>
            </div>
            <button className="bg-[#0f172a] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#1e293b] transition-colors whitespace-nowrap">
                Contact Procurement
            </button>
        </div>
      </div>
    </div>
  );
};
