import React, { useState, useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';
import axios from 'axios';
import ChatMessageCard from './ChatMessageCard';
import ChatMessageForm from './ChatMessageForm';
import { useSelector } from "react-redux";

const ChatMessageOffCanvas = ({ show, handleClose }) => {
    const [chatRooms, setChatRooms] = useState([]);
    const [selectedChatRoom, setSelectedChatRoom] = useState(null);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        const fetchChatRooms = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/chat/chatrooms/${user.userID}`);
                console.log(response.data);
                setChatRooms(response.data);
            } catch (error) {
                console.error("Error fetching chatrooms:", error);
            }
        };
        fetchChatRooms();
    }, [user.userID]);

    const handleChatRoomClick = (chatRoom) => {
        setSelectedChatRoom(chatRoom);
    };

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end" className="chat-off-canvas">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Chats</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {selectedChatRoom ? (
                    <ChatMessageForm professional={selectedChatRoom.recipient === user.userID ? selectedChatRoom.sender : selectedChatRoom.recipient} />
                ) : (
                    chatRooms.map((chatRoom, index) => (
                        <ChatMessageCard 
                            key={index} 
                            professional={chatRoom.recipient === user.userID ? chatRoom.sender : chatRoom.recipient}
                            latestMessage={chatRoom.latestMessage}
                            onClick={() => handleChatRoomClick(chatRoom)}
                        />
                    ))
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default ChatMessageOffCanvas;
