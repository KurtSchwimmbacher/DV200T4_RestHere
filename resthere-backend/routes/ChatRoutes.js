const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');

const Professional = require('../models/Professional');

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

// Get all professionals the user has been messaging
router.get('/professionals/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const chatSessions = await Chat.find({ sender: userId }).distinct('recipient');
        console.log("Chat Sessions Found:", chatSessions); // Log to see what the chat query returns

        const professionals = await Professional.find({ _id: { $in: chatSessions } });
        console.log("Professionals Found:", professionals); // Log to see if professionals are being fetched

        res.status(200).json(professionals);
    } catch (error) {
        console.error('Error fetching professionals:', error); // Detailed error logging
        res.status(500).json({ error: 'Error fetching professionals' });
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

router.patch('/edit/:messageId', async (req,res) => {
    const { messageId } = req.params;
    const { sender, message } = req.body;

    try {
        // Find the chat message by ID
        const chat = await Chat.findById(messageId);

        // Check if the chat exists and if the sender is the same as the chat sender
        if (!chat) {
            return res.status(404).json({ error: 'Chat message not found' });
        }
        if (chat.sender.toString() !== sender) {
            return res.status(403).json({ error: 'You can only edit your own messages' });
        }

        // Update the chat message
        chat.message = message;
        await chat.save();
        
        res.status(200).json({ message: 'Message updated successfully', chat });
    } catch (err) {
        console.error('Error editing message:', err);
        res.status(500).json({ error: 'Failed to edit message' });
    }
});

router.delete('/delete/:messageId' , async (req, res) =>{
    const { messageId } = req.params;
    const { sender } = req.body; // Expecting sender to be passed in the request body

    try {
        // Find the chat message by ID
        const chat = await Chat.findById(messageId);

        // Check if the chat exists and if the sender is the same as the chat sender
        if (!chat) {
            return res.status(404).json({ error: 'Chat message not found' });
        }
        if (chat.sender.toString() !== sender) {
            return res.status(403).json({ error: 'You can only delete your own messages' });
        }

        // Delete the chat message
        await chat.remove();
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (err) {
        console.error('Error deleting message:', err);
        res.status(500).json({ error: 'Failed to delete message' });
    }
});

module.exports = router;
