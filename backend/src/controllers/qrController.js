const express = require('express');
const router = express.Router();
const cors = require('cors');

const app = express();
app.use(cors());

router.post('/authenticate', (req, res) => {
    const { qrCode } = req.body;

    if (isValidQRCode(qrCode)) {
        res.status(200).json({ message: 'QR code authentication successful' });
    } else {
        res.status(401).json({ error: 'Invalid QR code' });
    }
});

function isValidQRCode(qrCode) {
    const pattern = /^[A-Z]{2}-\d{4}$/;
    return pattern.test(qrCode);
}

module.exports = router;
