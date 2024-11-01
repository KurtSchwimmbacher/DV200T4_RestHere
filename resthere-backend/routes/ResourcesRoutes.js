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
  

  // get resources by resourceID
router.get('/getSingle/:id', async (req,res) => {
    const { id } = req.params;

    try {
        const singleResource = await Resources.findById(id);

        if (!singleResource || singleResource.length === 0){
            return res.status(404).json({ message: 'No resources found with this ID' });
        }


        // Return the found post
        res.status(200).json(singleResource); 

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server error' });
    }
});
  

  // update a resource
router.patch('/update/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'content','tags', 'resourceURL'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    
    // Check if the updates are valid
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const resource = await Resources.findById(req.params.id);
        
        // If resource doesn't exist
        if (!resource) {
            return res.status(404).send({ message: 'Resource not found' });
        }

        // Apply updates to the post
        updates.forEach(update => {
            resource[update] = req.body[update];
        });

        await resource.save(); 

        res.status(201).json({ 
            message: 'Resource updated successfully', 
            newResource: resource 
        });

    } catch (error) {
        console.error('Error updating resource:', error);
        res.status(400).send({ error: 'Failed to update resource' });
    }
});

// new Resource route
router.post('/create', async (req, res) => {
    const { title, content, user, tags, resourceURL } = req.body;

    // create post
    try {
        const newResource = new Resources({
            title,
            content,
            user,
            tags,
            resourceURL
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

