import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';

import PostContainer from '../components/PostContainer';
import PostOffCanvas from '../components/PostOffCanvas'; // Import OffCanvas here
import '../css/settingsProfile.css';

const Settings = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // State for OffCanvas visibility and selected post data
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [selectedPost, setSelectedPost] = useState({ title: '', content: '' , ID:'', tags:[]});


    // State to track refreshPosts function
    const [refreshPostsFunc, setRefreshPostsFunc] = useState(null);


  const handleShow = (postTitle = '', postContent = '', postId = '',postTags=[], refreshPosts) => {
    setSelectedPost({ title: postTitle, content: postContent, ID: postId, tags:postTags});
    setShowOffCanvas(true);


    // Store the refreshPosts function from PostContainer
    if (refreshPosts) {
      setRefreshPostsFunc(() => refreshPosts); // Set the function reference correctly
    }

  };

  

  const handleClose = () => setShowOffCanvas(false);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    window.location.href = '/';
  };

  return (
    <div className='journal-container'>
      <Container>
        <Row>
          <Col className='home-title'>
            <h1 className='title-1'>Your</h1>
            <h1 className='title-2'>
              <strong className='rest-here'>Profile</strong>
            </h1>
          </Col>
        </Row>
        
        {/* User Profile Section */}
        <Row className='mb-4 mt-5'>
          <Col className='text-center'>
            <img 
              src={user.profilePicture} 
              alt={`${user.username}'s Profile`} 
              className='profile-picture'
            />
            <h2>{user.username}</h2>
            <p>{user.postsCount} {user.postsCount === 1 ? 'Post' : 'Posts'}</p>
          </Col>
        </Row>

        {/* Logout button */}
        <Row>
          <Col>
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
          </Col>
        </Row>

        {/* Recent Posts Section */}
        <Row>
          <Col className='title-button-col'>
            <h2 className='recent-posts-title mt-5'>Recent Posts</h2>
            <Button className='new-post-button' onClick={() => handleShow()}>Post</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            {/* Pass handleShow to PostContainer */}
            <PostContainer handleShow={handleShow} /> 
          </Col>
        </Row>
      </Container>

      {/* OffCanvas for New Post */}
      <PostOffCanvas 
        show={showOffCanvas} 
        handleClose={handleClose} 
        postTitle={selectedPost.title} 
        postContent={selectedPost.content} 
        postId={selectedPost.ID}
        postTags={selectedPost.tags}
        // pass the stored function
        refreshPosts={refreshPostsFunc} 
      />
    </div>
  );
};

export default Settings;
