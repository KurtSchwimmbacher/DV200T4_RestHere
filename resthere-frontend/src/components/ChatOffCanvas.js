import React from 'react';
import { Offcanvas, Button } from 'react-bootstrap';

const ChatOffCanvas = ({ show, handleClose, professional }) => {
  if (!professional) return null;

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" className="chat-off-canvas">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Chat with {professional.name}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <p><strong>Specialty:</strong> {professional.specialty}</p>
        <p>{professional.bio}</p>
        <Button variant="danger">Send Message</Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ChatOffCanvas;
