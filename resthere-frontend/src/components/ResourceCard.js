import React from 'react';
import Card from 'react-bootstrap/Card';
import { ArrowUpRight } from 'react-bootstrap-icons';
import '../css/Resources.css';

const ResourceCard = ({ title, text, onEditClick }) => {
  return (
    <Card className="custom-card">
      <div className="card-arrow-icon" onClick={onEditClick}>
        <ArrowUpRight />
      </div>
      <Card.Body className='resource-card-body'>
        <Card.Title>{title}</Card.Title>
        <Card.Text className='card-text-resource'>{text}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ResourceCard;
