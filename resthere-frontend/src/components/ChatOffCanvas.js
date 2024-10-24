import React from 'react';
import { Offcanvas, Button } from 'react-bootstrap';

const ChatOffCanvas = ({ show, handleClose, professional }) => {
  if (!professional) return null;

  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Chat with {professional.name}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <p><strong>Specialty:</strong> {professional.specialty}</p>
        <p>{professional.bio}</p>
        <Button variant="primary">Send Message</Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ChatOffCanvas;
