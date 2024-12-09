import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from 'recharts';
import { DollarSign, ShoppingBag, TrendingUp, Users } from 'lucide-react';

const mockData = {
  totalSales: 1234,
  totalRevenue: 45678,
  activeUsers: 89,
  growthRate: 23,
  salesByDate: [
    { date: '2024-01', sales: 65, revenue: 4500 },
    { date: '2024-02', sales: 78, revenue: 5200 },
    { date: '2024-03', sales: 90, revenue: 6100 },
  ],
  topProducts: [
    { name: 'Product A', sales: 234, revenue: 12000 },
    { name: 'Product B', sales: 187, revenue: 9500 },
    { name: 'Product C', sales: 143, revenue: 7800 },
  ],
};

export const Analytics = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Sales"
          value={mockData.totalSales}
          icon={<ShoppingBag />}
          color="blue"
        />
        <StatCard
          title="Revenue"
          value={`$${mockData.totalRevenue}`}
          icon={<DollarSign />}
          color="green"
        />
        <StatCard
          title="Active Users"
          value={mockData.activeUsers}
          icon={<Users />}
          color="purple"
        />
        <StatCard
          title="Growth Rate"
          value={`${mockData.growthRate}%`}
          icon={<TrendingUp />}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Sales Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockData.salesByDate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                name="Sales"
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                name="Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Top Products</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockData.topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#3b82f6" name="Sales" />
              <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center">
        <div
          className={`${
            colorClasses[color as keyof typeof colorClasses]
          } p-3 rounded-full text-white mr-4`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};