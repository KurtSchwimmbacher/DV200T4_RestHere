// src/pages/Home.js
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




// link css
import '../css/Home.css';

const Home = () => {
  return (
    <div className="home-container">
        <Container>
            <Row>
                <Col>
                    <h1>We want you to </h1>
                    <h1>Rest Here</h1>
                </Col>
            </Row>
        </Container>
    </div>
  );
}

export default Home;
