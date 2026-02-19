import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PriceBanners } from './components/PriceBanners';
import { CategoryGrid } from './components/CategoryGrid';
import { IndustryGrid } from './components/IndustryGrid';
import { TrustBar } from './components/TrustBar';
import { BrandGrid } from './components/BrandGrid';
import { CharacterShopBanner } from './components/CharacterShopBanner';
import { ProductCarousel } from './components/ProductCarousel';
import { CollectionPage } from './components/CollectionPage';
import { ProductPage } from './components/ProductPage';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'collection' | 'product'>('home');

  const navigateTo = (target: 'home' | 'collection' | 'product') => {
    setView(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900 overflow-x-hidden">
      <Header onNavigate={navigateTo} />

      <main className="flex-1 w-full">
        {view === 'home' ? (
          <>
            <Hero onNavigate={navigateTo} />
            <TrustBar />
            <PriceBanners onNavigate={navigateTo} />
            <IndustryGrid onNavigate={navigateTo} />
            <CategoryGrid onNavigate={navigateTo} />
            <CharacterShopBanner onNavigate={navigateTo} />
            <ProductCarousel onNavigate={navigateTo} />

            <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-20 border-b border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-[#f1f5f9] h-80 rounded-lg flex flex-col justify-center p-12 relative overflow-hidden group cursor-pointer border border-gray-200" onClick={() => navigateTo('collection')}>
                        <div className="z-10 relative">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">For Retailers</span>
                            <h3 className="text-3xl font-bold text-[#0f172a] mb-4">Stock Your Shelves</h3>
                            <p className="text-gray-600 mb-8 max-w-sm font-medium">High-margin impulse items and shelf-ready packaging designed for retail environments.</p>
                            <span className="text-[#dc2626] font-bold uppercase text-sm hover:underline">Shop Retail Packs &rarr;</span>
                        </div>
                        <div className="absolute right-0 bottom-0 w-48 h-48 bg-gray-200 rounded-tl-full opacity-50 group-hover:scale-110 transition-transform origin-bottom-right"></div>
                    </div>

                     <div className="bg-[#f1f5f9] h-80 rounded-lg flex flex-col justify-center p-12 relative overflow-hidden group cursor-pointer border border-gray-200" onClick={() => navigateTo('collection')}>
                        <div className="z-10 relative">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">For Schools & Non-Profits</span>
                            <h3 className="text-3xl font-bold text-[#0f172a] mb-4">Event Supplies</h3>
                            <p className="text-gray-600 mb-8 max-w-sm font-medium">Bulk prizes, carnival supplies, and fundraising items at unbeatable wholesale rates.</p>
                            <span className="text-[#dc2626] font-bold uppercase text-sm hover:underline">Shop Event Supplies &rarr;</span>
                        </div>
                         <div className="absolute right-0 bottom-0 w-48 h-48 bg-gray-200 rounded-tl-full opacity-50 group-hover:scale-110 transition-transform origin-bottom-right"></div>
                    </div>
                </div>
            </div>
            <BrandGrid onNavigate={navigateTo} />
          </>
        ) : view === 'collection' ? (
          <CollectionPage onNavigate={navigateTo} />
        ) : (
          <ProductPage onNavigate={navigateTo} />
        )}
      </main>

      <Footer onNavigate={navigateTo} />
    </div>
  );
};

export default App;
