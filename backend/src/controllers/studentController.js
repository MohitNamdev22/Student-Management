const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const studentDataPath = path.join(__dirname, '../data/students.json');
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

router.get('/', (req, res) => {
    const students = readDataFromFile(studentDataPath);
    res.status(200).json(students);
});

router.post('/', (req, res) => {
    const { name, rollNo, grade } = req.body;

    let students = readDataFromFile(studentDataPath);

    const newStudent = { id: Date.now(), name, rollNo, grade };
    students.push(newStudent);

    if (writeDataToFile(studentDataPath, students)) {
        res.status(201).json({ message: 'Student added successfully', student: newStudent });
    } else {
        res.status(500).json({ error: 'Failed to add student' });
    }
});

router.put('/:id', (req, res) => {
    const studentId = req.params.id;
    const { name, rollNo, grade } = req.body;

    let students = readDataFromFile(studentDataPath);

    const studentIndex = students.findIndex(student => student.id == studentId);
    if (studentIndex === -1) {
        return res.status(404).json({ error: 'Student not found' });
    }

    students[studentIndex] = { id: studentId, name, rollNo, grade };

    if (writeDataToFile(studentDataPath, students)) {
        res.status(200).json({ message: 'Student updated successfully', student: students[studentIndex] });
    } else {
        res.status(500).json({ error: 'Failed to update student' });
    }
});

router.delete('/:id', (req, res) => {
    const studentId = req.params.id;

    let students = readDataFromFile(studentDataPath);

    const studentIndex = students.findIndex(student => student.id == studentId);
    if (studentIndex === -1) {
        return res.status(404).json({ error: 'Student not found' });
    }

    const deletedStudent = students.splice(studentIndex, 1)[0];

    if (writeDataToFile(studentDataPath, students)) {
        res.status(200).json({ message: 'Student deleted successfully', student: deletedStudent });
    } else {
        res.status(500).json({ error: 'Failed to delete student' });
    }
});

module.exports = router;
