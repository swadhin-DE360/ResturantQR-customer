import React, { useState } from 'react';
import {
  Star,
  Clock,
  MapPin,
  QrCode,
  Info,
  Phone,
  CheckCircle2,
} from 'lucide-react';
import restaurantData from '@/data/restaurant.json';
import tablesData from '@/data/tables.json';
import { TableInfo } from '@/types';
import { Modal } from '@/components/common/Modal';

export interface RestaurantHeroProps {
  table?: TableInfo;
}

export const RestaurantHero: React.FC<RestaurantHeroProps> = ({ table: propTable }) => {
  const table = propTable || (tablesData as TableInfo[])[0];
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  return (
    <section className="mb-6 animate-in fade-in duration-300">
      {/* Cover Image Banner */}
      <div className="relative h-44 sm:h-56 w-full rounded-3xl overflow-hidden shadow-soft border border-stone-200/60 bg-stone-100">
        <img
          src={restaurantData.coverImage}
          alt={restaurantData.name}
          className="w-full h-full object-cover"
          loading="eager"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80';
          }}
        />
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-end gap-2">
          {/* Quick Info Modal Trigger */}
          <button
            type="button"
            onClick={() => setIsInfoModalOpen(true)}
            className="p-1.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white text-xs transition-colors border border-white/20 flex items-center gap-1"
            aria-label="View restaurant info"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Banner Content */}
        <div className="absolute bottom-3.5 inset-x-3.5 text-white">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-md bg-[#F47738] text-white">
              Dine-In Menu
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow-xs">
            {restaurantData.name}
          </h2>
        </div>
      </div>

      {/* Prominent Table Identifier & Restaurant Meta Card */}
      <div className="bg-white rounded-3xl border border-stone-200/70 p-4 sm:p-5 mt-3 shadow-card space-y-3.5">
        {/* Identified Table Callout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-orange-50/90 via-amber-50/50 to-orange-50/80 border border-orange-200/70">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F47738] text-white flex flex-col items-center justify-center font-black shadow-sm shrink-0">
              <QrCode className="w-5 h-5" />
              <span className="text-[9px] uppercase tracking-wider">QR</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-[#181D23]">
                  {table?.tableName || 'Table 01'}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active Session
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium mt-0.5">
                {table?.section || 'Main Dining Room'} • Code:{' '}
                <strong className="font-mono text-[#F47738]">{table?.tableNumber || 'TABLE-001'}</strong>
              </p>
            </div>
          </div>

          {/* Dine-In Confirmed Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 border border-orange-200/80 text-emerald-700 text-xs font-bold shadow-2xs self-start sm:self-center">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Table Verified</span>
          </div>
        </div>

        {/* Restaurant Fast Facts Row */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1 border-t border-stone-100">
          <div className="p-2 rounded-xl bg-stone-50/80">
            <span className="flex items-center justify-center gap-1 font-extrabold text-amber-600">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {restaurantData.rating}
            </span>
            <span className="text-[10px] text-stone-400 block mt-0.5 font-medium">
              {restaurantData.reviewsCount}+ reviews
            </span>
          </div>

          <div className="p-2 rounded-xl bg-stone-50/80">
            <span className="flex items-center justify-center gap-1 font-bold text-[#181D23]">
              <Clock className="w-3.5 h-3.5 text-stone-500" />
              {restaurantData.prepTime}
            </span>
            <span className="text-[10px] text-stone-400 block mt-0.5 font-medium">
              Avg Prep Time
            </span>
          </div>

          <div className="p-2 rounded-xl bg-stone-50/80">
            <span className="flex items-center justify-center gap-1 font-bold text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Open Now
            </span>
            <span className="text-[10px] text-stone-400 block mt-0.5 font-medium">
              Till 11:00 PM
            </span>
          </div>
        </div>
      </div>

      {/* Restaurant Info Dialog */}
      <Modal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        title={restaurantData.name}
        description={restaurantData.tagline}
      >
        <div className="space-y-4 text-xs text-[#181D23]">
          <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#F47738] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#181D23]">Location Address</span>
                <p className="text-stone-500 mt-0.5 leading-relaxed">{restaurantData.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 pt-2 border-t border-stone-200">
              <Clock className="w-4 h-4 text-[#F47738] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#181D23]">Service Hours</span>
                <p className="text-stone-500 mt-0.5 leading-relaxed">{restaurantData.openingHours}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 pt-2 border-t border-stone-200">
              <Phone className="w-4 h-4 text-[#F47738] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#181D23]">Hostess & Inquiries</span>
                <p className="text-stone-500 mt-0.5 leading-relaxed">{restaurantData.phone}</p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-orange-50 border border-orange-200 text-orange-900 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#F47738] shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              Your table is linked to your physical QR code stand. Dishes you select will be freshly prepared and brought directly to your table by our servers.
            </p>
          </div>
        </div>
      </Modal>
    </section>
  );
};
