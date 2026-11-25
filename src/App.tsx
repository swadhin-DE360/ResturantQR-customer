import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppRoutes } from '@/routes';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* Toast Notification Provider */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2500,
          style: {
            background: '#0f172a',
            color: '#ffffff',
            fontSize: '13px',
            borderRadius: '12px',
            padding: '10px 16px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
          },
          success: {
            iconTheme: {
              primary: '#F47738',
              secondary: '#ffffff',
            },
          },
        }}
      />

      {/* Main Application Routes */}
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
