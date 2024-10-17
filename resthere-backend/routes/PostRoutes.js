const express = require('express');
const Posts = require('../models/Posts');
const router = express.Router();

// get all posts
router.get('/', async (req, res) => {
    try {
      const posts = await Posts.find(); 
      res.status(200).json(posts); 
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ message: 'Server error' }); 
    }
  });
  



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
    const { title, content, user, tags } = req.body;

    // create post
    try {
        const newPost = new Posts({
            title,
            content,
            user,
            tags,
        });

        await newPost.save();

        // return message and post details
        res.status(201).json({ 
            message: 'Post created successfully', 
            post: newPost 
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server error' });
    }
});

// update a post
router.patch('/update/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'content','tags'];
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

// delete a post
router.delete('/delete/:id', async (req, res) => {
    try {
        const post = await Posts.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        console.error('Error deleting post:', err); // Log the error for debugging
        res.status(400).json({ error: 'Failed to delete post' });
    }
});


module.exports = router;

