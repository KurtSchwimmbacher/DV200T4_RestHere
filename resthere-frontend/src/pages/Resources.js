// src/pages/Resources.js
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

// Link css
import '../css/Journal.css';
import SearchBar from '../components/SearchBar';
import ResourceCard from '../components/ResourceCard';
import FilterPills from '../components/FilterPills';
import SortDropdown from '../components/SortDropdown';

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All'); // Initialize active filter state

  // Fetch resources from the backend
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/resource/');
        setResources(response.data);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };

    fetchResources();
  }, []);

  // Function to handle filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  // Filter resources based on the active filter
  const filteredResources = resources.filter(resource => {
    if (activeFilter === 'All') return true; // Show all resources
    return resource.tags && resource.tags.includes(activeFilter); // Filter based on tags
  });

  return (
    <div className='journal-container'>
      <Container>
        <Row>
          <Col className='home-title'>
            <h1 className='title-1'>Do some</h1>
            <h1 className='title-2'><strong className='rest-here'>Reading</strong></h1>
          </Col>
        </Row>
        {/* Search bar row */}
        <Row>
          <Col>
            <SearchBar />
          </Col>
        </Row>

        {/* Filter sort row */}
        <Row className='filter-sort-row mt-3 mb-3'>
          <Col>
            <FilterPills page={'resources'} onFilterChange={handleFilterChange} /> {/* Pass handleFilterChange */}
          </Col>
          <Col className='sort-dropdown-col'>
            <SortDropdown />
          </Col>
        </Row>

        {/* Card row */}
        <Row className='mt-3'>
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <Col lg={4} md={6} sm={12} className='mb-3' key={resource._id}> 
                <ResourceCard title={resource.title} text={resource.content} tags={resource.tags} />
              </Col>
            ))
          ) : (
            <Col>
              <p>No resources available.</p> {/* Fallback message if no resources are found */}
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Resources;
