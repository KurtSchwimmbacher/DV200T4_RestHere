const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
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
const Posts = mongoose.model('Posts', PostSchema);

module.exports = Posts;

