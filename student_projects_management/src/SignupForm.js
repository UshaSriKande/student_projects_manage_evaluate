// src/SignUpForm.js
import React, { useState, useEffect } from 'react';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import Step3Form from './Step3Form';
import axios from 'axios';

import profileImage from './images/profile.jpg';
import { useNavigate } from "react-router-dom";

const SignUpForm = ({isOTPVerified}) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone:'',
    password: '',
    additionalInfo: '',
    userName:'',
    confirmpassword:'',
    role:'',
    year:'',
    department:'',
    section:'',
    cgpa:'',
    gender:'',
    dob:'',
    sections:'',
    domains:''

  });
  const [completedSteps, setCompletedSteps] = useState([]);

  const [role, setRole] = useState('student'); // Define role state
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  useEffect(() => {
    const completed = [];
    if (formData.firstName !== '' && formData.lastName !== '') {
      completed.push(1);
    }
    if (formData.email !== '' && formData.password !== '') {
      completed.push(2);
    }
    if (formData.additionalInfo !== '') {
      completed.push(3);
    }
    setCompletedSteps(completed);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  formData.role=role;
  console.log("formdata is");
  console.log(formData);

  

const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare the form data to send

    const formDataToSend = {
        
        firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phone:formData.phone,
    password: formData.password,
    
    userName:formData.userName,
    confirmpassword:formData.confirmpassword,
    role:formData.role,
    year:formData.year,
    department:formData.department,
    section:formData.section,
    cgpa:formData.cgpa,
    gender:formData.gender,
    dob:formData.dob,
    sections:formData.sections,
    domains:formData.domains
        // Add more fields as needed
    };

    // Make a POST request using Axios
    axios.post('http://127.0.0.1:5000//submit_form', formDataToSend, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log(response.data);
        // Handle response from the server
        //navigate('/otp');
        console.log("otp verified")
        console.log(isOTPVerified);
        console.log("email for otp");
        console.log(formData.email);
        navigate('/otp',{ state: { email: formData.email } });
    })
    .catch(error => {
        console.error('Error:', error);
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data.error); // Assuming the error message is in a "message" field
        } else {
          setErrorMessage('An error occurred while submitting the form.'); // Fallback error message
        }
    });
};



  console.log("role is:")
  console.log(role);
  return (
    <div>
    {!isOTPVerified ? (
      <>
    <div>
    {errorMessage && <div className="error-msg" style={{color:'red'}}>{errorMessage}</div>}</div>
    <div className="form-container">
      
        <div className="form-section1" style={{}}>
        <img src={profileImage} alt="Profile" className="input-image" />
      </div>
      <div className="form-section">
      <div className="progress-bar">
        <div className={`step ${completedSteps.includes(1) ? 'active' : ''}`} onClick={() => setStep(1)}>
          Personal
        </div>
        <div className="line" style={{ background: completedSteps.includes(1) ? 'green' : '#ccc' }}></div>
        <div className={`step ${completedSteps.includes(2) ? 'active' : ''}`} onClick={() => setStep(2)}>
          Account
        </div>
        
        
      </div>
      
      

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <h2>Step 1: Personal Information</h2>
            <div class="radio-buttons-container" style={{position:'relative',display:'flex',marginBottom:'0px'}}>
          {/* Use labels with custom class */}
          <input type="radio" className='radio-sign' id="student"  value="student"  checked={role === 'student'} onChange={handleRoleChange} />
          <label htmlFor="student" className="radio-button">Student</label>
  
          <input type="radio" className='radio-sign' id="faculty"  value="faculty" checked={role === 'faculty'} onChange={handleRoleChange} />
          <label htmlFor="faculty" className="radio-button">Faculty</label>
          {/*
          <input type="radio" id="admin" name="role" value="admin" checked={role === 'admin'} onChange={handleRoleChange} />
        <label htmlFor="admin" className="radio-button">Admin</label>*/}
        </div>
            <Step1Form formData={formData} handleChange={handleChange} nextStep={nextStep} handleRoleChange = {handleRoleChange} role={role} />
          </>
        )}
        {step === 2 && (
          <>
            <h2>Step 2: College Information</h2>
            <Step2Form formData={formData} handleChange={handleChange} prevStep={prevStep} nextStep={nextStep} role={role} setFormData={setFormData} />
          </>
        )}
       
      </form>
    </div>
    </div>
    </>
    ):(
      <p>OTP verified successfully. Redirecting to the login page...</p>
    )}
    </div>
  );
};

export default SignUpForm;
