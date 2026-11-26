import React from 'react';
import { Star, Clock, Plus, Minus, Flame } from 'lucide-react';
import { MenuItem } from '@/types';
import { formatCurrency, cn } from '@/utils';

export interface FoodCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
  onAddToCart?: (item: MenuItem, e: React.MouseEvent) => void;
  quantity?: number;
  className?: string;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  item,
  onSelect,
  onAddToCart,
  quantity = 0,
  className,
}) => {
  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(item, e);
    }
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <article
      onClick={() => onSelect(item)}
      className={cn(
        'bg-white rounded-3xl border border-stone-200/80 p-3.5 sm:p-4 shadow-card hover:border-[#F47738]/40 hover:shadow-md transition-all duration-200 flex gap-3.5 sm:gap-4 group cursor-pointer relative overflow-hidden select-none active:scale-[0.99]',
        className
      )}
    >
      {/* Left Column: Dish Information */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          {/* Dietary Indicator & Badges */}
          <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
            {item.dietaryType === 'veg' && (
              <div className="border border-green-500 w-5 h-5 rounded-sm flex items-center justify-center">
                <div className="bg-green-500 w-3 h-3 rounded-full"></div>
              </div>
            )}

            {item.dietaryType !== 'veg' && (
              <div className="border border-red-500 w-5 h-5 rounded-sm flex items-center justify-center">
                <div
                  className="bg-red-500 w-3 h-3"
                  style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                ></div>
              </div>
            )}            {item.isPopular && (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80">
                <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
                Popular
              </span>
            )}
          </div>

          {/* Dish Title */}
          <h4 className="text-sm sm:text-base font-extrabold text-[#181D23] leading-snug line-clamp-1 group-hover:text-[#F47738] transition-colors">
            {item.name}
          </h4>

          {/* Price Tag */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm sm:text-base font-black text-[#181D23]">
              {formatCurrency(item.price)}
            </span>
            {item.originalPrice && item.originalPrice > item.price && (
              <span className="text-xs text-stone-400 line-through">
                {formatCurrency(item.originalPrice)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Metadata: Rating, Prep Time, Availability Indicator */}
        <div className="flex items-center gap-3 mt-3 text-[11px] text-stone-400 font-medium">
          {item.rating && (
            <span className="flex items-center gap-1 text-amber-600 font-bold">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {item.rating}
            </span>
          )}
          {item.preparationTimeMinutes && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-stone-400" />
              {item.preparationTimeMinutes}m prep
            </span>
          )}
          <span className="text-emerald-700 font-semibold text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded">
            Fresh & Ready
          </span>
        </div>
      </div>

      {/* Right Column: High Quality Food Photography & Action Button */}
      <div className="w-24 sm:w-28 flex flex-col items-center justify-between shrink-0">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/90 shadow-2xs relative">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80';
            }}
          />
        </div>

        {/* Action Button: Stepper or ADD */}
        <div className="mt-2 w-full">
          {quantity > 0 ? (
            <div className="flex items-center justify-between bg-[#181D23] text-white rounded-xl p-0.5 shadow-2xs">
              <button
                type="button"
                onClick={handleDecrement}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-stone-800 text-stone-200 transition-colors active:scale-90"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
              <span className="text-xs font-black text-white px-1">
                {quantity}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#F47738] hover:bg-[#e05e1f] text-white transition-colors active:scale-90"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAddClick}
              className="w-full py-1.5 px-3 rounded-xl bg-orange-50 hover:bg-orange-100 active:scale-95 text-[#F47738] font-black text-xs border border-orange-200 transition-all flex items-center justify-center gap-1 shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>ADD</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
