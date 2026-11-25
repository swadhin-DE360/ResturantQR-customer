import React from 'react';
import { Star, Clock, Plus, Flame } from 'lucide-react';
import foodItemsData from '@/data/food-items.json';
import categoriesData from '@/data/categories.json';
import { MenuItem, FoodCategory } from '@/types';
import { formatCurrency } from '@/utils';
import { Badge } from '@/components/common/Badge';

export interface MainContentAreaProps {
  searchQuery?: string;
  selectedCategory?: string;
  selectedDietary?: string;
}

export const MainContentArea: React.FC<MainContentAreaProps> = ({
  searchQuery = '',
  selectedCategory = 'all',
  selectedDietary = 'all',
}) => {
  const rawItems = foodItemsData as MenuItem[];
  const categories = categoriesData as FoodCategory[];

  // Filter items based on active layout filters and availability
  const filteredDishes = rawItems.filter((item) => {
    // Only active and available items
    if (item.status !== 'Active' || item.availability !== 'Available') return false;

    // Category match
    const matchesCategory =
      selectedCategory === 'all' || item.categoryId === selectedCategory;

    // Dietary match
    let matchesDietary = true;
    if (selectedDietary === 'veg') {
      matchesDietary = item.dietaryType === 'veg' || item.dietaryType === 'vegan';
    } else if (selectedDietary === 'non-veg') {
      matchesDietary = item.dietaryType === 'non-veg';
    } else if (selectedDietary === 'chef-special') {
      matchesDietary = Boolean(item.isRecommended || item.isChefSpecial);
    }

    // Search query match
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesDietary && matchesSearch;
  });

  // Group dishes by category if "all" is selected, else show active category
  const categoriesToRender =
    selectedCategory === 'all'
      ? categories
      : categories.filter((c) => c.id === selectedCategory);

  return (
    <section className="space-y-8 animate-in fade-in duration-300">
      {categoriesToRender.map((cat) => {
        const catDishes = filteredDishes.filter((d) => d.categoryId === cat.id);
        if (catDishes.length === 0) return null;

        return (
          <div key={cat.id} className="space-y-3.5 scroll-mt-24" id={cat.id}>
            {/* Category Section Header */}
            <div className="flex items-baseline justify-between border-b border-stone-200/60 pb-2">
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#181D23] tracking-tight">
                  {cat.name}
                </h3>
                {cat.description && (
                  <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">
                    {cat.description}
                  </p>
                )}
              </div>
              <span className="text-xs font-semibold text-stone-400">
                {catDishes.length} items
              </span>
            </div>

            {/* Food Cards Grid (Mobile 1 col, Desktop 2 col) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
              {catDishes.map((dish) => (
                <article
                  key={dish.id}
                  className="bg-white rounded-3xl border border-stone-200/80 p-3.5 sm:p-4 shadow-card hover:border-stone-300 hover:shadow-md transition-all duration-200 flex gap-3.5 sm:gap-4 group relative overflow-hidden"
                >
                  {/* Left Column: Dish Information */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      {/* Dietary Indicator & Badges */}
                      <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
                        <Badge dietary={dish.dietaryType} size="sm" />
                        {dish.isRecommended && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-[#F47738] border border-orange-200">
                            <Flame className="w-3 h-3 fill-[#F47738]" />
                            Special
                          </span>
                        )}
                        {dish.isPopular && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                            Bestseller
                          </span>
                        )}
                      </div>

                      {/* Dish Title */}
                      <h4 className="text-sm sm:text-base font-extrabold text-[#181D23] leading-snug line-clamp-1 group-hover:text-[#F47738] transition-colors">
                        {dish.name}
                      </h4>

                      {/* Price Tag */}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm sm:text-base font-black text-[#181D23]">
                          {formatCurrency(dish.price)}
                        </span>
                        {dish.originalPrice && dish.originalPrice > dish.price && (
                          <span className="text-xs text-stone-400 line-through">
                            {formatCurrency(dish.originalPrice)}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
                        {dish.description}
                      </p>
                    </div>

                    {/* Metadata: Rating & Preparation time */}
                    <div className="flex items-center gap-3 mt-3 text-[11px] text-stone-400 font-medium">
                      {dish.rating && (
                        <span className="flex items-center gap-1 text-amber-600 font-bold">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {dish.rating}
                        </span>
                      )}
                      {dish.preparationTimeMinutes && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {dish.preparationTimeMinutes}m prep
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Column: High Quality Photography & Action */}
                  <div className="w-24 sm:w-28 flex flex-col items-center justify-between shrink-0">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/90 shadow-2xs relative">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=80';
                        }}
                      />
                    </div>

                    {/* Visual Action Button */}
                    <div className="mt-2 w-full">
                      <button
                        type="button"
                        className="w-full py-1.5 px-3 rounded-xl bg-orange-50 hover:bg-orange-100 active:scale-95 text-[#F47738] font-black text-xs border border-orange-200 transition-all flex items-center justify-center gap-1 shadow-2xs"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>ADD</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        );
      })}

      {/* Empty State when search matches nothing */}
      {filteredDishes.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200/80 p-8 shadow-card max-w-md mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#F47738] flex items-center justify-center mx-auto mb-3">
            <Star className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-[#181D23]">No Dishes Found</h4>
          <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
            We couldn't find any dishes matching "{searchQuery}". Try searching for another dish or reset filters.
          </p>
        </div>
      )}
    </section>
  );
};
