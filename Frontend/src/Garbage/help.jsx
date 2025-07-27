import React from 'react';
import { NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom sticky-top shadow-sm">
      <Container>
        <Link className="navbar-brand" to="/">🌿 AgriConnect</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="marketplaceDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Marketplace
              </a>
              <ul className="dropdown-menu" aria-labelledby="marketplaceDropdown">
                <li><Link className="dropdown-item" to="/marketplace/buy">Buy</Link></li>
                <li><Link className="dropdown-item" to="/marketplace/sell">Sell</Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/cropadvisor">Crop Advisor</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/weather">Weather</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/learn">Learn</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">Signup</Link>
            </li>
          </ul>
        </div>
      </Container>
    </nav>
  );
};

export default Header;
