import React, { useState } from 'react';
import axios from 'axios';
import '../AdminPanel/AdminLogin.css'

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("before try bloack")
        try {
            // Make HTTP POST request to backend API for admin login
            const response = await axios.post('http://localhost:3000/admin/login', {
                email,
                password
            });
            // Handle successful login
            console.log('Login successful:', response.data);
        } catch (error) {
            // Handle login error
            console.error('Login error:', error.response.data.error);
            setError(error.response.data.error);
        }
    };

    return (
        <div className="admin-login-container">
            <h2>Admin Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn-login">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
