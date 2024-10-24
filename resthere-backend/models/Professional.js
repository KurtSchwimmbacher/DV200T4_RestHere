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
    profilePicture: { 
        type: String 
    },
    availability: { 
        type: Boolean, 
        default: true 
    }
});

module.exports = mongoose.model('Professional', ProfessionalSchema);
