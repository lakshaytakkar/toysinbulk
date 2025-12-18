import React from 'react';
import { ArrowRight, Wand2 } from 'lucide-react';
import { GeneratorConfig } from '../types';

interface PriceBannersProps {
    customImages?: Record<string, string>;
    onOpenGenerator?: (config: GeneratorConfig) => void;
}

export const PriceBanners: React.FC<PriceBannersProps> = ({ customImages = {}, onOpenGenerator }) => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-[#0f172a] tracking-tight">Shop by Price Point</h2>
        <a href="#" className="text-[#dc2626] font-semibold text-sm hover:underline flex items-center gap-1">View All Offers <ArrowRight size={14}/></a>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
            { id: 'p1', price: '1', label: 'Dollar Store Items', color: 'bg-blue-900', defaultPrompt: 'A massive pile of colorful dollar store toys, wholesale bulk, 4k' },
            { id: 'p5', price: '5', label: 'Bin Fillers & Gifts', color: 'bg-blue-800', defaultPrompt: 'Colorful toy bin fillers, party favors, wholesale display, 4k' },
            { id: 'p10', price: '10', label: 'Premium Toys', color: 'bg-blue-700', defaultPrompt: 'Premium quality toys in packaging, retail shelf, 4k' },
            { id: 'pbulk', price: 'Bulk', label: 'Case Pack Savings', color: 'bg-[#dc2626]', isSpecial: true, defaultPrompt: 'Warehouse pallets of toys, shipping boxes, wholesale distribution center, 4k' }
        ].map((item, idx) => {
            const hasCustomImage = customImages[`banner-${item.id}`];
            
            return (
                <div key={idx} className={`relative h-48 rounded-lg overflow-hidden cursor-pointer group shadow-sm transition-all duration-300 ${item.isSpecial ? 'bg-white border-2 border-[#dc2626] hover:shadow-[0_0_15px_rgba(220,38,38,0.3)]' : 'bg-gray-100 hover:shadow-lg hover:ring-2 hover:ring-[#0f172a]/20'}`}>
                    
                    {/* Background Layer */}
                    {hasCustomImage ? (
                         <div className="absolute inset-0">
                             <img src={hasCustomImage} alt="bg" className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                         </div>
                    ) : (
                        <>
                            <div className={`absolute top-0 left-0 w-full h-2 ${item.color} z-10`}></div>
                            {/* Default stylized background if no image */}
                            {!item.isSpecial && <div className={`absolute inset-0 opacity-5 ${item.color}`}></div>}
                        </>
                    )}

                    {/* Shine Effect */}
                    <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-30 z-20 group-hover:animate-shine" />

                    <div className="p-8 h-full flex flex-col justify-between relative z-10">
                        <div>
                            <h3 className={`${hasCustomImage ? 'text-white/80' : 'text-gray-500'} text-xs font-bold uppercase tracking-widest mb-2 shadow-black/50`}>{item.label}</h3>
                            <div className={`text-4xl font-extrabold tracking-tight ${hasCustomImage ? 'text-white' : (item.isSpecial ? 'text-[#dc2626]' : 'text-[#0f172a]')}`}>
                                {item.price === 'Bulk' ? 'BULK' : `Under $${item.price}`}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${item.isSpecial ? 'bg-[#dc2626] text-white' : (hasCustomImage ? 'bg-white/20 text-white backdrop-blur-md' : 'bg-white text-[#0f172a] group-hover:bg-[#0f172a] group-hover:text-white')}`}>
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>

                    {/* AI Edit Button */}
                    {onOpenGenerator && (
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                onOpenGenerator({
                                    id: `banner-${item.id}`,
                                    prompt: item.defaultPrompt,
                                    aspectRatio: '16:9'
                                });
                            }}
                            className="absolute top-2 right-2 bg-white/90 hover:bg-white text-[#dc2626] p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all z-30 hover:scale-110"
                            title="Generate background with AI"
                        >
                            <Wand2 size={16} />
                        </button>
                    )}
                </div>
            );
        })}
      </div>
    </div>
  );
};