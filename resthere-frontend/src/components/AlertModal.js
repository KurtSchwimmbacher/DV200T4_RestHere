// AlertModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const AlertModal = ({ show, handleClose, modalMessage }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton />
      <Modal.Body>{modalMessage}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModal;
