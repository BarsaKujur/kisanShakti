import React, { useState } from 'react';
import axios from 'axios';
import backgroundImage from '../assets/bgimg.png'

const NutritionFertilizerAdvisor = () => {
  const [formData, setFormData] = useState({
    crop: '',
    soilPH: '',
    temperature: '',
    rainfall: ''
  });

  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setResult('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/fertilizer-advice', formData);
      setResult(response.data.recommendation);
    } catch (error) {
      console.error(error);
      setResult('Error fetching recommendation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '3rem 1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
        padding: '2rem',
        width: '100%',
        maxWidth: '450px',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '1.5rem', color: '#2e7d32' }}>🌿 Nutrition & Fertilizer Advisor</h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="crop"
            placeholder="Crop Name"
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="number"
            step="0.1"
            name="soilPH"
            placeholder="Soil pH"
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="number"
            name="temperature"
            placeholder="Temperature (°C)"
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="number"
            name="rainfall"
            placeholder="Rainfall (mm)"
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button
            type="submit"
            disabled={loading}
            style={buttonStyle}
          >
            {loading ? 'Analyzing...' : 'Get Advice'}
          </button>
        </form>

        {result && (
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: '#e8f5e9',
            borderRadius: '8px',
            fontWeight: 'bold',
            color: '#2e7d32'
          }}>
            {result}
          </div>
        )}
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  marginBottom: '1rem',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '1rem'
};

const buttonStyle = {
  marginTop: '1rem',
  padding: '0.75rem 1.5rem',
  fontSize: '1rem',
  backgroundColor: '#4caf50',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background 0.3s'
};

export default NutritionFertilizerAdvisor;
