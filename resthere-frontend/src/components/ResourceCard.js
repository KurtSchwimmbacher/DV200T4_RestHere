import React from 'react';
import Card from 'react-bootstrap/Card';
import { ArrowUpRight } from 'react-bootstrap-icons';
import '../css/Resources.css';
import { Nav } from 'react-bootstrap';

const ResourceCard = ({ title, text, tags = [], onEditClick }) => {
  return (
    <Card className="custom-card mt-3">
      

      <div className="post-card-top">
        
        <Nav variant="pills" className="post-card-pills">
          {tags.map((tag, index) => (
            <Nav.Item key={index} className='post-card-pill-con'>
              <Nav.Link className='post-card-pill' active>{tag}</Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        <ArrowUpRight  onClick={onEditClick} />
      </div>
      <Card.Body className='resource-card-body'>
        <Card.Title>{title}</Card.Title>
        <Card.Text className='card-text-resource'>{text}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ResourceCard;
