import React from 'react'
import { Card } from 'react-bootstrap';

const ExpertTipCard = () => {
  return (
    <div>
     
      <Card className="mb-3 shadow-sm">
    <Card.Body>
      <Card.Title>Expert Tip</Card.Title>
      <Card.Text>
        Rotate crops seasonally to maintain soil health and reduce pests.
      </Card.Text>
      <Card.Subtitle className="text-muted">Dr. A. Mishra, Agronomist</Card.Subtitle>
    </Card.Body>
  </Card>
    </div>
  )
}

export default ExpertTipCard
