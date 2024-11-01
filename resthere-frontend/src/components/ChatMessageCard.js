import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Heart, Trash } from 'react-bootstrap-icons';
import '../css/Chat.css';
import axios from 'axios';

function ChatMessageCard({ professional, onClick, latestMessage }) {
    const [professionalDetails, setProfessionalDetails] = useState(null);

    useEffect(() => {
        const fetchRecipientName = async () => {
            try {
                const response = await axios.get(`/api/professional/singleProf/${professional}`);
                setProfessionalDetails(response.data);
            } catch (error) {
                console.log('Error fetching professional:', error);
            }
        };

        fetchRecipientName();
    }, [professional]);

    return (
        <Card className='chat-message-card d-flex flex-row align-items-center justify-content-between' onClick={onClick}>
            <div className='d-flex align-items-center'>
                <Card.Body className="ml-3">
                    <Card.Title className='message-title'>
                        {professionalDetails ? professionalDetails.name : "Loading..."}
                    </Card.Title>
                    <Card.Text className='last-message-content'>
                        {latestMessage || "No messages yet"}
                    </Card.Text>
                </Card.Body>
            </div>
            <div className='icons-container d-flex'>
                {/* <Heart className='icon heart-icon' />
                <Trash className='icon trash-icon' /> */}
            </div>
        </Card>
    );
}

export default ChatMessageCard;
