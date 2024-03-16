const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const adminController = require('./src/controllers/adminController');
const studentController = require('./src/controllers/studentController');
const attendanceController = require('./src/controllers/attendanceController');
const authController = require('./src/controllers/authController');
const qrController = require('./src/controllers/qrController');
const passwordController = require('./src/controllers/passwordController')

app.use(express.json());

app.use('/admin', adminController);
app.use('/attendance', attendanceController);
app.use('/students', studentController);
app.use('/auth', authController);
app.use('/qr',qrController);
app.use('/password',passwordController)

app.listen(port, () => console.log(`Server is running on port ${port}`));
