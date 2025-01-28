const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import the User model

// Handle User Registration
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Invalid input. Name, email, and password are required.' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        // Save the user to MongoDB
        await newUser.save();
        res.status(200).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error registering user:', err.message);
        res.status(500).json({ error: 'Failed to register user' });
    }
};

// Handle User Login (Placeholder)
const loginUser = async (req, res) => {
    res.status(200).json({ message: 'Login functionality coming soon!' });
};

module.exports = { registerUser, loginUser }; // Export controller functions
