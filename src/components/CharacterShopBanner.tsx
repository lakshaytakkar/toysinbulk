import React from 'react';
import { CHARACTER_SHOP_BANNER } from '../data/staticData';

interface CharacterShopBannerProps {
  onNavigate: (view: 'home' | 'collection' | 'product', slug?: string) => void;
}

export const CharacterShopBanner: React.FC<CharacterShopBannerProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-20">
      <div className="bg-[#0f172a] rounded-lg overflow-hidden shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-12 md:p-16 flex flex-col justify-center">
                <span className="text-[#dc2626] font-bold tracking-widest uppercase text-sm mb-4">{CHARACTER_SHOP_BANNER.subtitle}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{CHARACTER_SHOP_BANNER.title}</h2>
                <p className="text-gray-300 mb-8 leading-relaxed">
                    {CHARACTER_SHOP_BANNER.description}
                </p>
                <div className="flex gap-4">
                     <button onClick={() => onNavigate('collection')} className="bg-white text-[#0f172a] px-8 py-3 rounded font-bold hover:bg-gray-100 transition-colors">
                        {CHARACTER_SHOP_BANNER.ctaText}
                     </button>
                </div>
            </div>
            <div className="relative h-64 md:h-auto overflow-hidden">
                <img
                    src={CHARACTER_SHOP_BANNER.imageUrl || '/images/character-shop-banner.png'}
                    alt="Licensed character toys and merchandise"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
      </div>
    </div>
  );
};
