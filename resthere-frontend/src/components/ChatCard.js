// src/components/ChatCard.js 
import React from 'react';
import Card from 'react-bootstrap/Card';
import { ArrowUpRight } from 'react-bootstrap-icons'; // Import arrow icon

// link css
import '../css/Resources.css';

const ChatCard = ({ title, text, handleShow }) => {
  return (
    <Card className="custom-card" >
      <div className="card-arrow-icon">
        <ArrowUpRight className='chat-expand-arrow' onClick={handleShow} />
      </div>
      <Card.Body className='resource-card-body'>
        <Card.Title>{title}</Card.Title>
        <Card.Text className='card-text-resource'>{text}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ChatCard;
