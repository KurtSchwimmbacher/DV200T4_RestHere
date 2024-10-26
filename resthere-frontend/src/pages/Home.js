// src/pages/Home.js
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Vector1 from '../assets/Home_TL.svg';
import Vector2 from '../assets/Home_TR.svg';
import Vector3 from '../assets/Home_BL.svg';
import Vector4 from '../assets/Home_BR.svg';


// link css
import '../css/Home.css';

const Home = () => {
  return (
    <div className="home-container">
        <Container>
            <Row>
                <Col className='home-title'>
                    <h1 className='title-1'>We want you to </h1>
                    <h1 className='title-2'>Rest <strong className='rest-here'>Here</strong></h1>
                </Col>
            </Row>
              
            <Row>
              <Col>
                <img src={Vector1}>
                </img>
              </Col>
              <Col>
                <img src={Vector2}>
                </img>
              </Col>
            </Row>
        </Container>
    </div>
  );
}

export default Home;
