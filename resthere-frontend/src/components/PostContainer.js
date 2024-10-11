import React from 'react';
import PostCard from './PostCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PostContainer = ({ handleShow }) => {
  return (
    <Container>
      <Row>
        <Col>
          <PostCard 
            title="Post Card 1" 
            text="Some description for the first chat card" 
            handleShow={handleShow} 
          />
        </Col>
        <Col>
          <PostCard
            title="Post Card 2" 
            text="Some description for the second chat card" 
            handleShow={handleShow} 
          />
        </Col>
        <Col>
          <PostCard
            title="Post Card 3" 
            text="Some description for the third chat card" 
            handleShow={handleShow} 
          />
        </Col>
        <Col>
          <PostCard
            title="Post Card 4" 
            text="Some description for the fourth chat card" 
            handleShow={handleShow} 
          />
        </Col>
      </Row>
    </Container>
  );
};

export default PostContainer;
