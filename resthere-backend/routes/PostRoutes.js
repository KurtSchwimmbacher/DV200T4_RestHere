const express = require('express');
const Posts = require('../models/Posts');
const router = express.Router();

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

module.exports = router;
