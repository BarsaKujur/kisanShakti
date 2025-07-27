import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Styles/WhatWeDo.css';

const items = [
  {
    title: 'Dairy Production',
    description: 'Fresh milk, cheese, and organic dairy products.',
    image: '/images/dairy.jpg'
  },
  {
    title: 'Sweet Exotic Fruits',
    description: 'Tropical delights like mangoes, pineapples, and more.',
    image: '/images/fruits.jpg'
  },
  {
    title: 'Fresh Vegetables',
    description: 'Farm-fresh vegetables grown sustainably.',
    image: '/images/vegetable.jpg'
  },
  {
    title: 'Agricultural Products',
    description: 'Grains, pulses, and essential farm produce.',
    image: '/images/agriculturegrains.jpg'
  }
];

const WhatWeDo = () => {
  const navigate = useNavigate();

  return (
    <div className="what-we-do-section py-5 bg-white">
      <Container>
        <div className="text-center mb-5">
          <h2 className="fw-bold">KRISHI MANDI</h2>
          <p className="text-muted">Currently we are selling organic food.</p>
        </div>

        <Row className="g-4">
          {items.map((item, idx) => (
            <Col md={6} lg={3} key={idx}>
              <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={item.image} alt={item.title} />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-5">
          <Button variant="success" size="lg" onClick={() => navigate('/buy')}>
            Learn More
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default WhatWeDo;
