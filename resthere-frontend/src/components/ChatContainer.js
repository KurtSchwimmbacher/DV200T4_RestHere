// src/components/ChatContainer.js
import React, { useState } from 'react';
import ChatCard from './ChatCard';
import ChatOffCanvas from './ChatOffCanvas';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ChatContainer = () => {
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  const handleShow = () => setShowOffCanvas(true);
  const handleClose = () => setShowOffCanvas(false);

  return (
    <Container>
        <Row>
            <Col>
                <ChatCard 
                    title="Chat Card 1" 
                    text="Some description for the first chat card" 
                    handleShow={handleShow} 
                />
            </Col>
            <Col>
                <ChatCard 
                    title="Chat Card 2" 
                    text="Some description for the second chat card" 
                    handleShow={handleShow} 
                />
            </Col>
            <Col>
                <ChatCard 
                    title="Chat Card 2" 
                    text="Some description for the second chat card" 
                    handleShow={handleShow} 
                />
            </Col>
            <Col>
                <ChatCard 
                    title="Chat Card 2" 
                    text="Some description for the second chat card" 
                    handleShow={handleShow} 
                />
            </Col>
        </Row>

      {/* Same Offcanvas for all cards */}
      <ChatOffCanvas show={showOffCanvas} handleClose={handleClose} />
    </Container>
  );
};

export default ChatContainer;
