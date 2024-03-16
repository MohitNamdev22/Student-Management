// backend/src/controllers/adminController.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Define the path to the JSON files where data will be stored
const adminDataPath = path.join(__dirname, '../data/admins.json');
const studentDataPath = path.join(__dirname, '../data/students.json');

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

// Admin Registration Route
router.post('/register', (req, res) => {
    const { name, email, mobile, password } = req.body;

    // Read existing admin data from the JSON file
    let admins = readDataFromFile(adminDataPath);

    // Check if the email is already registered
    const isEmailTaken = admins.some(admin => admin.email === email);
    if (isEmailTaken) {
        return res.status(400).json({ error: 'Email already registered' });
    }

    // Add new admin to the admins array
    const newAdmin = { id: Date.now(), name, email, mobile, password };
    admins.push(newAdmin);

    // Write updated admin data back to the JSON file
    if (writeDataToFile(adminDataPath, admins)) {
        res.status(201).json({ message: 'Admin registered successfully', admin: newAdmin });
    } else {
        res.status(500).json({ error: 'Failed to register admin' });
    }
});

// Admin Login Route
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Read admin data from the JSON file
    const admins = readDataFromFile(adminDataPath);

    // Find admin by email and password
    const admin = admins.find(admin => admin.email === email && admin.password === password);
    if (!admin) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Admin authenticated successfully
    res.status(200).json({ message: 'Admin authenticated successfully', admin });
});

// Fetch All Students Route
router.get('/students', (req, res) => {
    // Read student data from the JSON file
    console.log("hello student")
    const students = readDataFromFile(studentDataPath);
    res.status(200).json(students);
});

// Reset Admin Password Route
router.post('/reset-password', (req, res) => {
    const { email } = req.body;

    // Read admin data from the JSON file
    let admins = readDataFromFile(adminDataPath);

    // Find admin by email
    const adminIndex = admins.findIndex(admin => admin.email === email);
    if (adminIndex === -1) {
        return res.status(404).json({ error: 'Admin not found' });
    }

    // Generate a new password
    const newPassword = Math.random().toString(36).substring(7);
    admins[adminIndex].password = newPassword;

    // Write updated admin data back to the JSON file
    if (writeDataToFile(adminDataPath, admins)) {
        res.status(200).json({ message: 'Password reset successful', newPassword });
    } else {
        res.status(500).json({ error: 'Failed to reset password' });
    }
});

module.exports = router;
