// src/pages/Forum.js
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

import SearchBar from '../components/SearchBar';
import PostCard from '../components/PostCard';
import FilterPills from '../components/FilterPills';
import SortDropdown from '../components/SortDropdown';

// Link css
import '../css/Journal.css';

const Forum = () => {
  const [posts, setPosts] = useState([]); // State to hold posts
  const [activeFilter, setActiveFilter] = useState('All'); // State for active filter

  // Function to fetch all posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts/'); // Replace with your API endpoint
      setPosts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to handle filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  // Filter posts based on the active filter
  const filteredPosts = posts.filter(post => {
    if (activeFilter === 'All') return true; // Show all posts
    return post.tags && post.tags.includes(activeFilter); // Filter based on tags
  });

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
            <FilterPills page={'forum'} onFilterChange={handleFilterChange} />
          </Col>
          <Col className='sort-dropdown-col'>
            <SortDropdown />
          </Col>
        </Row>
        {/* card row */}
        <Row lg={4} md={6} sm={12}  className='mt-3'>
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <Col className='mb-3' key={post._id}>
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
};

export default Forum;
