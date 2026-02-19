import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useSupabaseData } from '../hooks/useSupabaseData';
import { fetchIndustries } from '../services/dataService';

interface IndustryGridProps {
  onNavigate: (view: 'home' | 'collection' | 'product') => void;
}

export const IndustryGrid: React.FC<IndustryGridProps> = ({ onNavigate }) => {
  const { data: industries, loading, error } = useSupabaseData(() => fetchIndustries(), []);

  if (loading) {
    return (
      <div className="bg-white py-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mb-16"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <div className="h-64 bg-gray-200 rounded-xl mb-6"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !industries || industries.length === 0) return null;

  return (
    <div className="bg-white py-24" id="industries">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="mb-16">
          <h2 className="text-3xl font-extrabold text-[#0f172a] mb-4 tracking-tight">Who We Serve</h2>
          <p className="text-gray-600 font-medium max-w-2xl">Tailored wholesale solutions for every industry. Whether you're stocking a gift shop or running a national non-profit campaign.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {industries.map((industry) => (
            <div key={industry.id} className="group cursor-pointer" onClick={() => onNavigate('collection')}>
              <div className="relative h-64 rounded-xl overflow-hidden mb-6 border border-gray-200">
                <img
                  src={industry.image}
                  alt={industry.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80"></div>

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
