// src/LoginForm.js

import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';  // Use 'useNavigate' from 'react-router-dom'
import { useAuth } from './AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import StepForm from './StepForm';
import ListUserPage from './admin/ListUserPage';

import profileImage from './images/profile.jpg';

const LoginForm = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    const { login } = useAuth();
    const navigate = useNavigate();  // Use 'useNavigate' from 'react-router-dom'
    console.log("login Rendered");

    const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    
    password: '',
    role:'',
    userName:'',
    
  });
  const [completedSteps, setCompletedSteps] = useState([]);
  const [role, setRole] = useState(''); // Define role state
  const [showRadioButtons, setShowRadioButtons] = useState(false);
  const [yearTaken, setYearTaken] = useState('');

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole); // Update the role state with the selected role
  };
  

  useEffect(() => {
    const completed = [];
    
    if (formData.userName !== '' && formData.password !== '') {
      completed.push(1);
    }
   
    setCompletedSteps(completed);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData)
  console.log(formData.password);
  console.log(formData.userName)
  console.log("role is");
    console.log(role);
/*
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
           

            const response = await axios.post('http://localhost:5000/login', 
            {userName: formData.userName,  // Correctly pass formData fields
            password: formData.password,
            role: role});
            login(response.data.token, response.data.role,username,password);
            navigate('/dashboard');  // Use 'navigate' instead of 'history.push'
            console.log(response.data)
        } catch (error) {
            console.error('Login failed', error);
        }
    };*/
   

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            console.log({"Role is:":role});
            const response = await axios.post('http://localhost:5000/login', {
                username: formData.userName,
                password: formData.password,
                role: role
            });
            login(response.data.token, response.data.role, formData.userName, formData.password,response.data.year);
            console.log(response.data);
            setYearTaken(response.data.year);
            console.log("year");
            console.log(yearTaken)
            console.log("username");
           
            
            navigate('/dashboard');
            console.log(response.data);
        } catch (error) {
            console.error('Login failed', error);
        }
    };
    
    console.log("year");
    console.log(yearTaken)
    

    return (
      
        <div className={`login-form ${isLoginPage ? 'login-page' : ''}`}>
          
        <div className="form-container">
        <div className="form-section1">
        <img src={profileImage} alt="Profile" className="input-image" />
      </div>
      <div className="form-section">
        
      

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
          
            <div style={{marginLeft:'80px'}}><h2>Login Information</h2></div>
           
            <StepForm showRadioButtons={showRadioButtons} formData={formData} handleChange={handleChange} handleRoleChange = {handleRoleChange} handleSubmit={handleSubmit} role={role} />
          </>
        )}
        
      </form>
    </div>
    </div>
</div>
    );
};

export default LoginForm;
