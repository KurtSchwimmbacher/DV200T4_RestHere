import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import AlertModal from './AlertModal';

import '../css/SignupLoginForm.css';

const SignupLoginForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // Determine initial mode based on query
  const initialMode = queryParams.get('mode') === 'signup' ? false : true;
  
  // state to show password
  const [showPassword, setShowPassword] = useState(false);

  // for alert modal
  const [modalMessage, setModalMessage] = useState("");
  const [showAlertModal, setShowAlertModal] = useState(false);
  const handleCloseAlertModal = () => setShowAlertModal(false);

  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    // Update form mode based on URL parameter when the component mounts
    setIsLogin(initialMode);
  }, [initialMode]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const response = await axios.post('/api/users/login', {
          email: formData.email,
          password: formData.password,
        });

        console.log(response.data);
        setModalMessage("Logged in Successfully");
        setShowAlertModal(true)
        
        dispatch({
          type: 'LOGIN',
          payload: {
            userID: response.data.user.userID,
            email: response.data.user.email,
            username: response.data.user.username,
            isAdmin: response.data.user.role,
            profilePicture: response.data.user.profilePicture,
          },
        });

        // window.location.href = '/';
        localStorage.setItem('token', response.data.token);
      } else {
        if (formData.password !== formData.confirmPassword) {
          setModalMessage("Passwords do not mach");
          setShowAlertModal(true);
          return;
        }

        const response = await axios.post('/api/users/signup', {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });

        setModalMessage("Account Created Successfully");
        setShowAlertModal(true);

        setFormData({
          email: '',
          password: '',
          username: '',
          confirmPassword: '',
        });
      }
    } catch (error) {
      console.error("Error:", error);
      
      setModalMessage(error.response?.data.msg || "An error occurred. Please try again.");
      setShowAlertModal(true);
      
      setFormData({
        email: '',
        password: '',
        username: '',
        confirmPassword: '',
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () =>{
    setShowPassword(!showPassword);
  }

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <div className="form-container mt-5">
            <h1 className='login-signup-title'>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <Form onSubmit={handleSubmit}>
              {!isLogin && (
                <Form.Group className='mt-3 mb-3 form-field' controlId="formBasicUsername">
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
              <Form.Group className='mt-3 mb-3 form-field' controlId="formBasicEmail">
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

              {/* add show password */}
              <Form.Group className='mt-3 mb-3 form-field' controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password" 
                  value={formData.password}
                  onChange={handleInputChange} 
                  required 
                />
              </Form.Group>
              {!isLogin && (
                <Form.Group className='mt-3 mb-3 form-field' controlId="formBasicConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control 
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password" 
                    value={formData.confirmPassword}
                    onChange={handleInputChange} 
                    required 
                  />
                </Form.Group>
              )}
                <Form.Check 
                  type="checkbox"
                  label="Show Password"
                  checked={showPassword}
                  onChange={toggleShowPassword}
                  className="mt-2"
                />
              <Button className='submit-form-btn' variant="success" type="submit" disabled={loading}>
                {loading ? (isLogin ? 'Logging in...' : 'Signing up...') : (isLogin ? 'Login' : 'Sign Up')}
              </Button>
              <p className="toggle-form mt-3">
                {isLogin ? 'Don’t have an account?' : 'Already have an account?'}{' '}
                <span onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? 'Sign Up' : 'Login'}
                </span>
              </p>
            </Form>
          </div>
        </Col>
      </Row>

      <AlertModal
        show={showAlertModal}
        handleClose={handleCloseAlertModal}
        modalMessage={modalMessage}
      />

    </Container>
  );
};

export default SignupLoginForm;
