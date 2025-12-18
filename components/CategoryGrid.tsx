import React from 'react';
import { CATEGORIES } from '../constants';
import { Wand2, Loader2, Sparkles } from 'lucide-react';
import { GeneratorConfig } from '../types';

interface CategoryGridProps {
    customImages?: Record<string, string>;
    onOpenGenerator?: (config: GeneratorConfig) => void;
    generatingIds?: Set<string>;
    onBatchGenerate?: () => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ 
    customImages = {}, 
    onOpenGenerator,
    generatingIds = new Set(),
    onBatchGenerate
}) => {
  const isAnyGenerating = generatingIds.size > 0;

  return (
    <div className="bg-gray-50 py-20 border-t border-gray-200" id="category">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#0f172a] mb-4 tracking-tight">Browse Top Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8 font-medium">Source high-quality inventory for your store or event. All categories available in single units or case quantities.</p>
            
            {onBatchGenerate && (
                <button 
                    onClick={onBatchGenerate}
                    disabled={isAnyGenerating}
                    className={`inline-flex items-center gap-2 px-6 py-2 rounded-full font-bold text-sm transition-all shadow-sm ${
                        isAnyGenerating 
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                        : 'bg-white text-[#dc2626] border border-[#dc2626] hover:bg-[#dc2626] hover:text-white hover:shadow-lg'
                    }`}
                >
                    {isAnyGenerating ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            Generating Assets ({generatingIds.size} remaining)...
                        </>
                    ) : (
                        <>
                            <Sparkles size={16} />
                            Auto-Generate All Category Images
                        </>
                    )}
                </button>
            )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
            {CATEGORIES.map((cat) => {
                const displayImage = customImages[`category-${cat.id}`] || cat.image;
                const isGenerating = generatingIds.has(cat.id);
                
                return (
                    <div key={cat.id} className="group cursor-pointer relative">
                        <div className="aspect-[4/3] bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 mb-4 relative group-hover:border-[#dc2626]/30 group-hover:shadow-md transition-all duration-300">
                            <img 
                                src={displayImage} 
                                alt={cat.name} 
                                className={`w-full h-full object-cover transition-all duration-500 ${isGenerating ? 'blur-sm grayscale' : ''}`}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${cat.name}/400/300`;
                                }}
                            />
                            
                            {/* Shine Effect Overlay */}
                            <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 z-10 group-hover:animate-shine" />

                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                            
                            {/* Loading Overlay */}
                            {isGenerating && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm z-30">
                                    <Loader2 className="animate-spin text-[#dc2626] mb-2" size={32} />
                                    <span className="text-xs font-bold text-[#0f172a] animate-pulse">Creating...</span>
                                </div>
                            )}
                            
                            {/* AI Edit Button (only show if not generating) */}
                            {!isGenerating && onOpenGenerator && (
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onOpenGenerator({
                                            id: `category-${cat.id}`,
                                            prompt: `High quality professional product photography of ${cat.name}, wholesale bulk packaging context, white background, studio lighting, 4k`,
                                            referenceImage: cat.image,
                                            aspectRatio: '4:3'
                                        });
                                    }}
                                    className="absolute top-2 right-2 bg-white/90 hover:bg-white text-[#dc2626] p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all z-20 hover:scale-110"
                                    title="Generate new image with AI"
                                >
                                    <Wand2 size={16} />
                                </button>
                            )}
                        </div>
                        <h3 className="text-center font-bold text-[#0f172a] text-lg group-hover:text-[#dc2626] transition-colors">
                            {cat.name}
                        </h3>
                        <p className="text-center text-xs text-gray-500 mt-1 uppercase tracking-wide font-semibold">View Inventory</p>
                    </div>
                );
            })}
        </div>
        </div>
    </div>
  );
};