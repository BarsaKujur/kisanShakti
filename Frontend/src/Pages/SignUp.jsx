import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import './style/SignUp.css';

const SignUp = () => {
   const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'farmer'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { name, email, password, confirmPassword, role } = formData;

    if (!name || !email || !password || !confirmPassword || !role) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Simulated account creation
    setSuccess(`Account created for ${role}! You can now sign in.`);
    // You can redirect or store user data here
  };
  return (
    <div>
      
      
    <Container fluid className="signup-page d-flex align-items-center justify-content-center">
      <Row className="w-100" style={{ maxWidth: '900px' }}>
        <Col md={6} className="d-flex flex-column justify-content-center text-white p-4">
          <h2>Join the Community</h2>
          <p>Create your account to access personalized tools, insights, and learning modules.</p>
        </Col>

        <Col md={6} className="bg-white p-4 rounded shadow">
          <h4 className="mb-4">Sign Up</h4>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Select Role</Form.Label>
              <Form.Select name="role" value={formData.role} onChange={handleChange}>
                <option value="farmer">Farmer</option>
                <option value="buyer">Buyer</option>
                <option value="expert">Expert</option>
              </Form.Select>
            </Form.Group>

            <Button type="submit" className="w-100 custom-signin-btn">
              Sign Up
            </Button>
          </Form>

          <div className="text-center mt-3">
            <small>Already have an account? <a href="/signin">Log in here</a></small>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default SignUp
