import React from 'react';
import { UtensilsCrossed } from 'lucide-react';
import { cn } from '@/utils';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-white rounded-3xl border border-slate-200/80 shadow-xs max-w-md mx-auto my-6',
        className
      )}
    >
      <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 text-[#F47738] flex items-center justify-center mb-4">
        {icon || <UtensilsCrossed className="w-8 h-8" />}
      </div>
      <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-xs sm:text-sm text-slate-500 mb-5 max-w-xs">{description}</p>
      {actionText && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
