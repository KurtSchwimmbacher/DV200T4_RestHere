const mongoose = require('mongoose');

const JournalEntrySchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        required: true,
    },
    content:{
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
    },
});

module.exports = mongoose.model('JournalEntry', JournalEntrySchema);