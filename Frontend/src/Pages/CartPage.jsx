import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const enrichedCart = storedCart.map(item => ({ ...item, quantitySelected: 1 }));
    setCartItems(enrichedCart);
  }, []);

  const handleQuantityChange = (index, value) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantitySelected = parseInt(value);
    setCartItems(updatedCart);
  };

  const handleRemove = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantitySelected,
    0
  );
  const handleCheckout = () => {
  localStorage.removeItem('cart');
  setCartItems([]);
  navigate('/order-confirmation');
};


  return (
    <Container className="py-5">
      <h2 className="text-success text-center mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-muted">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <Card key={index} className="mb-3 shadow-sm">
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={2}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid rounded"
                      style={{ height: '100px', objectFit: 'cover' }}
                    />
                  </Col>
                  <Col md={3}>
                    <h5>{item.name}</h5>
                    <p className="text-muted">{item.location}</p>
                  </Col>
                  <Col md={2}>
                    <p>₹{item.price} / kg</p>
                  </Col>

                  <Col md={3}>
                    <Form.Select
  value={item.quantitySelected}
  onChange={(e) => handleQuantityChange(index, e.target.value)}
>
  {[...Array(Number(item.quantity)).keys()].map(q => (
    <option key={q + 1} value={q + 1}>{q + 1} kg</option>
  ))}
</Form.Select>
                  </Col>
                  
                  <Col md={2}>
                    <Button variant="outline-danger" onClick={() => handleRemove(index)}>
                      Remove
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}

          <div className="text-end mt-4">
            <h5>Total: ₹{totalPrice}</h5>
            <Button variant="success" className="mt-2" onClick={handleCheckout}>
  Proceed to Checkout
</Button>

          </div>
        </>
      )}
    </Container>
  );
};

export default CartPage;
