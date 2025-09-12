import React , { useState } from 'react'
import LocationFetcher from './LocationFetcher';

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

  const [locationMode, setLocationMode] = useState("manual");

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
        <div className="row g-2">

          {/* Basic Inputs */}
          {locationMode === "current" && (
  <LocationFetcher setLocation={(loc) => setFormData((prev) => ({ ...prev, location: loc }))} />
)}

  <div className="col-md-4">
    <label>Location Mode</label>
    <select
      className="form-control"
      value={locationMode}
      onChange={(e) => setLocationMode(e.target.value)}
    >
      <option value="manual">Manual</option>
      <option value="current">Current</option>
    </select>
  </div>

  <div className="col-md-4">
    <label>Location</label>
    <input
      type="text"
      className="form-control"
      name="location"
      value={formData.location}
      onChange={locationMode === "manual" ? handleChange : () => {}}
      required
      readOnly={locationMode !== "manual"}
    />
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


// import React, { useState, useEffect } from 'react';
// import LocationFetcher from './LocationFetcher';

// const CropAdvisorForm = () => {
//   const [formData, setFormData] = useState({
//     location: '',
//     irrigationType: '',
//     groundwaterLevel: '',
//     rainfall: '',
//     soilType: '',
//     soilPH: '',
//     temperature: '',
//     climateZone: '',
//     lastCrop: '',
//   });

//   const [coords, setCoords] = useState({ lat: null, lon: null });
//   const [locationMode, setLocationMode] = useState('manual');
//   const [recommendations, setRecommendations] = useState([]);
//   const [hasFetchedData, setHasFetchedData] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const inferIrrigationType = (rainfall, groundwaterLevel) => {
//     if (rainfall > 120 && groundwaterLevel < 10) return 'rain-fed';
//     if (groundwaterLevel >= 10 && groundwaterLevel < 30) return 'drip';
//     return 'canal';
//   };

//   const inferClimateZone = (temp) => {
//     if (temp >= 30) return 'tropical';
//     if (temp >= 20) return 'semi-arid';
//     if (temp >= 10) return 'temperate';
//     return 'arid';
//   };

//   const fetchWeatherData = async (lat, lon) => {
//     try {
//       const apiKey = 'YOUR_OPENWEATHER_API_KEY'; // ← Replace with your real API key
//       const response = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
//       );
//       const data = await response.json();

//       const temperature = data.main?.temp ?? '';
//       const rainfall = data.rain?.['1h'] ?? data.rain?.['3h'] ?? 0;

//       return { temperature, rainfall };
//     } catch (err) {
//       console.error('Weather API error:', err);
//       return { temperature: '', rainfall: '' };
//     }
//   };

//   const fetchSoilData = async (lat, lon) => {
//     try {
//       const response = await fetch(`https://rest.soilgrids.org/query?lon=${lon}&lat=${lat}`);
//       const data = await response.json();

//       const soilType = data?.properties?.soilclassification?.USDA_Taxonomy?.value || 'Loamy';
//       const soilPH = data?.properties?.phh2o?.values?.[0]?.value || 6.5;

//       return { soilType, soilPH };
//     } catch (err) {
//       console.error('Soil API error:', err);
//       return { soilType: 'Loamy', soilPH: 6.5 };
//     }
//   };

//   useEffect(() => {
//     const fetchAll = async () => {
//       if (
//         locationMode === 'current' &&
//         coords.lat !== null &&
//         coords.lon !== null &&
//         !hasFetchedData
//       ) {
//         try {
//           const weather = await fetchWeatherData(coords.lat, coords.lon);
//           const soil = await fetchSoilData(coords.lat, coords.lon);

//           const inferredClimateZone = inferClimateZone(weather.temperature);
//           const inferredIrrigation = inferIrrigationType(
//             weather.rainfall,
//             parseFloat(formData.groundwaterLevel || 15)
//           );

//           setFormData((prev) => ({
//             ...prev,
//             temperature: weather.temperature,
//             rainfall: weather.rainfall,
//             soilType: soil.soilType,
//             soilPH: soil.soilPH,
//             climateZone: inferredClimateZone,
//             irrigationType: inferredIrrigation,
//           }));

//           setHasFetchedData(true);
//         } catch (error) {
//           console.error('❌ Error fetching weather/soil data:', error);
//         }
//       }
//     };

//     fetchAll();
//   }, [coords, locationMode, hasFetchedData]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:5000/predict', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           temperature: parseFloat(formData.temperature),
//           rainfall: parseFloat(formData.rainfall),
//           soilPH: parseFloat(formData.soilPH),
//           soilType: formData.soilType,
//           irrigationType: formData.irrigationType,
//           climateZone: formData.climateZone,
//           groundwaterLevel: parseFloat(formData.groundwaterLevel),
//           lastCrop: formData.lastCrop,
//         }),
//       });

