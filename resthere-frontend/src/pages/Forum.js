// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

import SearchBar from '../components/SearchBar';
import PostCard from '../components/PostCard';
import FilterPills from '../components/FilterPills';
import SortDropdown from '../components/SortDropdown';

// link css
import '../css/Journal.css';

const Forum = () => {

  const [posts, setPosts] = useState([]); // State to hold posts

  // Function to fetch all posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts/'); // Replace with your API endpoint
      setPosts(response.data); 
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching posts:', error.response ? error.response.data : error.message);
    }
  };

    
    useEffect(() => {
      fetchPosts();
    }, []); 
  

  return (
    <div className='journal-container'>
        <Container>
            <Row>
                <Col className='home-title'>
                    <h1 className='title-1'>Share </h1>
                    <h1 className='title-2'><strong className='rest-here'>Something</strong></h1>
                </Col>
            </Row>
            {/* search bar row */}
            <Row>
              <Col>
                <SearchBar />
              </Col>
            </Row>
            {/* filter sort row */}
            <Row className='filter-sort-row mt-3 mb-3'>
              <Col>
                <FilterPills page={'forum'} />
              </Col>
              <Col className='sort-dropdown-col'>
                <SortDropdown />
              </Col>
            </Row>
            {/* card row */}
            <Row className='mt-3'>
              {posts.length > 0 ? (
                posts.map(post => (
                  <Col key={post._id}> 
                    <PostCard
                        postId={post._id}
                        title={post.title}
                        text={post.content}
                        // handleShow={handleShow}
                        postTags={post.tags}
                        // pass refresh posts function
                        // refreshPosts={refreshPosts}
                    />
                  </Col>
                ))
              ) : (
                <Col>
                  <p>No posts available.</p> {/* Fallback message if no posts are found */}
                </Col>
              )}
            </Row>
        </Container>
    </div>
  );
}

export default Forum;
