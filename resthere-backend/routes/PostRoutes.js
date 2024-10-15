const express = require('express');
const Posts = require('../models/Posts');
const router = express.Router();


// get posts by user
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Find all posts where the user matches the provided userId
        const posts = await Posts.find({ user: userId }); 

        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: 'No posts found for this user.' });
        }

        // Return the found posts
        res.status(200).json(posts); 
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server error' });
    }
});


// new post route
router.post('/create', async (req, res) => {
    const { title, content, user } = req.body;

    // create post
    try {
        const newPost = new Posts({
            title,
            content,
            user,
        });

        await newPost.save();

        // return message and post details
        res.status(201).json({ 
            message: 'Post created successfully', 
            post: newPost 
        });

    } catch (error) {
        console.error(error.message); // Fixed the variable name here
        res.status(500).json({ msg: 'Server error' });
    }
});

// update a post
router.patch('/update/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'content'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    
    // Check if the updates are valid
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const post = await Posts.findById(req.params.id);
        
        // If post doesn't exist
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }

        // Apply updates to the post
        updates.forEach(update => {
            post[update] = req.body[update];
        });

        await post.save(); 

        res.status(201).json({ 
            message: 'Post updated successfully', 
            newPost: post 
        });

    } catch (error) {
        console.error('Error updating post:', error);
        res.status(400).send({ error: 'Failed to update post' });
    }
});

module.exports = router;

