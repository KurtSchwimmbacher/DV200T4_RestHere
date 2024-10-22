import { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';

function JournalOffCanvas({ show, handleClose, entry }) {
  const user = useSelector((state) => state.user);
  const userID = user.userID;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setContent(entry.content);
      setDate(new Date(entry.date).toISOString().substring(0, 10));
    }
  }, [entry]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = entry
        ? `http://localhost:5000/api/journal/update/${entry._id}`
        : 'http://localhost:5000/api/journal/create';

      const payload = {
        title,
        date,
        content,
        user: userID,
      };

      const response = await axios.post(url, payload);
      console.log(response.data);
      alert(response.data.message);

      handleClose();
    } catch (error) {
      console.error('Failed to add or update entry', error);
      alert("An error occurred while processing the entry. Please try again.");
    }
  };

  return (
    <Offcanvas className='journal-off-canvas' show={show} onHide={handleClose} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{entry ? 'Edit Journal Entry' : 'New Journal Entry'}</Offcanvas.Title>
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
            {entry ? 'Update Entry' : 'Save Entry'}
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default JournalOffCanvas;
