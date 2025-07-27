import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // ✅ Load product from localStorage
  useEffect(() => {
    const allProducts = JSON.parse(localStorage.getItem('allProducts')) || [];
    const found = allProducts.find(p => p.id === Number(id));
    setProduct(found);
  }, [id]);

  // ✅ Handle Buy Now
  const handleBuy = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  // ✅ Handle missing product
  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h2 className="text-danger">Product not found</h2>
        <Link to="/buy" className="btn btn-outline-success mt-3">Back to Buy Page</Link>
      </Container>
    );
  }

  return (
    <div style={{ backgroundColor: '#FFF8E1' }}>
      <Container className="py-5">
        <Row className="align-items-center">
          {/* Image */}
          <Col md={6}>
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded shadow-sm"
              style={{ maxHeight: '450px', objectFit: 'cover' }}
            />
          </Col>

          {/* Info */}
          <Col md={6}>
            <h2 className="text-success fw-bold mb-3">{product.name}</h2>
            <h4 className="mb-2">₹{product.price} / kg</h4>
            <p className="text-muted">{product.description || 'No description available.'}</p>
            <p><strong>Quantity:</strong> {product.quantity} kg</p>
            <p><strong>Location:</strong> {product.location}</p>

            <div className="mt-4">
              <Button variant="success" className="me-3" onClick={() => handleBuy(product)}>Buy Now</Button>
              <Link to="/cart" className="btn btn-outline-success me-2">Go to Cart</Link>
              <Link to="/buy" className="btn btn-outline-secondary">Back to Buy Page</Link>
            </div>
          </Col>
        </Row>

        {/* Reviews */}
        {product.reviews && product.reviews.length > 0 && (
          <Row className="mt-5">
            <Col>
              <h4 className="text-success mb-3">Customer Reviews</h4>
              {product.reviews.map((review, idx) => (
                <Card key={idx} className="mb-3 shadow-sm">
                  <Card.Body>
                    <Card.Title>{review.user}</Card.Title>
                    <Card.Text>{review.comment}</Card.Text>
                    <div>
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <span key={i} style={{ color: '#FFD700' }}>★</span>
                      ))}
                      {Array.from({ length: 5 - review.rating }).map((_, i) => (
                        <span key={i} style={{ color: '#ccc' }}>★</span>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default ProductDetails;
