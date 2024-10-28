import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import '../css/Resources.css';

const StaticDropdown = ({ onSortChange }) => {
  return (
    <DropdownButton id="dropdown-basic-button" title="Sort By" className="static-dropdown">
      <Dropdown.Item onClick={() => onSortChange('latest')}>Latest</Dropdown.Item>
      <Dropdown.Item onClick={() => onSortChange('oldest')}>Oldest</Dropdown.Item>
      <Dropdown.Item onClick={() => onSortChange('asc')}>Alphabetical Asc</Dropdown.Item>
      <Dropdown.Item onClick={() => onSortChange('desc')}>Alphabetical Desc</Dropdown.Item>
    </DropdownButton>
  );
};

export default StaticDropdown;
