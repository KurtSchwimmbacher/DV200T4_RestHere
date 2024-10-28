import Card from 'react-bootstrap/Card';
import { Heart, Trash } from 'react-bootstrap-icons'; 

import ProfileImage from '../assets/Profile.jpg';

import '../css/Chat.css';

function ChatMessageCard() {
  return (
    <Card className='chat-message-card d-flex flex-row align-items-center justify-content-between'>
      {/* Profile Image and Text */}
      <div className='d-flex align-items-center'>
        <Card.Img 
          variant="left" 
          src={ProfileImage} 
          className="profile-image"
        />
        <Card.Body className="ml-3">
          <Card.Title className='message-title'>Card Title</Card.Title>
          <Card.Text className='last-message-content'>
            Last Message
          </Card.Text>
        </Card.Body>
      </div>
      
      {/* Icons on the right */}
      <div className='icons-container d-flex'>
        <Heart className='icon heart-icon' />
        <Trash className='icon trash-icon' />
      </div>
    </Card>
  );
}

export default ChatMessageCard;
