import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, UtensilsCrossed, Sparkles, QrCode } from 'lucide-react';
import restaurantData from '@/data/restaurant.json';
import tablesData from '@/data/tables.json';
import { TableInfo } from '@/types';

export interface CustomerHeaderProps {
  tableNumber?: string;
  cartItemCount?: number;
  onOpenCart?: () => void;
  onSearchClick?: () => void;
}

export const CustomerHeader: React.FC<CustomerHeaderProps> = ({
  tableNumber: propTableNumber,
  cartItemCount: propCartCount = 0,
  onOpenCart,
}) => {
  const demoTable = (tablesData as TableInfo[])[0];

  const liveCartCount = propCartCount;
  const handleCartClick = onOpenCart || (() => {});

  // Identified table label from demo JSON
  const activeTableLabel =
    demoTable?.tableName ||
    (propTableNumber ? propTableNumber.replace('TABLE-', 'Table ') : 'Table 01');

  const activeTableCode = propTableNumber || demoTable?.tableNumber || 'TABLE-001';

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/70 transition-all">
      <div className="max-w-4xl mx-auto px-3.5 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand: Restaurant Logo and Name */}
        <Link
          to={`/menu/${activeTableCode}`}
          className="flex items-center gap-3 min-w-0 group hover:opacity-95 transition-opacity"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#F47738] to-[#e05e1f] text-white flex items-center justify-center font-extrabold shadow-sm shadow-[#F47738]/20 shrink-0 ring-2 ring-orange-200/50 group-hover:scale-105 transition-transform">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm sm:text-base font-extrabold text-[#181D23] tracking-tight truncate">
                {restaurantData.name}
              </h1>
              <Sparkles className="w-3.5 h-3.5 text-[#F47738] shrink-0" />
            </div>
            <p className="text-[11px] text-stone-500 font-medium truncate hidden sm:block">
              {restaurantData.cuisine}
            </p>
          </div>
        </Link>

        {/* Right Section: Prominent Table Indicator & Floating Cart Icon */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Prominent Table Number Indicator */}
          <div
            className="px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200/80 text-[#F47738] flex items-center gap-1.5 shadow-2xs"
            title={`Connected to ${activeTableCode}`}
          >
            <span className="w-2 h-2 rounded-full bg-[#F47738] animate-pulse" />
            <div className="flex items-center gap-1">
              <QrCode className="w-3.5 h-3.5 text-[#F47738]" />
              <span className="text-xs font-bold tracking-tight">
                {activeTableLabel}
              </span>
            </div>
          </div>

          {/* Cart Icon Trigger */}
          <button
            type="button"
            onClick={handleCartClick}
            aria-label="View current cart"
            className="relative p-2.5 rounded-xl bg-[#181D23] text-white hover:bg-[#232932] transition-colors shadow-xs active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            {liveCartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#F47738] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ring-2 ring-[#FAF8F5]">
                {liveCartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
