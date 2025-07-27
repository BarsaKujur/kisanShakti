import React from 'react';
import { Card, Button } from 'react-bootstrap';
 import { Link } from 'react-router-dom';

const ProductCard = ({ id, name, price, image, location }) => {
  return (
    <Card className="shadow-sm h-100">
      <Card.Img variant="top" src={image} alt={name} style={{ height: '200px', objectFit: 'cover' }} />
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title>{name}</Card.Title>
          <Card.Text>₹{price} / kg</Card.Text>
          <Card.Text className="text-muted" style={{ fontSize: '0.9rem' }}>{location}</Card.Text>
        </div>
        <Button as={Link} to={`/product/${id}`} variant="success">View Details</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
