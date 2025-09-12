import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';


const EditModuleForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };
  return (
    <div>
      <h1>Thos is EditModuleForm Components</h1>
       <Form onSubmit={handleSubmit} className="mb-3">
      <Form.Control name="title" value={formData.title} onChange={handleChange} className="mb-2" />
      <Form.Control name="desc" value={formData.desc} onChange={handleChange} className="mb-2" />
      <Form.Control name="source" value={formData.source} onChange={handleChange} className="mb-2" />
      <Form.Control name="image" value={formData.image} onChange={handleChange} className="mb-2" />
      <Button type="submit" variant="success" className="me-2">Save</Button>
      <Button variant="secondary" onClick={onCancel}>Cancel</Button>
    </Form>
      
    </div>
  );
};

export default EditModuleForm;