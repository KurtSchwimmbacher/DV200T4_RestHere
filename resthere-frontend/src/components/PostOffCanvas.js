import React, { useState, useEffect } from 'react';
import { Offcanvas, Form, Button, InputGroup, FormGroup, ButtonGroup } from 'react-bootstrap';
import { TrashFill, SendFill } from 'react-bootstrap-icons';
import axios from 'axios';

// to get user details
import { useSelector } from 'react-redux';


import '../css/Posts.css';

function PostOffCanvas({ show, handleClose, postTitle, postContent, postId, refreshPosts, postTags }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [ID, setID] = useState('');
  const [tags, setTags] = useState([]);

  const user = useSelector((state) => state.user);
  const userID = user.userID;

  useEffect(() => {
    // Pre-fill the form fields when the component mounts or updates with new post data
    setTitle(postTitle);
    setContent(postContent);
    setID(postId);
    setTags(postTags || []); 
  }, [postTitle, postContent, postTags]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log({ title, content,tags, userID });
  
    // if else to control if new post or editing post
    if(ID){
      // to edit an existing post
      try {
        const response = await axios.patch(`http://localhost:5000/api/posts/update/${ID}`,{
          title,
          content,
          tags
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
            tags
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
  };

  const handleTagClick = (tag) => {
    setTags((prevTags) => {
        if (prevTags.includes(tag)) {
            // Remove tag if already selected
            return prevTags.filter(t => t !== tag);
        } else {
            // Add tag if not selected
            return [...prevTags, tag];
        }
    });
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
              {/* <PencilFill className='pencil-icon' /> */}
              <TrashFill className='trash-icon' onClick={handleDelete} />
            </div>
          </Form.Group>

          <FormGroup className='mb-3 form-post-content' controlId='postTags'>
            <ButtonGroup className='form-tag-btn-group' aria-label="Basic example">
                {['Chatting', 'Help', 'Advice'].map((tag) => (
                    <Button 
                        key={tag} 
                        variant={tags.includes(tag) ? "warning" : "danger"} // Change color based on active state
                        active={tags.includes(tag)} // Bootstrap will apply 'active' class if true
                        onClick={() => handleTagClick(tag)}
                    >
                        {tag}
                    </Button>
                ))}
            </ButtonGroup>
        </FormGroup>


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
              <Button className='add-post-btn' type="submit" variant="warning-outline">
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
