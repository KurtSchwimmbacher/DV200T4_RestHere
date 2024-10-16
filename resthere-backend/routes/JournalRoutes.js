    // routes/journal.js

const express = require('express');
const router = express.Router();
const JournalEntry = require('../models/JournalEntry');

// Fetch all journal entries by user
router.get('/entries/:userID', async (req, res) => {
    const { userId } = req.params;
  try {
    const entries = await JournalEntry.find({ user: userId });
    res.status(200).json(entries);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Add a new journal entry
router.post('/create', async (req, res) => {
  try {
    const { title, date, content,user } = req.body;
    const newEntry = new JournalEntry({
        title,
        date,
        content,
        user 
    });

    await newEntry.save();

    
    res.status(200).json(newEntry);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
