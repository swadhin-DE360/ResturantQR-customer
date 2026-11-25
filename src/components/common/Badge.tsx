import React from 'react';
import { cn } from '@/utils';
import { DietaryType } from '@/types';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  dietary?: DietaryType;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'neutral',
  dietary,
  size = 'md',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center font-medium rounded-full border transition-colors select-none';

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  };

  const variantStyles = {
    brand: 'bg-orange-50 text-[#F47738] border-orange-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    info: 'bg-sky-50 text-sky-700 border-sky-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  // Dedicated Dietary indicator
  if (dietary) {
    if (dietary === 'veg') {
      return (
        <span
          className={cn(
            baseStyles,
            sizeStyles[size],
            'bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold',
            className
          )}
          {...props}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0 ring-2 ring-emerald-200" />
          {children || 'VEG'}
        </span>
      );
    }
    if (dietary === 'non-veg') {
      return (
        <span
          className={cn(
            baseStyles,
            sizeStyles[size],
            'bg-rose-50 text-rose-700 border-rose-300 font-semibold',
            className
          )}
          {...props}
        >
          <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0 ring-2 ring-rose-200" />
          {children || 'NON-VEG'}
        </span>
      );
    }
    if (dietary === 'vegan') {
      return (
        <span
          className={cn(
            baseStyles,
            sizeStyles[size],
            'bg-green-50 text-green-700 border-green-300 font-semibold',
            className
          )}
          {...props}
        >
          <span className="w-2 h-2 rounded-full bg-green-600 shrink-0" />
          {children || 'VEGAN'}
        </span>
      );
    }
  }

  return (
    <span
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
};
