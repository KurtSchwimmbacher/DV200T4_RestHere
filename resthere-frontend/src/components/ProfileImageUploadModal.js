import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

import AlertModal from './AlertModal';

const ProfileImageUploadModal = ({ show, handleClose, user }) => {
  const [imageFile, setImageFile] = useState(null);

  const [alertModalMessage, setAlertModalMessage] = useState("");
  const [showAlertModal,setShowAlertModal] = useState(false);
  const handleCloseAlertModal = () =>{
    setShowAlertModal(false);
    handleClose();
  };

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('profilePicture', imageFile);

    try {
      const response = await axios.patch(`/api/users/uploadProfilePicture/${user.userID}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data.profilePicture);  
      
      setAlertModalMessage(response.data.message)
      setShowAlertModal(true);
      
    } catch (error) {
      setAlertModalMessage("Unable to upload picture. Try again soon.")
      setShowAlertModal(true);
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
            <Form.Text className="text-muted">
                This change will only reflect after logging back in
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Upload
          </Button>
        </Form>
      </Modal.Body>

          {/* alert modal */}
          <AlertModal
            show={showAlertModal}
            handleClose={handleCloseAlertModal}
            modalMessage={alertModalMessage}
          />

    </Modal>
  );
};

export default ProfileImageUploadModal;
