import React, { useState } from 'react';
import {
  ShoppingBag,
  Trash2,
  QrCode,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  UtensilsCrossed,
  FileText,
  User,
  Phone,
  AlertCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CartItemRow } from '@/components/cart/CartItemRow';
import { OrderConfirmModal } from '@/components/cart/OrderConfirmModal';
import { formatCurrency } from '@/utils';
import { APP_CONFIG } from '@/constants';
import restaurantData from '@/data/restaurant.json';
import tablesData from '@/data/tables.json';
import { SAMPLE_MOCK_ORDER } from '@/data/mock-order';
import { TableInfo } from '@/types';
import toast from 'react-hot-toast';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const demoTable = (tablesData as TableInfo[])[0];

  // Demo JSON data directly on page
  const items = SAMPLE_MOCK_ORDER.items;
  const totalCount = SAMPLE_MOCK_ORDER.itemCount;
  const subtotal = SAMPLE_MOCK_ORDER.subtotal;
  const tax = SAMPLE_MOCK_ORDER.tax;
  const serviceFee = SAMPLE_MOCK_ORDER.serviceFee;
  const total = SAMPLE_MOCK_ORDER.total;

  const tableCode = demoTable?.tableNumber || APP_CONFIG.defaultTable;
  const tableName = demoTable?.tableName || tableCode.replace('TABLE-', 'Table ');
  const tableSection = demoTable?.section || 'Main Dining Hall';

  // Optional Guest details & kitchen instructions
  const [customerName, setCustomerName] = useState(SAMPLE_MOCK_ORDER.customerName || '');
  const [customerPhone, setCustomerPhone] = useState(SAMPLE_MOCK_ORDER.customerPhone || '');
  const [specialNotes, setSpecialNotes] = useState(SAMPLE_MOCK_ORDER.notes || '');

  // Confirmation modal state
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // Trigger modal
  const handleOpenConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  // Demo UI navigation to order confirmation
  const handleFinalOrderSubmit = () => {
    toast.success(`Order #${SAMPLE_MOCK_ORDER.orderNumber} placed!`, {
      icon: '🎉',
      duration: 3000,
    });
    setIsConfirmModalOpen(false);
    navigate(`/order-confirmation/${SAMPLE_MOCK_ORDER.orderNumber}`, { replace: true });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5 py-2 sm:py-4 animate-in fade-in duration-300 pb-16">
      {/* Top Navigation & Back Action */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(`/menu/${tableCode}`)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-[#181D23] transition-colors p-1.5 -ml-1.5 rounded-xl hover:bg-stone-100"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Menu</span>
        </button>

        {items.length > 0 && (
          <button
            type="button"
            onClick={() => toast('Demo UI preview')}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Cart</span>
          </button>
        )}
      </div>

      {/* Header Banner */}
      <div className="bg-white rounded-3xl border border-stone-200/80 p-5 shadow-card flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 text-[#F47738] flex items-center justify-center font-extrabold shadow-2xs shrink-0">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black text-[#181D23]">
                Your Table Order
              </h1>
              {totalCount > 0 && (
                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#F47738] text-white">
                  {totalCount} {totalCount === 1 ? 'item' : 'items'}
                </span>
              )}
            </div>
            <p className="text-xs text-stone-500 font-medium mt-0.5 flex items-center gap-1">
              <QrCode className="w-3.5 h-3.5 text-[#F47738]" />
              <span>Dine-In Table: <strong>{tableName}</strong> ({tableCode}) • {tableSection}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {items.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-stone-200/80 p-8 sm:p-12 text-center shadow-card space-y-4 my-6">
          <div className="w-20 h-20 rounded-3xl bg-orange-50 border border-orange-100 text-[#F47738] flex items-center justify-center mx-auto shadow-soft">
            <UtensilsCrossed className="w-10 h-10" />
          </div>
          <div className="max-w-xs mx-auto">
            <h2 className="text-lg font-extrabold text-[#181D23]">
              Your Cart is Empty
            </h2>
            <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
              Explore our authentic Indian menu and add your favorite dishes to place an order for {tableName}.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate(`/menu/${tableCode}`)}
            className="mt-2 px-6 py-3 rounded-2xl bg-[#F47738] hover:bg-[#e05e1f] active:scale-95 text-white font-extrabold text-xs shadow-md transition-all inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Explore Menu</span>
          </button>
        </div>
      ) : (
        /* Items & Bill Details */
        <div className="space-y-4">
          {/* Selected Items Card */}
          <div className="bg-white rounded-3xl border border-stone-200/80 p-4 sm:p-6 shadow-card">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-2">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                Selected Dishes
              </span>
              <span className="text-xs font-bold text-stone-600">
                {items.length} unique {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>

            <div className="divide-y divide-stone-100">
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
          </div>

          {/* Optional Guest Details & Kitchen Cooking Notes */}
          <div className="bg-white rounded-3xl border border-stone-200/80 p-5 shadow-card space-y-3.5 text-xs">
            <h3 className="font-black text-[#181D23] text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#F47738]" />
              <span>Cooking Instructions & Guest Details (Optional)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="customerName" className="block font-bold text-stone-700 mb-1">
                  Your Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="customerName"
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-[#F47738] focus:ring-2 focus:ring-orange-100 outline-none transition-all text-xs text-[#181D23] placeholder:text-stone-400"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="customerPhone" className="block font-bold text-stone-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="customerPhone"
                    type="tel"
                    placeholder="e.g. +1 555-0192"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-[#F47738] focus:ring-2 focus:ring-orange-100 outline-none transition-all text-xs text-[#181D23] placeholder:text-stone-400"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="specialNotes" className="block font-bold text-stone-700 mb-1">
                Kitchen Cooking Notes & Special Requests
              </label>
              <textarea
                id="specialNotes"
                rows={2}
                placeholder="e.g. Less spicy, extra lemon, nut allergy, bring all food together..."
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-[#F47738] focus:ring-2 focus:ring-orange-100 outline-none transition-all text-xs text-[#181D23] placeholder:text-stone-400 resize-none"
              />
            </div>
          </div>

          {/* Bill Summary Breakdown */}
          <div className="bg-white rounded-3xl border border-stone-200/80 p-5 shadow-card space-y-3 text-xs">
            <h3 className="font-extrabold text-[#181D23] uppercase tracking-wider text-xs pb-2 border-b border-stone-100">
              Bill Breakdown
            </h3>

            <div className="flex justify-between text-stone-600">
              <span>Items Subtotal</span>
              <span className="font-bold text-[#181D23]">{formatCurrency(subtotal)}</span>
            </div>

            <div className="flex justify-between text-stone-600">
              <span>Estimated Sales Tax ({(APP_CONFIG.taxRate * 100).toFixed(2)}%)</span>
              <span className="font-bold text-[#181D23]">{formatCurrency(tax)}</span>
            </div>

            <div className="flex justify-between text-stone-600">
              <span>Dine-In Service Charge ({(APP_CONFIG.serviceChargeRate * 100).toFixed(0)}%)</span>
              <span className="font-bold text-[#181D23]">{formatCurrency(serviceFee)}</span>
            </div>

            <div className="pt-3 border-t border-stone-200 flex justify-between text-base font-black text-[#181D23]">
              <span>Grand Total</span>
              <span className="text-[#F47738] text-lg">{formatCurrency(total)}</span>
            </div>
          </div>

          {/* Dine-In Payment Notice */}
          <div className="p-4 bg-orange-50/70 rounded-2xl border border-orange-200/80 flex items-start gap-3 text-xs text-stone-700">
            <AlertCircle className="w-5 h-5 text-[#F47738] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="font-bold text-[#181D23]">
                Pay at Table (No Online Payment Required)
              </p>
              <p className="text-stone-600 leading-relaxed">
                Clicking <strong>Place Order</strong> sends your dishes straight to {restaurantData.name}'s kitchen. You can settle the bill with your server at the table after dining.
              </p>
            </div>
          </div>

          {/* Place Order Action Card */}
          <div className="bg-white rounded-3xl border border-stone-200/80 p-5 shadow-card space-y-3">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Auto-dispatched to <strong>{tableName}</strong></span>
              </span>
              <span className="font-black text-[#181D23] text-sm">{formatCurrency(total)}</span>
            </div>

            <button
              type="button"
              onClick={handleOpenConfirmModal}
              className="w-full py-4 px-5 rounded-2xl bg-[#F47738] hover:bg-[#e05e1f] active:scale-[0.98] text-white font-black text-sm sm:text-base flex items-center justify-between shadow-float transition-all"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                <span>Place Order</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span>{formatCurrency(total)}</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Pre-Submission Confirmation Modal */}
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
        customerName={customerName}
        customerPhone={customerPhone}
        notes={specialNotes}
        isSubmitting={false}
      />
    </div>
  );
};

export default CartPage;
