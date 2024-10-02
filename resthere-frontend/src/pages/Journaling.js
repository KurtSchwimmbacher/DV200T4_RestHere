// src/pages/Home.js
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




// link css
import '../css/Home.css';

const Journaling = () => {
  return (
    <div>
        <Container>
            <Row>
                <Col className='home-title'>
                    <h1 className='title-1'>We want you to </h1>
                    <h1 className='title-2'>Rest <strong className='rest-here'>Here</strong></h1>
                </Col>
            </Row>
        </Container>
    </div>
  );
}

export default Journaling;
