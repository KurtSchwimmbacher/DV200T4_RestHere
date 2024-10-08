// src/pages/Home.js
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import SignupLoginForm from '../components/SignupLoginForm';


// link css
import '../css/Journal.css';


const SignupLogin = () => {
  return (
    <div className='journal-container'>
        <Container>
            <Row>
                <Col className='home-title'>
                    <h1 className='title-1'>Join our  </h1>
                    <h1 className='title-2'><strong className='rest-here'>Community</strong></h1>
                </Col>
            </Row>
        </Container>
        <SignupLoginForm />
    </div>
  );
}

export default SignupLogin;
