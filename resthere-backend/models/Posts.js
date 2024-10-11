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
