const express = require('express');
const Resources = require('../models/Resources');
const router = express.Router();

// get all resources
router.get('/', async (req, res) => {
    try {
      const resources = await Resources.find(); 
      res.status(200).json(resources); 
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ message: 'Server error' }); 
    }
  });
  

// new Resource route
router.post('/create', async (req, res) => {
    const { title, content, user, tags } = req.body;

    // create post
    try {
        const newResource = new Resources({
            title,
            content,
            user,
            tags,
        });

        await newResource.save();

        // return message and post details
        res.status(201).json({ 
            message: 'Resource posted successfully', 
            resource: newResource 
        });

    } catch (error) {
        console.error(error.message); 
        res.status(500).json({ msg: 'Server error' });
    }
});


// delete a resource
router.delete('/delete/:id', async (req, res) => {
    try {
        const resource = await Resources.findByIdAndDelete(req.params.id);
        if (!resource) {
            return res.status(404).json({ error: 'Resource not found' });
        }
        res.json({ message: 'Resource deleted successfully' });
    } catch (err) {
        console.error('Error deleting Resource:', err); // Log the error for debugging
        res.status(400).json({ error: 'Failed to delete Resource' });
    }
});


module.exports = router;

