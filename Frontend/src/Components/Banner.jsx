import React from 'react';
import { Container } from 'react-bootstrap';
import './Styles/Banner.css';

const Banner = ({ title, description, imageUrl }) => {
  return (
    <div
      className="banner-background d-flex align-items-center"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <Container>
        <div className="banner-content text-white text-center">
          <h2 className="fw-bold">{title}</h2>
          <p className="mt-2">{description}</p>
        </div>
      </Container>
    </div>
  );
};

export default Banner;

