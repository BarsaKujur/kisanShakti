// src/components/AgricultureStats.jsx
import React from 'react';
import { Container } from 'react-bootstrap';
import "./Styles/Agricultural.css"

const AgriculturalStats = () => {
  return (
    <div className="agriculture-stats py-5 ">
      <Container className="text-center  custom-background">
        <h2 className="mb-4">Global Farming Insights</h2>
        <img
          src="/images/AgriculturalStats.png"
          alt="World map showing farming population and stats"
          className="img-fluid rounded shadow"
        />
      </Container>
    </div>
  );
};

export default AgriculturalStats;
