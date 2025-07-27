import React from 'react';
import { Container } from 'react-bootstrap';

const OrderConfirmation = () => {
  return (
    <Container className="py-5 text-center">
      <h2 className="text-success">Order Confirmed!</h2>
      <p>Your items will be delivered soon. Thank you for shopping with us!</p>
    </Container>
  );
};

export default OrderConfirmation;
