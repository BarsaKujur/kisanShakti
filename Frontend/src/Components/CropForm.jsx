// import React, { useState } from 'react';
// import '../style/CropAdvisor.css';

// const CropForm = () => {
//    const [location, setLocation] = useState('');
//   const [soilType, setSoilType] = useState('');
//   const [season, setSeason] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Logic to fetch crop suggestions
//     console.log({ location, soilType, season });
//   };
//   return (
//     <div>
//       <h3>Cropform</h3>
//        <form className="crop-form" onSubmit={handleSubmit}>
//       <label>
//         📍 Location:
//         <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
//       </label>

//       <label>
//         🌿 Soil Type:
//         <select value={soilType} onChange={(e) => setSoilType(e.target.value)} required>
//           <option value="">Select</option>
//           <option value="loamy">Loamy</option>
//           <option value="sandy">Sandy</option>
//           <option value="clay">Clay</option>
//         </select>
//       </label>

//       <label>
//         ☀️ Season:
//         <select value={season} onChange={(e) => setSeason(e.target.value)} required>
//           <option value="">Select</option>
//           <option value="kharif">Kharif</option>
//           <option value="rabi">Rabi</option>
//           <option value="summer">Summer</option>
//         </select>
//       </label>

//       <button type="submit">Get Recommendations</button>
//     </form>
//     </div>
//   )
// }

// export default CropForm
