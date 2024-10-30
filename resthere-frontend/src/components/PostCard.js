// src/components/postCard.js
import React from 'react';
import Card from 'react-bootstrap/Card';
import { ArrowUpRight } from 'react-bootstrap-icons'; 
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


// Link CSS if necessary
import '../css/Posts.css';

const PostCard = ({ title, text, postId, handleShow, refreshPosts, postTags, isProfilePage}) => {

  const navigate = useNavigate();

  const handleArrowClick = () =>{
    if(isProfilePage){
      handleShow(title, text, postId,postTags, refreshPosts);
    }
    else{
      navigate(`/posts/${postId}`);
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

        <ArrowUpRight onClick={() => handleArrowClick()} />
        
      </div>
      <Card.Body className='resource-card-body'>
        <Card.Title>{title}</Card.Title>
        <Card.Text className='card-text-resource'>{text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default PostCard;
