// src/components/ChatOffCanvas.js
import Offcanvas from 'react-bootstrap/Offcanvas';

import ChatMessageCard from './ChatMessageCard';

function ChatOffCanvas({ show, handleClose }) {
  return (
    <Offcanvas show={show} onHide={handleClose} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Your Profile</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ChatMessageCard />
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ChatOffCanvas;
