import React, { useState, useEffect } from 'react';

import 'aos/dist/aos.css';
import AOS from 'aos';

const SectionTabs = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  useEffect(() => {
    AOS.init({ duration: 600 });
  }, []);

  const handleTabClick = (key) => {
    setActiveTab(key);
    onTabChange(key);
  };

  return (
    <div className="container my-4" data-aos="fade-up">
      <div className="row justify-content-center">
        {tabs.map((tab) => (
          <div key={tab.key} className="col-auto">
            <button
              className={`btn mx-2 ${activeTab === tab.key ? 'btn-success' : 'btn-outline-success'}`}
              onClick={() => handleTabClick(tab.key)}
            >
              {tab.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionTabs;
