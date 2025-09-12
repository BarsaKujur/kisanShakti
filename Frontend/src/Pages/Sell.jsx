import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Banner from '../Components/Banner';

const Sell = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    location: '',
    image: '',
     description: '',
  });
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();
// Load seller listings on page load
  useEffect(() => {
  const storedListings = JSON.parse(localStorage.getItem('sellerListings')) || [];
  setListings(storedListings);
}, []);

// ✅ Handle input changes
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const newProduct = {
    ...formData,
    id: Date.now(), // unique ID
  };

  // Save to seller listings
  const sellerListings = JSON.parse(localStorage.getItem('sellerListings')) || [];
  sellerListings.push(newProduct);
  localStorage.setItem('sellerListings', JSON.stringify(sellerListings));
  setListings(sellerListings); // update UI

  // Save to BuyPage products
  const allProducts = JSON.parse(localStorage.getItem('allProducts')) || [];
  allProducts.push(newProduct);
  localStorage.setItem('allProducts', JSON.stringify(allProducts));

  alert('Product listed successfully!');
  setFormData({ name: '', category: '', price: '', quantity: '', location: '', image: '' });
  navigate('/buy'); // redirect to BuyPage
};
 // Handle delete listing
  const handleDelete = (index) => {
  const productToDelete = listings[index];

  // ✅ Remove from sellerListings
  const updatedListings = listings.filter((_, i) => i !== index);
  setListings(updatedListings);
  localStorage.setItem('sellerListings', JSON.stringify(updatedListings));

  // ✅ Remove from allProducts
  const allProducts = JSON.parse(localStorage.getItem('allProducts')) || [];
  const updatedProducts = allProducts.filter(p => p.id !== productToDelete.id);
  localStorage.setItem('allProducts', JSON.stringify(updatedProducts));
};

  
  return (
    <div>
      
     <Banner
  title="Sell Your Harvest with Confidence"
  description="List your fresh produce, seeds, and farming essentials. Reach buyers directly, set fair prices, and grow your impact—one sale at a time."
  imageUrl="images/image7.jpg"
/>



      <Container className="py-5">
      <h2 className="text-success text-center mb-4">List a Product for Sale</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select...</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                 <option value="Dairy">Dairy</option>
                <option value="Grains">Grains</option>
                <option value="Seeds">Seeds</option>
                <option value="Fertilizers">Fertilizers</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Price (₹/kg)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantity (kg)</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Paste image link"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
  <Form.Label>Description</Form.Label>
  <Form.Control
    as="textarea"
    rows={3}
    name="description"
    value={formData.description}
    onChange={handleChange}
    placeholder="Add details about your product (e.g. freshness, variety, organic)"
  />
</Form.Group>


        <Button variant="success" type="submit" className="w-100 mt-3">
          Submit Listing
        </Button>
      </Form>
      {/* Seller Listings */}
      <h4 className="mt-5 text-success">My Listings</h4>
      {listings.length === 0 ? (
        <p className="text-muted">No listings yet.</p>
      ) : (
        listings.map((item, idx) => (
  <Card key={item.id} className="mb-3 shadow-sm">
    <Card.Body className="d-flex justify-content-between align-items-center">
  <div>
    <h5>{item.name}</h5>
    <p className="mb-0">₹{item.price} | {item.quantity}kg | {item.location}</p>
    {item.description && (
      <p className="text-muted mt-1" style={{ maxWidth: '400px' }}>
        {item.description}
      </p>
    )}
  </div>
  <Button variant="outline-danger" onClick={() => handleDelete(idx)}>Delete</Button>
</Card.Body>

  </Card>
        ))
      )}
    </Container>
    </div>
        
  );
};

export default Sell
