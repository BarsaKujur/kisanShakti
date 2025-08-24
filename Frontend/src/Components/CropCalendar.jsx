import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles/CropCalendar.css";
import CalendarHeader from "./CalendarHeader";
import ProgressRing from "./ProgressRing";
import CalendarView from "./CalendarView";
import { cropPlans } from "../Components/croplan";

// 🔹 Badge color helper
const getBadgeClass = (label) => {
  switch (label) {
    case "Sowing":
    case "Planting":
      return "success";
    case "Irrigation":
      return "primary";
    case "Fertilizer":
      return "warning";
    case "Pest Alert":
      return "danger";
    case "Harvest":
      return "info";
    case "PMFBY Deadline":
      return "secondary";
    case "Mandi Fair":
      return "light";
    default:
      return "dark";
  }
};

function CropCalendarPage() {
  const [view, setView] = useState("timeline");
  const [location, setLocation] = useState("");
  const [crop, setCrop] = useState("");
  const [cropData, setCropData] = useState(null);

  // 🔹 Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (cropPlans[crop]) {
      setCropData({
        name: crop,
        location: location || "Not Provided",
        ...cropPlans[crop], // includes duration, stages, season, alert
      });
    } else {
      alert("⚠️ Crop plan not available!");
    }
  };

  return (
    <div className="container">
      {/* 🌾 Crop + Location Form */}
      <form
        className="row g-3 bg-light p-3 rounded shadow-sm mb-4"
        onSubmit={handleSubmit}
      >
        <div className="col-md-6">
          <label className="form-label">Select Crop</label>
          <select
            className="form-select"
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            required
          >
            <option value="">-- Choose Crop --</option>
            {Object.keys(cropPlans).map((c, idx) => (
              <option key={idx} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Enter Location</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Bhubaneswar"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-success">
            Load Crop Plan
          </button>
        </div>
      </form>

      {/* 📅 Show Calendar Only After Selecting Crop */}
      {cropData && (
        <>
          {/* 🌾 Crop Summary Header in Box with Green Line */}
          <div className="mb-4 p-3 rounded shadow-sm border-start border-4 border-success">
            <p className="text-muted mb-1">
             <h4> 🌱 <strong>{cropData.name}</strong></h4>
            </p>
            <p className="text-muted mb-1">
              📍 Location: <strong>{cropData.location}</strong>
            </p>
            {cropData.season && (
              <p className="text-muted mb-1">
                📌 Season Plan: <strong>{cropData.season}</strong>
              </p>
            )}
            {cropData.duration && (
              <p className="text-muted mb-1">
                ⏳ Duration: <strong>{cropData.duration}</strong>
              </p>
            )}
          </div>

          {/* 🔄 View Toggle Tabs */}
          <ul className="nav nav-pills mb-3">
            <li className="nav-item">
              <button
                className={`nav-link ${view === "timeline" ? "active" : ""}`}
                onClick={() => setView("timeline")}
              >
                Timeline View
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${view === "calendar" ? "active" : ""}`}
                onClick={() => setView("calendar")}
              >
                Calendar View
              </button>
            </li>
          </ul>

          {/* 🕒 Timeline or 📅 Calendar View */}
          {view === "timeline" ? (
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {cropData.stages.map((stage, idx) => (
                <div className="col" key={idx}>
                  <div
                    className={`card shadow-sm border-${getBadgeClass(
                      stage.label
                    )}`}
                  >
                    <div className="card-body">
                      <h5 className="card-title d-flex align-items-center gap-3">
                        <ProgressRing
                          icon={stage.icon}
                          progress={((idx + 1) / cropData.stages.length) * 100}
                          color={`var(--bs-${getBadgeClass(stage.label)})`}
                        />
                        <span>
                          {stage.label} – {cropData.name}
                        </span>
                      </h5>

                      {/* ✅ Show month, window, frequency */}
                      <p className="card-text text-muted mt-2">
                        {stage.month && <span>🗓️ Month: {stage.month} </span>}
                        {stage.window && <span>| Window: {stage.window} </span>}
                        {stage.frequency && (
                          <span>| Frequency: {stage.frequency}</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <CalendarView />
          )}

          {/* ⚠️ Alert Banner */}
          {cropData.alert && (
            <div className="alert alert-warning mt-4 d-flex justify-content-between align-items-center">
              <span>{cropData.alert}</span>
              <button className="btn btn-outline-danger btn-sm">Reschedule</button>
            </div>
          )}

          {/* 🌦️ Footer Panel */}
          <div className="bg-light p-3 mt-4 rounded shadow-sm">
            <h6 className="text-success">Weather Forecast</h6>
            <p className="mb-0">🌧️ Monsoon active. Moderate rainfall expected.</p>
            <p className="mb-0">💡 Ideal sowing window starts in 3 days.</p>
          </div>
        </>
      )}
    </div>
  );
}

export default CropCalendarPage;
