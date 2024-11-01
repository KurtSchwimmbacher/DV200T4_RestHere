import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import AdminModal from '../components/AdminModal';
import PostContainer from '../components/PostContainer';
import UnifiedOffCanvas from '../components/UnifiedOffCanvas';
import ResourceCard from '../components/ResourceCard';
import '../css/settingsProfile.css';

import ProfileImageUploadModal from '../components/ProfileImageUploadModal';

const Settings = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  console.log(user)

  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [selectedPost, setSelectedPost] = useState({ title: '', content: '', ID: '', tags: [] });
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null); 

  

  const [refreshPostsFunc, setRefreshPostsFunc] = useState(null);

  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleUploadModalOpen = () => setShowUploadModal(true);
  const handleUploadModalClose = () => setShowUploadModal(false);

  useEffect(() => {
    if (user.isAdmin === 'admin') {
      const fetchResources = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/resource/');
          setResources(response.data);
        } catch (error) {
          console.error('Error fetching resources:', error);
        }
      };

      fetchResources();
    }
  }, [user.isAdmin]);

  const handleShow = (postTitle = '', postContent = '', postId = '', postTags = [], refreshPosts) => {
    setSelectedPost({ title: postTitle, content: postContent, ID: postId, tags: postTags });
    setShowOffCanvas(true);
    if (refreshPosts) {
      setRefreshPostsFunc(() => refreshPosts);
    }
  };

  const handleClose = () => setShowOffCanvas(false);
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    window.location.href = '/';
  };

  const handleAdminModalOpen = () => setShowAdminModal(true);
  const handleAdminModalClose = () => setShowAdminModal(false);

  const handleEditResource = (resource) => {
    setSelectedResource(resource); // Set the selected resource data
    console.log(resource)
    setShowAdminModal(true); // Open Admin Modal
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
          {/* image to display users profile picture */}
            <img
              src={`http://localhost:5000${user.profilePicture}`}
              alt={`${user.username}'s Profile`}
              className='profile-picture'
              onClick={handleUploadModalOpen}
            />
            <h2>{user.username}</h2>
            <p>{user.postsCount} {user.postsCount === 1 ? 'Post' : 'Posts'}</p>
          </Col>
        </Row>

        {/* Logout button */}
        <Row>
          <Col>
            <Button variant='danger' onClick={handleLogout}>Logout</Button>
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
            <PostContainer handleShow={handleShow} />
          </Col>
        </Row>

        {/* Resource Card Row - Admin Only */}
        {user.isAdmin === 'admin' && resources.length > 0 && (
          <>
            <Row className='admin-only-section'>
              <Col className='title-button-col'>
                <h2 className='recent-posts-title mt-5'>Resources</h2>
                <Button variant='danger' className='new-post-button' onClick={handleAdminModalOpen}>
                  Post Resource
                </Button>
              </Col>
            </Row>
            <Row>
              {resources.map((resource) => (
                <Col lg={4} md={6} sm={12} key={resource._id}>
                  <ResourceCard
                    title={resource.title}
                    text={resource.content}
                    tags={resource.tags}
                    onEditClick={() => handleEditResource(resource)} 
                    isProfilePage={true}
                  />
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>

      {/* OffCanvas for New Post */}
      <UnifiedOffCanvas
        type={'post'}
        show={showOffCanvas}
        handleClose={handleClose}
        postData={selectedPost}
        refreshPosts={refreshPostsFunc}
      />

      {/* Admin Modal with Resource Data */}
      <AdminModal
        show={showAdminModal}
        handleClose={handleAdminModalClose}
        resourceData={selectedResource} // Pass the selected resource data
      />


      {/* Profile Image Upload Modal */}
      <ProfileImageUploadModal
        show={showUploadModal}
        handleClose={handleUploadModalClose}
        user={user} // Pass user data to the modal
      />

    </div>
  );
};

export default Settings;
