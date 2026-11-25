import React, { useState } from 'react';
import {
  X,
  Star,
  Clock,
  Plus,
  Minus,
  Sparkles,
  Flame,
  ShieldCheck,
  ChefHat,
  ShoppingBag,
} from 'lucide-react';
import { MenuItem } from '@/types';
import { formatCurrency } from '@/utils';
import { Badge } from '@/components/common/Badge';
import toast from 'react-hot-toast';

export interface FoodDetailModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (item: MenuItem, quantity: number, notes?: string) => void;
}

export const FoodDetailModal: React.FC<FoodDetailModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [specialNotes, setSpecialNotes] = useState('');

  if (!isOpen || !item) return null;

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(item, quantity, specialNotes);
    } else {
      toast.success(`Added ${quantity}x ${item.name} to order!`, {
        icon: '🍲',
      });
    }
    setQuantity(1);
    setSpecialNotes('');
    onClose();
  };

  const lineTotal = item.price * quantity;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="w-full bg-[#FAF8F5] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200/80 max-w-lg max-h-[92vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200"
      >
        {/* Dish Hero Image Header */}
        <div className="relative h-56 sm:h-64 w-full bg-stone-100 shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Dietary & Highlights Overlay */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 flex-wrap">
            <Badge dietary={item.dietaryType} size="sm" className="bg-white/95 backdrop-blur-xs" />
            {item.isPopular && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white shadow-xs">
                <Flame className="w-3 h-3 fill-white" />
                Popular
              </span>
            )}
            {item.isRecommended && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F47738] text-white shadow-xs">
                <Sparkles className="w-3 h-3" />
                Chef's Special
              </span>
            )}
          </div>

          {/* Dish Category & Title Over Image */}
          <div className="absolute bottom-4 inset-x-4 text-white">
            <span className="text-xs font-semibold text-orange-200 uppercase tracking-wider block mb-1">
              {item.categoryName}
            </span>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-snug drop-shadow-xs">
              {item.name}
            </h3>
          </div>
        </div>

        {/* Scrollable Details Body */}
        <div className="p-4 sm:p-5 overflow-y-auto no-scrollbar space-y-4 text-xs text-[#181D23]">
          {/* Price, Rating & Prep Time Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-200/80">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-black text-[#181D23]">
                  {formatCurrency(item.price)}
                </span>
                {item.originalPrice && item.originalPrice > item.price && (
                  <span className="text-xs text-stone-400 line-through">
                    {formatCurrency(item.originalPrice)}
                  </span>
                )}
              </div>
              <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Freshly Prepared to Order
              </span>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-2">
              {item.rating && (
                <div className="px-2.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 font-extrabold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{item.rating}</span>
                </div>
              )}
              {item.preparationTimeMinutes && (
                <div className="px-2.5 py-1.5 rounded-xl bg-stone-100 border border-stone-200 text-stone-700 font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-500" />
                  <span>{item.preparationTimeMinutes}m</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">
              About This Dish
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Serving & Spice Level Pills */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <div className="p-3 bg-white rounded-2xl border border-stone-200/80 shadow-2xs">
              <span className="text-[10px] text-stone-400 font-medium block">Portion / Serving</span>
              <span className="text-xs font-extrabold text-[#181D23] flex items-center gap-1.5 mt-0.5">
                <ChefHat className="w-3.5 h-3.5 text-[#F47738]" />
                {item.servingSize || 'Serves 1-2'}
              </span>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-stone-200/80 shadow-2xs">
              <span className="text-[10px] text-stone-400 font-medium block">Spice Level</span>
              <span className="text-xs font-extrabold text-[#181D23] flex items-center gap-1.5 mt-0.5">
                <Flame className="w-3.5 h-3.5 text-orange-500" />
                {item.spiceLevel || 'Medium Spiced'}
              </span>
            </div>
          </div>

          {/* Flavor Tags */}
          {item.tags && item.tags.length > 0 && (
            <div>
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block mb-1.5">
                Flavors & Tags
              </span>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-600 text-[11px] font-medium border border-stone-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Special Cooking Instructions Input */}
          <div className="pt-1">
            <label
              htmlFor="specialNotes"
              className="text-xs font-bold text-stone-700 block mb-1"
            >
              Special Instructions (Optional)
            </label>
            <input
              id="specialNotes"
              type="text"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="e.g. Less spicy, extra lemon, no coriander"
              className="w-full px-3.5 py-2.5 bg-white text-xs text-[#181D23] placeholder-stone-400 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#F47738]/25 focus:border-[#F47738]"
            />
          </div>
        </div>

        {/* Modal Sticky Bottom Action Footer */}
        <div className="p-4 bg-white border-t border-stone-200/80 flex items-center justify-between gap-3 shrink-0">
          {/* Quantity Stepper */}
          <div className="flex items-center bg-stone-100 rounded-2xl p-1 border border-stone-200 shrink-0">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-white disabled:opacity-40 text-stone-800 shadow-2xs transition-all active:scale-95"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center text-xs font-black text-[#181D23]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-[#F47738] text-white shadow-2xs transition-all active:scale-95"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Order Button */}
          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 py-3 px-4 rounded-2xl bg-[#F47738] hover:bg-[#e05e1f] active:scale-[0.98] text-white font-black text-xs sm:text-sm flex items-center justify-between shadow-md transition-all"
          >
            <span className="flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Order</span>
            </span>
            <span>{formatCurrency(lineTotal)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
