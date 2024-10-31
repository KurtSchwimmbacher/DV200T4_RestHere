import React , { useState } from 'react';
import { ArrowUpRight } from 'react-bootstrap-icons';
import '../css/Resources.css';
import { Button, Card } from 'react-bootstrap';
import NewProfessionalModal from './NewProfessionalModal';

import { useSelector } from 'react-redux';

const ChatCard = ({ title, text, availability, handleShow, refreshProfessionals, professional }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const user = useSelector((state) => state.user);
  const userIsAdmin = user.isAdmin;

  const handleEdit = () =>{
    setShowEditModal(true);
  }

  const handleCloseModal = () => setShowEditModal(false);

  return (
    <>
      <Card className="custom-card">
        <div className="card-arrow-icon">
        {userIsAdmin && (
            <Button
              variant="secondary"
              className="edit-button"
              onClick={handleEdit}
            >
              Edit
            </Button>
          )}
          <ArrowUpRight className='chat-expand-arrow' onClick={handleShow} />
        </div>
        <Card.Body className='resource-card-body'>
          <Card.Title>{title}</Card.Title>
          <Card.Text className='card-text-resource'><i>{text}</i></Card.Text>
          <Card.Text className='card-text-resource'><strong>Availability:</strong> {availability}</Card.Text>
        </Card.Body>
      </Card>
      {showEditModal && (
        <NewProfessionalModal
          show={showEditModal}
          handleClose={handleCloseModal}
          refreshProfessionals={refreshProfessionals}
          professional={professional} 
        />
      )}
      
    </>
  );
};

export default ChatCard;
