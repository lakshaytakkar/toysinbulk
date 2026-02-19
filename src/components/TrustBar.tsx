import React from 'react';
import { Truck, ShieldCheck, Clock, Users } from 'lucide-react';

const trustItems = [
  { icon: Truck, title: 'Free Shipping', subtitle: 'Orders Over $250' },
  { icon: ShieldCheck, title: '110% Price Match', subtitle: 'Guaranteed Lowest' },
  { icon: Clock, title: 'Same Day Shipping', subtitle: 'Order Before 2pm CT' },
  { icon: Users, title: '25+ Years', subtitle: 'Trusted Wholesaler' },
];

export const TrustBar: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
                <item.icon className="w-6 h-6 text-[#0f172a]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#0f172a]">{item.title}</p>
                <p className="text-xs text-gray-500">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
