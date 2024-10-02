// src/pages/Home.js
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




// link css
import '../css/Journal.css';

const Forum = () => {
  return (
    <div className='journal-container'>
        <Container>
            <Row>
                <Col className='home-title'>
                    <h1 className='title-1'>Share </h1>
                    <h1 className='title-2'><strong className='rest-here'>Something</strong></h1>
                </Col>
            </Row>
        </Container>
    </div>
  );
}

export default Forum;
