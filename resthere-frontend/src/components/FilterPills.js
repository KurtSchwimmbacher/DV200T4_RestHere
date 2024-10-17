// src/components/StaticPills.js
import React from 'react';
import { Nav } from 'react-bootstrap';

// Link CSS if necessary
import '../css/Resources.css';

const FilterPills = ({ page }) => {
  // Define filters based on the page
  const filters = {
    forum: ['All', 'Questions', 'Discussions', 'Tips'],
    resources: ['All', 'Video', 'Article', 'Tutorials'],
  };

  // Select filters based on the page prop
  const selectedFilters = filters[page] || filters.resources; 

  return (
    <Nav variant="pills" className="static-pills">
      {selectedFilters.map((filter, index) => (
        <Nav.Item className='filter-pill-con' key={index}>
          <Nav.Link className='filter-pill' active={filter === 'All'}>{filter}</Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default FilterPills;
