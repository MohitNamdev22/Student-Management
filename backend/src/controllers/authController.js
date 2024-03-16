const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// Define the path to the JSON file where admin data will be stored
const adminDataPath = path.join(__dirname, '../data/admins.json');
const app = express();
app.use(cors());

// Function to read JSON data from file
const readDataFromFile = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading data from ${filePath}:`, error);
        return [];
    }
};

// Admin Authentication Route
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Read admin data from the JSON file
    const admins = readDataFromFile(adminDataPath);

    // Find admin by email and password
    const admin = admins.find(admin => admin.email === email && admin.password === password);
    if (admin) {
        // Authentication successful
        res.status(200).json({ message: 'Authentication successful', admin });
    } else {
        // Authentication failed
        res.status(401).json({ error: 'Authentication failed' });
    }
});

module.exports = router;
