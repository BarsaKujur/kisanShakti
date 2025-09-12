import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaEnvelope, FaLinkedin, FaGithub, FaLeaf } from 'react-icons/fa';

const Footer = () => {
  return (
     <footer style={{ backgroundColor: '#1B5E20' }} className="text-white py-4 mt-5">
      <Container>
        <Row className="text-center mb-3">
          <Col>
            <h5 className="fw-bold">
              <FaLeaf className="me-2" />
              KishanSakhi
            </h5>
            <p className="mb-1">Empowering Farmers with Technology</p>
            <p className="mb-0">© {new Date().getFullYear()} All rights reserved</p>
          </Col>
        </Row>

        <Row className="text-center">
          <Col>
            <p className="mb-2">📬 Contact: <a href="mailto:rajlakshmibhal824@gmail.com" className="text-white text-decoration-underline">rajlakshmibhal824@gmail.com</a></p>
            <p className="mb-2">
              🔗 Connect:
              <a href="https://www.linkedin.com/in/rajlakshmi-bhal" target="_blank" rel="noopener noreferrer" className="text-white ms-2 me-3">
                <FaLinkedin /> LinkedIn
              </a>
              <a href="https://github.com/RajLakshmiBhal" target="_blank" rel="noopener noreferrer" className="text-white">
                <FaGithub /> GitHub
              </a>
            </p>
            <p className="fst-italic">“Sowing innovation, harvesting impact.”</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

