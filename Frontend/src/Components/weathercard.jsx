// src/components/WeatherCard.jsx
import React from 'react';
import '../Pages/style/Weather.css';

const WeatherCard = ({
  title,
  temperature,
  image,
  animationClass,
  gradientClass,
  alert,
  farmingTip,
  day,
  date
}) => {
  return (
    
    <div className={`weather-card ${gradientClass} ${animationClass} p-4 rounded shadow-sm`}>
      <div className='weather-main'>
      <div className="weather-image-container ">
        <img
          src={image}
          alt={title}
          className={`weather-image ${animationClass}`}
        />
      </div>
      <div className="weather-info">
        <h5>{day}, {date}</h5>
        <p><strong>{temperature}°C</strong></p>
        <p className="text-muted">{title}</p>
      </div>
  </div>
      <div className="alert-box text-center my-2" style={{ borderColor: alert.color }}>
        <strong style={{ color: alert.color }}>⚠️ {alert.level} Alert:</strong>
        <p className="mb-0">{alert.message}</p>
      </div>

      <div className="tip-box text-center mt-3">
        <h6>🌱 Farmer’s Tip</h6>
        <p className="text-muted">{farmingTip}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
