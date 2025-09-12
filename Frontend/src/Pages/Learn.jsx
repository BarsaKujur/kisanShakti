import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Dropdown } from 'react-bootstrap';
import HeroSection from '../Components//HeroSection';
import CarouselSection from '../Components/CarouselSection';
import ModuleCard from '../Components/ModuleCard';
import ExpertTipCard from '../Components/ExpertTipCard';
import AddModuleForm from '../Components/AddModuleForm';
import EditModuleForm from '../Components/EditModuleForm';
import "./style/Learn.css" 

const Learn = () => {
   const [modules, setModules] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const addModule = (newModule) => {
    setModules(prev => [...prev, newModule]);
  };

  const deleteModule = (index) => {
    setModules(prev => prev.filter((_, i) => i !== index));
  };

  const editModule = (index, updatedModule) => {
    setModules(prev =>
      prev.map((mod, i) => (i === index ? updatedModule : mod))
    );
    setEditingIndex(null);
  };
  return (
    <div>
      

      <Container fluid className="learn-page">
     
      {/* Carousel or Featured Content */}
      <CarouselSection />

      {/* Search and Language Toggle */}
      <Row className="my-4 px-3">
        <Col md={6}>
          <Form.Control type="text" placeholder="Search farming techniques..." />
        </Col>
        <Col md={3}>
          <Dropdown>
            <Dropdown.Toggle variant="secondary">Language</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>English</Dropdown.Item>
              <Dropdown.Item>Odia</Dropdown.Item>
              <Dropdown.Item>Hindi</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md={3}>
          <Dropdown>
            <Dropdown.Toggle variant="secondary">Level</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Beginner</Dropdown.Item>
              <Dropdown.Item>Advanced</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {/* Category Strip */}
      <Row className="px-3 mb-4">
  <div className="d-flex flex-row flex-nowrap overflow-auto category-strip">
    {['Soil', 'Irrigation', 'Pest Control', 'Weather', 'Market Trends'].map((cat, idx) => (
      <Button
        key={idx}
        variant="outline-primary"
        size="sm"
        className="me-2"
        style={{ whiteSpace: 'nowrap' }}
      >
        {cat}
      </Button>
    ))}
  </div>
</Row>

      {/* Add Module Form */}
      <Row className="px-3">
        <Col md={6}>
          <h5>Add a New Learning Module</h5>
          <AddModuleForm onAdd={addModule} />
        </Col>
      </Row>

      {/* Module Cards */}
      <Row className="px-3">
        {modules.map((module, idx) => (
          <Col md={4} key={idx}>
            {editingIndex === idx ? (
              <EditModuleForm
                initialData={module}
                onSave={(updated) => editModule(idx, updated)}
                onCancel={() => setEditingIndex(null)}
              />
            ) : (
              <ModuleCard
                {...module}
                onDelete={() => deleteModule(idx)}
                onEdit={() => setEditingIndex(idx)}
              />
            )}
          </Col>
        ))}
      </Row>

      {/* Expert Tips Section */}
      <h4 className="mt-5 px-3">Insights from Agricultural Experts</h4>
      <Row className="px-3 mb-4">
        <Col md={4}><ExpertTipCard /></Col>
        <Col md={4}><ExpertTipCard /></Col>
        <Col md={4}><ExpertTipCard /></Col>
      </Row>

      {/* Progress Tracker */}
      <Row className="px-3 mb-5">
        <Col><Form.Check type="checkbox" label="Soil Basics" defaultChecked /></Col>
        <Col><Form.Check type="checkbox" label="Pest Control" /></Col>
        <Col><Form.Check type="checkbox" label="Irrigation" /></Col>
      </Row>
    </Container>

  </div>
  )
}

export default Learn
