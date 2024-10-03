// src/components/CustomCard.js
import React from 'react';
import Card from 'react-bootstrap/Card';
import { ArrowUpRight } from 'react-bootstrap-icons'; // Import arrow icon

// Link CSS if necessary
import '../css/Resources.css';

const ResourceCard = ({ title, text }) => {
  return (
    <Card className="custom-card">
      <div className="card-arrow-icon">
      
        <ArrowUpRight />
        
      </div>
      <Card.Body className='resource-card-body'>
        <Card.Title>Resource Title</Card.Title>
        <Card.Text className='card-text-resource'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ResourceCard;
