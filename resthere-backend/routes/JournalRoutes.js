    // routes/journal.js

const express = require('express');
const router = express.Router();
const JournalEntry = require('../models/JournalEntry');


// Fetch all journal entries by user
router.get('/entries/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
      // Find all entries where the user matches the provided userId
      const entries = await JournalEntry.find({ user: userId }); 

      if (!entries || entries.length === 0) {
          return res.status(404).json({ message: 'No entries found for this user.' });
      }

      // Return the found posts
      res.status(200).json(entries); 
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Server error' });
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

// Fetch a single journal entry by ID
router.get('/entry/:entryId', async (req, res) => {
  const { entryId } = req.params;

  try {
    const entry = await JournalEntry.findById(entryId);

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found.' });
    }

    res.status(200).json(entry);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update an existing journal entry
router.patch('/update/:entryId', async (req, res) => {
  const { entryId } = req.params;
  const { title, date, content } = req.body;

  try {
    const updatedEntry = await JournalEntry.findByIdAndUpdate(
      entryId,
      { title, date, content },
      { new: true } // Return the updated entry
    );

    if (!updatedEntry) {
      return res.status(404).json({ message: 'Entry not found.' });
    }

    res.status(200).json({
      message: 'Journal entry updated successfully',
      entry: updatedEntry,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});


// Delete a journal entry by ID
router.delete('/delete/:entryId', async (req, res) => {
  const { entryId } = req.params;

  try {
    const deletedEntry = await JournalEntry.findByIdAndDelete(entryId);

    if (!deletedEntry) {
      return res.status(404).json({ message: 'Entry not found.' });
    }

    res.status(200).json({ message: 'Journal entry deleted successfully.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});


module.exports = router;
