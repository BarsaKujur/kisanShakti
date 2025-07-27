import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AddModuleForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    source: '',
    image: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newModule = {
      ...formData,
      actions: [
        { label: 'Read More', onClick: () => console.log('Read More clicked') },
        { label: 'Save', variant: 'outline-secondary', onClick: () => console.log('Saved') }
      ]
    };
    onAdd(newModule);
    setFormData({ title: '', desc: '', source: '', image: '' });
  };

  return (
    
    <div>
        
        <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Control name="title" placeholder="Module Title" value={formData.title} onChange={handleChange} className="mb-2" />
      <Form.Control name="desc" placeholder="Description" value={formData.desc} onChange={handleChange} className="mb-2" />
      <Form.Control name="source" placeholder="Source" value={formData.source} onChange={handleChange} className="mb-2" />
      <Form.Control name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} className="mb-2" />
      <Button type="submit" variant="success">Add Module</Button>
    </Form>
    </div>
  );
};

export default AddModuleForm;

