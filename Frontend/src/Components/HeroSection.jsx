import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Styles/HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-wrapper py-5 text-white">
      <Container>
        <Row className="align-items-center">
          {/* Left: Circular Leaf Image */}
          <Col md={5} className="text-center mb-4 mb-md-0">
            <Image
              src="https://static.vecteezy.com/system/resources/thumbnails/051/266/736/small/a-green-wall-with-many-leaves-and-flowers-photo.jpg"
              roundedCircle
              className="hero-image"
              alt="Nature Leaf"
            />
            <h6 className="mt-3 text-uppercase">"Where soil meets soul, progress begins."</h6>
          </Col>

          {/* Right: Text Content */}
          <Col md={7}>
            <h1 className="display-5 fw-bold">Empowering Farmers, Enriching Futures</h1>
            <p className="lead mt-3">
              Welcome to a platform built for those who cultivate the land and nourish the world. We connect farmers, buyers, and experts through smart commerce, real-time insights, and personalized support—making agriculture more accessible, profitable, and sustainable. From crop recommendations to market trends, we bring technology to the roots of progress.
            </p>
            <Button
              variant="light"
              className="mt-3 fw-semibold"
              onClick={() => navigate('/signup')}
            >
              Get Started
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroSection;


