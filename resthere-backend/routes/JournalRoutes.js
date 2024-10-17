    // routes/journal.js

const express = require('express');
const router = express.Router();
const JournalEntry = require('../models/JournalEntry');


const mongoose = require('mongoose'); // Import mongoose if not already

// Fetch all journal entries by user
router.get('/entries/:userID', async (req, res) => {
  try {
    const { userID } = req.params;

    // Convert userID to ObjectId for proper query matching
    const entries = await JournalEntry.find({ user: mongoose.Types.ObjectId(userID) });

    if (entries.length === 0) {
      return res.json([]); // Return empty array if no entries are found
    }

    res.status(200).json(entries); // Use 200 for successful retrieval
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    res.status(500).send('Server Error'); // Keep it as is for server errors
  }
});

// Add a new journal entry
router.post('/create', async (req, res) => {
  const { title, date, content,user } = req.body;
  
  try {
    const newEntry = new JournalEntry({
        title,
        date,
        content,
        user 
    });

    await newEntry.save();

    
   // return message and journal entry details
    res.status(201).json({ 
        message: 'Journal entry created successfully', 
        entry: newEntry 
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
