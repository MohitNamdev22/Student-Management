import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendanceManagement = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    axios.get('/admin/attendance')
      .then(response => {
        setAttendanceRecords(response.data);
      })
      .catch(error => {
        console.error('Error fetching attendance records:', error);
      });
  }, []);

  return (
    <div>
      <h2>Attendance Management</h2>
      <h3>Attendance Records</h3>
      <ul>
        {attendanceRecords.map(record => (
          <li key={record.id}>
            Student ID: {record.studentId}, Date: {record.date}, Status: {record.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendanceManagement;
