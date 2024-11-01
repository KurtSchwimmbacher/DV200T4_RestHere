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
  const [activeFilter, setActiveFilter] = useState('All'); 
  const [searchQuery, setSearchQuery] = useState('');

  const [sortOption, setSortOption] = useState('latest');


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

   // Function to handle search input change
   const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };


    // Function to handle sorting change
    const handleSortChange = (option) => {
      setSortOption(option);
    };

      // Function to sort resources based on selected option
  const sortResources = (resources) => {
    if (sortOption === 'latest') {
      return resources.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === 'oldest') {
      return resources.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortOption === 'asc') {
      return resources.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'desc') {
      return resources.sort((a, b) => b.title.localeCompare(a.title));
    }
    return resources;
  };

  // Filter resources based on the active filter
  const filteredResources = sortResources(resources.filter(resource => {
      // fetch resources on active filter / return all resources if filter is All
      const matchesFilter = activeFilter === "All" || (resource.tags && resource.tags.includes(activeFilter));
      // fetch resouce if title or content matches search query
      const matchesSearch = resource.title.toLowerCase().includes(searchQuery) || resource.content.toLowerCase().includes(searchQuery);
  
      return matchesFilter && matchesSearch;
  
  }));

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
            <SearchBar placeholder="Search for resources" onChange={handleSearchChange} />
          </Col>
        </Row>

        {/* Filter sort row */}
        <Row className='filter-sort-row mt-3 mb-3'>
          <Col>
            <FilterPills page={'resources'} onFilterChange={handleFilterChange} /> {/* Pass handleFilterChange */}
          </Col>
          <Col className='sort-dropdown-col'>
            <SortDropdown onSortChange={handleSortChange} />
          </Col>
        </Row>

        {/* Card row */}
        <Row className='mt-3'>
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <Col lg={4} md={6} sm={12} className='mb-3' key={resource._id}> 
                <ResourceCard resourceID={resource._id} title={resource.title} text={resource.content} tags={resource.tags} isProfilePage={false} resourceURL={resource.resourceURL}/>
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
