// src/components/postCard.js
import React from 'react';
import Card from 'react-bootstrap/Card';
import { ArrowUpRight } from 'react-bootstrap-icons'; // Import arrow icon
import { Nav } from 'react-bootstrap';


// Link CSS if necessary
import '../css/Posts.css';

const PostCard = ({ title, text, postId, handleShow, refreshPosts, postTags  }) => {
  return (
    <Card className="custom-card">
      <div className="post-card-top">
        
      <Nav variant="pills" className="post-card-pills">
          {postTags && postTags.map((tag, index) => (
            <Nav.Item key={index} className='post-card-pill-con'>
                <Nav.Link className='post-card-pill' active>{tag}</Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        <ArrowUpRight onClick={() => handleShow(title, text, postId,postTags, refreshPosts)} />
        
      </div>
      <Card.Body className='resource-card-body'>
        <Card.Title>{title}</Card.Title>
        <Card.Text className='card-text-resource'>{text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default PostCard;
