  // src/pages/SearchBar.js
  import React from 'react';
  import Form from 'react-bootstrap/Form';
  import InputGroup from 'react-bootstrap/InputGroup'; 
  import { Search } from 'react-bootstrap-icons'; 

  // link css
  import '../css/Resources.css'

  const SearchBar = ({ placeholder, onChange }) => {
    return (
      <InputGroup className="mt-4 mb-3 search-bar-con">
        <InputGroup.Text className='search-icon' id="basic-addon1">
          <Search /> 
        </InputGroup.Text>
        <Form.Control
          placeholder={placeholder}
          aria-label="Search"
          aria-describedby="basic-addon1"
          onChange={onChange}
        />
      </InputGroup>
    );
  }

  export default SearchBar;
