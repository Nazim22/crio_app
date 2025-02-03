const express = require('express');
const bcrypt = require('bcryptjs'); // Using bcryptjs for password hashing
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// ✅ Register User
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // 🔹 Validate Input Fields
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // 🔹 Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'User already exists' });

        // 🔹 Hash password before saving to DB
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 🔹 Save new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error saving user:', error.message);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// ✅ Login User
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // 🔹 Validate Input Fields
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // 🔹 Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        // 🔹 Compare password using bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        // 🔹 Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
