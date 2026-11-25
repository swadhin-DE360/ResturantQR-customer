import { useState, useMemo, useCallback } from 'react';
import categoriesData from '@/data/categories.json';
import foodItemsData from '@/data/food-items.json';
import { FoodCategory, MenuItem } from '@/types';

export function useMenu() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDietary, setSelectedDietary] = useState<string>('all');
  const [selectedFoodItem, setSelectedFoodItem] = useState<MenuItem | null>(null);

  const categories = categoriesData as FoodCategory[];
  const rawItems = foodItemsData as MenuItem[];

  // RULE: Only active and available items should appear on the customer menu
  const allItems = useMemo(() => {
    return rawItems.filter(
      (item) => item.status === 'Active' && item.availability === 'Available'
    );
  }, [rawItems]);

  // Popular items collection
  const popularItems = useMemo(() => {
    return allItems.filter((item) => item.isPopular);
  }, [allItems]);

  // Recommended items collection
  const recommendedItems = useMemo(() => {
    return allItems.filter((item) => item.isRecommended);
  }, [allItems]);

  // Dynamic filtered list based on search, category pill, and dietary filter
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
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
        matchesDietary = item.isRecommended;
      }

      // Search by food name or description
      const trimmedSearch = searchQuery.trim().toLowerCase();
      const matchesSearch =
        trimmedSearch === '' ||
        item.name.toLowerCase().includes(trimmedSearch) ||
        item.description.toLowerCase().includes(trimmedSearch) ||
        item.categoryName.toLowerCase().includes(trimmedSearch);

      return matchesCategory && matchesDietary && matchesSearch;
    });
  }, [allItems, selectedCategory, selectedDietary, searchQuery]);

  const openFoodDetail = useCallback((item: MenuItem) => {
    setSelectedFoodItem(item);
  }, []);

  const closeFoodDetail = useCallback(() => {
    setSelectedFoodItem(null);
  }, []);

  return {
    categories,
    allItems,
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
  };
}
