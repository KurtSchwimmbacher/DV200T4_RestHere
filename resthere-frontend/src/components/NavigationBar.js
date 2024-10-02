// src/components/Navbar.js
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';  // Use Link for internal navigation

function BasicExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">RestHere</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/resources">Resources</Nav.Link>
            <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/signup-login">Sign Up / Login</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/chat">Chat</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/journaling">Journaling</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/forum">Support Forum</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/settings-profile">Settings / Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/admin-panel">Admin Panel</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
