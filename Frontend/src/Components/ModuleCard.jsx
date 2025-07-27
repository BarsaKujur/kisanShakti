import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ModuleCard = ({ title, desc, source, image, actions, onDelete, onEdit }) => (
  <Card className="mb-4 shadow-sm">
    {image && <Card.Img variant="top" src={image} alt={title} />}
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>{desc}</Card.Text>
      {source && <Card.Subtitle className="mb-2 text-muted">Source: {source}</Card.Subtitle>}
      <div className="d-flex justify-content-between flex-wrap">
        {actions?.map((action, idx) => (
          <Button key={idx} variant={action.variant || 'primary'} onClick={action.onClick}>
            {action.label}
          </Button>
        ))}
        {onEdit && <Button variant="warning" onClick={onEdit}>Edit</Button>}
        {onDelete && <Button variant="danger" onClick={onDelete}>Delete</Button>}
      </div>
    </Card.Body>
  </Card>
);

export default ModuleCard;

