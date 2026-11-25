import React from 'react';
import categoriesData from '@/data/categories.json';
import { FoodCategory } from '@/types';
import { cn } from '@/utils';

export interface CategoryNavProps {
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
  className?: string;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
  className,
}) => {
  const categories = categoriesData as FoodCategory[];

  return (
    <nav
      aria-label="Food Categories"
      className={cn(
        'sticky top-16 z-30 bg-[#FAF8F5]/95 backdrop-blur-md py-2.5 -mx-4 px-4 sm:mx-0 sm:px-0 border-b border-stone-200/60 overflow-x-auto no-scrollbar',
        className
      )}
    >
      <div className="flex items-center gap-2 max-w-4xl mx-auto">
        {/* All Items pill */}
        <button
          type="button"
          onClick={() => onSelectCategory('all')}
          className={cn(
            'px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 border select-none active:scale-95',
            activeCategory === 'all'
              ? 'bg-[#F47738] text-white border-[#F47738] shadow-xs'
              : 'bg-white text-stone-600 border-stone-200/90 hover:border-stone-300 hover:bg-stone-50'
          )}
        >
          All Items
        </button>

        {/* Dynamic Category Pills */}
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelectCategory(category.id)}
              className={cn(
                'px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 border select-none active:scale-95',
                isActive
                  ? 'bg-[#F47738] text-white border-[#F47738] shadow-xs'
                  : 'bg-white text-stone-600 border-stone-200/90 hover:border-stone-300 hover:bg-stone-50'
              )}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
