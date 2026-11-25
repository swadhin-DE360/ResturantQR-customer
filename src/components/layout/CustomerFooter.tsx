import React from 'react';
import { MapPin, Phone, Clock, ShieldCheck } from 'lucide-react';
import restaurantData from '@/data/restaurant.json';

export const CustomerFooter: React.FC = () => {
  return (
    <footer className="mt-12 bg-white/80 backdrop-blur-xs border-t border-stone-200/70 pt-8 pb-28 sm:pb-12 text-stone-600 text-xs">
      <div className="max-w-4xl mx-auto px-3.5 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-6 border-b border-stone-100">
          {/* Location */}
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#F47738] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#181D23]">Our Location</p>
              <p className="text-stone-500 text-[11px] mt-0.5 leading-relaxed">{restaurantData.address}</p>
            </div>
          </div>

          {/* Contact */}
          <div className="flex items-start gap-2.5">
            <Phone className="w-4 h-4 text-[#F47738] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#181D23]">Assistance & Hostess</p>
              <p className="text-stone-500 text-[11px] mt-0.5 leading-relaxed">{restaurantData.phone}</p>
            </div>
          </div>

          {/* Timings */}
          <div className="flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-[#F47738] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#181D23]">Dining Hours</p>
              <p className="text-stone-500 text-[11px] mt-0.5 leading-relaxed">{restaurantData.openingHours}</p>
            </div>
          </div>
        </div>

        {/* Security & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Contactless QR Dine-In Experience • {restaurantData.name}</span>
          </div>
          <p>© {new Date().getFullYear()} {restaurantData.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
