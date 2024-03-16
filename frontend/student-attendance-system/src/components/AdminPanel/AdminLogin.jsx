import React, { useState } from 'react';
import axios from 'axios';
import '../AdminPanel/AdminLogin.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/admin/login', {
                email,
                password
            });
            console.log('Login successful:', response.data);
            setLoginStatus('success');
        } catch (error) {
            console.error('Login error:', error.response.data.error);
            setErrorMessage(error.response.data.error);
            setLoginStatus('failure');
        }
    };

    return (
        <div className="admin-login-container">
            <h2>Admin Login</h2>
            {loginStatus === 'failure' && <p className="error-message">{errorMessage}</p>}
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
            {loginStatus === 'success' && <p className="success-message">Login successful</p>}
        </div>
    );
};

export default AdminLogin;
