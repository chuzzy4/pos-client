import React, { useState, useEffect } from "react";
import apiClient from "../utils/apiClient"; // Ensure this is the correct path to your apiClient file
import { HiUsers } from "react-icons/hi2";

interface DashboardStatsProps {
  totalProducts: number;
  totalCategories: number;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  totalProducts,
  totalCategories,
}) => {
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const fetchOrderCount = async () => {
      try {
        const response = await apiClient.get("/orders");
        setTotalOrders(response.data.length);
      } catch (error) {
        console.error("Error fetching order count:", error);
      }
    };

    fetchOrderCount();
  }, []);

  const stats = [
    { title: "Orders", value: totalOrders, icon: "📦" },
    {
      title: "Users",
      value: 761,
      icon: (
        <span className="text-purple-700">
          <HiUsers />
        </span>
      ),
    },
    { title: "Products", value: totalProducts, icon: "🛒" },
    { title: "Categories", value: totalCategories, icon: "📊" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {stats.map(stat => (
        <div
          key={stat.title}
          className="bg-white cursor-pointer hover:bg-blue-50 shadow-md p-4 rounded-lg flex flex-col items-center"
        >
          <span className="text-3xl">{stat.icon}</span>
          <h2 className="text-xl font-bold">{stat.value}</h2>
          <p className="text-gray-500">{stat.title}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
