import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';

import '../css/Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

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
                  <h3 className='feature-title'>Log your thoughts</h3>
                  <h4 className='feature-subtitle'>start journaling today</h4>
                  <Button 
                    variant='secondary' 
                    className='home-feature-btn' 
                    onClick={() => handleNavigate('/journaling')}
                  >
                    Journal
                  </Button>
                </div>
              </Col>
              <Col>
                <div className='journal-feature-home feature-right'>
                  <h3 className='feature-title'>Reach out for help</h3>
                  <h4 className='feature-subtitle'>start messaging professionals</h4>
                  <Button 
                    variant='secondary' 
                    className='home-feature-btn' 
                    onClick={() => handleNavigate('/chat')}
                  >
                    Chat
                  </Button>
                </div>
              </Col>
            </Row>

            <Row className='features-row-home-2'>
              <Col>
                <div className='journal-feature-home feature-left'>
                  <h4 className='feature-subtitle'>Check out helpful resource</h4>
                  <Button 
                    variant='danger' 
                    className='home-feature-btn resource-btn-home'
                    onClick={() => handleNavigate('/resources')}
                  >
                    Resources
                  </Button>
                </div>
              </Col>
              <Col>
                <div className='journal-feature-home feature-right'>
                  <h4 className='feature-subtitle'>Share on the forum</h4>
                  <Button 
                    variant='danger' 
                    className='home-feature-btn resource-btn-home'
                    onClick={() => handleNavigate('/forum')}
                  >
                    Forum
                  </Button>
                </div>
              </Col>
            </Row>
        </Container>
    </div>
  );
}

export default Home;
