import React from 'react';
import { Truck, ShieldCheck, Clock, Users } from 'lucide-react';

export const TrustBar: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
              <Truck className="w-6 h-6 text-[#0f172a]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#0f172a]">Free Shipping</p>
              <p className="text-xs text-gray-500">Orders Over $250</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
              <ShieldCheck className="w-6 h-6 text-[#0f172a]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#0f172a]">110% Price Match</p>
              <p className="text-xs text-gray-500">Guaranteed Lowest</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
              <Clock className="w-6 h-6 text-[#0f172a]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#0f172a]">Same Day Shipping</p>
              <p className="text-xs text-gray-500">Order Before 2pm CT</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
              <Users className="w-6 h-6 text-[#0f172a]" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#0f172a]">25+ Years</p>
              <p className="text-xs text-gray-500">Trusted Wholesaler</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
