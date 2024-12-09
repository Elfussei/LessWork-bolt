import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { ProductManagement } from './ProductManagement';
import { UserManagement } from './UserManagement';
import { Analytics } from './Analytics';
import { Inventory } from './Inventory';
import { useAuthStore } from '../../store/authStore';

export const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Routes>
          {user?.role === 'STORE_OWNER' && (
            <>
              <Route path="/products" element={<ProductManagement />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/analytics" element={<Analytics />} />
            </>
          )}
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/" element={<Analytics />} />
        </Routes>
      </div>
    </div>
  );
};