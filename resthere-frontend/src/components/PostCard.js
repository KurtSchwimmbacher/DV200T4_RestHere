// src/components/postCard.js
import React from 'react';
import Card from 'react-bootstrap/Card';
import { ArrowUpRight } from 'react-bootstrap-icons'; 
import { Nav } from 'react-bootstrap';


// Link CSS if necessary
import '../css/Posts.css';

const PostCard = ({ title, text, postId, handleShow, refreshPosts, postTags, isProfilePage}) => {

  

  const handleArrowClick = () =>{
    if(isProfilePage){
      handleShow(title, text, postId,postTags, refreshPosts);
    }
  }

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

        {isProfilePage && (
          <ArrowUpRight onClick={() => handleArrowClick()} />
        )}
        
      </div>
      <Card.Body className='resource-card-body'>
        <Card.Title>{title}</Card.Title>
        <Card.Text className='card-text-resource'>{text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default PostCard;
