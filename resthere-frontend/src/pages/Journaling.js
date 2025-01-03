import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import axios from 'axios';

import { useSelector } from 'react-redux';

import Calender from '../components/Calender.js';
import UnifiedOffCanvas from '../components/UnifiedOffCanvas.js';
import '../css/Journal.css';

const Journaling = () => {
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const user = useSelector((state) => state.user);

  const handleShowOffCanvas = () => {
    // setSelectedEntry(null); // Clear previous data when creating a new entry
    setShowOffCanvas(true);
  };

  const handleCloseOffCanvas = () => setShowOffCanvas(false);

  const handleEventClick = async (entryID) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/journal/entry/${entryID}`);
      console.log('Fetched Entry:', response.data); 
      setSelectedEntry(response.data); 
      setShowOffCanvas(true);
    } catch (error) {
      console.error('Failed to fetch entry:', error);
    }
  };

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
          <Col className='new-journal-entry-btn-con'>
            {user.username && (
              <Button className='new-journal-entry-btn mb-4' variant='secondary' onClick={handleShowOffCanvas}>New Journal Entry</Button>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Calender onEventClick={handleEventClick} />
          </Col>
        </Row>
      </Container>
      <UnifiedOffCanvas type={"journal"} show={showOffCanvas} handleClose={handleCloseOffCanvas} entryData={selectedEntry} />
    </div>
  );
};

export default Journaling;
