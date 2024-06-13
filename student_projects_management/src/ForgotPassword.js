// src/SignUpForm.js
import React, { useState, useEffect } from 'react';
import StepForm from './StepForm';
import ForgotForm from './ForgotForm';
import ForgotPasswordImage from './images/forgot-password.jpg';
import profileImage from './images/profile.jpg';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    
    password: '',
    
    userName:'',
    email:'',
    
  });
  const [completedSteps, setCompletedSteps] = useState([]);
  const [role, setRole] = useState('student'); // Define role state
  
  const handleRoleChange = (e) => {
    setRole(e.target.value);
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

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log({"Role is:":role});
        const response = await axios.post('http://localhost:5000/forgotpassword', {
            username: formData.userName,
            email: formData.email,
            password:formData.password,
        });
        //login(response.data.token, response.data.role, formData.userName, formData.password);
        console.log('Form submitted:', formData);
        navigate('/login');
        console.log(response.data);
    } catch (error) {
        console.error('Login failed', error);
    }
};
  return (
    <div className="form-container">
        <div className="form-section1">
        <img src={profileImage} alt="Profile" className="input-image" />
      </div>
      <div className="form-section">
        
      
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
          
            <div style={{display:'flex'}}>
            <img src={ForgotPasswordImage} alt="Forgot" className="forgot-image" style={{height:'50px',width:'30px',marginBottom:''}}/>
              <h2>Forgot Password?</h2>
              
              </div>
            <div>Create a new password to login into your account</div>
            <ForgotForm formData={formData} handleChange={handleChange} handleRoleChange = {handleRoleChange} handleSubmit={handleSubmit} role={role} />
          </>
        )}
        
      </form>
    </div>
    </div>
  );
};

export default ForgotPassword;
