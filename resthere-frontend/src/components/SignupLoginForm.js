import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import '../css/SignupLoginForm.css';  // Link to your custom CSS

const SignupLoginForm = () => {
  // State to toggle between login and signup
  const [isLogin, setIsLogin] = useState(true);

  // Form state for user inputs
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',  // Only needed for signup
    confirmPassword: '',  // Only needed for signup
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (login or signup)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Logic for login
      console.log("Logging in with:", formData);
    } else {
      // Logic for signup (check if passwords match, etc.)
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      console.log("Signing up with:", formData);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <div className="form-container mt-5">
            <h2 className='login-signup-title'>{isLogin ? 'Login' : 'Sign Up'}</h2>
            <Form onSubmit={handleSubmit}>

            {/* Username field for signup only */}
              {!isLogin && (
                <Form.Group className='mt-3 mb-3' controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="username"
                    placeholder="Enter username" 
                    value={formData.username}
                    onChange={handleInputChange} 
                    required 
                  />
                </Form.Group>
              )}

              {/* Common email field for both login and signup */}
              <Form.Group className='mt-3 mb-3' controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                  type="email" 
                  name="email"
                  placeholder="Enter email" 
                  value={formData.email}
                  onChange={handleInputChange} 
                  required 
                />
              </Form.Group>



              {/* Password field */}
              <Form.Group className='mt-3 mb-3' controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  name="password"
                  placeholder="Password" 
                  value={formData.password}
                  onChange={handleInputChange} 
                  required 
                />
              </Form.Group>

              {/* Confirm Password field for signup only */}
              {!isLogin && (
                <Form.Group className='mt-3 mb-3' controlId="formBasicConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    name="confirmPassword"
                    placeholder="Confirm Password" 
                    value={formData.confirmPassword}
                    onChange={handleInputChange} 
                    required 
                  />
                </Form.Group>
              )}

              <Button variant="success" type="submit">
                {isLogin ? 'Login' : 'Sign Up'}
              </Button>

              {/* Toggle between login and signup */}
              <p className="toggle-form">
                {isLogin ? 'Don’t have an account?' : 'Already have an account?'}{' '}
                <span onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? 'Sign Up' : 'Login'}
                </span>
              </p>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupLoginForm;
