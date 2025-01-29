require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes'); // Import auth routes

const app = express();
app.use(express.json()); // Middleware to parse JSON

const cors = require('cors');
app.use(cors()); // Enable CORS for all routes

// MongoDB Connection
const startMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB Cluster');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); // Exit process on failure
    }
};

// Root Route
app.get('/', (req, res) => {
    res.send('Backend is running successfully!');
});

// Use Auth Routes
app.use('/auth', authRoutes); // Prefix all auth routes with '/auth'

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    await startMongo();
    console.log(`Server running on http://localhost:${PORT}`);
});
