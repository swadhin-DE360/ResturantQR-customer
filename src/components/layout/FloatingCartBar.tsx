import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/utils';
import tablesData from '@/data/tables.json';
import { TableInfo } from '@/types';

export interface FloatingCartBarProps {
  itemCount?: number;
  subtotal?: number;
  onViewCart?: () => void;
}

export const FloatingCartBar: React.FC<FloatingCartBarProps> = ({
  itemCount: propItemCount = 0,
  subtotal: propSubtotal = 0,
  onViewCart,
}) => {
  const demoTable = (tablesData as TableInfo[])[0];

  const activeCount = propItemCount;
  const activeSubtotal = propSubtotal;
  const handleViewCart = onViewCart || (() => {});

  if (activeCount <= 0) return null;

  const tableCode = demoTable?.tableName || demoTable?.tableNumber?.replace('TABLE-', 'Table ') || 'Table 01';

  return (
    <aside
      aria-label="Floating Cart Summary"
      className="fixed bottom-4 sm:bottom-6 inset-x-4 max-w-md mx-auto z-40 animate-in slide-in-from-bottom duration-300"
    >
      <div className="bg-[#181D23] text-white rounded-2xl p-3 sm:p-3.5 shadow-float border border-stone-800 flex items-center justify-between gap-3">
        {/* Left: Cart Bag & Live Total */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F47738] text-white flex items-center justify-center font-black text-sm shadow-sm shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-stone-300">
                {activeCount} {activeCount === 1 ? 'dish' : 'dishes'}
              </span>
              <span className="text-stone-600">•</span>
              <span className="text-sm font-black text-white">
                {formatCurrency(activeSubtotal)}
              </span>
            </div>
            <p className="text-[10px] text-stone-400 font-medium">
              Ordering for <strong className="text-orange-300">{tableCode}</strong>
            </p>
          </div>
        </div>

        {/* Right: View Cart Button with Warm Orange Tone */}
        <button
          type="button"
          onClick={handleViewCart}
          className="flex items-center gap-1.5 bg-[#F47738] hover:bg-[#e05e1f] active:scale-95 text-white font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all shadow-md shrink-0 select-none"
        >
          <span>View Cart</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
