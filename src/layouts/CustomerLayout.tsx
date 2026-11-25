import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { CustomerHeader } from '@/components/layout/CustomerHeader';
import { CustomerFooter } from '@/components/layout/CustomerFooter';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { SAMPLE_MOCK_ORDER } from '@/data/mock-order';

export interface CustomerLayoutProps {
  tableNumber?: string;
  cartItemCount?: number;
  onOpenCart?: () => void;
}

export const CustomerLayout: React.FC<CustomerLayoutProps> = ({
  tableNumber,
  cartItemCount,
  onOpenCart,
}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleOpenCart = onOpenCart || (() => setIsCartOpen(true));

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#181D23] flex flex-col selection:bg-[#F47738] selection:text-white">
      {/* 1. Sticky Restaurant Header */}
      <CustomerHeader
        tableNumber={tableNumber}
        cartItemCount={cartItemCount ?? SAMPLE_MOCK_ORDER.itemCount}
        onOpenCart={handleOpenCart}
      />

      {/* 2. Main Content Viewport (Centered with max-w-4xl for optimal reading & ordering UX) */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3.5 sm:px-6 pt-4 pb-20 sm:pb-24">
        <Outlet />
      </main>

      {/* 3. Subtle Footer with Restaurant Location & Timings */}
      <CustomerFooter />

      {/* 4. Slide-Over Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default CustomerLayout;
