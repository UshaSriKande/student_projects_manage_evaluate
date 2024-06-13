// src/LoginForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Use 'useNavigate' from 'react-router-dom'
import { useAuth } from './AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

const LoginForm1 = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();  // Use 'useNavigate' from 'react-router-dom'
    console.log("login Rendered");
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/login', { username, password, role: selectedRole });
            login(response.data.token, response.data.role,username,password);
            navigate('/dashboard');  // Use 'navigate' instead of 'history.push'
            console.log(response.data)
        } catch (error) {
            console.error('Login failed', error);
        }
    };
/*
    return (
        
        <div style={{ paddingRight:'300px'}}>
            <center><h2>Login</h2></center>
            <center>
                <p>Hello</p>
            <form onSubmit={handleSubmit} style={{ marginLeft:'250px',border: '1px solid red'}}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <label>
                    Select Role:
                    <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="faculty">Faculty</option>
                        <option value="student">Student</option>
                    </select>
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
            </center>
        </div>
    );
    */
    const userIconDataURI = `data:image/svg+xml,${encodeURIComponent(faUser.icon[4])}`;
    const lockIconDataURI = `data:image/svg+xml,${encodeURIComponent(faLock.icon[4])}`;

    return (
        <div style={{
            paddingLeft:'500px',
            paddingRight:'530px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '97vh',
            background: '#f2f2f2',
        }}>
            <div style={{ padding: '20px', width: '400px', border: '1px solid #ccc', borderRadius: '10px', background: '#fff' }}>
                <h2 style={{ textAlign: 'center', color: '#333' }}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label style={{ display: 'block', marginBottom: '10px' }}>
                        <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px',paddingTop:'0px', color: '#ccc' }} />
                        Username:
                        
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '95%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' ,background: `url(${userIconDataURI}) no-repeat 8px 50%`}}  />
                    </label>
                    <label style={{ display: 'block', marginBottom: '10px' }}>
                        <FontAwesomeIcon icon={faLock} style={{ marginRight: '10px', color: '#ccc' }} />
                        Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '95%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    </label>
                    <label style={{ display: 'block', marginBottom: '10px' }}>
                        Select Role:
                        <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}>
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="faculty">Faculty</option>
                            <option value="student">Student</option>
                        </select>
                    </label>
                    <button type="submit" style={{ width: '100%', padding: '10px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px' }}>Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm1;
