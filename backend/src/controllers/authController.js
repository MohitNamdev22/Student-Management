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

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const admins = readDataFromFile(adminDataPath);

    const admin = admins.find(admin => admin.email === email && admin.password === password);
    if (admin) {
        res.status(200).json({ message: 'Authentication successful', admin });
    } else {
        res.status(401).json({ error: 'Authentication failed' });
    }
});

module.exports = router;
