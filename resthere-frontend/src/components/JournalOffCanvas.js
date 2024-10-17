// src/components/JournalOffCanvas.js
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

import { useSelector } from 'react-redux';

function JournalOffCanvas({ show, handleClose }) {
    // get user info
    const user = useSelector((state) => state.user);
    const userID = user.userID;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState(new Date().toISOString().substring(0, 10));

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({ title, content,date, userID });
        // to create a new journal entry
        try {
            const response = await axios.post('http://localhost:5000/api/journal/create', {
                title: title,
                date: date,
                content: content,
                user: userID,
        });

        console.log(response.data);
        alert(response.data.message);
      
        // Close the OffCanvas after submitting
        handleClose(); 
      
        } catch (error) {
            console.error('Failed to add entry', error);
            alert("An error occurred while creating the entry. Please try again.");
        }
    };

    return (
        <Offcanvas className='journal-off-canvas' show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>New Journal Entry</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formTitle'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                type='text'
                placeholder='Enter title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId='formContent' className='mt-3'>
                <Form.Label>Content</Form.Label>
                <Form.Control
                as='textarea'
                rows={3}
                placeholder='Write your journal entry...'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId='formDate' className='mt-3'>
                <Form.Label>Date</Form.Label>
                <Form.Control
                type='date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                />
            </Form.Group>
            <Button variant='primary' type='submit' className='mt-4'>
                Save Entry
            </Button>
            </Form>
        </Offcanvas.Body>
        </Offcanvas>
    );
}

export default JournalOffCanvas;
