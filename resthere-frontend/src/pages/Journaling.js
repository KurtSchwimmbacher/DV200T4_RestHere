// src/pages/Journaling.js
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';

import Calender from '../components/Calender.js';
import JournalOffCanvas from '../components/JournalOffCanvas.js';

// link css
import '../css/Journal.css';


const Journaling = () => {
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  const handleShowOffCanvas = () => setShowOffCanvas(true);
  const handleCloseOffCanvas = () => setShowOffCanvas(false);


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
                <Button variant='secondary' onClick={handleShowOffCanvas}>New Journal</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Calender />
              </Col>
            </Row>
        </Container>
        <JournalOffCanvas show={showOffCanvas} handleClose={handleCloseOffCanvas} />
    </div>
  );
}

export default Journaling;
