import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useSupabaseData } from '../hooks/useSupabaseData';
import { fetchBanners } from '../services/dataService';

interface PriceBannersProps {
    onNavigate: (view: 'home' | 'collection' | 'product') => void;
}

const defaultBanners = [
    { id: 'p1', title: 'Under $1', subtitle: 'Dollar Store Items', description: '', imageUrl: '', ctaText: '', ctaLink: '', bannerType: 'promo' as const },
    { id: 'p5', title: 'Under $5', subtitle: 'Bin Fillers & Gifts', description: '', imageUrl: '', ctaText: '', ctaLink: '', bannerType: 'promo' as const },
    { id: 'p10', title: 'Under $10', subtitle: 'Premium Toys', description: '', imageUrl: '', ctaText: '', ctaLink: '', bannerType: 'promo' as const },
    { id: 'pbulk', title: 'BULK', subtitle: 'Case Pack Savings', description: '', imageUrl: '', ctaText: '', ctaLink: '', bannerType: 'promo' as const },
];

const colors = ['bg-blue-900', 'bg-blue-800', 'bg-blue-700', 'bg-[#dc2626]'];

export const PriceBanners: React.FC<PriceBannersProps> = ({ onNavigate }) => {
  const { data: banners, loading } = useSupabaseData(() => fetchBanners('promo'), []);
  const items = banners && banners.length > 0 ? banners : defaultBanners;

  if (loading) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-[#0f172a] tracking-tight">Shop by Price Point</h2>
        <button onClick={() => onNavigate('collection')} className="text-[#dc2626] font-semibold text-sm hover:underline flex items-center gap-1">View All Offers <ArrowRight size={14}/></button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, idx) => {
            const isSpecial = idx === items.length - 1;
            const color = colors[idx % colors.length];

            return (
                <div
                    key={item.id}
                    onClick={() => onNavigate('collection')}
                    className={`relative h-48 rounded-lg overflow-hidden cursor-pointer group shadow-sm transition-all duration-300 ${isSpecial ? 'bg-white border-2 border-[#dc2626] hover:shadow-lg' : 'bg-gray-100 hover:shadow-lg hover:ring-2 hover:ring-[#0f172a]/20'}`}
                >
                    <div className={`absolute top-0 left-0 w-full h-2 ${color} z-10`}></div>
                    {!isSpecial && <div className={`absolute inset-0 opacity-5 ${color}`}></div>}

                    <div className="p-8 h-full flex flex-col justify-between relative z-10">
                        <div>
                            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">{item.subtitle}</h3>
                            <div className={`text-4xl font-extrabold tracking-tight ${isSpecial ? 'text-[#dc2626]' : 'text-[#0f172a]'}`}>
                                {item.title}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isSpecial ? 'bg-[#dc2626] text-white' : 'bg-white text-[#0f172a] group-hover:bg-[#0f172a] group-hover:text-white'}`}>
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                </div>
            );
        })}
      </div>
    </div>
  );
};
