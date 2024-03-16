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

// Function to write JSON data to file
const writeDataToFile = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error(`Error writing data to ${filePath}:`, error);
        return false;
    }
};

// Forgot Password Route
router.post('/forgot-password', (req, res) => {
    const { email } = req.body;

    // Read admin data from the JSON file
    const admins = readDataFromFile(adminDataPath);

    // Find admin by email
    const admin = admins.find(admin => admin.email === email);
    if (admin) {
        // Send password reset link via email
        // Implementation for sending email goes here
        res.status(200).json({ message: 'Password reset link sent successfully' });
    } else {
        res.status(404).json({ error: 'Admin not found' });
    }
});

// Reset Password Route
router.post('/reset-password', (req, res) => {
    const { email, newPassword } = req.body;

    // Read admin data from the JSON file
    let admins = readDataFromFile(adminDataPath);

    // Find admin by email
    const adminIndex = admins.findIndex(admin => admin.email === email);
    if (adminIndex !== -1) {
        // Update admin's password
        admins[adminIndex].password = newPassword;

        // Write updated admin data back to the JSON file
        if (writeDataToFile(adminDataPath, admins)) {
            res.status(200).json({ message: 'Password reset successful' });
        } else {
            res.status(500).json({ error: 'Failed to reset password' });
        }
    } else {
        res.status(404).json({ error: 'Admin not found' });
    }
});

module.exports = router;
