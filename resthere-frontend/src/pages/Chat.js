// src/pages/Home.js
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChatOffCanvas from '../components/ChatOffCanvas';
import ChatContainer from '../components/ChatContainer';
import NewProfessionalModal from '../components/NewProfessionalModal'; 
import { Button } from 'react-bootstrap';
import ChatMessageOffCanvas from '../components/ChatMessageOffCanvas'; 

import { useSelector } from 'react-redux';

import '../css/Chat.css';

const Chat = () => {
  const [showModal, setShowModal] = useState(false);

  const [showChatCanvas, setShowChatCanvas] = useState(false);

  const user = useSelector((state) => state.user);
  const isAdmin = user.isAdmin;

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleShowChat = () => setShowChatCanvas(true);
  const handleCloseChat = () => setShowChatCanvas(false);

  const refreshProfessionals = () => {
    // Logic to refresh the professionals list
  };

  return (
    <div className='journal-container'>
      <Container>
        <Row>
          <Col className='home-title'>
            <h1 className='title-1'>Get in </h1>
            <h1 className='title-2'><strong className='rest-here'>Touch</strong></h1>
          </Col>
        </Row>
        <Row>
          {isAdmin === 'admin' && (
            <Col className='new-prof-col'>
              <Button className='add-new-professional-btn' variant="secondary" onClick={handleShow}>
                Add New Professional
              </Button>
            </Col>
          )}

        </Row>

        {/* chats button */}
        <Row>
          <Col className='new-prof-col mt-5'>
            <Button className='add-new-professional-btn' variant='secondary' onClick={handleShowChat}>
              Chats
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <ChatContainer />
          </Col>
        </Row>
      </Container>
      <ChatOffCanvas />
      <NewProfessionalModal show={showModal} handleClose={handleClose} refreshProfessionals={refreshProfessionals} /> 
      <ChatMessageOffCanvas show={showChatCanvas} handleClose={handleCloseChat} />
    </div>
  );
};

export default Chat;
