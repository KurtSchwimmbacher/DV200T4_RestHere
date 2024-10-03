// src/pages/Home.js
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Calender from '../components/Calender.js';


// link css
import '../css/Journal.css';


const Journaling = () => {
  return (
    <div className='journal-container'>
        <Container>
            <Row>
                <Col className='home-title'>
                    <h1 className='title-1'>Write about your </h1>
                    <h1 className='title-2 mb-4'><strong className='rest-here'>Day</strong></h1>
                </Col>
            </Row>
            <Row>
              <Col>
                <Calender />
              </Col>
            </Row>
        </Container>
        
    </div>
  );
}

export default Journaling;
