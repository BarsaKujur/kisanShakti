import React, { useState } from 'react';
import axios from 'axios';
import "./style/LiveMarketPrice.css"
import Banner from '../Components/Banner';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const states = {
  Odisha: ["Bhubaneshwar", "Cuttack", "Puri", "Balasore", "Sambalpur", "Rourkela", "Berhampur", "Koraput", "Kendrapara"],
  Rajasthan: ["Jaipur", "Udaipur", "Jodhpur", "Ajmer", "Bikaner", "Kota", "Alwar", "Sikar", "Barmer"],
  UP: ["Varanasi", "Lucknow", "Kanpur", "Agra", "Gorakhpur", "Meerut", "Prayagraj", "Bareilly", "Jhansi"],
  Maharashtra: ["Pune", "Mumbai", "Nagpur", "Nashik", "Aurangabad", "Kolhapur", "Solapur", "Amravati", "Satara"]
};

const crops = {
  Odisha: ["Rice", "Pulses", "Maize", "Groundnut", "Mustard", "Jute", "Sugarcane", "Turmeric", "Ginger", "Potato", "Tomato", "Brinjal", "Chilli", "Sunflower", "Sesame", "Moong", "Urad", "Cotton", "Banana", "Papaya"],
  Rajasthan: ["Bajra", "Wheat", "Barley", "Mustard", "Moong", "Urad", "Gram", "Cumin", "Coriander", "Fenugreek", "Guar", "Cotton", "Onion", "Garlic", "Tomato", "Chilli", "Groundnut", "Sesame", "Maize", "Sorghum"],
  UP: ["Wheat", "Rice", "Sugarcane", "Potato", "Tomato", "Onion", "Mustard", "Maize", "Pulses", "Peas", "Brinjal", "Chilli", "Spinach", "Cauliflower", "Cabbage", "Mango", "Guava", "Papaya", "Turmeric", "Ginger"],
  Maharashtra: ["Rice", "Jowar", "Bajra", "Wheat", "Sugarcane", "Cotton", "Tur", "Moong", "Urad", "Groundnut", "Soybean", "Onion", "Tomato", "Chilli", "Brinjal", "Banana", "Grapes", "Mango", "Pomegranate", "Cashew"]
};

const seasons = ["Kharif", "Rabi"];

