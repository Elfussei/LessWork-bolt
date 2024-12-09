import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import {
  LayoutDashboard,
  Package,
  Users,
  BarChart3,
  BoxesIcon,
  LogOut,
} from 'lucide-react';

export const Sidebar = () => {
  const { user, setUser, setIsAuthenticated } = useAuthStore();

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
    }`;

  return (
    <div className="w-64 bg-white h-screen shadow-lg flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-blue-600">Store CRM</h1>
        <p className="text-sm text-gray-600 mt-1">{user?.name}</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavLink to="/dashboard" end className={navLinkClass}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        {user?.role === 'STORE_OWNER' && (
          <>
            <NavLink to="/dashboard/products" className={navLinkClass}>
              <Package size={20} />
              <span>Products</span>
            </NavLink>

            <NavLink to="/dashboard/users" className={navLinkClass}>
              <Users size={20} />
              <span>Users</span>
            </NavLink>

            <NavLink to="/dashboard/analytics" className={navLinkClass}>
              <BarChart3 size={20} />
              <span>Analytics</span>
            </NavLink>
          </>
        )}

        <NavLink to="/dashboard/inventory" className={navLinkClass}>
          <BoxesIcon size={20} />
          <span>Inventory</span>
        </NavLink>
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-gray-600 hover:text-red-600 w-full px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};