import React from 'react';

export const TrustBar: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-100 py-10">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">Trusted by 50,000+ Organizations Nationwide</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
           {/* Placeholder logos representing types of clients */}
           <div className="flex items-center gap-2 font-black text-xl italic text-gray-500">PUBLIC SCHOOLS</div>
           <div className="flex items-center gap-2 font-black text-xl italic text-gray-500">BOYS & GIRLS CLUB</div>
           <div className="flex items-center gap-2 font-black text-xl italic text-gray-500">US MILITARY</div>
           <div className="flex items-center gap-2 font-black text-xl italic text-gray-500">CHAMPIONS YMCA</div>
           <div className="flex items-center gap-2 font-black text-xl italic text-gray-500">SALVATION ARMY</div>
        </div>
      </div>
    </div>
  );
};