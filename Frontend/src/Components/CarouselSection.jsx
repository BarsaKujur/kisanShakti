import React from 'react';
import { Carousel } from 'react-bootstrap';
import './Styles/CarouselSection.css'; // adjust path if needed

const CarouselSection = () => (
  <div>
    <Carousel className="mb-4">
      <Carousel.Item>
        <img className="d-block w-100" src="images/image11.jpg" alt="Drip Irrigation" />
        <Carousel.Caption>
          <h3>Drip Irrigation Setup</h3>
          <p>Learn how to install drip irrigation easily.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-block w-100" src="images/image12.jpg" alt="Organic Pest Control" />
        <Carousel.Caption>
          <h3>Organic Pest Control</h3>
          <p>Natural ways to protect your crops.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-block w-100" src="images/image8.jpg" alt="Soil Health" />
        <Carousel.Caption>
          <h3>Soil Health & Composting</h3>
          <p>Improve soil fertility with organic compost.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-block w-100" src="images/image5.jpg" alt="Weather Forecasting" />
        <Carousel.Caption>
          <h3>Weather Forecasting Tools</h3>
          <p>Use smart tools to plan your farming schedule.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-block w-100" src="images/image13.jpg" alt="Market Trends" />
        <Carousel.Caption>
          <h3>Live Market Trends</h3>
          <p>Stay updated with crop prices and demand.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  </div>
);

export default CarouselSection;

