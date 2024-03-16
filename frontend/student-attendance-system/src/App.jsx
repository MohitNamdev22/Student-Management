import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/AdminPanel/AdminLogin';

function App() {
  return (
    <Router>
      <div style={{ width: "100vW", height: "100vh", backgroundColor: "#EEEEEE" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          {/* Add more routes here */}
        </Routes>
      </div>
    </Router>
  );
}

// Define a Home component to render for the root URL
const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      {/* Add content for the home page */}
    </div>
  );
};

export default App;
