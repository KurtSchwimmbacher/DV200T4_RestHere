import React, { useState, useEffect } from 'react';
import { Offcanvas, Form, Button, InputGroup } from 'react-bootstrap';
import { PencilFill, TrashFill, SendFill } from 'react-bootstrap-icons';

import '../css/Posts.css';

function PostOffCanvas({ show, handleClose, postTitle, postContent }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    // Pre-fill the form fields when the component mounts or updates with new post data
    setTitle(postTitle);
    setContent(postContent);
  }, [postTitle, postContent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your post submission logic here
    console.log({ title, content });
  };

  return (
    <Offcanvas className="chat-off-canvas" show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Edit Post</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {/* Form for editing the post */}
        <Form onSubmit={handleSubmit}>
          {/* Post Title Input with Pen and Trash Icon */}
          <Form.Group className="mb-3 form-post-title" controlId="postTitle">
            <InputGroup>
              <Form.Control 
                className='title-form-element'
                type="text" 
                placeholder="Enter Post Title" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </InputGroup>

            {/* icons */}
            <div className='icon-con'>
              <PencilFill className='pencil-icon' />
              <TrashFill className='trash-icon' />
            </div>
          </Form.Group>

          {/* Post Content Textarea with Send Icon */}
          <Form.Group className="mb-3 form-post-content" controlId="postContent">
            <InputGroup>
              <Form.Control 
                as="textarea" 
                placeholder="Enter your message" 
                rows={18}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
              <Button className='add-post-btn' type="submit" variant="warning">
                <SendFill />
              </Button>
            </InputGroup>
          </Form.Group>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default PostOffCanvas;
