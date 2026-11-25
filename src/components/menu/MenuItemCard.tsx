import React from 'react';
import { Plus, Minus, Star, Clock } from 'lucide-react';
import { MenuItem } from '@/types';
import { formatCurrency, cn } from '@/utils';
import { Badge } from '@/components/common/Badge';

export interface MenuItemCardProps {
  item: MenuItem;
  quantity?: number;
  onAddToCart?: (item: MenuItem) => void;
  onIncrement?: (item: MenuItem) => void;
  onDecrement?: (item: MenuItem) => void;
  className?: string;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  quantity = 0,
  onAddToCart,
  onIncrement,
  onDecrement,
  className,
}) => {
  const isAvailable = item.availability === 'Available';

  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-4 shadow-xs hover:border-slate-300 transition-all flex gap-3.5 sm:gap-4',
        !isAvailable && 'opacity-60 bg-slate-50',
        className
      )}
    >
      {/* Dish Information */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          {/* Dietary Type & Tags */}
          <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
            <Badge dietary={item.dietaryType} size="sm" />
            {(item.isRecommended || item.isChefSpecial) && (
              <Badge variant="brand" size="sm">
                Chef's Special
              </Badge>
            )}
            {item.isPopular && (
              <Badge variant="warning" size="sm">
                Bestseller
              </Badge>
            )}
          </div>

          {/* Dish Name */}
          <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug line-clamp-1">
            {item.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm sm:text-base font-extrabold text-slate-900">
              {formatCurrency(item.price)}
            </span>
            {item.originalPrice && item.originalPrice > item.price && (
              <span className="text-xs text-slate-400 line-through">
                {formatCurrency(item.originalPrice)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Metadata Footer */}
        <div className="flex items-center gap-3 mt-3 text-[11px] text-slate-400 font-medium">
          {item.rating && (
            <span className="flex items-center gap-1 text-amber-600 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {item.rating}
            </span>
          )}
          {item.preparationTimeMinutes && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {item.preparationTimeMinutes} mins
            </span>
          )}
        </div>
      </div>

      {/* Dish Image & Add/Quantity Button Container */}
      <div className="w-24 sm:w-28 flex flex-col items-center justify-between shrink-0">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xs relative">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80';
            }}
          />
          {!isAvailable && (
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center text-white text-[10px] font-bold uppercase tracking-wider">
              Sold Out
            </div>
          )}
        </div>

        {/* Action Button: Stepper or Add button */}
        <div className="mt-2 w-full">
          {!isAvailable ? (
            <span className="block text-center text-[10px] font-bold text-slate-400 py-1.5">
              Unavailable
            </span>
          ) : quantity > 0 ? (
            <div className="flex items-center justify-between bg-slate-900 text-white rounded-xl p-1 shadow-xs">
              <button
                type="button"
                onClick={() => onDecrement?.(item)}
                className="w-7 h-7 flex items-center justify-center hover:bg-slate-800 rounded-lg transition-colors text-white"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-bold px-1.5">{quantity}</span>
              <button
                type="button"
                onClick={() => onIncrement?.(item)}
                className="w-7 h-7 flex items-center justify-center bg-[#F47738] hover:bg-[#e05e1f] rounded-lg transition-colors text-white"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onAddToCart?.(item)}
              className="w-full py-1.5 px-3 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#F47738] font-bold text-xs border border-orange-200 transition-all flex items-center justify-center gap-1 active:scale-95 shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>ADD</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
