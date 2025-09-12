import React, { useState } from "react";
import { Tag, PlusCircle } from "lucide-react";

const MarketPriceTable = ({ data }) => {
  const [customData, setCustomData] = useState([]);
  const [form, setForm] = useState({ crop: "", price: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.crop && form.price) {
      setCustomData([...customData, form]);
      setForm({ crop: "", price: "" });
    }
  };

  const allData = [...data, ...customData];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-green-50 to-orange-100 p-8">
      {/* Header */}
      <h2 className="text-4xl font-extrabold mb-10 text-center text-green-700 flex items-center justify-center gap-3">
        <Tag className="text-green-600 w-8 h-8" /> 
        Market Prices Today
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {allData.map((item, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-tr from-green-200 via-yellow-100 to-orange-200 rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-all border-2 border-green-300"
          >
            <h3 className="text-2xl font-bold text-green-800">{item.crop}</h3>
            <p className="mt-3 text-3xl font-extrabold text-orange-700">
              ₹ {item.price} / qtl
            </p>
            <span className="text-sm text-gray-600 block mt-2">
              Updated just now ⏳
            </span>
          </div>
        ))}
      </div>

      {/* Add Product Section */}
      <div className="mt-12 bg-white rounded-2xl p-8 shadow-2xl border border-green-300 w-full max-w-3xl text-center">
        <h3 className="text-2xl font-bold mb-6 text-green-800 flex items-center justify-center gap-2">
          <PlusCircle className="text-green-600 w-6 h-6" /> Add Your Price
        </h3>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <input
            type="text"
            name="crop"
            value={form.crop}
            onChange={handleChange}
            placeholder="🌽 Crop name"
            className="flex-1 border-2 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 outline-none"
          />
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="💰 Price (₹)"
            className="flex-1 border-2 rounded-lg p-3 focus:ring-2 focus:ring-green-400 outline-none"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-orange-500 hover:opacity-90 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all"
          >
            ➕ Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default MarketPriceTable;