//       const data = await response.json();
//       setRecommendations(data.recommendations || []);
//     } catch (err) {
//       console.error('❌ Error fetching recommendation:', err);
//     }
//   };

//   return (
//     <div>
//       <h1>CropAdvisor Form</h1>
//       <div className="container mt-4">
//         <h4>🌾 Smart Crop Recommendation</h4>
//         <form
//           className="bg-light p-4 rounded shadow-sm"
//           onSubmit={handleSubmit}
//           style={{
//             backgroundImage: 'url("/images/image10.jpg")',
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             backgroundRepeat: 'no-repeat',
//             backdropFilter: 'brightness(0.95)',
//             border: '1px solid #ccc',
//           }}
//         >
//           <div className="row g-2">
//             {locationMode === 'current' && (
//               <LocationFetcher
//                 setLocation={(loc) =>
//                   setFormData((prev) => ({ ...prev, location: loc }))
//                 }
//                 setCoords={setCoords}
//               />
//             )}

//             <div className="col-md-4">
//               <label>Location Mode</label>
//               <select
//                 className="form-control"
//                 value={locationMode}
//                 onChange={(e) => {
//                   setLocationMode(e.target.value);
//                   setHasFetchedData(false);
//                 }}
//               >
//                 <option value="manual">Manual</option>
//                 <option value="current">Current</option>
//               </select>
//             </div>

//             <div className="col-md-4">
//               <label>Location</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="location"
//                 value={formData.location}
//                 onChange={locationMode === 'manual' ? handleChange : () => {}}
//                 readOnly={locationMode !== 'manual'}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Irrigation Type</label>
//               <select
//                 name="irrigationType"
//                 className="form-control"
//                 value={formData.irrigationType}
//                 onChange={handleChange}
//               >
//                 <option value="">Select</option>
//                 <option value="rain-fed">Rain-fed</option>
//                 <option value="drip">Drip</option>
//                 <option value="canal">Canal</option>
//               </select>
//             </div>

//             <div className="col-md-4">
//               <label>Groundwater Level (m)</label>
//               <input
//                 type="number"
//                 name="groundwaterLevel"
//                 className="form-control"
//                 value={formData.groundwaterLevel}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Rainfall (mm)</label>
//               <input
//                 type="number"
//                 name="rainfall"
//                 className="form-control"
//                 value={formData.rainfall}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Soil Type</label>
//               <select
//                 name="soilType"
//                 className="form-control"
//                 value={formData.soilType}
//                 onChange={handleChange}
//               >
//                 <option value="">Select</option>
//                 <option value="Loamy">Loamy</option>
//                 <option value="Sandy">Sandy</option>
//                 <option value="Clay">Clay</option>
//                 <option value="Silty">Silty</option>
//               </select>
//             </div>

//             <div className="col-md-4">
//               <label>Soil pH</label>
//               <input
//                 type="number"
//                 name="soilPH"
//                 className="form-control"
//                 value={formData.soilPH}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Temperature (°C)</label>
//               <input
//                 type="number"
//                 name="temperature"
//                 className="form-control"
//                 value={formData.temperature}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="col-md-4">
//               <label>Climate Zone</label>
//               <select
//                 name="climateZone"
//                 className="form-control"
//                 value={formData.climateZone}
//                 onChange={handleChange}
//               >
//                 <option value="">Select</option>
//                 <option value="tropical">Tropical</option>
//                 <option value="semi-arid">Semi-arid</option>
//                 <option value="temperate">Temperate</option>
//                 <option value="arid">Arid</option>
//               </select>
//             </div>

//             <div className="col-md-4">
//               <label>Last Crop</label>
//               <input
//                 type="text"
//                 name="lastCrop"
//                 className="form-control"
//                 value={formData.lastCrop}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           <button type="submit" className="btn btn-success mt-4">
//             Get Recommendations
//           </button>
//         </form>

//         {recommendations.length > 0 && (
//           <div className="mt-5 p-4 bg-white shadow-sm rounded">
//             <h5>🌿 Recommended Crops</h5>
//             <ul className="list-group">
//               {recommendations.map((crop, idx) => (
//                 <li key={idx} className="list-group-item">
//                   <strong>{crop.name}</strong>
//                   <br />
//                   <em>{crop.reason}</em>
//                   <br />
//                   <small>{crop.yieldInfo} | {crop.profitability}</small>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CropAdvisorForm;
