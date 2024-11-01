import React, { useState } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import ChatMessageForm from './ChatMessageForm';

const ChatOffCanvas = ({ show, handleClose, professional }) => {
  const [isMessaging, setIsMessaging] = useState(false);

  const handleSendMessageClick = () => {
    setIsMessaging(true); 
  };

  const handleClosingOffCanvas = () =>{
    setIsMessaging(false);
    handleClose();
  }

  if (!professional) return null;

  return (
    <Offcanvas show={show} onHide={handleClosingOffCanvas} placement="end" className="chat-off-canvas">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Chat with {professional.name}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {isMessaging ? (
          <ChatMessageForm professional={professional} />
        ) : (
          <>
            <p><strong>Specialty:</strong> {professional.specialty}</p>
            <p>{professional.bio}</p>
            <Button variant="danger" onClick={handleSendMessageClick}>Send Message</Button>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ChatOffCanvas;
