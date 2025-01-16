import React, { useEffect, useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import apiClient from "../utils/apiClient"; // Adjust the path based on your project structure
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

interface AnalyticsData {
  totalSales: number;
  categoryDistribution: Record<string, number>;
  topProducts: { name: string; quantity: number }[];
  monthlySales: Record<string, number>;
}

const Analytics: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const totalSalesResponse = await apiClient.get(
          "/analytics/total-sales"
        );
        const categoryDistributionResponse = await apiClient.get(
          "/analytics/category-distribution"
        );
        const topProductsResponse = await apiClient.get(
          "/analytics/top-products"
        );
        const monthlySalesResponse = await apiClient.get(
          "/analytics/monthly-sales"
        );

        setData({
          totalSales: totalSalesResponse.data.totalSales,
          categoryDistribution:
            categoryDistributionResponse.data.categoryDistribution,
          topProducts: topProductsResponse.data.topProducts,
          monthlySales: monthlySalesResponse.data.monthlySales,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching analytics data:", err);
        setError("Failed to fetch analytics data.");
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center ">
        <div className="loader"></div>
      </div>
    );
  if (error) return <p>{error}</p>;

  // Chart Data
  const barData = {
    labels: Object.keys(data?.categoryDistribution || {}),
    datasets: [
      {
        label: "Category Distribution",
        data: Object.values(data?.categoryDistribution || {}),
        backgroundColor: [
          "#4caf50",
          "#2196f3",
          "#ff9800",
          "#f44336",
          "#9c27b0",
        ],
      },
    ],
  };

  const lineData = {
    labels: Object.keys(data?.monthlySales || {}),
    datasets: [
      {
        label: "Monthly Sales",
        data: Object.values(data?.monthlySales || {}),
        borderColor: "#2196f3",
        fill: false,
      },
    ],
  };

  const pieData = {
    labels: data?.topProducts.map(product => product.name) || [],
    datasets: [
      {
        label: "Top Products",
        data: data?.topProducts.map(product => product.quantity) || [],
        backgroundColor: [
          "#4caf50",
          "#2196f3",
          "#ff9800",
          "#f44336",
          "#9c27b0",
        ],
      },
    ],
  };

  return (
    <div className="analytics-container" style={{ padding: "2rem" }}>
      <h1
        style={{ textAlign: "center", marginBottom: "2rem" }}
        className="text-3xl text-gray-600"
      >
        Analytics Dashboard
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            flex: "1 1 300px",
            maxWidth: "400px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1rem",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
          className="bg-slate-800 text-white"
        >
          <h2 style={{ textAlign: "center" }}>Total Sales</h2>
          <p style={{ textAlign: "center", fontSize: "1.5rem" }}>
            ${data?.totalSales.toFixed(2)}
          </p>
        </div>
        <div
          style={{
            flex: "1 1 300px",
            maxWidth: "400px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1rem",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Category Distribution</h2>
          <Bar data={barData} />
        </div>
        <div
          style={{
            flex: "1 1 300px",
            maxWidth: "400px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1rem",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Monthly Sales</h2>
          <Line data={lineData} />
        </div>
        <div
          style={{
            flex: "1 1 300px",
            maxWidth: "400px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1rem",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Top Products</h2>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
