const mongoose = require('mongoose');

// Define the User schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,  
    minlength: [3, 'Username must be at least 3 characters long'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true, 
    validate: {
      validator: function(v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
  },
  profilePicture: {
    type: String,
    default: '',  
  },
  role: {
    type: String,
    enum: ['user', 'admin'], 
    default: 'user',  
  },
}, {
  timestamps: true,  
});

// Export the User model
const User = mongoose.model('User', UserSchema);

module.exports = User;
