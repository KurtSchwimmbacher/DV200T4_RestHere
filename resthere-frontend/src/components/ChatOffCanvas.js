// src/components/ChatOffCanvas.js
import Offcanvas from 'react-bootstrap/Offcanvas';

import ChatMessageCard from './ChatMessageCard';

import '../css/Chat.css';

function ChatOffCanvas({ show, handleClose }) {
  return (
    <Offcanvas className='chat-off-canvas' show={show} onHide={handleClose} placement='end'>
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
