// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import axios from 'axios';


// link css
import '../css/Journal.css';
import SearchBar from '../components/SearchBar';
import ResourceCard from '../components/ResourceCard';
import FilterPills from '../components/FilterPills';
import SortDropdown from '../components/SortDropdown';

const Resources= () => {

  const [resources, setResources] = useState([]);

    // Fetch resources from the backend
    useEffect(() => {
      const fetchResources = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/resource/'); 
          setResources(response.data); 
        } catch (error) {
          console.error("Error fetching resources:", error);
          // alert("Error fetching resources:", error);
        }
      };
  
      fetchResources();
    }, []); 
  

  return (
    <div className='journal-container'>
        <Container>
            <Row>
                <Col className='home-title'>
                    <h1 className='title-1'>Do some</h1>
                    <h1 className='title-2'><strong className='rest-here'>Reading</strong></h1>
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
                <FilterPills page={'resources'} />
              </Col>
              <Col className='sort-dropdown-col'>
                <SortDropdown />
              </Col>
            </Row>

            {/* card row */}
            <Row className='mt-3'>
              {resources.map((resource) => (
                <Col key={resource._id}>
                  <ResourceCard title={resource.title} text={resource.content} />
                </Col>
              ))}
            </Row>

        </Container>
    </div>
  );
}

export default Resources;
