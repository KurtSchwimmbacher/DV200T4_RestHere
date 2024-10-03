// src/components/StaticPills.js
import React from 'react';
import { Nav } from 'react-bootstrap';

import SortDropdown from '../components/SortDropdown';

// Link CSS if necessary
import '../css/Resources.css';

const FilterPills = () => {
  return (
    <Nav variant="pills" className="static-pills">
      <Nav.Item className='filter-pill-con'>
        <Nav.Link className='filter-pill' active>All</Nav.Link>
      </Nav.Item>
      <Nav.Item className='filter-pill-con'>
        <Nav.Link className='filter-pill'>Video</Nav.Link>
      </Nav.Item>
      <Nav.Item className='filter-pill-con'>
        <Nav.Link className='filter-pill'>Article</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default FilterPills;
