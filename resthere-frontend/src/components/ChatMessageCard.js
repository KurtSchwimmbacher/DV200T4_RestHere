import React from 'react';
import Card from 'react-bootstrap/Card';
import { Heart, Trash } from 'react-bootstrap-icons'; 
import '../css/Chat.css';

function ChatMessageCard({ professional, onClick }) {
    return (
        <Card className='chat-message-card d-flex flex-row align-items-center justify-content-between' onClick={onClick}>
            <div className='d-flex align-items-center'>
                <Card.Body className="ml-3">
                    <Card.Title className='message-title'>{professional.name}</Card.Title>
                    <Card.Text className='last-message-content'>
                        {professional.lastMessage || "No messages yet"}
                    </Card.Text>
                </Card.Body>
            </div>
            <div className='icons-container d-flex'>
                <Heart className='icon heart-icon' />
                <Trash className='icon trash-icon' />
            </div>
        </Card>
    );
}

export default ChatMessageCard;
