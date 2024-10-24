const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');

// Route to get all chats for a particular user with a professional
router.get('/:userId/:professionalId', async (req, res) => {
    const { userId, professionalId } = req.params;
    try {
        const chats = await Chat.find({ 
            sender: userId, 
            recipient: professionalId 
        }).sort({ timestamp: 1 });
        res.status(200).json(chats);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch chat messages' });
    }
});

// Route to send a new chat message
router.post('/send', async (req, res) => {
    const { sender, recipient, message } = req.body;
    try {
        const chat = new Chat({ sender, recipient, message });
        await chat.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to send message' });
    }
});

module.exports = router;
