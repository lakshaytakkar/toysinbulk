import React from 'react';
import { ArrowRight } from 'lucide-react';

interface PriceBannersProps {
    onNavigate: (view: 'home' | 'collection' | 'product') => void;
}

export const PriceBanners: React.FC<PriceBannersProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-[#0f172a] tracking-tight">Shop by Price Point</h2>
        <button onClick={() => onNavigate('collection')} className="text-[#dc2626] font-semibold text-sm hover:underline flex items-center gap-1">View All Offers <ArrowRight size={14}/></button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
            { id: 'p1', price: '1', label: 'Dollar Store Items', color: 'bg-blue-900' },
            { id: 'p5', price: '5', label: 'Bin Fillers & Gifts', color: 'bg-blue-800' },
            { id: 'p10', price: '10', label: 'Premium Toys', color: 'bg-blue-700' },
            { id: 'pbulk', price: 'Bulk', label: 'Case Pack Savings', color: 'bg-[#dc2626]', isSpecial: true }
        ].map((item, idx) => (
            <div
                key={idx}
                onClick={() => onNavigate('collection')}
                className={`relative h-48 rounded-lg overflow-hidden cursor-pointer group shadow-sm transition-all duration-300 ${item.isSpecial ? 'bg-white border-2 border-[#dc2626] hover:shadow-lg' : 'bg-gray-100 hover:shadow-lg hover:ring-2 hover:ring-[#0f172a]/20'}`}
            >
                <div className={`absolute top-0 left-0 w-full h-2 ${item.color} z-10`}></div>
                {!item.isSpecial && <div className={`absolute inset-0 opacity-5 ${item.color}`}></div>}

                <div className="p-8 h-full flex flex-col justify-between relative z-10">
                    <div>
                        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2">{item.label}</h3>
                        <div className={`text-4xl font-extrabold tracking-tight ${item.isSpecial ? 'text-[#dc2626]' : 'text-[#0f172a]'}`}>
                            {item.price === 'Bulk' ? 'BULK' : `Under $${item.price}`}
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${item.isSpecial ? 'bg-[#dc2626] text-white' : 'bg-white text-[#0f172a] group-hover:bg-[#0f172a] group-hover:text-white'}`}>
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};
