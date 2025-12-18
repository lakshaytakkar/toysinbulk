import React from 'react';
import { INDUSTRIES } from '../constants';
import { ArrowRight } from 'lucide-react';

export const IndustryGrid: React.FC = () => {
  return (
    <div className="bg-white py-24" id="industries">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="mb-16">
          <h2 className="text-3xl font-extrabold text-[#0f172a] mb-4 tracking-tight">Who We Serve</h2>
          <p className="text-gray-600 font-medium max-w-2xl">Tailored wholesale solutions for every industry. Whether you're stocking a gift shop or running a national non-profit campaign.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {INDUSTRIES.map((industry) => (
            <div key={industry.id} className="group cursor-pointer">
              <div className="relative h-64 rounded-xl overflow-hidden mb-6 border border-gray-200">
                <img 
                  src={industry.image} 
                  alt={industry.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80"></div>
                
                {/* Shine Effect Overlay */}
                <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 z-10 group-hover:animate-shine" />
                
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-xl font-bold mb-2">{industry.name}</h3>
                  <p className="text-white/70 text-sm line-clamp-2">{industry.description}</p>
                </div>
              </div>
              <button className="flex items-center gap-2 text-[#dc2626] font-bold text-sm hover:translate-x-1 transition-transform">
                Shop Industry Catalog <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};