import React from 'react';
import { useAuth } from './AuthContext';
import './App.css'; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom';
const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="centered-container" style={{
      paddingLeft:'400px',
      paddingTop:'100px',
      width:'300px'
    }}>
      <button onClick={handleLogout} style={{width:'100px',height:'100px'}}>Logout</button>
    </div>
  );
};

export default LogoutButton;
