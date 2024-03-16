import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('/admin/students')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching students data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Welcome to Admin Dashboard</h2>
      <h3>Students List</h3>
      <ul>
        {students.map(student => (
          <li key={student.id}>{student.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
