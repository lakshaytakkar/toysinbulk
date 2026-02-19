import React from 'react';
import { Truck, ShieldCheck, Clock, Users } from 'lucide-react';
import { useSupabaseData } from '../hooks/useSupabaseData';
import { fetchSiteSettings } from '../services/dataService';

export const TrustBar: React.FC = () => {
  const { data: settings } = useSupabaseData(() => fetchSiteSettings(), []);

  const trustItems = [
    {
      icon: Truck,
      title: settings?.trust_shipping_title || 'Free Shipping',
      subtitle: settings?.trust_shipping_subtitle || 'Orders Over $250',
    },
    {
      icon: ShieldCheck,
      title: settings?.trust_price_title || '110% Price Match',
      subtitle: settings?.trust_price_subtitle || 'Guaranteed Lowest',
    },
    {
      icon: Clock,
      title: settings?.trust_speed_title || 'Same Day Shipping',
      subtitle: settings?.trust_speed_subtitle || 'Order Before 2pm CT',
    },
    {
      icon: Users,
      title: settings?.trust_experience_title || '25+ Years',
      subtitle: settings?.trust_experience_subtitle || 'Trusted Wholesaler',
    },
  ];

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
