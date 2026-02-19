import React from 'react';
import { useSupabaseData } from '../hooks/useSupabaseData';
import { fetchCategories } from '../services/dataService';

interface CategoryGridProps {
    onNavigate: (view: 'home' | 'collection' | 'product', slug?: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onNavigate }) => {
  const { data: categories, loading } = useSupabaseData(() => fetchCategories(), []);

  if (loading || !categories) {
    return (
      <div className="bg-gray-50 py-20 border-t border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-8"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
              {[...Array(8)].map((_, i) => (
                <div key={i}>
                  <div className="aspect-[4/3] bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-20 border-t border-gray-200" id="category">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#0f172a] mb-4 tracking-tight">Browse Top Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8 font-medium">Source high-quality inventory for your store or event. All categories available in single units or case quantities.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
            {categories.map((cat) => (
                <div key={cat.id} className="group cursor-pointer" onClick={() => onNavigate('collection', cat.slug)}>
                    <div className="aspect-[4/3] bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 mb-4 relative group-hover:border-[#dc2626]/30 group-hover:shadow-md transition-all duration-300">
                        <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-full h-full object-cover transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                    </div>
                    <h3 className="text-center font-bold text-[#0f172a] text-lg group-hover:text-[#dc2626] transition-colors">
                        {cat.name}
                    </h3>
                    <p className="text-center text-xs text-gray-500 mt-1 uppercase tracking-wide font-semibold">View Inventory</p>
                </div>
            ))}
        </div>
        </div>
    </div>
  );
};
