import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Styles/FeatureStrip.css';


const features = [
  {
    title: 'Haath Se Bazaar Tak',
    description: 'Buy fresh, organic farm produce directly from trusted sellers. Safe, local, and farmer-first shopping',
    image: 'https://www.shutterstock.com/image-vector/farmers-market-bazaar-vendors-offer-260nw-2509406511.jpg',
    link: '/buy'
  },
  {
    title: 'Fasal Guru',
    description: 'Get smart, personalized crop advice based on soil, season, and region. Boost yield, reduce risk.',
    image: 'https://www.cabi.org/wp-content/uploads/IMG_9710-1024pxwide.jpg',
    link: '/cropadvisor'
  },
  {
    title: 'Becho Apna Upaj',
    description: 'List your harvest, connect with buyers, and earn fair prices. Sell easily, grow confidently..',
    image: 'https://www.aldenvalleyridge.com/wp-content/uploads/sites/63/2019/08/GettyImages-671270196-1-600x511.jpg',
    link: '/sell'
  },
  {
    title: 'Mausam Trackerns',
    description: 'Check accurate farm-focused forecasts. Plan irrigation, harvesting, and spraying with timely weather updates.',
    image: 'https://semantictech.in/blogs/wp-content/uploads/2023/09/image-3-1.jpg',
    link: '/weather'
  },
  {
    title: 'Mandii Meter',
    description: 'Track real-time mandi prices for grains, fruits, and vegetables. Make informed selling decisions daily..',
    image: 'https://akm-img-a-in.tosshub.com/indiatoday/images/breaking_news/202403/1%2520%25283%2529_57.jpg?VersionId=D0CD8.g8MaHkYOKBwaUmnRhorVLOKnmZ&size=686:385',
    link: '/produce'
  },
  {
    title: 'Kheti Seekho',
    description: 'Explore tutorials, videos, and expert tips. Learn modern farming techniques to improve productivity and sustainability.',
    image: 'https://i0.wp.com/kisanjeevan.com/wp-content/uploads/2023/02/a2c77c05492aa6037bcf76482cf5d1ed.jpg?resize=640%2C426&ssl=1',
    link: '/learn'
  }
];



const FeatureStrip = () => {

  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);


  return (
    <div>
      {/* <h1>This is FeatureStrip</h1> */}
      <div className="feature-strip py-5 bg-light" ref={containerRef}>
      <Container>
        <Row className={`justify-content-center ${visible ? 'animate-strip' : ''}`}>
          {features.map((feature, idx) => (
            <Col md={6} lg={4} className="mb-4 px-3" key={idx}>
              <div className="feature-card">
                <img src={feature.image} alt={feature.title} className="feature-image" />
                <div className="feature-content">
                  <h5>{feature.title}</h5>
                  <p>{feature.description}</p>
                  <Link to={feature.link}>
                    <Button variant="success" size="sm">Learn More</Button>
                  </Link>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
    </div>
  );
};

export default FeatureStrip;


