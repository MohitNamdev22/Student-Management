const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Define the path to the JSON file where attendance data will be stored
const attendanceDataPath = path.join(__dirname, '../data/attendance.json');

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

// Record Attendance Route
router.post('/record', (req, res) => {
    const { studentId, date, status } = req.body;

    // Read existing attendance data from the JSON file
    let attendanceData = readDataFromFile(attendanceDataPath);

    // Check if the student attendance already exists for the given date
    const existingAttendance = attendanceData.find(entry => entry.studentId === studentId && entry.date === date);
    if (existingAttendance) {
        return res.status(400).json({ error: 'Attendance for this student on the given date already recorded' });
    }

    // Add new attendance entry to the attendance data array
    const newAttendanceEntry = { id: Date.now(), studentId, date, status };
    attendanceData.push(newAttendanceEntry);

    // Write updated attendance data back to the JSON file
    if (writeDataToFile(attendanceDataPath, attendanceData)) {
        res.status(201).json({ message: 'Attendance recorded successfully', attendance: newAttendanceEntry });
    } else {
        res.status(500).json({ error: 'Failed to record attendance' });
    }
});

// Get Attendance for a Student Route
router.get('/:studentId', (req, res) => {
    console.log("control at start")
    const studentId = (req.params.studentId)-1;

    
    const attendanceData = readDataFromFile(attendanceDataPath);

    // Filter attendance entries for the specified student
    //const studentAttendance = attendanceData.filter(entry => entry.studentId === studentId);
    res.status(200).json(attendanceData[studentId]);

});

module.exports = router;
