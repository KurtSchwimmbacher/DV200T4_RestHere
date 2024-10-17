const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
    },
    tags: {
        type: [String], // Array of strings for tags
        default: [],    // Default to an empty array if no tags are provided
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
},{
    timestamps: true,
});

// export the schema
const Resources = mongoose.model('Resources', ResourceSchema);

module.exports = Posts;

