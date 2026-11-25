import React from 'react';
import { FoodCategory } from '@/types';
import { cn } from '@/utils';

export interface MenuCategoryPillsProps {
  categories: FoodCategory[];
  activeCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
}

export const MenuCategoryPills: React.FC<MenuCategoryPillsProps> = ({
  categories,
  activeCategoryId,
  onSelectCategory,
}) => {
  return (
    <div className="sticky top-16 z-30 bg-slate-50/95 backdrop-blur-md py-2.5 -mx-4 px-4 sm:mx-0 sm:px-0 border-b border-slate-200/60 overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-2 max-w-4xl mx-auto">
        <button
          type="button"
          onClick={() => onSelectCategory('all')}
          className={cn(
            'px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 border',
            activeCategoryId === 'all'
              ? 'bg-[#F47738] text-white border-[#F47738] shadow-xs'
              : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
          )}
        >
          All Items
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelectCategory(category.id)}
            className={cn(
              'px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 border',
              activeCategoryId === category.id
                ? 'bg-[#F47738] text-white border-[#F47738] shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            )}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};
