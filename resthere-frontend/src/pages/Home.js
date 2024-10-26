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
import { Button } from 'react-bootstrap';

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
              
            <Row className='features-row-home-1'>
              <Col>
                <div className='journal-feature-home feature-left'>
                  <h3>Log your thoughts</h3>
                  <h4>start journaling today</h4>
                  <Button variant='secondary'>Journal</Button>
                  {/* <img src={Vector1} className='vector-top-left-home'></img> */}
                </div>
                
              </Col>
              <Col>
              <div className='journal-feature-home feature-right'>
                  <h3>Reach out for help</h3>
                  <h4>start messaging professionals</h4>
                  <Button variant='secondary'>Journal</Button>
                  {/* <img src={Vector2} className='vector-top-left-home'></img> */}
                </div>
              </Col>
            </Row>

            <Row className='features-row-home-2'>
              <Col>
              <div className='journal-feature-home feature-left'>
                  
                  <h4>Check out helpful resource</h4>
                  <Button variant='danger' className='resource-btn-home'>Resouces</Button>
                  {/* <img src={Vector3} className='vector-top-left-home'></img> */}
                </div>
              </Col>
              <Col>
              <div className='journal-feature-home feature-right'>
                  
                  <h4>Share with others on the forum</h4>
                  <Button variant='danger' className='resource-btn-home'>Forum</Button>
                  {/* <img src={Vector4} className='vector-top-left-home'></img> */}
                </div>
              </Col>
            </Row>

        </Container>
    </div>
  );
}

export default Home;
