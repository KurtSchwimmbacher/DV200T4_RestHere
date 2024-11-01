import React, { useState, useEffect,  useCallback } from "react";
import { Form, Container, Row, Col, InputGroup, Button } from "react-bootstrap";
import { TrashFill, SendFill } from 'react-bootstrap-icons'; 
import axios from 'axios'; 
import { useSelector } from "react-redux";

import AlertModal from "./AlertModal";

import '../css/Chat.css';

const ChatMessageForm = ({ professional }) => { 
    const [message, setMessage] = useState(''); 
    const [messages, setMessages] = useState([]);
    const user = useSelector((state) => state.user);

    const [alertModalMessage, setAlertModalMessage] = useState("");
    const [showAlertModal, setShowAlertModal] = useState(false);
    const handleCloseAlertModal = () =>{
        setShowAlertModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        if (!message.trim()) {
            
            return;
        }

        try {
            
            const response = await axios.post('http://localhost:5000/api/chat/send', {
                sender: user.userID, 
                recipient: professional._id, 
                message: message,
            });

            console.log(response.data.message);
            setAlertModalMessage(response.data.message);
            setShowAlertModal(true);

            // Clear the message input after successful submission
            setMessage('');
            fetchMessages();
        } catch (error) {
            console.error('Error sending message:', error);
            setAlertModalMessage("Error sending chat: ", error)
            setShowAlertModal(true);
        }
    };

    const fetchMessages = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/chat/${user.userID}/${professional._id}`);
            setMessages(response.data); 
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    }, [user.userID, professional._id]);

    useEffect(() => {
        fetchMessages(); 
    }, [fetchMessages]);

    return (
        <Container>
            {/* Previous messages row  */}
            <Row>
                <Col className="mb-5">
                    {messages.length > 0 ? (
                        messages.map((msg, index) => (
                            <div 
                                key={index} 
                                className={`message-bubble ${msg.sender === user.userID ? 'user-message' : 'professional-message'}`}
                            >
                                <strong>{msg.sender === user.userID ? "You" : professional.name}:</strong> {msg.message}
                            </div>
                        ))
                    ) : (
                        <p>No messages yet.</p>
                    )}
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTitle" className="mb-3 form-post-title">
                            <div className='icon-con'>
                                <TrashFill className='trash-icon' />
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3 form-post-content" controlId="formContent">
                            <InputGroup>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    placeholder="Send A message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)} // Update the message state
                                    required
                                />
                                <Button className='add-post-btn' type="submit" variant="warning-outline">
                                    <SendFill />
                                </Button>
                            </InputGroup> 
                        </Form.Group>
                    </Form>
                </Col>
            </Row>

            <AlertModal
                show={showAlertModal}
                modalMessage={alertModalMessage}
                handleClose={handleCloseAlertModal}
            />

        </Container>
    );
};

export default ChatMessageForm;
