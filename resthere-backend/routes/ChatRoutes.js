const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');

const Professional = require('../models/Professional');


router.get('/chatrooms/:userId', async (req, res) => {
    const { userId } = req.params;
    console.log("Fetching chat rooms for user:", userId);

    try {
        const chatrooms = await Chat.find({
            $or: [
                { sender: userId },
                { recipient: userId }
            ]
        }).sort({ timestamp: -1 }); 

        console.log("Chatrooms fetched:", chatrooms);
        res.status(200).json(chatrooms);
    } catch (err) {
        console.error("Error in chatrooms route:", err.message);
        res.status(500).json({ error: 'Failed to fetch chat rooms', details: err.message });
    }
});


// Route to get all chats for a particular user with a professional
router.get('/:userId/:professionalId', async (req, res) => {
    const { userId, professionalId } = req.params;
    try {
        const chatsFirst = await Chat.find({ 
            sender: userId, 
            recipient: professionalId 
        }).sort({ timestamp: 1 });

        const chatsOther = await Chat.find({
            sender: professionalId,
            recipient: userId
        }).sort({ timestamp: 1 });

        // Combine both arrays and sort by timestamp
        const chats = [...chatsFirst, ...chatsOther].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        
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
