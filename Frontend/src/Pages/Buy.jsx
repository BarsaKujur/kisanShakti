import React , { useState , useEffect} from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import ProductCard from '../Components/ProductCard'
import { Link } from 'react-router-dom';
import Banner from '../Components/Banner';

const Buy = () => {
    //this one is of anothercode pf 2nd way
     const [allProducts, setAllProducts] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [quantityRange, setQuantityRange] = useState('');
  const [sortBy, setSortBy] = useState('');
  
//   const [allProducts, setAllProducts] = useState([]);

// Load products from localStorage
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('allProducts')) || [];
    setAllProducts(storedProducts);
  }, []);



   const filterProducts = () => {
    let filtered = [...allProducts];

    // Search
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    // Price Range
    if (priceRange === 'low') filtered = filtered.filter(p => p.price <= 100);
    if (priceRange === 'medium') filtered = filtered.filter(p => p.price > 100 && p.price <= 300);
    if (priceRange === 'high') filtered = filtered.filter(p => p.price > 300);

    // Quantity Range
    if (quantityRange === 'small') filtered = filtered.filter(p => p.quantity <= 30);
    if (quantityRange === 'medium') filtered = filtered.filter(p => p.quantity > 30 && p.quantity <= 80);
    if (quantityRange === 'large') filtered = filtered.filter(p => p.quantity > 80);

    // Sort
    if (sortBy === 'priceAsc') filtered.sort((a, b) => a.price - b.price);
    if (sortBy === 'priceDesc') filtered.sort((a, b) => b.price - a.price);
    if (sortBy === 'nameAsc') filtered.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === 'nameDesc') filtered.sort((a, b) => b.name.localeCompare(a.name));

    return filtered;
    
  };
 

  const filteredProducts = filterProducts();

  return (
    <div>
       
       <Banner
  title="Welcome to the Farmer's Marketplace"
  description="Buy and sell fresh produce, seeds, and tools directly from trusted sources. Transparent pricing and easy access for all."
  imageUrl="images/image1.jpg"
/>



      <Container className="py-5">
      <h2 className="text-success text-center mb-4">Marketplace</h2>

      {/* Search + Filters */}
      <Row className="mb-4 g-3">
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Category</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Dairy">Dairy</option>
            <option value="Seeds">Seeds</option>
            <option value="Fertilizers">Fertilizers</option>
            <option value="Grains">Grains</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
            <option value="">Price</option>
            <option value="low">₹0 - ₹100</option>
            <option value="medium">₹101 - ₹300</option>
            <option value="high">₹301+</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Select value={quantityRange} onChange={(e) => setQuantityRange(e.target.value)}>
            <option value="">Quantity</option>
            <option value="small">0 - 30 kg</option>
            <option value="medium">31 - 80 kg</option>
            <option value="large">81+ kg</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Sort By</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="nameAsc">Name: A-Z</option>
            <option value="nameDesc">Name: Z-A</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Product Grid */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {filteredProducts.map(product => (
          <Col key={product.id}>
            <ProductCard {...product} />
          </Col>
        ))}
      </Row>

      {/* No Results Message */}
      {filteredProducts.length === 0 && (
        <div className="text-center mt-5">
          <p className="text-muted">No products found matching your filters.</p>
        </div>
      )}
    </Container>
    {/* <Container className="py-5">
      <h2 className="text-success text-center mb-4">Available Products</h2>

      {allProducts.length === 0 ? (
        <p className="text-muted text-center">No products available.</p>
      ) : (
        <Row>
          {allProducts.map((product) => (
            <Col md={4} key={product.id} className="mb-4">
              <Card className="shadow-sm">
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    ₹{product.price} / kg<br />
                    {product.quantity} kg available<br />
                    {product.location}
                  </Card.Text>
                  <Button as={Link} to={`/product/${product.id}`} variant="success">
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container> */}
    </div>
  )
}

export default Buy
