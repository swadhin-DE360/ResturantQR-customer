import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/utils';

export interface BottomCartBarProps {
  itemCount: number;
  totalAmount: number;
  onViewCart: () => void;
}

export const BottomCartBar: React.FC<BottomCartBarProps> = ({
  itemCount,
  totalAmount,
  onViewCart,
}) => {
  if (itemCount === 0) return null;

  return (
    <aside
      aria-label="Current cart summary"
      className="fixed bottom-4 inset-x-4 max-w-md mx-auto z-40 animate-in slide-in-from-bottom duration-300"
    >
      <div className="bg-slate-900 text-white rounded-2xl p-3 sm:p-3.5 shadow-2xl border border-slate-800 flex items-center justify-between gap-3">
        {/* Left: Item Count & Total */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F47738] text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-300">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-sm font-extrabold text-white">
                {formatCurrency(totalAmount)}
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Taxes calculated on order review</p>
          </div>
        </div>

        {/* Right: Action Button */}
        <button
          type="button"
          onClick={onViewCart}
          className="flex items-center gap-1.5 bg-[#F47738] hover:bg-[#e05e1f] active:scale-95 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all shadow-md shrink-0"
        >
          <span>View Cart</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
