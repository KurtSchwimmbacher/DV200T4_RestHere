import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';  
import { useSelector } from 'react-redux';

// Import the logo
import logo from '../assets/Logo.svg';

// link css
import '../css/NavigationBar.css';

function NavigationBar() {
  const [activeTab, setActiveTab] = useState('login'); // State to manage active tab
  const user = useSelector((state) => state.user);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {/* Add the image logo */}
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
            <Nav.Link as={Link} to="/journaling">Journal</Nav.Link>
            <Nav.Link as={Link} to="/resources">Resources</Nav.Link>
            <Nav.Link as={Link} to="/forum">Forum</Nav.Link>
            <Nav.Link as={Link} to="/chat">Chat</Nav.Link>
          </Nav>

          {/* Button group for Login/Sign Up or Account */}
          <ButtonGroup className='login-signup-btn'>
            {user ? (
              <Button 
                as={Link} 
                to="/account" 
                variant="primary"
              >
                Account
              </Button>
            ) : (
              <>
                <Button 
                  as={Link} 
                  to="/signup-login" 
                  variant={activeTab === 'login' ? 'primary' : 'outline-primary'} 
                  onClick={() => setActiveTab('login')}
                >
                  Login
                </Button>
                <Button 
                  as={Link} 
                  to="/signup-login" 
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
