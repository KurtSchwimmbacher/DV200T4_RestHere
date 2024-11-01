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
        type: [String],
        default: [],    
    },
    resourceURL: {
        type: String,
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
const Resources = mongoose.model('Resources', ResourceSchema);

module.exports = Resources;

