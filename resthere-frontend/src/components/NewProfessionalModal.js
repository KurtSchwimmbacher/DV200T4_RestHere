// src/components/NewProfessionalModal.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';

import '../css/Chat.css';

const NewProfessionalModal = ({ show, handleClose, refreshProfessionals }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [availability, setAvailability] = useState('');
  const [bio, setBio] = useState('');


  const user = useSelector((state) => state.user);
  const userID = user.userID;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProfessional = {
      name: name,
      email: email,
      specialty: specialty,
      bio: bio,
      availability: availability,
      user: userID
    };

    console.log(newProfessional)
    try {
      const response = await axios.post('http://localhost:5000/api/professional/create', newProfessional); 
      refreshProfessionals(); 
      alert(response.data.message)
      handleClose(); 
    } catch (error) {
      console.error('Error creating professional:', error);
      // Handle error appropriately (e.g., show an error message)
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Professional</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="formBasicSpecialty">
            <Form.Label>Specialty</Form.Label>
            <Form.Control type="text" placeholder="Enter specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="formBasicProfilePicture">
            <Form.Label>Bio</Form.Label>
            <Form.Control type="text" placeholder="" as="textarea" value={bio} onChange={(e) => setBio(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formBasicAvailability">
            <Form.Label>Availability</Form.Label>
            <Form.Control type="text" placeholder="Enter availability" value={availability} onChange={(e) => setAvailability(e.target.value)} />
          </Form.Group>

          <Button variant="danger" className='mt-2 add-prof-btn' type="submit">
            Add Professional
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewProfessionalModal;
