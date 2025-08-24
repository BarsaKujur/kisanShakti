import React, { useEffect, useState } from "react";
import MarketPriceTable from "../Components/MarketPriceTable";
import MandiLocator from "../Components/MandiLocator";
import PriceForecastChart from "../Components/PriceForecastChart";
import CalendarHeaderr from "../Components/CalendarHeaderr";
import CalendarView from "../Components/CalendarView";
import ProgressRings from "../Components/ProgressRings";
import ReminderForm from "../Components/ReminderForm";
import { getMarketPrices, getMandiLocations } from "../services/marketApi";

const LiveMarketPrice = () => {
  // 📊 Market Data States
  const [prices, setPrices] = useState([]); // [{ crop, price, history }]
  const [mandis, setMandis] = useState([]);

  // 📅 Crop Calendar States
  const [crop, setCrop] = useState("Paddy");
  const [location, setLocation] = useState("Ranchi");
  const [reminders, setReminders] = useState([]);

  // 🛒 User form state
  const [form, setForm] = useState({ crop: "", price: "" });

  useEffect(() => {
    // 🔹 Load mandi locations (still real API)
    getMandiLocations().then(setMandis);

    // 🔹 Add some DUMMY crop data so charts appear
    const dummyData = [
      {
        crop: "Paddy",
        location: "Ranchi",
        price: 1800,
        history: [
          { month: "Jan", price: 1750 },
          { month: "Feb", price: 1780 },
          { month: "Mar", price: 1820 },
          { month: "Apr", price: 1850 },
          { month: "May", price: 1830 },
          { month: "Jun", price: 1860 },
        ],
      },
      {
        crop: "Wheat",
        location: "Patna",
        price: 2200,
        history: [
          { month: "Jan", price: 2150 },
          { month: "Feb", price: 2180 },
          { month: "Mar", price: 2210 },
          { month: "Apr", price: 2250 },
          { month: "May", price: 2230 },
          { month: "Jun", price: 2260 },
        ],
      },
      {
        crop: "Maize",
        location: "Delhi",
        price: 1500,
        history: [
          { month: "Jan", price: 1480 },
          { month: "Feb", price: 1490 },
          { month: "Mar", price: 1510 },
          { month: "Apr", price: 1530 },
          { month: "May", price: 1520 },
          { month: "Jun", price: 1540 },
        ],
      },
    ];

    setPrices(dummyData);
  }, []);

  // 📌 Handle reminder add
  const addReminder = (newReminder) => {
    setReminders([...reminders, newReminder]);
  };

  // 📌 Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 📌 Handle form submit (for now just append dummy chart entry)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.crop || !form.price) return;

    const basePrice = parseInt(form.price);

    // Add a dummy chart for the entered crop
    const newEntry = {
      crop: form.crop,
      location: location,
      price: basePrice,
      history: [
        { month: "Jan", price: basePrice - 20 },
        { month: "Feb", price: basePrice - 10 },
        { month: "Mar", price: basePrice },
        { month: "Apr", price: basePrice + 15 },
        { month: "May", price: basePrice + 10 },
        { month: "Jun", price: basePrice + 20 },
      ],
    };

    setPrices((prev) => [...prev, newEntry]);
    setForm({ crop: "", price: "" });
  };

  return (
    <div className="p-6 space-y-8 bg-gradient-to-r from-green-50 via-yellow-50 to-green-100 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
        🌾 Farmer’s Market & Crop Assistant
      </h1>

      {/* ✨ User Entry Form */}
      
      {/* Market Prices */}
      <MarketPriceTable data={prices} />

      {/* Nearest Mandi */}
      <MandiLocator data={mandis} />

      {/* 📊 Chart for Selected Product */}
      <div className="grid grid-cols-1 gap-6">
  {(() => {
    const selected = prices.find((item) => item.crop === crop);
    if (!selected) {
      return (
        <p className="text-red-500 text-center">
          No data available for {crop}
        </p>
      );
    }

    return (
      <div className="bg-white p-4 rounded-xl shadow-lg">
        {/* ✅ No heading here */}
        <PriceForecastChart data={selected.history} />
      </div>
    );
  })()}
</div>


{/* 🌱 Crop Calendar Section */}
<div className="border rounded-lg p-6 shadow space-y-4 bg-white">
  {/* ❌ Removed <CalendarHeaderr crop={crop} location={location} /> */}

  <ProgressRings progress={40} />
  <CalendarView crop={crop} />
  <ReminderForm onAddReminder={addReminder} />

  {/* Show reminders list */}
  <ul className="list-disc pl-6 mt-4 text-green-700">
    {reminders.map((r, idx) => (
      <li key={idx}>{r}</li>
    ))}
  </ul>
</div>



    </div>
  );
};

export default LiveMarketPrice;
