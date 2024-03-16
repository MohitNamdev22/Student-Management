const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const attendanceDataPath = path.join(__dirname, '../data/attendance.json');

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

router.post('/record', (req, res) => {
    const { studentId, date, status } = req.body;

    let attendanceData = readDataFromFile(attendanceDataPath);

    const existingAttendance = attendanceData.find(entry => entry.studentId === studentId && entry.date === date);
    if (existingAttendance) {
        return res.status(400).json({ error: 'Attendance for this student on the given date already recorded' });
    }

    const newAttendanceEntry = { id: Date.now(), studentId, date, status };
    attendanceData.push(newAttendanceEntry);

    if (writeDataToFile(attendanceDataPath, attendanceData)) {
        res.status(201).json({ message: 'Attendance recorded successfully', attendance: newAttendanceEntry });
    } else {
        res.status(500).json({ error: 'Failed to record attendance' });
    }
});

router.get('/:studentId', (req, res) => {
    const studentId = (req.params.studentId)-1;

    const attendanceData = readDataFromFile(attendanceDataPath);

    res.status(200).json(attendanceData[studentId]);
});

module.exports = router;
