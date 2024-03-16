const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// Define the path to the JSON file where student data will be stored
const studentDataPath = path.join(__dirname, '../data/students.json');
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

// Get All Students Route
router.get('/', (req, res) => {
    // Read student data from the JSON file
    const students = readDataFromFile(studentDataPath);
    res.status(200).json(students);
});

// Add Student Route
router.post('/', (req, res) => {
    const { name, rollNo, grade } = req.body;

    // Read existing student data from the JSON file
    let students = readDataFromFile(studentDataPath);

    // Add new student to the students array
    const newStudent = { id: Date.now(), name, rollNo, grade };
    students.push(newStudent);

    // Write updated student data back to the JSON file
    if (writeDataToFile(studentDataPath, students)) {
        res.status(201).json({ message: 'Student added successfully', student: newStudent });
    } else {
        res.status(500).json({ error: 'Failed to add student' });
    }
});

// Update Student Route
router.put('/:id', (req, res) => {
    const studentId = req.params.id;
    const { name, rollNo, grade } = req.body;

    // Read student data from the JSON file
    let students = readDataFromFile(studentDataPath);

    // Find student by ID
    const studentIndex = students.findIndex(student => student.id == studentId);
    if (studentIndex === -1) {
        return res.status(404).json({ error: 'Student not found' });
    }

    // Update student details
    students[studentIndex] = { id: studentId, name, rollNo, grade };

    // Write updated student data back to the JSON file
    if (writeDataToFile(studentDataPath, students)) {
        res.status(200).json({ message: 'Student updated successfully', student: students[studentIndex] });
    } else {
        res.status(500).json({ error: 'Failed to update student' });
    }
});

// Delete Student Route
router.delete('/:id', (req, res) => {
    const studentId = req.params.id;

    // Read student data from the JSON file
    let students = readDataFromFile(studentDataPath);

    // Find student by ID
    const studentIndex = students.findIndex(student => student.id == studentId);
    if (studentIndex === -1) {
        return res.status(404).json({ error: 'Student not found' });
    }

    // Remove student from the array
    const deletedStudent = students.splice(studentIndex, 1)[0];

    // Write updated student data back to the JSON file
    if (writeDataToFile(studentDataPath, students)) {
        res.status(200).json({ message: 'Student deleted successfully', student: deletedStudent });
    } else {
        res.status(500).json({ error: 'Failed to delete student' });
    }
});

module.exports = router;
