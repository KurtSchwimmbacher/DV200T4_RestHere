const mongoose = require('mongoose');

const ProfessionalSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    specialty: { 
        type: String, 
        required: true 
    },
    bio: {
        type: String,
        required: true
    },
    availability: { 
        type: String, 
        default: "Not Available" 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
});

module.exports = mongoose.model('Professional', ProfessionalSchema);
