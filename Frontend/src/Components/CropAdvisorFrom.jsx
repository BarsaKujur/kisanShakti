import React , { useState } from 'react'

const CropAdvisorFrom = () => {
  const [formData, setFormData] = useState({
    location: '',
    irrigationType: '',
    groundwaterLevel: '',
    rainfall: '',
    soilType: '',
    soilPH: '',
    temperature: '',
    climateZone: '',
    lastCrop: '',
  });

  const [recommendations, setRecommendations] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   const fetchWeatherData = async (location) => {
  const apiKey = 'YOUR_API_KEY';
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
  const data = await response.json();

  // Extract needed values
  const temperature = data.main.temp;
  const rainfall = data.rain ? data.rain['1h'] || data.rain['3h'] : 0;

  return { temperature, rainfall };
};

const fetchSoilData = async (lat, lon) => {
  const url = `https://rest.soilgrids.org/query?lon=${lon}&lat=${lat}`;
  const response = await fetch(url);
  const data = await response.json();

  // Extract properties (simplified example)
  const soilType = data.properties?.taxonname || 'Unknown';
  const soilPH = data.properties?.phh2o?.mean || null;

  return { soilType, soilPH };
};



    // Placeholder recommendation logic
    setRecommendations([
      {
        name: 'Rice',
        reason: 'High water availability and compatible with climate',
        yieldInfo: 'Estimated yield: 45 quintals/acre',
        profitability: 'Profit margin: ₹22,000/acre'
      },
      {
        name: 'Maize',
        reason: 'Suits current temperature and pH levels',
        yieldInfo: 'Estimated yield: 38 quintals/acre',
        profitability: 'Profit margin: ₹18,000/acre'
      }
    ]);

    // Here you can integrate API calls or ML model inference
  };
  
  return (
    <div>
      <h1>CropAdvisor Form</h1>
      <div className="container mt-4">
      <h4>🌱 Smart Crop Recommendation</h4>
      <form className="bg-light p-4 rounded shadow-sm" onSubmit={handleSubmit} style={{
    backgroundImage: 'url("/images/image10.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backdropFilter: 'brightness(0.95)',
    border: '1px solid #ccc'
  }} >
        <div className="row g-3">

          {/* Basic Inputs */}
          <div className="col-md-4">
            <label>Location</label>
            <input type="text" className="form-control" name="location" value={formData.location} onChange={handleChange} required />
          </div>

          <div className="col-md-4">
            <label>Irrigation Type</label>
            <select name="irrigationType" className="form-select" value={formData.irrigationType} onChange={handleChange}>
              <option value="">Select</option>
              <option value="canal">Canal</option>
              <option value="drip">Drip</option>
              <option value="rain-fed">Rain-Fed</option>
            </select>
          </div>

          <div className="col-md-4">
            <label>Groundwater Level (meters)</label>
            <input type="number" className="form-control" name="groundwaterLevel" value={formData.groundwaterLevel} onChange={handleChange} />
          </div>

          {/* Weather & Soil Inputs */}
          <div className="col-md-4">
            <label>Rainfall (mm)</label>
            <input type="number" className="form-control" name="rainfall" value={formData.rainfall} onChange={handleChange} />
          </div>

          <div className="col-md-4">
            <label>Soil Type</label>
            <select name="soilType" className="form-select" value={formData.soilType} onChange={handleChange}>
              <option value="">Select</option>
              <option value="loamy">Loamy</option>
              <option value="clayey">Clayey</option>
              <option value="sandy">Sandy</option>
              <option value="black">Black</option>
            </select>
          </div>

          <div className="col-md-4">
            <label>Soil pH</label>
            <input type="number" step="0.1" className="form-control" name="soilPH" value={formData.soilPH} onChange={handleChange} />
          </div>

          <div className="col-md-4">
            <label>Temperature (°C)</label>
            <input type="number" className="form-control" name="temperature" value={formData.temperature} onChange={handleChange} />
          </div>

          <div className="col-md-4">
            <label>Climate Zone</label>
            <select name="climateZone" className="form-select" value={formData.climateZone} onChange={handleChange}>
              <option value="">Select</option>
              <option value="tropical">Tropical</option>
              <option value="temperate">Temperate</option>
              <option value="arid">Arid</option>
              <option value="semi-arid">Semi-Arid</option>
            </select>
          </div>

          <div className="col-md-4">
            <label>Last Crop</label>
            <input type="text" className="form-control" name="lastCrop" value={formData.lastCrop} onChange={handleChange} />
          </div>
        </div>

        <button type="submit" className="btn btn-success mt-4">Get Recommendations</button>
      </form>

      {recommendations.length > 0 && (
        <div className="mt-5 p-4 bg-white shadow-sm rounded">
          <h5>🌿 Recommended Crops</h5>
          <ul className="list-group">
            {recommendations.map((crop, idx) => (
              <li key={idx} className="list-group-item">
                <strong>{crop.name}</strong><br />
                <em>{crop.reason}</em><br />
                <small>{crop.yieldInfo} | {crop.profitability}</small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </div>
  )
}

export default CropAdvisorFrom
