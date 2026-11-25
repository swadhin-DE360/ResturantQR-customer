import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  ShoppingBag,
  Trash2,
  QrCode,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  UtensilsCrossed,
} from 'lucide-react';
import { CartItemRow } from './CartItemRow';
import { OrderConfirmModal } from './OrderConfirmModal';
import { formatCurrency } from '@/utils';
import { APP_CONFIG } from '@/constants';
import { SAMPLE_MOCK_ORDER } from '@/data/mock-order';
import tablesData from '@/data/tables.json';
import { TableInfo } from '@/types';
import toast from 'react-hot-toast';

export interface CartDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen = false,
  onClose = () => {},
}) => {
  const navigate = useNavigate();
  const demoTable = (tablesData as TableInfo[])[0];

  const items = SAMPLE_MOCK_ORDER.items;
  const totalCount = SAMPLE_MOCK_ORDER.itemCount;
  const subtotal = SAMPLE_MOCK_ORDER.subtotal;
  const tax = SAMPLE_MOCK_ORDER.tax;
  const serviceFee = SAMPLE_MOCK_ORDER.serviceFee;
  const total = SAMPLE_MOCK_ORDER.total;

  const tableCode = demoTable?.tableNumber || APP_CONFIG.defaultTable;
  const tableName = demoTable?.tableName || tableCode.replace('TABLE-', 'Table ');

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  if (!isOpen) return null;

  const handleOpenConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const handleFinalOrderSubmit = () => {
    setIsConfirmModalOpen(false);
    onClose();
    toast.success(`Order #${SAMPLE_MOCK_ORDER.orderNumber} placed!`, {
      icon: '🎉',
      duration: 3000,
    });
    navigate(`/order-confirmation/${SAMPLE_MOCK_ORDER.orderNumber}`);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      >
        <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col justify-between border-l border-stone-200/80 animate-in slide-in-from-right duration-300 select-none"
          >
            {/* 1. Drawer Header */}
            <div className="p-4 sm:p-5 bg-white border-b border-stone-200/80 shrink-0">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 text-[#F47738] flex items-center justify-center font-extrabold shadow-2xs">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-extrabold text-[#181D23]">
                        Your Dine-In Cart
                      </h3>
                      {totalCount > 0 && (
                        <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-[#F47738] text-white">
                          {totalCount}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-500 font-medium mt-0.5 flex items-center gap-1">
                      <QrCode className="w-3.5 h-3.5 text-[#F47738]" />
                      <span>Ordering for <strong>{tableName}</strong></span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {items.length > 0 && (
                    <button
                      type="button"
                      onClick={() => toast('Demo UI preview')}
                      aria-label="Clear cart"
                      className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                      title="Clear Cart"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close cart"
                    className="p-2 text-stone-400 hover:text-[#181D23] hover:bg-stone-100 rounded-xl transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Scrollable Cart Items Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {items.length === 0 ? (
                /* Empty Cart State */
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 my-10">
                  <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 text-[#F47738] flex items-center justify-center shadow-soft">
                    <UtensilsCrossed className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-[#181D23]">
                      Your Cart is Empty
                    </h4>
                    <p className="text-xs text-stone-500 mt-1 max-w-xs leading-relaxed">
                      Add delicious appetizers, signature curries or refreshing drinks for {tableName}.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl bg-[#F47738] text-white font-extrabold text-xs shadow-xs hover:bg-[#e05e1f] active:scale-95 transition-all inline-flex items-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Browse Menu</span>
                  </button>
                </div>
              ) : (
                /* Items List & Summary */
                <div className="space-y-4">
                  {/* Selected Items */}
                  <div className="bg-white rounded-2xl border border-stone-200/80 p-3 sm:p-4 shadow-2xs divide-y divide-stone-100">
                    {items.map((item) => (
                      <CartItemRow
                        key={item.id}
                        item={item}
                        onIncrement={() => {}}
                        onDecrement={() => {}}
                        onRemove={() => {}}
                      />
                    ))}
                  </div>

                  {/* Bill Breakdown */}
                  <div className="bg-white rounded-2xl border border-stone-200/80 p-4 shadow-2xs space-y-2 text-xs">
                    <div className="flex justify-between text-stone-600">
                      <span>Items Subtotal</span>
                      <span className="font-bold text-[#181D23]">{formatCurrency(subtotal)}</span>
                    </div>

                    <div className="flex justify-between text-stone-600">
                      <span>Estimated Sales Tax ({(APP_CONFIG.taxRate * 100).toFixed(2)}%)</span>
                      <span className="font-bold text-[#181D23]">{formatCurrency(tax)}</span>
                    </div>

                    <div className="flex justify-between text-stone-600">
                      <span>Dine-In Service Fee ({(APP_CONFIG.serviceChargeRate * 100).toFixed(0)}%)</span>
                      <span className="font-bold text-[#181D23]">{formatCurrency(serviceFee)}</span>
                    </div>

                    <div className="pt-2 border-t border-stone-200 flex justify-between text-sm sm:text-base font-black text-[#181D23]">
                      <span>Total Amount</span>
                      <span className="text-[#F47738]">{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Sticky Bottom Action Footer */}
            {items.length > 0 && (
              <div className="p-4 sm:p-5 bg-white border-t border-stone-200/80 shrink-0 space-y-2.5">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Contactless Table Billing</span>
                  </span>
                  <span className="font-bold text-[#181D23]">{formatCurrency(total)}</span>
                </div>

                <button
                  type="button"
                  onClick={handleOpenConfirmModal}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#F47738] hover:bg-[#e05e1f] active:scale-[0.98] text-white font-black text-sm flex items-center justify-between shadow-float transition-all"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    <span>Place Order</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span>{formatCurrency(total)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    navigate('/cart');
                  }}
                  className="w-full text-center text-xs font-bold text-stone-500 hover:text-stone-800 transition-colors py-1"
                >
                  View Full Cart & Add Table Notes →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pre-submission confirmation modal */}
      <OrderConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleFinalOrderSubmit}
        tableName={tableName}
        tableCode={tableCode}
        items={items}
        subtotal={subtotal}
        tax={tax}
        serviceFee={serviceFee}
        total={total}
        isSubmitting={false}
      />
    </>
  );
};

export default CartDrawer;
