import React, { useState } from "react";
import { Form, Container, Row, Col, InputGroup, Button } from "react-bootstrap";
import { TrashFill, SendFill } from 'react-bootstrap-icons'; 
import axios from 'axios'; 
import { useSelector } from "react-redux";

const ChatMessageForm = ({ professional }) => { 
    const [message, setMessage] = useState(''); 
    const user = useSelector((state) => state.user);

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
            alert(response.data.message);

            // Clear the message input after successful submission
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
            alert("Error sending chat: ", error)
        }
    };

    return (
        <Container>
            {/* Previous messages row  */}
            <Row>
                <Col>
                    {/* map through previous messages */}
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
        </Container>
    );
};

export default ChatMessageForm;
