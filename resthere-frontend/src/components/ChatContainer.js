import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatCard from './ChatCard';
import ChatOffCanvas from './ChatOffCanvas';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ChatContainer = () => {
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [professionals, setProfessionals] = useState([]);
  const [selectedProfessional, setSelectedProfessional] = useState(null);

  const handleShow = (professional) => {
    setSelectedProfessional(professional);
    setShowOffCanvas(true);
  };

  const handleClose = () => setShowOffCanvas(false);

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/professional/');
        setProfessionals(response.data);
      } catch (error) {
        console.error('Error fetching professionals:', error);
      }
    };

    fetchProfessionals();
  }, []);

  return (
    <Container>
      <Row>
        {professionals.map((professional) => (
          <Col lg={4} md={6} sm={12} key={professional._id}>
            <ChatCard 
              title={professional.name} 
              text={professional.specialty} 
              availability={professional.availability}
              handleShow={() => handleShow(professional)} 
              professional={professional}
            />
          </Col>
        ))}
      </Row>

      {/* Pass selected professional data to the off-canvas */}
      <ChatOffCanvas show={showOffCanvas} handleClose={handleClose} professional={selectedProfessional} />
    </Container>
  );
};

export default ChatContainer;
