import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const tabs = [
  { id: 'recommendation', label: '🌱 Crop Recommendation' },
  { id: 'pest', label: '🐛 Pest Detection & Precautions' },
  { id: 'fertilizer', label: '🧪 Fertilizer & Nutrient Advisory' },
  { id: 'schemes', label: '🏛️ Govt Schemes & Subsidy Finder' },
  { id: 'calendar', label: '📅 Crop Calendar & Planning' },
];

const CropAdvisorTabs = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('recommendation');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    onTabChange(tabId);
  };

  return (
    <div className="container my-4">
      <ul className="nav nav-tabs justify-content-center">
        {tabs.map((tab) => (
          <li className="nav-item" key={tab.id}>
            <button
              className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.id)}
              type="button"
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CropAdvisorTabs;