const LiveMarketPrice = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');
  const [forecast, setForecast] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/forecast', {
        State: selectedState,
        District: selectedDistrict,
        Crop: selectedCrop,
        Season: selectedSeason
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      setForecast(response.data);
    } catch (error) {
      console.error("Error fetching forecast:", error);
    }
  };

  const generateChartData = (priceTable) => {
    const months = Object.keys(priceTable);
    const labels = months;

    const datasets = [0, 1, 2, 3].map(weekIndex => ({
      label: `Week ${weekIndex + 1}`,
      data: months.map(month => priceTable[month][weekIndex]),
      borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'][weekIndex],
      fill: false,
      tension: 0.3,
      pointRadius: 3
    }));

    return { labels, datasets };
  };

  return (
    <div>
      <Banner
        title="Stay Ahead with Real-Time Market Prices"
        description="Access up-to-date crop prices across regions. Make smarter selling decisions and boost your profits with reliable market insights."
        imageUrl="images/image4.jpg"
      />

      <div className="container mt-4 tab-cont">
        <h2>🌾<span style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#2e7d32',
          background: 'linear-gradient(to right, #2e7d32, #1e88e5)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
          letterSpacing: '1px',
          display: 'inline-block',
          marginBottom: '12px'
        }}> Kisan Sakhi – Crop Price Forecast</span></h2>

        <div className="row">
          <div className="col-md-6">
            <label style={{ fontWeight: 'bold', color: '#2e7d32', fontSize: '16px', marginBottom: '4px', display: 'block' }}>
              State
            </label>
            <select className="form-control" value={selectedState} onChange={e => {
              setSelectedState(e.target.value);
              setSelectedDistrict('');
              setSelectedCrop('');
            }}>
              <option value="">Select State</option>
              {Object.keys(states).map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label style={{ fontWeight: 'bold', color: '#2e7d32', fontSize: '16px', marginBottom: '4px', display: 'block' }}>
              District
            </label>
            <select className="form-control" value={selectedDistrict} onChange={e => setSelectedDistrict(e.target.value)} disabled={!selectedState}>
              <option value="">Select District</option>
              {selectedState && states[selectedState].map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-6">
            <label style={{ fontWeight: 'bold', color: '#2e7d32', fontSize: '16px', marginBottom: '4px', display: 'block' }}>
              Season
            </label>
            <select className="form-control" value={selectedSeason} onChange={e => setSelectedSeason(e.target.value)}>
              <option value="">Select Season</option>
              {seasons.map(season => (
                <option key={season} value={season}>{season}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label style={{ fontWeight: 'bold', color: '#2e7d32', fontSize: '16px', marginBottom: '4px', display: 'block' }}>
              Crop
            </label>
            <select className="form-control" value={selectedCrop} onChange={e => setSelectedCrop(e.target.value)} disabled={!selectedState}>
              <option value="">Select Crop</option>
              {selectedState && crops[selectedState].map(crop => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
          </div>
        </div>


        <button
  className="btn btn-success mt-4"
  onClick={() => {
    if (!selectedState || !selectedDistrict || !selectedCrop || !selectedSeason) {
      alert("Please select all fields before generating the forecast.");
      return;
    }

    // For now, setting hardcoded demo forecast object
    setForecast({
      crop: "Barley",
      region: "Rajasthan",
      season: "Rabi",
      msp: 1850,
      market: `📊 Market Highlights:
- Fatehnagar: ₹2183 per quintal — highest and stable price
- Vijaynagar: ₹2050 to ₹2350 — wide range, strong demand
- Bassi: ₹2040 to ₹2070 — consistent pricing
- Dooni: ₹2050 to ₹2056 — narrow band, steady market
- Suratgarh: ₹1880 to ₹1900 — slightly above MSP`,
      trend_points: [
        { Month: "Jan", Week: 1, Price: 2050 },
        { Month: "Jan", Week: 2, Price: 2070 },
        { Month: "Jan", Week: 3, Price: 2100 },
        { Month: "Jan", Week: 4, Price: 2120 },
      ],
      price_table: {
        Jan: [2050, 2070, 2100, 2120],
        Feb: [2080, 2100, 2130, 2150],
      }
    });
  }}
  disabled={!selectedState || !selectedDistrict || !selectedCrop || !selectedSeason}
>
  {forecast ? "Regenerate Forecast" : "Generate Forecast"}
</button>

        {forecast && (
          <div className="mt-5">
            {/* Forecast Summary Block */}
            <div className="bg-light p-3 border rounded">
              <h4 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #2e7d32, #1e88e5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                borderBottom: '2px solid #ccc',
                paddingBottom: '6px',
                marginBottom: '12px'
              }}>
                📊 Forecast Summary
              </h4>

              <p>
                <span style={{ fontWeight: 'bold', color: '#2e7d32' }}>Crop:</span>
                <span style={{ marginLeft: '8px', color: '#1e88e5' }}>{forecast.crop}</span>
              </p>
              <p>
                <span style={{ fontWeight: 'bold', color: '#2e7d32' }}>Season:</span>
                <span style={{ marginLeft: '8px', color: '#1e88e5' }}>{forecast.season}</span>
              </p>
              <p>
                <span style={{ fontWeight: 'bold', color: '#2e7d32' }}>Region:</span>
                <span style={{ marginLeft: '8px', color: '#1e88e5' }}>{forecast.region}</span>
              </p>
              <p>
                <span style={{ fontWeight: 'bold', color: '#2e7d32' }}>Market:</span>
                <span style={{ marginLeft: '8px', color: '#1e88e5' }}>{forecast.market}</span>
              </p>

              <p style={{ fontSize: '18px', fontWeight: 'bold', color: 'green' }}> <i>{forecast.crop} prices in {forecast.region} during the {forecast.season} season typically show seasonal movement. Here's what to expect:</i></p>
            </div>

            {/* Trend Points Section */}
            <div className="mt-4">
              <h5 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #2e7d32, #1e88e5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                borderBottom: '2px solid #ccc',
                paddingBottom: '6px',
                marginBottom: '12px'
              }}>📈 Forecast Trend Points</h5>
              <ul>
                {forecast.trend_points.map((point, idx) => (
                  <li key={idx}>
                    {point.Month} Week {point.Week}: ₹{point.Price}/quintal
                  </li>
                ))}
              </ul>
            </div>

            {/* Weekly Price Table */}
            <div className="mt-4">
              <h5 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #2e7d32, #1e88e5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                borderBottom: '2px solid #ccc',
                paddingBottom: '6px',
                marginBottom: '12px'
              }}>💰 Weekly Price Table</h5>
              <div style={{ overflowX: 'auto' }}>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>Week 1</th>
                      <th>Week 2</th>
                      <th>Week 3</th>
                      <th>Week 4</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(forecast.price_table ?? {}).map(([month, weeks]) => (
                      <tr key={month}>
                        <td>{month}</td>
                        {weeks.map((price, i) => <td key={i}>₹{price}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Dynamic Line Chart */}
            <div className="mt-4">
              <h5 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #2e7d32, #1e88e5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                borderBottom: '2px solid #ccc',
                paddingBottom: '6px',
                marginBottom: '12px'
              }}>📉 Price Trend Chart</h5>
              <Line
                data={generateChartData(forecast.price_table)}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'top' },
                    title: {
                      display: true,
                      text: `Price Trend for ${forecast.crop} in ${selectedDistrict} (${selectedSeason})`
                    }
                  },
                  scales: {
                    y: {
                      title: {
                        display: true,
                        text: "Price (₹/quintal)"
                      },
                      beginAtZero: false
                    },
                    x: {
                      title: {
                        display: true,
                        text: "Month"
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveMarketPrice;

