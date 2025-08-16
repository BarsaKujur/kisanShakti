import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/CropCalendar.css';
import CalendarHeader from './CalendarHeader';
import ProgressRing from './ProgressRing';
import CalendarView from './CalendarView';

const cropData = {
  crop: 'Paddy',
  soil: 'Loamy Soil',
  rainfall: 'Avg Rainfall',
  location: 'Bhubaneswar',
  duration: '120 days',
  stages: [
    { label: 'Sowing', icon: '🌱', dates: 'June 15–25' },
    { label: 'Irrigation', icon: '💧', dates: 'July 10, Aug 5, Sep 1' },
    { label: 'Fertilizer', icon: '🌿', dates: 'July 20, Aug 15' },
    { label: 'Pest Alert', icon: '🚨', dates: 'Aug 10' },
    { label: 'Harvest', icon: '🌾', dates: 'Oct 10–20' },
    { label: 'PMFBY Deadline', icon: '🏛️', dates: 'Aug 15' },
    { label: 'Mandi Fair', icon: '⚖️', dates: 'Oct 5' },
  ],
  alert: '⚠️ Rain expected next week. Delay sowing by 3 days?',
};

const getBadgeClass = (label) => {
  switch (label) {
    case 'Sowing': return 'success';
    case 'Irrigation': return 'primary';
    case 'Fertilizer': return 'warning';
    case 'Pest Alert': return 'danger';
    case 'Harvest': return 'info';
    case 'PMFBY Deadline': return 'secondary';
    case 'Mandi Fair': return 'light';
    default: return 'dark';
  }
};

function CropCalendarPage() {
  const [view, setView] = useState('timeline');

  return (
    <div className="container">
      {/* 🌾 Crop Summary Header */}
      <CalendarHeader data={cropData} />

      {/* 🔄 View Toggle Tabs */}
      <ul className="nav nav-pills mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${view === 'timeline' ? 'active' : ''}`}
            onClick={() => setView('timeline')}
          >
            Timeline View
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${view === 'calendar' ? 'active' : ''}`}
            onClick={() => setView('calendar')}
          >
            Calendar View
          </button>
        </li>
      </ul>

      {/* 🕒 Timeline or 📅 Calendar View */}
      {view === 'timeline' ? (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {cropData.stages.map((stage, idx) => (
            <div className="col" key={idx}>
              <div className={`card shadow-sm card-animated border-${getBadgeClass(stage.label)}`}>
                <div className="card-body">
                  <h5 className="card-title d-flex align-items-center gap-3">
                    <ProgressRing
                      icon={stage.icon}
                      progress={(idx + 1) / cropData.stages.length * 100}
                      color={`var(--bs-${getBadgeClass(stage.label)})`}
                    />
                    {stage.label}
                  </h5>
                  <p className="card-text text-muted">{stage.dates}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CalendarView />
      )}

      {/* ⚠️ Alert Banner */}
      <div className="alert alert-warning mt-4 d-flex justify-content-between align-items-center">
        <span>{cropData.alert}</span>
        <button className="btn btn-outline-danger btn-sm">Reschedule</button>
      </div>

      {/* 🌦️ Footer Panel */}
      <div className="bg-light p-3 mt-4 rounded shadow-sm">
        <h6 className="text-success">Weather Forecast</h6>
        <p className="mb-0">🌧️ Monsoon active. Moderate rainfall expected.</p>
        <p className="mb-0">💡 Ideal sowing window starts in 3 days.</p>
      </div>
    </div>
  );
}

export default CropCalendarPage;
