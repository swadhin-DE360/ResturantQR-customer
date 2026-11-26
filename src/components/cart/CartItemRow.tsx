import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem } from '@/types';
import { formatCurrency } from '@/utils';

export interface CartItemRowProps {
  item: CartItem;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}) => {
  return (
    <div className="py-3 sm:py-3.5 border-b border-stone-200/70 last:border-0">
      <div className="flex items-start sm:items-center justify-between gap-2.5 sm:gap-3">
        {/* Left: Food Image Thumbnail & Title */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
          <div className="w-14 h-14 min-w-[3.5rem] max-w-[3.5rem] rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/80 shrink-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500&auto=format&fit=crop&q=80';
              }}
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 mb-0.5">
              {item.dietaryType === 'veg' && (
                <div className="border border-green-500 w-3.5 h-3.5 rounded-xs flex items-center justify-center shrink-0">
                  <div className="bg-green-500 w-2 h-2 rounded-full"></div>
                </div>
              )}

              {item.dietaryType !== 'veg' && (
                <div className="border border-red-500 w-3.5 h-3.5 rounded-xs flex items-center justify-center shrink-0">
                  <div
                    className="bg-red-500 w-2 h-2"
                    style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                  ></div>
                </div>
              )}
              <h4 className="text-xs sm:text-sm font-extrabold text-[#181D23] leading-snug line-clamp-1 sm:line-clamp-2">
                {item.name}
              </h4>
            </div>

            {/* Individual Item Price */}
            <p className="text-[11px] sm:text-xs text-stone-500 font-medium">
              <span className="font-bold text-[#181D23]">{formatCurrency(item.price)}</span>
              <span className="text-[10px] sm:text-[11px] text-stone-400"> / serving</span>
            </p>
          </div>
        </div>

        {/* Right: Quantity Stepper & Line Subtotal */}
        <div className="flex sm:flex-row flex-col sm:items-center items-end gap-1.5 sm:gap-3 shrink-0">
          {/* Stepper with Prevention against 0/negative quantity */}
          <div className="flex items-center bg-stone-100 rounded-xl p-0.5 border border-stone-200/90 shadow-2xs">
            {item.quantity === 1 ? (
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-rose-600 hover:bg-rose-50 rounded-lg transition-colors active:scale-95"
                title="Remove dish"
                aria-label="Remove item"
              >
                <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onDecrement(item.id)}
                disabled={item.quantity <= 1}
                className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-stone-700 hover:bg-white rounded-lg transition-colors active:scale-95 disabled:opacity-40"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            )}

            <span className="w-6 sm:w-7 text-center text-xs font-black text-[#181D23]">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={() => onIncrement(item.id)}
              className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-white bg-[#F47738] hover:bg-[#e05e1f] rounded-lg transition-colors shadow-2xs active:scale-95"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Item Subtotal Calculation */}
          <div className="text-right sm:w-16">
            <span className="font-black text-xs sm:text-sm text-[#181D23] block">
              {formatCurrency(item.subtotal)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
