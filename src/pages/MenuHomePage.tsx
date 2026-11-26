import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenu } from '@/hooks/useMenu';
import { RestaurantHero } from '@/components/layout/RestaurantHero';
import { SearchBar } from '@/components/layout/SearchBar';
import { CategoryNav } from '@/components/layout/CategoryNav';
import { PopularItemsSection } from '@/components/menu/PopularItemsSection';
import { RecommendedItemsSection } from '@/components/menu/RecommendedItemsSection';
import { FoodCard } from '@/components/menu/FoodCard';
import { FoodDetailModal } from '@/components/menu/FoodDetailModal';
import { FloatingCartBar } from '@/components/layout/FloatingCartBar';
import { UtensilsCrossed } from 'lucide-react';
import { MenuItem } from '@/types';
import { SAMPLE_MOCK_ORDER } from '@/data/mock-order';
import toast from 'react-hot-toast';

export const MenuHomePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    categories,
    popularItems,
    recommendedItems,
    filteredItems,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedDietary,
    setSelectedDietary,
    selectedFoodItem,
    openFoodDetail,
    closeFoodDetail,
  } = useMenu();

  const isBrowsingAll = selectedCategory === 'all' && searchQuery.trim() === '' && selectedDietary === 'all';

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success(`${item.name} (Demo UI)`);
  };

  const handleDetailAdd = (item: MenuItem) => {
    toast.success(`${item.name} (Demo UI)`);
  };

  // Group items by category to render
  const categoriesToDisplay = selectedCategory === 'all'
    ? categories
    : categories.filter((c) => c.id === selectedCategory);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Restaurant Branding & Identified Table Header */}
      <RestaurantHero />

      {/* 2. Interactive Search Bar with Dietary Filters */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        activeFilter={selectedDietary}
        onFilterChange={setSelectedDietary}
      />

      {/* 3. Sticky Food Category Navigation */}
      <CategoryNav
        activeCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* 4. Popular Items Section (Only in default All view) */}
      {isBrowsingAll && (
        <PopularItemsSection
          items={popularItems}
          onSelectItem={openFoodDetail}
          onAddToCart={handleQuickAdd}
        />
      )}

      {/* 5. Chef's Recommended Items Section (Only in default All view) */}
      {isBrowsingAll && (
        <RecommendedItemsSection
          items={recommendedItems}
          onSelectItem={openFoodDetail}
          onAddToCart={handleQuickAdd}
        />
      )}

      {/* 6. Food Categories & Items Listing */}
      <section className="space-y-8 pt-2">
        {categoriesToDisplay.map((cat) => {
          const categoryDishes = filteredItems.filter((dish) => dish.categoryId === cat.id);
          if (categoryDishes.length === 0) return null;

          return (
            <div key={cat.id} id={cat.id} className="space-y-3.5 scroll-mt-28">
              {/* Category Header */}
              <div className="flex items-baseline justify-between border-b border-stone-200/60 pb-2">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#181D23] tracking-tight">
                    {cat.name}
                  </h3>
                  {cat.description && (
                    <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">
                      {cat.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Grid of Food Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                {categoryDishes.map((dish) => (
                  <FoodCard
                    key={dish.id}
                    item={dish}
                    onSelect={openFoodDetail}
                    onAddToCart={handleQuickAdd}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {/* Empty State when search or category yields no active/available items */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200/80 p-8 shadow-card max-w-md mx-auto my-6">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#F47738] flex items-center justify-center mx-auto mb-3">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#181D23]">No Dishes Found</h4>
            <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto leading-relaxed">
              {searchQuery
                ? `No available dishes matching "${searchQuery}". Try a different search keyword.`
                : 'No active dishes currently available in this filter.'}
            </p>
            {(searchQuery || selectedCategory !== 'all' || selectedDietary !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedDietary('all');
                }}
                className="mt-4 px-4 py-2 bg-orange-50 hover:bg-orange-100 text-[#F47738] font-bold text-xs rounded-xl border border-orange-200 transition-colors"
              >
                Reset All Filters
              </button>
            )}
          </div>
        )}
      </section>

      {/* 7. Food Detail Modal / Drawer */}
      <FoodDetailModal
        item={selectedFoodItem}
        isOpen={Boolean(selectedFoodItem)}
        onClose={closeFoodDetail}
        onAddToCart={handleDetailAdd}
      />

      {/* 8. Floating Cart Summary Pill (Demo Data) */}
      {SAMPLE_MOCK_ORDER.itemCount > 0 && (
        <FloatingCartBar
          itemCount={SAMPLE_MOCK_ORDER.itemCount}
          subtotal={SAMPLE_MOCK_ORDER.subtotal}
          onViewCart={() => navigate('/cart')}
        />
      )}
    </div>
  );
};

export default MenuHomePage;
