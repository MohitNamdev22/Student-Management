import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/AdminPanel/AdminLogin';
import AdminDashboard from './components/AdminPanel/AdminDashboard';
import AttendanceManagement from './components/AdminPanel/AttendanceManagement';
import StudentManagement from './components/AdminPanel/StudentManagement';

function App() {
  return (
    <Router>
      <div style={{ width: "100vW", height: "100vh", backgroundColor: "#EEEEEE" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route exact path="/admin/dashboard" component={AdminDashboard} />
          <Route exact path="/admin/attendance" component={AttendanceManagement} />
          <Route exact path="/admin/students" component={StudentManagement} />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
    </div>
  );
};

export default App;
