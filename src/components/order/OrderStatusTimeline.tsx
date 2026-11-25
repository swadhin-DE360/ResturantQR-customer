import React from 'react';
import {
  Clock,
  CheckCircle2,
  ChefHat,
  UtensilsCrossed,
  Sparkles,
  Check,
  Info,
} from 'lucide-react';
import { OrderStatus } from '@/types';

interface OrderStatusTimelineProps {
  currentStatus: OrderStatus;
  onStatusChange?: (newStatus: OrderStatus) => void;
  className?: string;
}

interface TimelineStep {
  key: OrderStatus;
  label: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const TIMELINE_STEPS: TimelineStep[] = [
  {
    key: 'Pending',
    label: 'Pending',
    title: 'Order Pending',
    description: 'Submitted to restaurant, awaiting confirmation',
    icon: Clock,
  },
  {
    key: 'Accepted',
    label: 'Accepted',
    title: 'Order Accepted',
    description: 'Staff confirmed your table order ticket',
    icon: CheckCircle2,
  },
  {
    key: 'Preparing',
    label: 'Preparing',
    title: 'Preparing Food',
    description: 'Chefs are actively cooking your fresh dishes',
    icon: ChefHat,
  },
  {
    key: 'Ready',
    label: 'Ready',
    title: 'Ready to Serve',
    description: 'Plated and ready for server table delivery',
    icon: UtensilsCrossed,
  },
  {
    key: 'Completed',
    label: 'Completed',
    title: 'Served & Completed',
    description: 'Delivered to your table. Enjoy your dining!',
    icon: Sparkles,
  },
];

export const OrderStatusTimeline: React.FC<OrderStatusTimelineProps> = ({
  currentStatus,
  onStatusChange,
  className = '',
}) => {
  // Normalize status to one of the 5 canonical timeline keys
  const normalizedStatus =
    currentStatus === 'Pending Confirmation' ? 'Pending' : currentStatus;

  const currentStepIndex = Math.max(
    0,
    TIMELINE_STEPS.findIndex((s) => s.key === normalizedStatus)
  );

  return (
    <div className={`bg-white rounded-3xl border border-stone-200/80 p-5 sm:p-6 shadow-card space-y-5 ${className}`}>
      {/* Header with Title and Current Status Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
        <div>
          <h3 className="text-base font-black text-[#181D23] flex items-center gap-2">
            <span>Order Status Lifecycle</span>
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            5-stage dining order visual progression
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
            Current Stage:
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-black bg-orange-50 text-[#F47738] border border-orange-200 flex items-center gap-1.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#F47738] animate-pulse" />
            <span>{TIMELINE_STEPS[currentStepIndex]?.label || currentStatus}</span>
          </span>
        </div>
      </div>

      {/* Visual Timeline Stepper (Horizontal on Tablet/Desktop, Clean Stepper on Mobile) */}
      <div className="relative">
        {/* Desktop / Tablet Horizontal Track */}
        <div className="hidden sm:block">
          <div className="relative flex items-start justify-between">
            {/* Background connecting line */}
            <div className="absolute top-5 left-10 right-10 h-0.5 -z-0">
              <div className="w-full h-full bg-stone-200" />
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-[#F47738] transition-all duration-500 -mt-0.5"
                style={{
                  width: `${(currentStepIndex / 4) * 100}%`,
                }}
              />
            </div>

            {TIMELINE_STEPS.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div
                  key={step.key}
                  className="relative z-10 flex flex-col items-center text-center max-w-[100px] flex-1 px-1 cursor-pointer group"
                  onClick={() => onStatusChange?.(step.key)}
                  title={`Preview status: ${step.label}`}
                >
                  {/* Step Node Circle */}
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                      isCompleted
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                        : isCurrent
                        ? 'bg-[#F47738] text-white shadow-lg shadow-orange-500/30 ring-4 ring-orange-100 scale-110'
                        : 'bg-stone-100 border border-stone-200 text-stone-400 group-hover:bg-stone-200 group-hover:text-stone-600'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 stroke-[2.5]" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>

                  {/* Step Label & Subtext */}
                  <p
                    className={`mt-2 text-xs font-black transition-colors ${
                      isCurrent
                        ? 'text-[#F47738]'
                        : isCompleted
                        ? 'text-[#181D23]'
                        : 'text-stone-400'
                    }`}
                  >
                    {step.label}
                  </p>
                  <p className="text-[10px] text-stone-400 mt-0.5 leading-tight line-clamp-2">
                    {step.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Vertical Stepper View */}
        <div className="sm:hidden space-y-3">
          {TIMELINE_STEPS.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <div
                key={step.key}
                onClick={() => onStatusChange?.(step.key)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isCurrent
                    ? 'bg-orange-50/80 border-orange-200 shadow-2xs'
                    : isCompleted
                    ? 'bg-emerald-50/50 border-emerald-100'
                    : 'bg-stone-50/60 border-stone-200/60 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-500 text-white'
                        : isCurrent
                        ? 'bg-[#F47738] text-white shadow-md'
                        : 'bg-stone-200 text-stone-500'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-xs text-[#181D23]">
                        {index + 1}. {step.label}
                      </span>
                      {isCurrent && (
                        <span className="text-[9px] font-black uppercase tracking-wider text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded">
                          Current
                        </span>
                      )}
                      {isCompleted && (
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                          Completed
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Demonstration Switcher */}
      {onStatusChange && (
        <div className="pt-3 border-t border-stone-100">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
              Simulate Timeline State (React State Preview):
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {TIMELINE_STEPS.map((step) => (
              <button
                key={step.key}
                type="button"
                onClick={() => onStatusChange(step.key)}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                  normalizedStatus === step.key
                    ? 'bg-[#181D23] text-white shadow-2xs scale-95'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                }`}
              >
                {step.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Explicit Disclaimer: Do not claim actual live restaurant status updates */}
      <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/70 flex items-start gap-2.5 text-xs text-stone-600">
        <Info className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed">
          <strong>Demonstration Notice:</strong> This timeline visually demonstrates the 5-step order progression cycle using static mock data and local React state. No live backend server or real-time kitchen tracking integration is connected.
        </p>
      </div>
    </div>
  );
};

export default OrderStatusTimeline;
