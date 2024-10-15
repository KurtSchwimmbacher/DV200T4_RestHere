import React, { useState, useEffect } from 'react';
import { Offcanvas, Form, Button, InputGroup } from 'react-bootstrap';
import { TrashFill, SendFill } from 'react-bootstrap-icons';
import axios from 'axios';

// to get user details
import { useSelector } from 'react-redux';


import '../css/Posts.css';

function PostOffCanvas({ show, handleClose, postTitle, postContent, postId, refreshPosts }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [ID, setID] = useState('');

  const user = useSelector((state) => state.user);
  const userID = user.userID;

  useEffect(() => {
    // Pre-fill the form fields when the component mounts or updates with new post data
    setTitle(postTitle);
    setContent(postContent);
    setID(postId);
  }, [postTitle, postContent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log({ title, content, userID });
  
    // if else to control if new post or editing post
    if(ID){
      // to edit an existing post
      try {
        const response = await axios.patch(`http://localhost:5000/api/posts/update/${ID}`,{
          title,
          content
        });

        console.log(response.data);
        alert(response.data.message);
        
        handleClose();

         // Call refreshPosts if available to reload updated list
         if (refreshPosts) {
          refreshPosts();
        }

      } catch (error) {
        console.error("Error updating post:", error);
        alert("An error occurred while updating the post. Please try again.");
      }
    }
    else{
      // to create a new post
      try {
        const response = await axios.post('http://localhost:5000/api/posts/create', {
            title: title,
            content: content,
            user: userID,
          });
          

        console.log(response.data);
        alert(response.data.message);
        
        handleClose(); 

        // Call refreshPosts if available to reload updated list
        if (refreshPosts) {
          refreshPosts();
        }
      } catch (error) {
        console.error("Error creating post:", error);
        alert("An error occurred while creating the post. Please try again.");
      }
    }


  };
  
  const handleDelete = async () =>{
    if(ID){
      try {
        const response = await axios.delete(`http://localhost:5000/api/posts/delete/${ID}`);
        alert(response.data.message);
        
        handleClose(); 

        // Call refreshPosts if available to reload updated list
        if (refreshPosts) {
          refreshPosts();
        }
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("An error occurred while deleting the post. Please try again.");
      }
    }
  }

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
              {/* <PencilFill className='pencil-icon' /> */}
              <TrashFill className='trash-icon' onClick={handleDelete} />
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
