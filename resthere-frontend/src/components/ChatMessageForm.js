import React from "react";
import { Form, Container, Row, Col, InputGroup, Button } from "react-bootstrap";
import { TrashFill, SendFill } from 'react-bootstrap-icons'; 

const ChatMessageForm = ({ professional }) => { 
    if (!professional) return null;

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
                    <Form>
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
