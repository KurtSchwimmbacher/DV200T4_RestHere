// src/components/UnifiedOffCanvas.js
import React, { useState, useEffect } from 'react';
import { Offcanvas, Form, Button, InputGroup, ButtonGroup } from 'react-bootstrap';
import { TrashFill, SendFill } from 'react-bootstrap-icons';
import axios from 'axios';
import { useSelector } from 'react-redux';

import AlertModal from './AlertModal';

import '../css/Posts.css';

function UnifiedOffCanvas({ show, handleClose, type, entryData, refreshEntries, postData, refreshPosts }) {
    const user = useSelector((state) => state.user);
    const userID = user.userID;

    // for alert modal
    const [alertModalMessage, setAlertModalMessage] = useState("");
    const [showAlertModal, setShowAlertModal] = useState(false);
    const handleCloseAlertModal = () => {
        setShowAlertModal(false);
        handleClose();
    };

    // for forms
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
    const [tags, setTags] = useState([]);
    const [ID, setID] = useState('');

    useEffect(() => {
        if (entryData) {
            setTitle(entryData.title || '');
            setContent(entryData.content || '');
            setDate(entryData.date ? new Date(entryData.date).toISOString().substring(0, 10) : new Date().toISOString().substring(0, 10));
            setID(entryData._id || '');
        }
        else if(postData){
            setTitle(postData.title || '');
            setContent(postData.content || '');
            setTags(postData.tags || []);
            setID(postData.ID || '');
        }
    }, [entryData,postData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Determine if we are dealing with a posting or editing a journal entry
        const isPost = type === 'post';
        const isEdit = Boolean(ID);
    
        const payload = {
            title,
            content,
            ...(!isEdit &&  {user: userID}),
            // only include tags for posts
            ...(isPost && { tags }), 
            // only include dates for journal entries
            ...(!isPost && { date }) 
        };
    
        // change backend route to reflect appropriate route
        const url = isEdit
            ? `${process.env.REACT_APP_API_URL}/api/${isPost ? 'posts' : 'journal'}/update/${ID}`
            : `${process.env.REACT_APP_API_URL}/api/${isPost ? 'posts' : 'journal'}/create`;
    
        const method = isEdit ? 'patch' : 'post';
    
        try {
            const response = await axios[method](url, payload);
            
            setAlertModalMessage(response.data.message);
            setShowAlertModal(true);
    
            // handleClose();
    
            // Refresh the list if the callback is provided
            if (refreshEntries) {
                refreshEntries();
            }
        } catch (error) {
            console.error(`Error ${isEdit ? 'updating' : 'creating'} ${type}:`, error);
            setAlertModalMessage(`An error occurred while ${isEdit ? 'updating' : 'creating'} the ${type}. Please try again.`);
            setShowAlertModal(true);
        }
    };
    
    

    const handleDelete = async () => {
        if (ID) {
            try {
                const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/${type === 'journal' ? 'journal' : 'posts'}/delete/${ID}`);
                setAlertModalMessage(response.data.message);
                setShowAlertModal(true);
                // handleClose();
                if (refreshEntries) refreshEntries();
            } catch (error) {
                console.error(`Error deleting ${type}:`, error);
                setAlertModalMessage(`An error occurred while deleting the ${type}. Please try again.`);
                setShowAlertModal(true);
            }
        }
    };

    const handleTagClick = (tag) => {
        setTags((prevTags) =>
            prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
        );
    };

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end" className="chat-off-canvas">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{ID ? `Edit ${type}` : `New ${type}`}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form onSubmit={handleSubmit}>
                    {/* Form Title Input with Trash Icon */}
                    <Form.Group controlId="formTitle" className="mb-3 form-post-title">
                        
                        <InputGroup>
                            <Form.Control
                                className='title-form-element'
                                type="text"
                                placeholder="Enter title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </InputGroup>

                        {/* icons */}
                        <div className='icon-con'>
                            {/* <PencilFill className='pencil-icon' /> */}
                            <TrashFill className='trash-icon' onClick={handleDelete} />
                        </div>
            
                    </Form.Group>
                    {type === 'post' && (
                        <Form.Group controlId='formTags' className='mb-3 form-post-content'>
                            <ButtonGroup className='form-tag-btn-group'>
                                {['Chatting', 'Help', 'Advice'].map((tag) => (
                                    <Button
                                        key={tag}
                                        variant={tags.includes(tag) ? "warning" : "danger"}
                                        active={tags.includes(tag)}
                                        onClick={() => handleTagClick(tag)}
                                    >
                                        {tag}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </Form.Group>
                    )}

                    {type === 'journal' && (
                        <Form.Group controlId="formDate" className="mt-3 mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </Form.Group>
                    )}


                    <Form.Group className="mb-3 form-post-content" controlId="formContent" >
                        <InputGroup>
                            <Form.Control
                                as="textarea"
                                rows={18}
                                placeholder="Enter content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />

                            <Button className='add-post-btn' type="submit" variant="warning-outline">
                                <SendFill />
                            </Button>

                        </InputGroup>
                        
                    </Form.Group>
                    
                </Form>
            </Offcanvas.Body>

            {/* alert modal */}
            <AlertModal 
                show={showAlertModal}
                handleClose={handleCloseAlertModal}
                modalMessage={alertModalMessage}
            />


        </Offcanvas>
    );
}

export default UnifiedOffCanvas;
