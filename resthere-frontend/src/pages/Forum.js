// src/pages/Home.js
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import SearchBar from '../components/SearchBar';
import ResourceCard from '../components/ResourceCard';
import FilterPills from '../components/FilterPills';
import SortDropdown from '../components/SortDropdown';

// link css
import '../css/Journal.css';

const Forum = () => {
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
                <SearchBar />
              </Col>
            </Row>
            {/* filter sort row */}
            <Row className='filter-sort-row mt-3 mb-3'>
              <Col>
                <FilterPills />
              </Col>
              <Col className='sort-dropdown-col'>
                <SortDropdown />
              </Col>
            </Row>
            {/* card row */}
            <Row className='mt-3'>
              <Col>
                <ResourceCard />
              </Col>
              <Col>
                <ResourceCard />
              </Col>
              <Col>
                <ResourceCard />
              </Col>
              <Col>
                <ResourceCard />
              </Col>
            </Row>
        </Container>
    </div>
  );
}

export default Forum;
