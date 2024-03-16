const express = require('express');
const router = express.Router();
const cors = require('cors');

const app = express();
app.use(cors());
// QR Code Authentication Route
router.post('/authenticate', (req, res) => {
    const { qrCode } = req.body;

    // Simulated QR code validation logic
    if (isValidQRCode(qrCode)) {
        res.status(200).json({ message: 'QR code authentication successful' });
    } else {
        res.status(401).json({ error: 'Invalid QR code' });
    }
});

// Function to validate QR code
function isValidQRCode(qrCode) {
    // Example: Check if the QR code matches a predefined pattern
    const pattern = /^[A-Z]{2}-\d{4}$/; // Example pattern: Two uppercase letters followed by a hyphen and four digits
    return pattern.test(qrCode);
}

module.exports = router;
