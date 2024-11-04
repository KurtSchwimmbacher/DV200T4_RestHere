import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup, ButtonGroup } from 'react-bootstrap';
import { TrashFill } from 'react-bootstrap-icons';
import axios from 'axios';
import { useSelector } from 'react-redux';

import AlertModal from './AlertModal';

const AdminModal = ({ show, handleClose ,resourceData }) => {

    const user = useSelector((state) => state.user);
    const userID = user.userID;

    const [alertModalMessage, setAlertModalMessage] = useState("");
    const [showAlertModal, setShowAlertModal] = useState(false);
    const handleCloseAlertModal = () =>{
        setShowAlertModal(false);
        handleClose();
    }

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [resourceURL, setResourceURL] = useState('');

    // Set initial values when the modal opens
    useEffect(() => {
        if (resourceData) {
            setTitle(resourceData.title || '');
            setContent(resourceData.content || '');
            setResourceURL(resourceData.resourceURL || '');
        }
    }, [resourceData]);

    const handleTagClick = (tag) => {
        setTags((prevTags) =>
            prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // for editing resources
        if(resourceData){
            try {
                console.log(resourceData._id)
                const response = await axios.patch(`${process.env.REACT_APP_API_URL}/api/resource/update/${resourceData._id}`,{
                    title,
                    content,
                    tags,
                    resourceURL,
                });
                
                setAlertModalMessage(response.data.message);
                setShowAlertModal(true);

            } catch (error) {
                setAlertModalMessage(error.response?.data.msg || "An error occurred. Please try again.");
                setShowAlertModal(true);
                console.log(error)
            }
        }
        // if not editing
        else{
            try {
                const response = await axios.post('http://localhost:5000/api/resource/create', {
                    title,
                    content,
                    user: userID, 
                    tags,
                    resourceURL,
                });
    
                setAlertModalMessage(response.data.message); 
                setShowAlertModal(true);
    
                // Reset form after submission
                setTitle('');
                setContent('');
                setTags([]);
                setResourceURL('');
                
            } catch (error) {
                setAlertModalMessage(error.response?.data.msg || "An error occurred. Please try again.");
                setShowAlertModal(true);
            }
        }
        
    };

    const handleDelete = async (e) => {
        if (resourceData._id) {
            try {
                const response = await axios.delete(`http://localhost:5000/api/resource/delete/${resourceData._id}`);
                setAlertModalMessage(response.data.message);
                setShowAlertModal(true);
                
            } catch (error) {
                console.error(`Error deleting resource`, error);
                setAlertModalMessage(`An error occurred while deleting the resource. Please try again.`);
                setShowAlertModal(true);
            }
        }
    };

  return (
    <Modal  show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className='admin-modal-title'>Post Resources</Modal.Title>
      </Modal.Header>
      <Modal.Body className='admin-modal-body'>
    
        <Form onSubmit={handleSubmit}>
            {/* Form Title Input with Trash Icon */}
            <Form.Group controlId="formTitle" className="mb-3 form-post-title">
                        
                <InputGroup>
                    <Form.Control
                        className='title-form-element'
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </InputGroup>

                {/* icons */}
                <div className='icon-con'>
                    {/* <PencilFill className='pencil-icon' /> */}
                    <TrashFill className='trash-icon' onClick={handleDelete}  />
                </div>
            
            </Form.Group>

            <Form.Group controlId='formTags' className='mb-3 form-post-content'>
                <ButtonGroup className='form-tag-btn-group'>
                    {['Video', 'Article', 'Tutorial'].map((tag) => (
                        <Button
                            key={tag}
                            variant={tags.includes(tag) ? "warning" : "danger"}
                            active={tags.includes(tag)}
                            onClick={() => handleTagClick(tag)}
                        >
                            {tag}
                        </Button>
                    ))}
                </ButtonGroup>
            </Form.Group>

            <Form.Group className="mb-3 form-post-content" controlId="formContent" >
                <InputGroup>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Enter content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />

                </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
            
            <Form.Control 
                type="text" 
                placeholder="Resource URL" 
                value={resourceURL}
                onChange={(e)=> setResourceURL(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" className='submit-form-btn' type="submit">
                Submit
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

export default AdminModal;
