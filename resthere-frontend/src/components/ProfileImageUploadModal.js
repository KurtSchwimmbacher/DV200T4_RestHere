import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const ProfileImageUploadModal = ({ show, handleClose, user }) => {
  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('profilePicture', imageFile);

    try {
      const response = await axios.post(`http://localhost:5000/api/users/uploadProfilePicture/${user.userID}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      handleClose();
      
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Upload Profile Picture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Select a new profile picture</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} accept="image/*" required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Upload
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProfileImageUploadModal;
