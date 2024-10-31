const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');  // New dependency for validation
const User = require('../models/User');

const multer = require('multer');
const path = require('path');

// Set up storage destination and filename format
const storage = multer.diskStorage({
  destination: './uploads/profile-pictures', // Store profile images here
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ 
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    // Allow only certain file types
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed!'), false);
    }
  }
});



const router = express.Router();

// sign up Route
router.post('/signup', async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // 1. Check if all fields are filled
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // 2. Validate email
  if (!validator.isEmail(email)) {
    return res.status(400).json({ msg: 'Invalid email format' });
  }

  // 3. Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ msg: 'Passwords do not match' });
  }

  // 4. Check password strength
  if (!validator.isStrongPassword(password, { minLength: 8 })) {
    return res.status(400).json({ 
      msg: 'Password must be at least 8 characters long and contain a mix of letters, numbers, and symbols.' 
    });
  }

  try {
    // 5. Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // 6. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 7. Create new user
    user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    // 8. Generate JWT token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // 9. Return success response with token
    res.status(201).json({ 
      msg: 'User registered successfully', 
      token,
      user: { id: user._id, username: user.username, email: user.email } 
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});


// login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        console.log('User found:', user); // Debugging statement
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch); // Debugging statement
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with success message, token, username, and admin status
        res.status(200).json({ 
            message: 'Login Successful', 
            token,
            user: {
                userID: user._id,
                email: user.email,
                username: user.username,
                role: user.role,
                profilePicture: user.profilePicture,
            }
        });
    } catch (error) {
        console.error(error.message); // Log error details
        res.status(500).json({ message: error.message });
    }
});

// Profile picture update route
router.patch('/uploadProfilePicture/:userId', upload.single('profilePicture'), async (req, res) => {
  const { userId } = req.params;

  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const imageUrl = `/uploads/profile-pictures/${req.file.filename}`;

    // Update user's profile picture
    const user = await User.findByIdAndUpdate(
      userId,
      { profilePicture: imageUrl },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile picture updated successfully', profilePicture: user.profilePicture });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
