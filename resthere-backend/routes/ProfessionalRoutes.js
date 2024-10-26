const express = require('express');
const router = express.Router();
const Professional = require('../models/Professional');

// Route to get all professionals
router.get('/', async (req, res) => {
    try {
        const professionals = await Professional.find();
        res.status(200).json(professionals);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch professionals' });
    }
});

// Route to add a new professional
router.post('/create', async (req, res) => {
    const { name, email, specialty, bio, availability, user } = req.body; // Include user in the request body
    try {
        const professional = new Professional({ 
            name, 
            email, 
            specialty, 
            availability,
            bio, 
            user 
        });

        await professional.save();
        res.status(201).json({ message: 'Professional added successfully' });
    } catch (err) {
        console.error('Error adding professional:', err); // Log the error for debugging
        res.status(500).json({ error: 'Failed to add professional' });
    }
});
 


module.exports = router;
