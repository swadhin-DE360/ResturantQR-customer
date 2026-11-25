/**
 * TypeScript Type Definitions
 * Restaurant Customer QR Ordering Website
 */

export type DietaryType = 'veg' | 'non-veg' | 'vegan' | 'egg';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  categoryName: string;
  image: string;
  price: number;
  originalPrice?: number;
  availability: 'Available' | 'Unavailable' | 'Sold Out';
  status: 'Active' | 'Inactive';
  isPopular: boolean;
  isRecommended: boolean;
  dietaryType?: DietaryType;
  isChefSpecial?: boolean;
  preparationTimeMinutes?: number;
  rating?: number;
  tags?: string[];
  spiceLevel?: 'Mild' | 'Medium' | 'Spicy';
  servingSize?: string;
}

export interface FoodCategory {
  id: string;
  name: string;
  description?: string;
  image?: string;
  iconName?: string;
  displayOrder: number;
  status: 'Active' | 'Inactive';
}

export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  dietaryType: DietaryType;
  specialInstructions?: string;
  subtotal: number;
  servingSize?: string;
}

export type TableStatus = 'Active' | 'Inactive' | 'Occupied' | 'Available';

export interface TableInfo {
  id: string;
  tableNumber: string;
  tableName: string;
  qrToken?: string;
  section?: string;
  seats?: number;
  capacity?: number;
  status: TableStatus;
  createdAt?: string;
}

export type OrderStatus =
  | 'Pending'
  | 'Pending Confirmation'
  | 'Accepted'
  | 'Preparing'
  | 'Ready'
  | 'Completed'
  | 'Rejected';

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  tableNumber: string;
  customerName?: string;
  customerPhone?: string;
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  tax: number;
  serviceFee: number;
  total: number;
  status: OrderStatus;
  notes?: string;
  createdAt: string;
  estimatedDeliveryMinutes?: number;
}

export interface RestaurantProfile {
  name: string;
  tagline: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
  currency: string;
  currencySymbol: string;
  taxRatePercent: number;
  serviceFee: number;
  openingHours: string;
}
