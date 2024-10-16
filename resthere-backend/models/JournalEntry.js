const mongoose = require('mongoose');

const JournalEntrySchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    data:{
        type: Date,
        required: true,
    },
    content:{
        type: String,
    }
});

module.exports = mongoose.model('JournalEntry', JournalEntrySchema);