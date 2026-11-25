import React from 'react';
import { formatCurrency } from '@/utils';
import { APP_CONFIG } from '@/constants';

export interface OrderSummaryCardProps {
  subtotal: number;
  taxAmount?: number;
  serviceFee?: number;
  total: number;
  className?: string;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  subtotal,
  taxAmount,
  serviceFee,
  total,
  className,
}) => {
  const calculatedTax = taxAmount ?? subtotal * APP_CONFIG.taxRate;
  const calculatedServiceFee = serviceFee ?? (subtotal > 0 ? APP_CONFIG.serviceChargeRate * subtotal : 0);
  const calculatedTotal = total || subtotal + calculatedTax + calculatedServiceFee;

  return (
    <div className={`p-4 bg-slate-50 rounded-2xl border border-slate-200/80 ${className || ''}`}>
      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
        Bill Summary
      </h4>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-900">{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Sales Tax ({(APP_CONFIG.taxRate * 100).toFixed(1)}%)</span>
          <span className="font-semibold text-slate-900">{formatCurrency(calculatedTax)}</span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Service Fee ({(APP_CONFIG.serviceChargeRate * 100).toFixed(0)}%)</span>
          <span className="font-semibold text-slate-900">{formatCurrency(calculatedServiceFee)}</span>
        </div>

        <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-slate-900">
          <span>To Pay</span>
          <span className="text-[#F47738]">{formatCurrency(calculatedTotal)}</span>
        </div>
      </div>
    </div>
  );
};
