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
  const [posts, setPosts] = useState([]); 
  const [activeFilter, setActiveFilter] = useState('All'); 
  const [searchQuery, setSearchQuery] = useState('');

  const [sortOption, setSortOption] = useState('latest');

  // Function to fetch all posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts/'); 
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


  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };


  // Function to handle sorting change
  const handleSortChange = (option) => {
    setSortOption(option);
  };


  // Function to sort posts based on selected option
  const sortPosts = (posts) => {
    if (sortOption === 'latest') {
      return posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === 'oldest') {
      return posts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortOption === 'asc') {
      return posts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'desc') {
      return posts.sort((a, b) => b.title.localeCompare(a.title));
    }
    return posts;
  };

  // Filter posts based on the active filter  and search query
  const filteredPosts = sortPosts(posts.filter(post => {
    // fetch posts on active filter / return all posts if filter is All
    const matchesFilter = activeFilter === "All" || (post.tags && post.tags.includes(activeFilter));
    // fetch posts if title or content matches search query
    const matchesSearch = post.title.toLowerCase().includes(searchQuery) || post.content.toLowerCase().includes(searchQuery);

    return matchesFilter && matchesSearch;

  }));

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
            <SearchBar placeholder="Search posts" onChange={handleSearchChange} />
          </Col>
        </Row>
        {/* filter sort row */}
        <Row className='filter-sort-row mt-3 mb-3'>
          <Col>
            <FilterPills page={'forum'} onFilterChange={handleFilterChange} />
          </Col>
          <Col className='sort-dropdown-col'>
            <SortDropdown onSortChange={handleSortChange} />
          </Col>
        </Row>
        {/* card row */}
        <Row lg={4} md={6} sm={12} className='mb-3'>
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <Col  lg={4} md={6} sm={12} className='mb-3' key={post._id}>
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
              <p>No posts available.</p> 
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Forum;
