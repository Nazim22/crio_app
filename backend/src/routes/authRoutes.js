const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController'); // Import controllers

const router = express.Router();

// Define routes
router.post('/register', registerUser); // Route to register users
router.post('/login', loginUser);       // Route to log in users (not yet implemented)

module.exports = router; // Export the router
