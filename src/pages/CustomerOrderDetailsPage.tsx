import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  QrCode,
  Calendar,
  Receipt,
  Copy,
  Check,
  UtensilsCrossed,
  Sparkles,
  FileText,
  AlertCircle,
  ShoppingBag,
  User,
  Phone,
} from 'lucide-react';
import { OrderStatusTimeline } from '@/components/order/OrderStatusTimeline';
import { formatCurrency, formatFullDateTime } from '@/utils';
import { APP_CONFIG } from '@/constants';
import { SAMPLE_MOCK_ORDER } from '@/data/mock-order';
import { OrderStatus, TableInfo } from '@/types';
import restaurantData from '@/data/restaurant.json';
import tablesData from '@/data/tables.json';
import toast from 'react-hot-toast';

export const CustomerOrderDetailsPage: React.FC = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const navigate = useNavigate();
  const demoTable = (tablesData as TableInfo[])[0];

  const [copied, setCopied] = useState(false);

  // Demo JSON order data directly on page
  const baseOrder = {
    ...SAMPLE_MOCK_ORDER,
    orderNumber: orderNumber || SAMPLE_MOCK_ORDER.orderNumber,
  };

  // React state for previewing status timeline on this page
  const [activeStatus, setActiveStatus] = useState<OrderStatus>(baseOrder.status || 'Pending');

  const tableCode = demoTable?.tableNumber || APP_CONFIG.defaultTable;
  const tableName = baseOrder.tableNumber || demoTable?.tableName || tableCode.replace('TABLE-', 'Table ');

  // Handle Copy Order Reference
  const handleCopyOrderNumber = () => {
    if (baseOrder.orderNumber) {
      navigator.clipboard.writeText(baseOrder.orderNumber);
      setCopied(true);
      toast.success('Order reference copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleStatusChange = (newStatus: OrderStatus) => {
    setActiveStatus(newStatus);
    toast.success(`Timeline updated to: ${newStatus} (React state preview)`);
  };

  const totalQuantity = baseOrder.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="max-w-2xl mx-auto space-y-5 py-2 sm:py-4 animate-in fade-in duration-300 pb-16">
      {/* Top Navigation & Return to Menu */}
      <div className="flex items-center justify-between">
        <Link
          to={`/menu/${tableCode}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-[#181D23] transition-colors p-1.5 -ml-1.5 rounded-xl hover:bg-stone-100"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Menu</span>
        </Link>

        <span className="text-[11px] font-black uppercase tracking-wider text-[#F47738] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
          Order Details View
        </span>
      </div>

      {/* 1. Header Order Banner Card */}
      <div className="bg-white rounded-3xl border border-stone-200/80 p-5 sm:p-6 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 text-[#F47738] flex items-center justify-center font-black shadow-2xs shrink-0">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#F47738]">
                {restaurantData.name}
              </span>
              <h2 className="text-lg sm:text-xl font-black text-[#181D23]">
                Order Details
              </h2>
              <p className="text-xs text-stone-500">
                {restaurantData.cuisine}
              </p>
            </div>
          </div>

          {/* Unique Order Reference Pill */}
          <div className="inline-flex items-center gap-2 bg-[#FAF8F5] px-3.5 py-2 rounded-2xl border border-stone-200 shadow-2xs self-start sm:self-auto">
            <span className="text-[11px] text-stone-500 font-medium">Ref:</span>
            <span className="font-mono font-black text-[#181D23] text-xs sm:text-sm tracking-wider">
              {baseOrder.orderNumber}
            </span>
            <button
              type="button"
              onClick={handleCopyOrderNumber}
              className="p-1 rounded-lg hover:bg-stone-200/80 text-stone-500 hover:text-stone-800 transition-colors"
              title="Copy reference"
              aria-label="Copy reference"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Key Metadata Grid: Table Number, Date & Time, Order Status */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-stone-100 text-xs">
          {/* Table Number */}
          <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-stone-200/70 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white border border-stone-200 text-[#F47738] flex items-center justify-center shrink-0 shadow-2xs">
              <QrCode className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase text-stone-400">Table Number</p>
              <p className="text-xs font-black text-[#181D23] truncate">{tableName}</p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-stone-200/70 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white border border-stone-200 text-[#F47738] flex items-center justify-center shrink-0 shadow-2xs">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase text-stone-400">Order Date & Time</p>
              <p className="text-xs font-bold text-[#181D23] truncate" title={formatFullDateTime(baseOrder.createdAt)}>
                {formatFullDateTime(baseOrder.createdAt)}
              </p>
            </div>
          </div>

          {/* Order Status */}
          <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-stone-200/70 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white border border-stone-200 text-[#F47738] flex items-center justify-center shrink-0 shadow-2xs">
              <Receipt className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase text-stone-400">Order Status</p>
              <p className="text-xs font-black text-[#F47738] truncate">{activeStatus}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Visual Order Status Timeline: Pending -> Accepted -> Preparing -> Ready -> Completed */}
      <OrderStatusTimeline
        currentStatus={activeStatus}
        onStatusChange={handleStatusChange}
      />

      {/* 3. Ordered Food Items & Quantities List */}
      <div className="bg-white rounded-3xl border border-stone-200/80 p-5 sm:p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="w-4 h-4 text-[#F47738]" />
            <h3 className="text-sm font-black text-[#181D23]">
              Ordered Food Items
            </h3>
          </div>
          <span className="text-xs font-bold text-stone-500">
            {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'} total
          </span>
        </div>

        <div className="divide-y divide-stone-100">
          {baseOrder.items.map((item) => (
            <div
              key={item.id}
              className="py-3.5 flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover border border-stone-100 shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&auto=format&fit=crop&q=80';
                  }}
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.dietaryType === 'veg' ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                    />
                    <h4 className="font-bold text-[#181D23] text-xs sm:text-sm truncate">
                      {item.name}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 text-stone-500 text-[11px] mt-0.5">
                    <span>{formatCurrency(item.price)} each</span>
                    {item.servingSize && (
                      <>
                        <span>•</span>
                        <span>{item.servingSize}</span>
                      </>
                    )}
                  </div>

                  {item.specialInstructions && (
                    <p className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded mt-1 inline-block">
                      Note: {item.specialInstructions}
                    </p>
                  )}
                </div>
              </div>

              {/* Quantity & Line Subtotal */}
              <div className="text-right shrink-0">
                <span className="px-2.5 py-0.5 rounded-lg bg-stone-100 border border-stone-200 text-stone-700 text-xs font-black inline-block mb-1">
                  Qty: {item.quantity}
                </span>
                <p className="font-black text-[#181D23] text-sm">
                  {formatCurrency(item.subtotal)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Guest Details & Cooking Notes (if present) */}
      {(baseOrder.customerName || baseOrder.customerPhone || baseOrder.notes) && (
        <div className="bg-white rounded-3xl border border-stone-200/80 p-5 shadow-card space-y-2.5 text-xs text-stone-700">
          <h4 className="font-black text-[#181D23] text-xs uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#F47738]" />
            <span>Table Notes & Guest Information</span>
          </h4>

          <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-stone-200/70 space-y-1.5">
            {baseOrder.customerName && (
              <p className="flex items-center gap-2 text-stone-700">
                <User className="w-3.5 h-3.5 text-stone-400" />
                <span>Guest Name: <strong className="text-stone-900">{baseOrder.customerName}</strong></span>
              </p>
            )}
            {baseOrder.customerPhone && (
              <p className="flex items-center gap-2 text-stone-700">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <span>Phone: <strong className="text-stone-900">{baseOrder.customerPhone}</strong></span>
              </p>
            )}
            {baseOrder.notes && (
              <p className="flex items-start gap-2 pt-1 border-t border-stone-200/60 text-stone-700">
                <FileText className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                <span>Special Instructions: <em>"{baseOrder.notes}"</em></span>
              </p>
            )}
          </div>
        </div>
      )}

      {/* 5. Subtotal & Bill Breakdown Card */}
      <div className="bg-white rounded-3xl border border-stone-200/80 p-5 shadow-card space-y-3 text-xs">
        <h4 className="font-extrabold text-[#181D23] uppercase tracking-wider text-xs pb-2 border-b border-stone-100">
          Order Payment Summary
        </h4>

        <div className="flex justify-between text-stone-600">
          <span>Items Subtotal</span>
          <span className="font-bold text-[#181D23]">{formatCurrency(baseOrder.subtotal)}</span>
        </div>

        <div className="flex justify-between text-stone-600">
          <span>Sales Tax (8.25%)</span>
          <span className="font-bold text-[#181D23]">{formatCurrency(baseOrder.tax)}</span>
        </div>

        <div className="flex justify-between text-stone-600">
          <span>Dine-In Service Fee (5%)</span>
          <span className="font-bold text-[#181D23]">{formatCurrency(baseOrder.serviceFee)}</span>
        </div>

        <div className="pt-3 border-t border-stone-200 flex justify-between text-base font-black text-[#181D23]">
          <span>Total to Settle at Table</span>
          <span className="text-[#F47738] text-xl">{formatCurrency(baseOrder.total)}</span>
        </div>
      </div>

      {/* 6. Contactless Dine-In Server Notice */}
      <div className="p-4 bg-orange-50/70 rounded-2xl border border-orange-200/80 flex items-start gap-3 text-xs text-stone-700">
        <AlertCircle className="w-5 h-5 text-[#F47738] shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-bold text-[#181D23]">
            Dine-In Payment Information
          </p>
          <p className="text-stone-600 leading-relaxed">
            Your server will bring all items straight to <strong>{tableName}</strong>. You may settle the final total of <strong>{formatCurrency(baseOrder.total)}</strong> with your server via Cash, Card, or Digital Pay at the conclusion of your meal.
          </p>
        </div>
      </div>

      {/* 7. Action: Return to Menu Button */}
      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(`/menu/${tableCode}`)}
          className="w-full py-4 px-6 rounded-2xl bg-[#F47738] hover:bg-[#e05e1f] active:scale-[0.98] text-white font-black text-sm sm:text-base text-center shadow-float transition-all flex items-center justify-center gap-2"
        >
          <UtensilsCrossed className="w-5 h-5" />
          <span>Return to Menu</span>
          <Sparkles className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CustomerOrderDetailsPage;
