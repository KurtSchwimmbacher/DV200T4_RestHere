// src/components/postCard.js
import React from 'react';
import Card from 'react-bootstrap/Card';
import { ArrowUpRight } from 'react-bootstrap-icons'; // Import arrow icon
import { Nav } from 'react-bootstrap';


// Link CSS if necessary
import '../css/Posts.css';

const PostCard = ({ title, text,  handleShow  }) => {
  return (
    <Card className="custom-card">
      <div className="post-card-top">
        
        <Nav variant="pills" className="post-card-pills">
            <Nav.Item className='post-card-pill-con'>
                <Nav.Link className='post-card-pill' active>Tag</Nav.Link>
            </Nav.Item>
            <Nav.Item className='post-card-pill-con'>
                <Nav.Link className='post-card-pill' active>Tag</Nav.Link>
            </Nav.Item>
        </Nav>

        <ArrowUpRight onClick={() => handleShow(title, text)} />
        
      </div>
      <Card.Body className='resource-card-body'>
        <Card.Title>{title}</Card.Title>
        <Card.Text className='card-text-resource'>{text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default PostCard;
