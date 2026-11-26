import React from 'react';
import { Star, Plus } from 'lucide-react';
import hotDishIcon from '@/assets/icons/hot-dish.png';
import { MenuItem } from '@/types';
import { formatCurrency } from '@/utils';
import { Badge } from '@/components/common/Badge';

export interface PopularItemsSectionProps {
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  onAddToCart?: (item: MenuItem, e: React.MouseEvent) => void;
}

export const PopularItemsSection: React.FC<PopularItemsSectionProps> = ({
  items,
  onSelectItem,
  onAddToCart,
}) => {
  if (items.length === 0) return null;

  return (
    <section className="space-y-3 pt-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center p-1">
            <img src={hotDishIcon} alt="Popular Dishes" className="w-full h-full object-contain" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-[#181D23] tracking-tight">
              Popular Dishes
            </h3>
            <p className="text-[11px] text-stone-500 font-medium">
              Most loved by our dine-in guests
            </p>
          </div>
        </div>
        <span className="text-xs font-bold text-[#F47738]">
          {items.length} Favorites
        </span>
      </div>

      {/* Horizontal Scrollable Cards Track */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 py-1">
        {items.map((dish) => {
          return (
            <div
              key={dish.id}
              onClick={() => onSelectItem(dish)}
              className="w-44 sm:w-52 shrink-0 bg-white rounded-xl border border-stone-200/80 shadow-card hover:border-[#F47738]/40 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group active:scale-[0.98]"
            >
              <div>
                {/* Image & Dietary Tag */}
                <div className="relative h-28 sm:h-32 w-full rounded-xl overflow-hidden bg-stone-100 mb-2.5">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=80';
                    }}
                  />
                  <div className="absolute top-2 left-2">
                    <Badge dietary={dish.dietaryType} size="sm" className="bg-white/95 backdrop-blur-xs shadow-2xs" />
                  </div>
                  {dish.rating && (
                    <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-lg bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                      <span>{dish.rating}</span>
                    </div>
                  )}
                </div>

                {/* Title & Category */}
                <div className='p-2 pt-0!'>
                  <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider block">
                  {dish.categoryName}
                </span>
                <h4 className="text-xs sm:text-sm font-extrabold text-[#181D23] leading-snug line-clamp-1 group-hover:text-[#F47738] transition-colors mt-0.5">
                  {dish.name}
                </h4>
                </div>
              </div>

              {/* Price & Add Button */}
              <div className="flex items-center justify-between mt-3 p-2 border-t border-stone-100">
                <span className="text-sm sm:text-sm font-bold text-[#181D23]">
                  {formatCurrency(dish.price)}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onAddToCart) onAddToCart(dish, e);
                  }}
                  className="py-1 px-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#F47738] text-[11px] font-extrabold border border-orange-200 transition-all flex items-center gap-1 active:scale-95 shadow-2xs"
                >
                  <Plus className="w-3 h-3 stroke-[2.5]" />
                  <span>ADD</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
