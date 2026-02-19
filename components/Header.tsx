import React, { useState } from 'react';
import { Search, ShoppingCart, Phone, User, Menu, ChevronDown, Package } from 'lucide-react';
import { NAV_ITEMS, MEGA_MENU_ITEMS } from '../constants';

interface HeaderProps {
  onNavigate: (view: 'home' | 'collection' | 'product') => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  return (
    <header className="flex flex-col w-full relative z-50 font-sans">
      <div className="bg-[#0f172a] text-xs py-2 px-4 text-white font-medium flex justify-between items-center border-b border-gray-800 hidden md:flex">
        <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
                 <img src="https://flagcdn.com/w20/us.png" alt="US Flag" className="h-3 w-5 object-cover rounded-sm" />
                 USA Owned & Operated
            </span>
            <span className="text-gray-400">|</span>
            <span>Free Shipping on Wholesale Orders Over $250</span>
        </div>
        <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('home')} className="hover:text-gray-300 transition-colors">Business Accounts</button>
            <span className="text-gray-400">|</span>
            <span className="flex items-center gap-2"><Phone size={12}/> 1-888-TOYS-BULK</span>
        </div>
      </div>

      <div className="bg-white text-gray-900 py-6 px-4 md:px-8 border-b border-gray-200 shadow-sm relative z-20">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-8">
          <div className="flex items-center gap-8 shrink-0">
            <button className="lg:hidden p-2 hover:bg-gray-100 rounded-md">
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            <button onClick={() => onNavigate('home')} className="flex flex-col leading-none text-left">
              <span className="text-[#0f172a] text-2xl md:text-3xl font-black tracking-tight uppercase">Toysin<span className="text-[#dc2626]">Bulk</span></span>
              <span className="text-[10px] tracking-widest text-gray-500 uppercase font-semibold">America's Wholesale Distributor</span>
            </button>
          </div>

          <div className="flex-1 max-w-3xl hidden md:flex">
            <div className="relative w-full flex">
                <input
                type="text"
                placeholder="Search by SKU, Product Name, or Category..."
                className="w-full h-12 px-4 border border-gray-300 rounded-l-md text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900 bg-gray-50 hover:bg-white transition-colors"
                />
                <button className="bg-[#0f172a] hover:bg-[#1e293b] text-white h-12 px-8 rounded-r-md flex items-center justify-center transition-colors font-medium">
                <Search className="w-5 h-5" />
                </button>
            </div>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <Search className="w-6 h-6 md:hidden text-gray-700" />

            <button onClick={() => onNavigate('home')} className="hidden md:flex flex-col items-center group text-gray-600 hover:text-[#0f172a]">
                <Package className="w-6 h-6 mb-1 group-hover:scale-105 transition-transform" />
                <span className="text-[11px] font-semibold uppercase">Orders</span>
            </button>

            <button className="flex flex-col items-center group text-gray-600 hover:text-[#0f172a]">
              <User className="w-6 h-6 mb-1 group-hover:scale-105 transition-transform" />
              <div className="flex flex-col items-center leading-none">
                  <span className="text-[11px] font-semibold uppercase">Sign In</span>
              </div>
            </button>

            <button className="flex flex-col items-center group text-gray-600 hover:text-[#0f172a] relative">
              <ShoppingCart className="w-6 h-6 mb-1 group-hover:scale-105 transition-transform" />
              <span className="text-[11px] font-semibold uppercase">Cart</span>
              <span className="absolute -top-1 right-1 bg-[#dc2626] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </button>
          </div>
        </div>

        <div className="md:hidden mt-4">
          <div className="flex w-full relative">
            <input
              type="text"
              placeholder="Search wholesale products..."
              className="w-full h-10 px-4 border border-gray-300 rounded-md text-black focus:outline-none focus:border-blue-900"
            />
             <button className="absolute right-0 top-0 bg-gray-200 h-10 w-12 rounded-r-md flex items-center justify-center text-gray-700 border border-l-0 border-gray-300">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <nav className="bg-[#1e293b] text-white border-t border-gray-800 shadow-md relative z-10">
        <div className="max-w-[1440px] mx-auto flex items-center px-4 md:px-8 h-12">
            <div
                className="hidden lg:flex items-center h-full mr-8 relative group cursor-pointer border-r border-gray-700 pr-8"
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <div className="flex items-center gap-2 font-bold text-sm tracking-wide">
                <Menu size={18} />
                BROWSE DEPARTMENTS
              </div>

              <div className={`absolute top-full left-0 pt-0 w-[1000px] transition-all duration-200 ${isMegaMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                  <div className="bg-white text-gray-800 shadow-2xl grid grid-cols-4 border-t-4 border-[#dc2626]">
                    {MEGA_MENU_ITEMS.map((section, idx) => (
                        <div key={idx} className="p-6 border-r border-gray-100 last:border-0 bg-white flex flex-col h-full">
                            <h3 className="font-bold text-[#0f172a] text-sm uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">{section.category}</h3>
                            <ul className="space-y-3 mb-6 flex-1">
                                {section.items.map((item, i) => (
                                    <li key={i}>
                                        <button onClick={() => onNavigate('collection')} className="text-sm text-gray-600 hover:text-[#dc2626] hover:underline block transition-colors text-left">{item}</button>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-auto group/img cursor-pointer relative overflow-hidden rounded-md h-32" onClick={() => onNavigate('collection')}>
                                <img src={section.image} alt={section.category} className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-3">
                                    <span className="text-yellow-400 text-[10px] font-bold uppercase">{section.featuredHeader}</span>
                                    <span className="text-white text-xs font-bold leading-tight">{section.featuredText}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="col-span-4 bg-gray-50 p-4 border-t border-gray-200 flex justify-between items-center">
                        <div>
                            <span className="font-bold text-[#0f172a]">Need bulk quotes?</span>
                            <span className="text-sm text-gray-600 ml-2">Contact our wholesale team for volume pricing over 50 cases.</span>
                        </div>
                        <button className="text-sm font-bold text-[#dc2626] hover:underline">Request Quote &rarr;</button>
                    </div>
                  </div>
              </div>
            </div>

            <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide w-full">
            {NAV_ITEMS.map((item, idx) => (
                <button
                key={idx}
                onClick={() => onNavigate('collection')}
                className={`text-sm font-medium whitespace-nowrap transition-colors hover:text-gray-300 ${item.isRed ? 'text-[#fca5a5]' : 'text-gray-100'}`}
                >
                {item.label}
                </button>
            ))}
            </div>
        </div>
      </nav>
    </header>
  );
};
