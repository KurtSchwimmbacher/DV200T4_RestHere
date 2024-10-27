import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { Link, useLocation } from 'react-router-dom';  
import { useSelector } from 'react-redux';

// Import the logo
import logo from '../assets/Logo.svg';

// link css
import '../css/NavigationBar.css';

function NavigationBar() {
  // hook to get current location
  const location = useLocation();

  const [activeTab, setActiveTab] = useState('login'); // State to manage active tab
  const user = useSelector((state) => state.user);


  // Determine the active page based on the current URL
  const isActive = (path) => location.pathname === path;

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          
          <img 
            src={logo} 
            alt="RestHere Logo" 
            style={{ height: '32px', marginRight: '10px' }} 
          />
          Rest <strong className='rest-here-nav'>Here</strong>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='navbar-links me-auto'>
            <Nav.Link as={Link} to="/journaling" className={isActive('/journaling') ? 'active' : ''}>Journal</Nav.Link>
            <Nav.Link as={Link} to="/resources" className={isActive('/resources') ? 'active' : ''}>Resources</Nav.Link>
            <Nav.Link as={Link} to="/forum" className={isActive('/forum') ? 'active' : ''}>Forum</Nav.Link>
            <Nav.Link as={Link} to="/chat" className={isActive('/chat') ? 'active' : ''}>Chat</Nav.Link>
          </Nav>

          {/* Button group for Login/Sign Up or Account */}
          <ButtonGroup className='login-signup-btn'>
            {user.username ? (
              <Button  
                as={Link} 
                to="/settings-profile" 
                variant="secondary"
              >
                Account
              </Button>
            ) : (
              <>
                <Button 
                  as={Link} 
                  to="/signup-login?mode=login"  
                  variant={activeTab === 'login' ? 'primary' : 'outline-primary'} 
                  onClick={() => setActiveTab('login')}
                >
                  Login
                </Button>
                <Button 
                  as={Link} 
                  to="/signup-login?mode=signup" 
                  variant={activeTab === 'signup' ? 'primary' : 'outline-primary'} 
                  onClick={() => setActiveTab('signup')}
                >
                  Sign Up
                </Button>
              </>
            )}
          </ButtonGroup>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
