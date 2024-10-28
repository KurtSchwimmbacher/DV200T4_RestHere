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
 
router.patch('/update/:id', async (req, res) =>{
    const { id } = req.params;
    const updates = req.body; 

    try {
        const updatedProfessional = await Professional.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedProfessional) {
            return res.status(404).json({ error: 'Professional not found' });
        }
        res.status(200).json({ message: 'Professional updated successfully', professional: updatedProfessional });
    } catch (err) {
        console.error('Error updating professional:', err);
        res.status(500).json({ error: 'Failed to update professional' });
    }
});

router.delete('/delete:id' , async (req,res) =>{
    const { id } = req.params;

    try {
        const deletedProfessional = await Professional.findByIdAndDelete(id);
        if (!deletedProfessional) {
            return res.status(404).json({ error: 'Professional not found' });
        }
        res.status(200).json({ message: 'Professional deleted successfully' });
    } catch (err) {
        console.error('Error deleting professional:', err);
        res.status(500).json({ error: 'Failed to delete professional' });
    }
})

module.exports = router;
