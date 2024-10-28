import React, { useState, useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';
import axios from 'axios';
import ChatMessageCard from './ChatMessageCard';
import ChatMessageForm from './ChatMessageForm';
import { useSelector } from "react-redux";

const ChatMessageOffCanvas = ({ show, handleClose }) => {
    const [professionals, setProfessionals] = useState([]);
    const [selectedProfessional, setSelectedProfessional] = useState(null);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        const fetchProfessionals = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/chat/professionals/${user.userID}`);
                console.log(response);
                setProfessionals(response.data);
            } catch (error) {
                console.error("Error fetching professionals:", error);
            }
        };
        fetchProfessionals();
    }, [user.userID]);

    const handleCardClick = (professional) => {
        setSelectedProfessional(professional);
    };

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end" className="chat-off-canvas">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Chats</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {selectedProfessional ? (
                    <ChatMessageForm professional={selectedProfessional} />
                ) : (
                    professionals.map((professional) => (
                        <ChatMessageCard 
                            key={professional._id} 
                            professional={professional} 
                            onClick={() => handleCardClick(professional)}
                        />
                    ))
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default ChatMessageOffCanvas;
