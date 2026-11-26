import React from 'react';
import {
  UtensilsCrossed,
  X,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { CartItem } from '@/types';
import { formatCurrency } from '@/utils';
import restaurantData from '@/data/restaurant.json';

interface OrderConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  tableName: string;
  tableCode: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  serviceFee: number;
  total: number;
  customerName?: string;
  customerPhone?: string;
  notes?: string;
  isSubmitting?: boolean;
}

export const OrderConfirmModal: React.FC<OrderConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  tableName,
  tableCode,
  items,
  subtotal,
  tax,
  serviceFee,
  total,
  customerName,
  customerPhone,
  notes,
  isSubmitting = false,
}) => {
  if (!isOpen) return null;

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-[#FAF8F5] p-5 sm:p-6 border-b border-stone-200 flex items-start justify-between relative">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-100/80 border border-orange-200 text-[#F47738] flex items-center justify-center shrink-0 shadow-2xs">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#F47738]">
                {restaurantData.name}
              </span>
              <h3 id="confirm-modal-title" className="text-lg sm:text-xl font-black text-[#181D23]">
                Confirm Your Order
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                Serving to <strong>{tableName}</strong> ({tableCode})
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="w-8 h-8 rounded-full bg-white hover:bg-stone-100 text-stone-400 hover:text-stone-700 flex items-center justify-center transition-colors border border-stone-200 shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Table & Dine-in Highlight */}
          <div className="p-3.5 bg-orange-50/60 rounded-2xl border border-orange-200/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F47738] animate-pulse" />
              <span className="font-bold text-[#181D23]">
                Dine-In Destination:
              </span>
              <span className="font-extrabold text-[#F47738]">{tableName}</span>
            </div>
            <div className="flex items-center gap-1 text-stone-500 font-medium">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>Est. ~20 mins</span>
            </div>
          </div>

          {/* Guest Info (if entered) */}
          {(customerName || customerPhone) && (
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/70 text-xs text-stone-600 flex flex-wrap gap-x-4 gap-y-1">
              {customerName && (
                <span>
                  Guest: <strong className="text-stone-900">{customerName}</strong>
                </span>
              )}
              {customerPhone && (
                <span>
                  Phone: <strong className="text-stone-900">{customerPhone}</strong>
                </span>
              )}
            </div>
          )}

          {/* Items Summary */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
              <span>Dishes to send ({totalQuantity})</span>
              <span>Subtotal</span>
            </div>

            <div className="divide-y divide-stone-100 border border-stone-200/80 rounded-2xl p-2 bg-stone-50/40">
              {items.map((item) => (
                <div key={item.id} className="py-2 px-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <span className="w-6 h-6 rounded-lg bg-orange-100 text-[#F47738] font-bold text-[11px] flex items-center justify-center shrink-0">
                      {item.quantity}x
                    </span>
                    <div className="truncate">
                      <p className="font-bold text-[#181D23] truncate">{item.name}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-[#181D23]">{formatCurrency(item.subtotal)}</p>
                    <p className="text-[10px] text-stone-400">
                      @{formatCurrency(item.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Special Notes */}
          {notes && (
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-600">
              <span className="font-bold text-stone-800 flex items-center gap-1.5 mb-1">
                <FileText className="w-3.5 h-3.5 text-stone-500" />
                Kitchen Notes:
              </span>
              <p className="italic text-stone-700 bg-white p-2 rounded-lg border border-stone-200/60">
                "{notes}"
              </p>
            </div>
          )}

          {/* Price Breakdown */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-1.5 text-xs">
            <div className="flex justify-between text-stone-600">
              <span>Items Subtotal</span>
              <span className="font-semibold text-stone-900">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Sales Tax</span>
              <span className="font-semibold text-stone-900">{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Service Fee</span>
              <span className="font-semibold text-stone-900">{formatCurrency(serviceFee)}</span>
            </div>
            <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-black text-[#181D23]">
              <span>Total to Pay</span>
              <span className="text-[#F47738]">{formatCurrency(total)}</span>
            </div>
          </div>

          {/* Dine-In Payment Notice */}
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Pay at Table:</strong> No advance online payment required. Your order will be sent to the kitchen now. You can settle the bill with your server at the end of your dining session.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 font-bold text-xs transition-colors"
          >
            Review & Edit
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#F47738] hover:bg-[#e05e1f] active:scale-95 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Submitting Order...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm & Place Order ({formatCurrency(total)})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmModal;
