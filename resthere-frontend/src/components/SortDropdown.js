// src/components/StaticDropdown.js
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import '../css/Resources.css';

const StaticDropdown = () => {
  return (
    <DropdownButton id="dropdown-basic-button" title="Sort By" className="static-dropdown">
      <Dropdown.Item href="#">Date Added</Dropdown.Item>
      <Dropdown.Item href="#">Popularity</Dropdown.Item>
      <Dropdown.Item href="#">Alphabetical</Dropdown.Item>
    </DropdownButton>
  );
};

export default StaticDropdown;
