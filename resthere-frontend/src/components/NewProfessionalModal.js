// NewProfessionalModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import AlertModal from './AlertModal';

import '../css/Resources.css';

const NewProfessionalModal = ({ show, handleClose, refreshProfessionals, professional }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [availability, setAvailability] = useState('');
  const [bio, setBio] = useState('');

  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertModalMessage, setAlertModalMessage] = useState("Default");
  const handleCloseAlertModal = () => {
    setShowAlertModal(false);
    handleClose();
  };

  const user = useSelector((state) => state.user);
  const userID = user.userID;

  useEffect(() => {
    if (professional) {
      setName(professional.name);
      setEmail(professional.email);
      setSpecialty(professional.specialty);
      setAvailability(professional.availability);
      setBio(professional.bio);
    } else {
      setName('');
      setEmail('');
      setSpecialty('');
      setAvailability('');
      setBio('');
    }
  }, [professional]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const professionalData = {
      name,
      email,
      specialty,
      bio,
      availability,
      user: userID
    };
  
    try {
      if (professional) {
        // Edit existing professional
        
        await axios.patch(`${process.env.REACT_APP_API_URL}/api/professional/update/${professional._id}`, {
          name, 
          email, 
          specialty,
          bio,
          availability
        });
        setAlertModalMessage("Professional Updated Successfully");
      } else {
        // Create new professional
        await axios.post(`${process.env.REACT_APP_API_URL}/api/professional/create`, professionalData);
        setAlertModalMessage("Professional Created Successfully");
      }
  
      setShowAlertModal(true); 
      // handleClose(); 
    } catch (error) {
      console.error('Error submitting professional data:', error);
      setAlertModalMessage("Error Updating or Creating Professional");
      setShowAlertModal(true);
    }
  };
  
  const handleDelete = async () =>{
    
    try {
      console.log(professional._id);  
      const deleteResp = await axios.delete(`${process.env.REACT_APP_API_URL}/api/professional/delete/${professional._id}`);
      setAlertModalMessage("Professional deleted");
    } catch (error) {
      console.log( error)
    }
    handleClose();
    setShowAlertModal(true)
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{professional ? 'Edit Professional' : 'Add New Professional'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="formBasicSpecialty">
              <Form.Label>Specialty</Form.Label>
              <Form.Control type="text" value={specialty} onChange={(e) => setSpecialty(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="formBasicBio">
              <Form.Label>Bio</Form.Label>
              <Form.Control as="textarea" value={bio} onChange={(e) => setBio(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicAvailability">
              <Form.Label>Availability</Form.Label>
              <Form.Control type="text" value={availability} onChange={(e) => setAvailability(e.target.value)} />
            </Form.Group>

            <Form.Group className='new-prof-modal-btn-group'>
            <Button className='mb-3' variant="secondary" type="submit">
              {professional ? 'Save Changes' : 'Add Professional'}
            </Button>

            {professional &&(
              <Button className='new-prof-delete-btn' onClick={handleDelete}>
                Delete
              </Button>
            )};
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>

      <AlertModal 
        show={showAlertModal} 
        handleClose={handleCloseAlertModal} 
        modalMessage={alertModalMessage}
      />

    </>
  );
};

export default NewProfessionalModal;
