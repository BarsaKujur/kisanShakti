import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const PriceForecastChart = () => {
  // ✅ Dummy data for multiple crops
  const cropData = {
    Paddy: [
      { month: "Jan", price: 1400 },
      { month: "Feb", price: 1450 },
      { month: "Mar", price: 1500 },
      { month: "Apr", price: 1550 },
      { month: "May", price: 1600 },
      { month: "Jun", price: 1650 },
    ],
    Wheat: [
      { month: "Jan", price: 1900 },
      { month: "Feb", price: 1950 },
      { month: "Mar", price: 2000 },
      { month: "Apr", price: 2050 },
      { month: "May", price: 2100 },
      { month: "Jun", price: 2150 },
    ],
    Maize: [
      { month: "Jan", price: 1600 },
      { month: "Feb", price: 1620 },
      { month: "Mar", price: 1680 },
      { month: "Apr", price: 1700 },
      { month: "May", price: 1750 },
      { month: "Jun", price: 1800 },
    ],
    Tomato: [
      { month: "Jan", price: 850 },
      { month: "Feb", price: 870 },
      { month: "Mar", price: 900 },
      { month: "Apr", price: 950 },
      { month: "May", price: 980 },
      { month: "Jun", price: 1000 },
    ],
    Potato: [
      { month: "Jan", price: 1100 },
      { month: "Feb", price: 1150 },
      { month: "Mar", price: 1180 },
      { month: "Apr", price: 1200 },
      { month: "May", price: 1250 },
      { month: "Jun", price: 1280 },
    ],
  };

  const [selectedCrop, setSelectedCrop] = useState("Paddy");

  return (
    <div className="space-y-6">
      {/* Crop Selector */}
      <div className="flex justify-center mb-6">
        <select
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
          className="border p-2 rounded-md shadow-md"
        >
          {Object.keys(cropData).map((crop) => (
            <option key={crop} value={crop}>
              {crop}
            </option>
          ))}
        </select>
      </div>

      {/* ✅ Main Heading */}
      <h1 className="text-2xl font-bold text-center text-green-700 mb-4">
        📊 Price Trends for {selectedCrop}
      </h1>

      {/* Charts side by side */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {/* Line Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">Line Chart</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={cropData[selectedCrop]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="price" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">Bar Chart</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={cropData[selectedCrop]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="price" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Area Chart */}
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">Area Chart</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={cropData[selectedCrop]}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PriceForecastChart;
