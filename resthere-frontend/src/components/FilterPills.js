import React, { useState } from 'react'; // Import useState
import { Nav } from 'react-bootstrap';
import '../css/Resources.css';

const FilterPills = ({ page, onFilterChange }) => {
  const filters = {
    forum: ['All', 'Advice', 'Help', 'Chatting'],
    resources: ['All', 'Video', 'Article', 'Tutorial'],
  };

  const selectedFilters = filters[page] || filters.resources;
  const [activeFilter, setActiveFilter] = useState('All'); // Initialize active filter state

  const handleFilterClick = (filter) => {
    setActiveFilter(filter); // Update active filter state
    if (onFilterChange) {
      onFilterChange(filter);
    }
  };

  return (
    <Nav variant="pills" className="static-pills">
      {selectedFilters.map((filter, index) => (
        <Nav.Item className='filter-pill-con' key={index}>
          <Nav.Link
            className={`filter-pill ${activeFilter === filter ? 'active' : ''}`} // Apply active class
            onClick={() => handleFilterClick(filter)}
          >
            {filter}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default FilterPills;
