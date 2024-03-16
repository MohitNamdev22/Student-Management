const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const adminDataPath = path.join(__dirname, '../data/admins.json');
const app = express();
app.use(cors());

const readDataFromFile = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading data from ${filePath}:`, error);
        return [];
    }
};

const writeDataToFile = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error(`Error writing data to ${filePath}:`, error);
        return false;
    }
};

router.post('/forgot-password', (req, res) => {
    const { email } = req.body;

    const admins = readDataFromFile(adminDataPath);

    const admin = admins.find(admin => admin.email === email);
    if (admin) {
        res.status(200).json({ message: 'Password reset link sent successfully' });
    } else {
        res.status(404).json({ error: 'Admin not found' });
    }
});

router.post('/reset-password', (req, res) => {
    const { email, newPassword } = req.body;

    let admins = readDataFromFile(adminDataPath);

    const adminIndex = admins.findIndex(admin => admin.email === email);
    if (adminIndex !== -1) {
        admins[adminIndex].password = newPassword;

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
