const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');  // New dependency for validation
const User = require('../models/User');

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
                username: user.username,
                isAdmin: user.role === 'admin'
            }
        });
    } catch (error) {
        console.error(error.message); // Log error details
        res.status(500).json({ message: error.message });
    }
});





module.exports = router;
