import React from 'react';
import { Sparkles, Star, Plus, Clock, ChefHat } from 'lucide-react';
import { MenuItem } from '@/types';
import { formatCurrency } from '@/utils';

export interface RecommendedItemsSectionProps {
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  onAddToCart?: (item: MenuItem, e: React.MouseEvent) => void;
}

export const RecommendedItemsSection: React.FC<RecommendedItemsSectionProps> = ({
  items,
  onSelectItem,
  onAddToCart,
}) => {
  if (items.length === 0) return null;

  return (
    <section className="space-y-3 pt-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-orange-50 text-[#F47738] flex items-center justify-center border border-orange-200/60">
            <Sparkles className="w-4 h-4 text-[#F47738]" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-[#181D23] tracking-tight">
              Chef's Recommendations
            </h3>
            <p className="text-[11px] text-stone-500 font-medium">
              Hand-picked specialty recipes
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Highlighted Recommendation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {items.slice(0, 4).map((dish) => {
          return (
            <div
              key={dish.id}
              onClick={() => onSelectItem(dish)}
              className="bg-gradient-to-br from-white via-orange-50/20 to-white rounded-xl border border-orange-200/70 p-3.5 shadow-card hover:border-[#F47738] hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group active:scale-[0.99] relative overflow-hidden"
            >
              <div className="flex gap-3.5">
                {/* Left Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    {dish.dietaryType === 'veg' && (
                      <div className="border border-green-500 w-5 h-5 rounded-sm flex items-center justify-center">
                        <div className="bg-green-500 w-3 h-3 rounded-full"></div>
                      </div>
                    )}

                    {dish.dietaryType !== 'veg' && (
                      <div className="border border-red-500 w-5 h-5 rounded-sm flex items-center justify-center">
                        <div
                          className="bg-red-500 w-3 h-3"
                          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                        ></div>
                      </div>
                    )}
                  </div>

                  <h4 className="text-xs sm:text-sm font-extrabold text-[#181D23] leading-snug line-clamp-1 group-hover:text-[#F47738] transition-colors">
                    {dish.name}
                  </h4>

                  <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
                    {dish.description}
                  </p>

                  <div className="flex items-center gap-2 text-[12px] text-stone-400 font-medium mt-2">
                    {dish.rating && (
                      <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                        <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                        {dish.rating}
                      </span>
                    )}
                    {dish.preparationTimeMinutes && (
                      <span className="flex items-center gap-0.5">
                        <Clock className="w-2.5 h-2.5" />
                        {dish.preparationTimeMinutes}m
                      </span>
                    )}
                    {dish.servingSize && (
                      <span className="flex items-center gap-0.5">
                        <ChefHat className="w-2.5 h-2.5 text-[#F47738]" />
                        {dish.servingSize}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Photo */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/80 shadow-2xs shrink-0 relative">
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
                </div>
              </div>

              {/* Bottom Price & Button Full-Width Section */}
              <div className="flex items-center justify-between w-full mt-3 pt-2.5 border-t border-orange-100/80">
                <span className="text-sm font-bold text-[#181D23]">
                  {formatCurrency(dish.price)}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onAddToCart) onAddToCart(dish, e);
                  }}
                  className="py-1 px-3 rounded-xl bg-[#F47738] hover:bg-[#e05e1f] text-white text-xs font-black shadow-2xs transition-all flex items-center gap-1 active:scale-95"
                >
                  <Plus className="w-3 h-3 stroke-[3]" />
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
