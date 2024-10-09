// src/pages/Home.js
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux'; // Assuming you're using Redux for state management

import PostCard from '../components/PostCard';
import '../css/settingsProfile.css';


const Settings = () => {
  // Retrieve user data from Redux store (assuming user info is stored in the state)
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({
      type: 'LOGOUT'
    });

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
          <Col>
            <h2 className='recent-posts-title mt-5'>Recent Posts</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <PostCard title={"Post Title"} text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."} />
          </Col>
          <Col>
            <PostCard title={"Post Title"} text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."} />
          </Col>
          <Col>
            <PostCard title={"Post Title"} text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."} />
          </Col>
          <Col>
            <PostCard title={"Post Title"} text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Settings;
