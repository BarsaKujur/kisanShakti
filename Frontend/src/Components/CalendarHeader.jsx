import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CalendarHeader = ({ data }) => {
  const { crop, soil, rainfall, location, duration } = data;

  return (
    <div className="container my-4 p-4 rounded shadow-sm bg-light border-start border-success border-4">
      <div className="row align-items-center">
        <div className="col-auto">
          <span className="fs-1">
            {crop === 'Paddy' ? '🌾' : '🌱'}
          </span>
        </div>
        <div className="col">
          <h3 className="mb-1 text-success">{crop}</h3>
          <p className="mb-0 text-muted">
            {soil} • {rainfall}
          </p>
          <p className="mb-0 text-muted">
            📍 {location}
          </p>
          <p className="mb-0 text-muted">
            🗓️ Season Plan: {duration}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;

