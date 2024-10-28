import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import ChatMessageCard from './ChatMessageCard';

const ChatMessageOffCanvas = ({ show, handleClose }) => {
  

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" className="chat-off-canvas">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Chats</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ChatMessageCard />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ChatMessageOffCanvas;
