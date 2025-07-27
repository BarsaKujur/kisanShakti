import React from 'react'
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Styles/NavBar.css"

const NavBar = () => {
  return (
    <div>
      
    <Navbar expand="lg"  className="shadow-sm py-3 BG" id='bg'>
      <Container fluid>
        {/* Logo on the extreme left */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center me-auto">
          <img
            src="https://t4.ftcdn.net/jpg/11/25/96/23/360_F_1125962371_D8BU9ZpTBMTihboBGctD9Y6ChtWUNXy1.jpg" // Replace with your actual logo path
            alt="AgriConnect Logo"
            width="40"
            height="40"
            className="me-2"
          />
          <span style={{ color: '#2E7D32' }} className="fw-bold fs-4">Kishan</span>
          <span style={{ color: '#FFFFFF' }} className="fw-bold fs-4">Sakhi</span>
        </Navbar.Brand>

        {/* Hamburger Toggle for mobile */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* All other nav options aligned to the right */}
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            <Nav.Link as={Link} to="/" style={{ color: '#255c14' }}>Home</Nav.Link>
            <Nav.Link as={Link} to="/buy" style={{ color: '#255c14' }}>Buy</Nav.Link>
            <Nav.Link as={Link} to="/sell" style={{ color: '#255c14' }}>Sell</Nav.Link>
            <Nav.Link as={Link} to="/cropadvisor" style={{ color: '#255c14' }}>CropAdvisor</Nav.Link>
            <Nav.Link as={Link} to="/weather" style={{ color: '#255c14' }}>Weather</Nav.Link>
            <Nav.Link as={Link} to="/learn" style={{ color: '#255c14' }}>LiveMarkpetPrice</Nav.Link>
            <Nav.Link as={Link} to="/learn" style={{ color: '#255c14' }}>Learn</Nav.Link>

            {/* Language Toggle */}
            <Dropdown className="ms-3">
              <Dropdown.Toggle style={{ backgroundColor: '#D2B48C', color: '#2E7D32', borderColor: '#2E7D32' }}>
                EN
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>EN</Dropdown.Item>
                <Dropdown.Item>HI</Dropdown.Item>
                <Dropdown.Item>OD</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* Auth Buttons */}
            <Button as={Link} to="/login" variant="success" className="ms-3">Login</Button>
            <Button as={Link} to="/signup" variant="success" className="ms-2">Sign Up</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
    
  )
}

export default NavBar
