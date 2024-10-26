import React from 'react';
import Card from 'react-bootstrap/Card';
import { ArrowUpRight } from 'react-bootstrap-icons';
import '../css/Resources.css';

const ChatCard = ({ title, text, availability, handleShow }) => {
  return (
    <Card className="custom-card">
      <div className="card-arrow-icon">
        <ArrowUpRight className='chat-expand-arrow' onClick={handleShow} />
      </div>
      <Card.Body className='resource-card-body'>
        <Card.Title>{title}</Card.Title>
        <Card.Text className='card-text-resource'><i>{text}</i></Card.Text>
        <Card.Text className='card-text-resource'><strong>Availability:</strong> {availability}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ChatCard;
