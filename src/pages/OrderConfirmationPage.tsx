import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Clock,
  QrCode,
  UtensilsCrossed,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  FileText,
  Calendar,
  AlertCircle,
  HelpCircle,
  ArrowLeft,
  Sparkles,
  Receipt,
  User,
  Phone,
} from 'lucide-react';
import { formatCurrency, formatFullDateTime } from '@/utils';
import { APP_CONFIG } from '@/constants';
import { SAMPLE_MOCK_ORDER } from '@/data/mock-order';
import restaurantData from '@/data/restaurant.json';
import tablesData from '@/data/tables.json';
import { TableInfo } from '@/types';
import toast from 'react-hot-toast';

export const OrderConfirmationPage: React.FC = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const navigate = useNavigate();
  const demoTable = (tablesData as TableInfo[])[0];

  // State for toggling Order Details
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);

  // Demo JSON order data directly on page
  const order = {
    ...SAMPLE_MOCK_ORDER,
    orderNumber: orderNumber || SAMPLE_MOCK_ORDER.orderNumber,
  };

  const tableCode = demoTable?.tableNumber || APP_CONFIG.defaultTable;

  // Copy order reference handler
  const handleCopyOrderNumber = () => {
    if (order?.orderNumber) {
      navigator.clipboard.writeText(order.orderNumber);
      setCopied(true);
      toast.success('Order reference copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // If order wasn't found in React state
  if (!order) {
    return (
      <div className="max-w-md mx-auto py-12 px-4 text-center space-y-5 animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-3xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-soft">
          <HelpCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-black text-[#181D23]">
            No Active Order Found
          </h2>
          <p className="text-xs text-stone-500 leading-relaxed max-w-sm mx-auto">
            {orderNumber
              ? `We could not find an order reference "${orderNumber}" in your current session.`
              : 'You have not submitted an order yet in this session.'}
          </p>
        </div>
        <div>
          <button
            type="button"
            onClick={() => navigate(`/menu/${tableCode}`)}
            className="px-6 py-3 rounded-2xl bg-[#F47738] text-white font-bold text-xs shadow-md hover:bg-[#e05e1f] active:scale-95 transition-all inline-flex items-center gap-2"
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Return to Restaurant Menu</span>
          </button>
        </div>
      </div>
    );
  }

  // Calculate items summary count
  const totalItemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="max-w-2xl mx-auto space-y-5 py-2 sm:py-4 animate-in fade-in duration-300 pb-16">
      {/* Top Navigation: Return to Menu link */}
      <div className="flex items-center justify-between">
        <Link
          to={`/menu/${tableCode}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-[#181D23] transition-colors p-1.5 -ml-1.5 rounded-xl hover:bg-stone-100"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Menu</span>
        </Link>

        <span className="text-[11px] font-black uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>Pending Confirmation</span>
        </span>
      </div>

      {/* 1. Success Hero Animation & Order Placed Message */}
      <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 text-center shadow-card relative overflow-hidden">
        {/* Subtle decorative background gradient accents */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-100/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-amber-100/40 rounded-full blur-2xl pointer-events-none" />

        {/* Animated Success Icon */}
        <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
          {/* Animated pulsing outer halo ring */}
          <span className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-60 pointer-events-none" />
          <span className="absolute inset-1 rounded-full bg-emerald-50 border border-emerald-200 pointer-events-none" />
          
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/25 animate-in zoom-in-50 duration-300">
            <CheckCircle2 className="w-9 h-9" />
          </div>
        </div>

        {/* Order Placed Successfully Message */}
        <div className="mt-4 space-y-1.5">
          <h1 className="text-xl sm:text-2xl font-black text-[#181D23] tracking-tight">
            Order Placed Successfully!
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-medium max-w-md mx-auto">
            Your dining order has been submitted for <strong>{order.tableNumber}</strong> at {restaurantData.name}.
          </p>
        </div>

        {/* Unique Order Reference Pill */}
        <div className="mt-5 inline-flex items-center gap-2 bg-[#FAF8F5] px-4 py-2.5 rounded-2xl border border-stone-200/90 shadow-2xs">
          <span className="text-xs text-stone-500 font-medium">Order Reference:</span>
          <span className="font-black text-[#181D23] font-mono text-sm sm:text-base tracking-wider">
            {order.orderNumber}
          </span>
          <button
            type="button"
            onClick={handleCopyOrderNumber}
            className="p-1.5 rounded-xl hover:bg-stone-200/70 text-stone-500 hover:text-stone-800 transition-colors"
            title="Copy order reference"
            aria-label="Copy order reference"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 2. Order Status: Initial Status = Pending Confirmation */}
      <div className="bg-amber-50/70 rounded-3xl border border-amber-200/90 p-5 shadow-card space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4 text-amber-700 animate-spin-slow" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-amber-700 tracking-wider">
                Current Status
              </span>
              <p className="font-black text-[#181D23] text-sm">
                Pending Confirmation
              </p>
            </div>
          </div>

          <span className="text-[11px] font-bold text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-lg border border-amber-200">
            Awaiting Review
          </span>
        </div>

        <p className="text-xs text-amber-900/90 leading-relaxed pt-1 border-t border-amber-200/60">
          Your order ticket has been submitted to the restaurant. It is currently <strong>pending confirmation</strong> by our staff. Please relax at your table while our team confirms your order.
        </p>
      </div>

      {/* 3. Key Order Metadata Card: Table Number, Date & Time, Subtotal */}
      <div className="bg-white rounded-3xl border border-stone-200/80 p-5 shadow-card space-y-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-stone-400">
          Order Summary Overview
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Table Number */}
          <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-stone-200/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 text-[#F47738] flex items-center justify-center font-bold shadow-2xs shrink-0">
              <QrCode className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase font-bold text-stone-400">Table Number</p>
              <p className="text-sm font-black text-[#181D23] truncate">
                {order.tableNumber}
              </p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-stone-200/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 text-[#F47738] flex items-center justify-center font-bold shadow-2xs shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase font-bold text-stone-400">Date & Time</p>
              <p className="text-xs font-bold text-[#181D23] truncate" title={formatFullDateTime(order.createdAt)}>
                {formatFullDateTime(order.createdAt)}
              </p>
            </div>
          </div>

          {/* Order Subtotal */}
          <div className="p-3.5 bg-[#FAF8F5] rounded-2xl border border-stone-200/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 text-[#F47738] flex items-center justify-center font-bold shadow-2xs shrink-0">
              <Receipt className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase font-bold text-stone-400">Order Subtotal</p>
              <p className="text-sm font-black text-[#181D23] truncate">
                {formatCurrency(order.subtotal)}
              </p>
            </div>
          </div>
        </div>

        {/* Ordered Food Items & Quantities Summary */}
        <div className="pt-2 border-t border-stone-100 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-stone-500">
            <span>Ordered Food Items ({totalItemCount} total)</span>
            <span>Quantity</span>
          </div>

          <div className="divide-y divide-stone-100 bg-[#FAF8F5] rounded-2xl p-3 border border-stone-200/70">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="py-2 first:pt-1 last:pb-1 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      item.dietaryType === 'veg' ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                  />
                  <span className="font-bold text-[#181D23] truncate">
                    {item.name}
                  </span>
                </div>

                <div className="flex items-center gap-4 shrink-0 font-bold">
                  <span className="px-2.5 py-0.5 rounded-lg bg-white border border-stone-200 text-[#181D23] text-xs">
                    Qty: {item.quantity}
                  </span>
                  <span className="text-stone-700 min-w-[65px] text-right font-black">
                    {formatCurrency(item.subtotal)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Subtotal and Grand Total Bar */}
          <div className="pt-2 flex items-center justify-between text-xs font-medium text-stone-600 px-1">
            <span>Order Subtotal: <strong className="text-stone-900">{formatCurrency(order.subtotal)}</strong></span>
            <span>Grand Total (with Tax & Fees): <strong className="text-[#F47738] font-black text-sm">{formatCurrency(order.total)}</strong></span>
          </div>
        </div>
      </div>

      {/* 4. Interactive "View Order Details" Toggle Section */}
      <div className="bg-white rounded-3xl border border-stone-200/80 shadow-card overflow-hidden transition-all">
        {/* Toggle Header Button */}
        <button
          type="button"
          onClick={() => setShowDetails((prev) => !prev)}
          className="w-full p-5 flex items-center justify-between text-left hover:bg-stone-50/70 transition-colors focus:outline-none"
          aria-expanded={showDetails}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 text-[#F47738] flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-[#181D23] text-sm sm:text-base">
                {showDetails ? 'Hide Order Details' : 'View Order Details'}
              </h3>
              <p className="text-xs text-stone-500">
                Item breakdown, prices, notes & detailed bill receipt
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-[#F47738]">
            <span className="hidden sm:inline">
              {showDetails ? 'Collapse' : 'Expand'}
            </span>
            {showDetails ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        </button>

        {/* Collapsible Content */}
        {showDetails && (
          <div className="p-5 sm:p-6 pt-0 border-t border-stone-100 space-y-5 animate-in slide-in-from-top-2 duration-200 text-xs">
            {/* Customer & Dining Info if present */}
            {(order.customerName || order.customerPhone || order.notes) && (
              <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2 mt-4">
                <h4 className="font-extrabold uppercase text-[10px] text-stone-400 tracking-wider">
                  Dining Notes & Guest Information
                </h4>
                <div className="space-y-1 text-stone-700">
                  {order.customerName && (
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-stone-400" />
                      <span>Guest Name: <strong className="text-stone-900">{order.customerName}</strong></span>
                    </div>
                  )}
                  {order.customerPhone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-stone-400" />
                      <span>Phone: <strong className="text-stone-900">{order.customerPhone}</strong></span>
                    </div>
                  )}
                  {order.notes && (
                    <div className="flex items-start gap-2 pt-1 border-t border-stone-200/60">
                      <FileText className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                      <span>Special Notes: <em className="text-stone-800">"{order.notes}"</em></span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Detailed Itemized Dish Cards */}
            <div className="space-y-3 mt-4">
              <h4 className="font-extrabold uppercase text-[10px] text-stone-400 tracking-wider">
                Itemized Dishes & Prices
              </h4>

              <div className="divide-y divide-stone-100">
                {order.items.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover border border-stone-100 shrink-0"
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
                          <p className="font-bold text-[#181D23] text-sm truncate">
                            {item.name}
                          </p>
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
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="inline-block text-xs font-bold text-stone-500 mb-0.5">
                        {item.quantity} × {formatCurrency(item.price)}
                      </span>
                      <p className="font-black text-[#181D23] text-sm">
                        {formatCurrency(item.subtotal)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Bill Breakdown */}
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-stone-200/80 space-y-2">
              <h4 className="font-extrabold uppercase text-[10px] text-stone-400 tracking-wider mb-2">
                Bill Calculation
              </h4>

              <div className="flex justify-between text-stone-600">
                <span>Items Subtotal</span>
                <span className="font-bold text-stone-900">{formatCurrency(order.subtotal)}</span>
              </div>

              <div className="flex justify-between text-stone-600">
                <span>Sales Tax (8.25%)</span>
                <span className="font-bold text-stone-900">{formatCurrency(order.tax)}</span>
              </div>

              <div className="flex justify-between text-stone-600">
                <span>Dine-In Service Fee (5%)</span>
                <span className="font-bold text-stone-900">{formatCurrency(order.serviceFee)}</span>
              </div>

              <div className="pt-2 border-t border-stone-200 flex justify-between text-sm sm:text-base font-black text-[#181D23]">
                <span>Grand Total to Pay</span>
                <span className="text-[#F47738]">{formatCurrency(order.total)}</span>
              </div>
            </div>

            {/* Restaurant Info Footer in Details */}
            <div className="p-3 rounded-xl bg-stone-50 text-[11px] text-stone-500 text-center">
              <p className="font-bold text-stone-700">{restaurantData.name}</p>
              <p>{restaurantData.address} • {restaurantData.phone}</p>
            </div>
          </div>
        )}
      </div>

      {/* 5. Helpful Dine-In Note */}
      <div className="p-4 bg-orange-50/70 rounded-2xl border border-orange-200/80 flex items-start gap-3 text-xs text-stone-700">
        <AlertCircle className="w-5 h-5 text-[#F47738] shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="font-bold text-[#181D23]">
            What Happens Next?
          </p>
          <p className="text-stone-600 leading-relaxed">
            Our waitstaff has received your table ticket for <strong>{order.tableNumber}</strong>. You will receive your food directly at your table once confirmed and prepared. You can pay your server at the end of your meal.
          </p>
        </div>
      </div>

      {/* 6. Primary Action: Return to Restaurant Menu Button */}
      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
        <Link
          to={`/menu/${tableCode}`}
          className="w-full py-4 px-6 rounded-2xl bg-[#F47738] hover:bg-[#e05e1f] active:scale-[0.98] text-white font-black text-sm sm:text-base text-center shadow-float transition-all flex items-center justify-center gap-2"
        >
          <UtensilsCrossed className="w-5 h-5" />
          <span>Return to Restaurant Menu</span>
          <Sparkles className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
