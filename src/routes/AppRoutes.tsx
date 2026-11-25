import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CustomerLayout } from '@/layouts/CustomerLayout';
import { TableEntryPage } from '@/pages/TableEntryPage';
import { CartPage } from '@/pages/CartPage';
import { OrderConfirmationPage } from '@/pages/OrderConfirmationPage';
import { CustomerOrderDetailsPage } from '@/pages/CustomerOrderDetailsPage';
import { InvalidTablePage } from '@/pages/InvalidTablePage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<CustomerLayout />}>
        {/* Dynamic Table QR Ordering Route: http://localhost:5174/menu/:tableToken */}
        <Route path="/menu/:tableToken" element={<TableEntryPage />} />

        {/* Dedicated Cart & Direct Order Placement Route */}
        <Route path="/cart" element={<CartPage />} />

        {/* Redirect checkout directly to cart */}
        <Route path="/checkout" element={<Navigate to="/cart" replace />} />

        {/* Order Confirmation Route */}
        <Route path="/order-confirmation/:orderNumber" element={<OrderConfirmationPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />

        {/* Customer Order Details Route with 5-Stage Status Timeline */}
        <Route path="/order-details/:orderNumber" element={<CustomerOrderDetailsPage />} />
        <Route path="/order-details" element={<CustomerOrderDetailsPage />} />

        {/* Default route redirect to TABLE-001 for seamless preview */}
        <Route path="/menu" element={<Navigate to="/menu/TABLE-001" replace />} />
        <Route path="/" element={<Navigate to="/menu/TABLE-001" replace />} />

        {/* Unknown routes */}
        <Route path="*" element={<InvalidTablePage scannedToken="404 - Not Found" />} />
      </Route>
    </Routes>
  );
};


export default AppRoutes;
