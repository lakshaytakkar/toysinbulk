import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
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
import { ImageGenerator } from './components/ImageGenerator';
import { GeneratorConfig } from './types';
import { CATEGORIES } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'collection' | 'product'>('home');
  const [showGenerator, setShowGenerator] = useState(false);
  const [generatorConfig, setGeneratorConfig] = useState<GeneratorConfig | null>(null);
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const [generatingIds, setGeneratingIds] = useState<Set<string>>(new Set());

  const handleOpenGenerator = (config?: GeneratorConfig) => {
      setGeneratorConfig(config || null);
      setShowGenerator(true);
  };

  const handleApplyImage = (imageUrl: string) => {
      if (generatorConfig) {
          setCustomImages(prev => ({
              ...prev,
              [generatorConfig.id]: imageUrl
          }));
      }
  };

  const handleBatchGenerateCategories = async () => {
    try {
        if ((window as any).aistudio && !await (window as any).aistudio.hasSelectedApiKey()) {
            await (window as any).aistudio.openSelectKey();
        }
        
        if ((window as any).aistudio && !await (window as any).aistudio.hasSelectedApiKey()) return;

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const categoryIds = CATEGORIES.map(c => c.id);
        setGeneratingIds(new Set(categoryIds));

        for (const id of categoryIds) {
            const cat = CATEGORIES.find(c => c.id === id);
            if (!cat) continue;

            const prompt = `High quality professional product photography of ${cat.name}, wholesale bulk packaging context, white background, studio lighting, 4k`;
            
            try {
                const response = await ai.models.generateContent({
                    model: 'gemini-3-pro-image-preview',
                    contents: { parts: [{ text: prompt }] },
                    config: {
                        imageConfig: {
                            imageSize: '1K',
                            aspectRatio: '4:3'
                        }
                    }
                });

                const base64 = response.candidates?.[0]?.content?.parts?.find((p: any) => p.inlineData)?.inlineData?.data;
                if (base64) {
                    setCustomImages(prev => ({
                        ...prev,
                        [`category-${id}`]: `data:image/png;base64,${base64}`
                    }));
                }
            } catch (error) {
                console.error(`Failed to generate image for category ${id}`, error);
            } finally {
                setGeneratingIds(prev => {
                    const next = new Set(prev);
                    next.delete(id);
                    return next;
                });
            }
        }

    } catch (e) {
        console.error("Batch generation failed", e);
        setGeneratingIds(new Set());
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900 overflow-x-hidden">
      <Header onOpenGenerator={() => handleOpenGenerator()} />
      
      {/* View Switcher for Demo */}
      <div className="bg-[#f1f5f9] px-8 py-2 border-b border-gray-200 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-500 overflow-x-auto whitespace-nowrap">
          <div className="flex gap-4">
            <button onClick={() => setView('home')} className={`hover:text-[#dc2626] transition-colors ${view === 'home' ? 'text-[#dc2626]' : ''}`}>Home</button>
            <button onClick={() => setView('collection')} className={`hover:text-[#dc2626] transition-colors ${view === 'collection' ? 'text-[#dc2626]' : ''}`}>Collection (Category Page)</button>
            <button onClick={() => setView('product')} className={`hover:text-[#dc2626] transition-colors ${view === 'product' ? 'text-[#dc2626]' : ''}`}>Product (Detail Page)</button>
          </div>
          <div className="hidden md:block">Wholesale Enterprise Mode</div>
      </div>

      <main className="flex-1 w-full">
        {view === 'home' ? (
          <>
            <Hero 
                customImage={customImages['hero-main']}
                onOpenGenerator={handleOpenGenerator}
            />
            <TrustBar />
            <PriceBanners 
                customImages={customImages} 
                onOpenGenerator={handleOpenGenerator} 
            />
            <IndustryGrid />
            <div onClick={() => setView('collection')} className="cursor-pointer">
              <CategoryGrid 
                  customImages={customImages} 
                  onOpenGenerator={handleOpenGenerator} 
                  generatingIds={generatingIds}
                  onBatchGenerate={handleBatchGenerateCategories}
              />
            </div>
            <CharacterShopBanner />
            <div onClick={() => setView('product')} className="cursor-pointer">
               <ProductCarousel />
            </div>
            
            <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-20 border-b border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-[#f1f5f9] h-80 rounded-lg flex flex-col justify-center p-12 relative overflow-hidden group cursor-pointer border border-gray-200">
                        <div className="z-10 relative">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">For Retailers</span>
                            <h3 className="text-3xl font-bold text-[#0f172a] mb-4">Stock Your Shelves</h3>
                            <p className="text-gray-600 mb-8 max-w-sm font-medium">High-margin impulse items and shelf-ready packaging designed for retail environments.</p>
                            <button className="text-[#dc2626] font-bold uppercase text-sm hover:underline">Shop Retail Packs &rarr;</button>
                        </div>
                        <div className="absolute right-0 bottom-0 w-48 h-48 bg-gray-200 rounded-tl-full opacity-50 group-hover:scale-110 transition-transform origin-bottom-right"></div>
                    </div>
                    
                     <div className="bg-[#f1f5f9] h-80 rounded-lg flex flex-col justify-center p-12 relative overflow-hidden group cursor-pointer border border-gray-200">
                        <div className="z-10 relative">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">For Schools & Non-Profits</span>
                            <h3 className="text-3xl font-bold text-[#0f172a] mb-4">Event Supplies</h3>
                            <p className="text-gray-600 mb-8 max-w-sm font-medium">Bulk prizes, carnival supplies, and fundraising items at unbeatable wholesale rates.</p>
                            <button className="text-[#dc2626] font-bold uppercase text-sm hover:underline">Shop Event Supplies &rarr;</button>
                        </div>
                         <div className="absolute right-0 bottom-0 w-48 h-48 bg-gray-200 rounded-tl-full opacity-50 group-hover:scale-110 transition-transform origin-bottom-right"></div>
                    </div>
                </div>
            </div>
            <BrandGrid />
          </>
        ) : view === 'collection' ? (
          <CollectionPage />
        ) : (
          <ProductPage />
        )}
      </main>
      
      <Footer />
      
      {showGenerator && (
        <ImageGenerator 
            onClose={() => setShowGenerator(false)} 
            initialPrompt={generatorConfig?.prompt}
            initialReferenceImage={generatorConfig?.referenceImage}
            initialAspectRatio={generatorConfig?.aspectRatio}
            onApply={handleApplyImage}
        />
      )}
    </div>
  );
};

export default App;