/**
 * Application Constants
 * Restaurant Customer QR Ordering Website
 */

export const APP_CONFIG = {
  name: 'The Food Corner',
  shortName: 'The Food Corner',
  tagline: 'Artisanal Kitchen & Gourmet Dining',
  themeColor: '#F47738',
  defaultTable: 'TABLE-001',
  currency: 'INR',
  currencySymbol: '₹',
  taxRate: 0.0825, // 8.25% sales tax
  serviceChargeRate: 0.05, // 5% dine-in service fee
  estimatedPrepMinutes: 20,
};

export const DIETARY_FILTERS = [
  { id: 'all', label: 'All Items' },
  { id: 'veg', label: 'Pure Veg', icon: 'Leaf' },
  { id: 'non-veg', label: 'Non-Veg', icon: 'Utensils' },
  { id: 'chef-special', label: "Chef's Specials", icon: 'Sparkles' },
] as const;

export const ORDER_STATUS_LABELS: Record<
  string,
  { label: string; badgeClass: string; description: string }
> = {
  Pending: {
    label: 'Pending Confirmation',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
    description: 'Received by restaurant. Waiting for staff confirmation.',
  },
  'Pending Confirmation': {
    label: 'Pending Confirmation',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
    description: 'Your order ticket has been submitted to the restaurant and is pending confirmation from the staff.',
  },
  Accepted: {
    label: 'Order Accepted',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-200',
    description: 'The kitchen has accepted your ticket.',
  },
  Preparing: {
    label: 'Preparing in Kitchen',
    badgeClass: 'bg-orange-100 text-[#F47738] border-orange-200',
    description: 'Our chefs are currently preparing your fresh meal.',
  },
  Ready: {
    label: 'Ready for Serving',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-200',
    description: 'Your food is ready and on the way to your table.',
  },
  Completed: {
    label: 'Served & Completed',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'Hope you enjoy your meal! Thank you for dining with us.',
  },
  Rejected: {
    label: 'Order Cancelled',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-200',
    description: 'Sorry, the kitchen could not process this order.',
  },
};
