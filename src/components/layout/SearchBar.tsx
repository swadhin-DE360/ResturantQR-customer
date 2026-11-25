import React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/utils';
import chefSpecialIcon from '@/assets/icons/chef-special.png';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  activeFilter?: string;
  onFilterChange?: (filterId: string) => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  activeFilter = 'all',
  onFilterChange,
  className,
}) => {
  const dietaryChips = [
    { id: 'veg', label: 'Pure Veg', isVeg: true },
    { id: 'non-veg', label: 'Non-Veg', isNonVeg: true },
    { id: 'chef-special', label: "Chef's Special", iconSrc: chefSpecialIcon },
  ];

  return (
    <div className={cn('space-y-2.5 mb-5', className)}>
      {/* Input Field */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search for Biryani, Butter Chicken, Naan, Paneer, desserts..."
          className="w-full pl-10 pr-10 py-3 bg-white text-xs sm:text-sm text-[#181D23] placeholder-stone-400 rounded-2xl border border-stone-200/80 focus:outline-none focus:ring-2 focus:ring-[#F47738]/25 focus:border-[#F47738] shadow-xs transition-all"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label="Clear search"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Quick Filter Chips */}
      {onFilterChange && (
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {dietaryChips.map((chip) => {
            const isActive = activeFilter === chip.id;

            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => onFilterChange(isActive ? 'all' : chip.id)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 border shrink-0 active:scale-95',
                  isActive
                    ? 'bg-[#181D23] text-white border-[#181D23] shadow-xs'
                    : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                )}
              >
                {chip.isVeg && (
                  <div className='flex items-center justify-center border border-green-500 w-4 h-4'>
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                )}
                {chip.isNonVeg && (
                  <div className='flex items-center justify-center border border-rose-500 w-4 h-4'>
                    <span
                      className="w-2 h-2 bg-rose-500"
                      style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                    />
                  </div>
                )}
                {chip.iconSrc && (
                  <img
                    src={chip.iconSrc}
                    alt=""
                    className="w-4 h-4 rounded-full object-contain shrink-0"
                  />
                )}
                <span>{chip.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
