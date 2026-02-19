import React from 'react';
import { Mail, ShieldCheck, Truck, CreditCard, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'collection' | 'product', slug?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 font-sans text-gray-600">
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="flex items-center gap-4">
                    <ShieldCheck className="w-10 h-10 text-[#0f172a]" />
                    <div>
                        <h4 className="font-bold text-[#0f172a]">Secure Checkout</h4>
                        <p className="text-sm">256-bit SSL Encryption</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Truck className="w-10 h-10 text-[#0f172a]" />
                    <div>
                        <h4 className="font-bold text-[#0f172a]">Fast Shipping</h4>
                        <p className="text-sm">Ships from USA Warehouses</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <CreditCard className="w-10 h-10 text-[#0f172a]" />
                    <div>
                        <h4 className="font-bold text-[#0f172a]">Flexible Payment</h4>
                        <p className="text-sm">Net 30 Terms Available</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Phone className="w-10 h-10 text-[#0f172a]" />
                    <div>
                        <h4 className="font-bold text-[#0f172a]">US Support</h4>
                        <p className="text-sm">Call 1-888-TOYS-BULK</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12 text-sm">
            <div className="col-span-1 md:col-span-2">
                 <h4 className="font-bold text-[#0f172a] text-lg mb-6 uppercase tracking-wider">ToysinBulk</h4>
                 <p className="mb-6 leading-relaxed">
                    America's leading wholesale distributor of toys, party supplies, and novelties. Serving businesses and organizations since 1998.
                 </p>
                 <div className="flex items-center gap-2 text-[#0f172a] font-bold mb-6">
                    <img src="https://flagcdn.com/w40/us.png" alt="USA" className="w-6" />
                    Proudly US Owned & Operated
                 </div>

                 <div className="space-y-4 text-sm">
                    <h5 className="font-bold text-[#0f172a] text-xs uppercase tracking-widest">Our Locations</h5>
                    <div className="flex items-start gap-2">
                       <MapPin size={16} className="text-[#dc2626] mt-0.5 shrink-0" />
                       <div>
                         <p className="font-bold text-[#0f172a]">Headquarters & Warehouse</p>
                         <p>4201 Congress St, Suite 175</p>
                         <p>Charlotte, NC 28209</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-2">
                       <MapPin size={16} className="text-[#dc2626] mt-0.5 shrink-0" />
                       <div>
                         <p className="font-bold text-[#0f172a]">Distribution Center</p>
                         <p>1820 J.N. Pease Pl</p>
                         <p>Fayetteville, NC 28306</p>
                       </div>
                    </div>
                 </div>
            </div>

            <div>
                <h4 className="font-bold text-[#0f172a] text-sm uppercase tracking-widest mb-6">Customer Service</h4>
                <ul className="space-y-3">
                    <li><button onClick={() => onNavigate('home')} className="hover:text-[#dc2626] transition-colors">Contact Us</button></li>
                    <li><button onClick={() => onNavigate('home')} className="hover:text-[#dc2626] transition-colors">Shipping Policy</button></li>
                    <li><button onClick={() => onNavigate('home')} className="hover:text-[#dc2626] transition-colors">Return Policy</button></li>
                    <li><button onClick={() => onNavigate('home')} className="hover:text-[#dc2626] transition-colors">Track Order</button></li>
                    <li><button onClick={() => onNavigate('home')} className="hover:text-[#dc2626] transition-colors">Volume Discounts</button></li>
                </ul>
            </div>

             <div>
                <h4 className="font-bold text-[#0f172a] text-sm uppercase tracking-widest mb-6">Company Info</h4>
                <ul className="space-y-3">
                    <li><button onClick={() => onNavigate('home')} className="hover:text-[#dc2626] transition-colors">About Us</button></li>
                    <li><button onClick={() => onNavigate('home')} className="hover:text-[#dc2626] transition-colors">Careers</button></li>
                    <li><button onClick={() => onNavigate('home')} className="hover:text-[#dc2626] transition-colors">Vendor Compliance</button></li>
                    <li><button onClick={() => onNavigate('home')} className="hover:text-[#dc2626] transition-colors">Privacy Policy</button></li>
                    <li><button onClick={() => onNavigate('home')} className="hover:text-[#dc2626] transition-colors">Terms of Service</button></li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-[#0f172a] text-sm uppercase tracking-widest mb-6">Stay Connected</h4>
                <p className="mb-4 text-xs">Sign up for wholesale alerts and new arrival notifications.</p>
                <div className="flex gap-2">
                    <input type="email" placeholder="Email Address" className="px-4 py-2 border border-gray-300 rounded text-gray-800 w-full focus:outline-none focus:border-[#0f172a]" />
                    <button className="bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold px-4 py-2 rounded transition-colors">GO</button>
                </div>
            </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500">
             <p>&copy; 2026 ToysinBulk Distribution Inc. All Rights Reserved.</p>
             <div className="flex gap-4">
                <span className="cursor-pointer hover:text-[#0f172a]">Privacy</span>
                <span className="cursor-pointer hover:text-[#0f172a]">Terms</span>
                <span className="cursor-pointer hover:text-[#0f172a]">Sitemap</span>
             </div>
        </div>
      </div>
    </footer>
  );
};
