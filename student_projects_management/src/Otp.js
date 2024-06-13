// src/SignUpForm.js
import React, { useState, useEffect } from 'react';
import Step3Form from './Step3Form';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import profileImage from './images/profile.jpg';

const Otp = ({setIsOTPVerified}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    
    otp: '',
    
    
  });
  const [completedSteps, setCompletedSteps] = useState([]);
  
  
  

  useEffect(() => {
    const completed = [];
    
    if (formData.otp != '') {
      completed.push(1);
    }
   
    setCompletedSteps(completed);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData)
  
  console.log("otp is");
    console.log(formData.otp);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to server)
    console.log('Form submitted:', formData);
  };

  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOTP] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
 console.log("location");
  console.log(location);
  console.log("location email");
  console.log(location.state);
  console.log("formdata");
  console.log(formData);

  const handleVerifyOTP = (e) => { // Synchronous function to handle OTP verification
    e.preventDefault(); // Prevent default form submission behavior
  
    // Extract email from the location state
    //const { email } = location.state;
  
    // Log form data and OTP for debugging purposes
    console.log("formdata", formData);
    console.log("otp", formData.otp);
  
    // Send a POST request to verify OTP
    axios.post('http://localhost:5000/verify-otp', {
      email:location.state.email, // Email extracted from location state
      otp: formData.otp, // OTP from form data
    })
    .then(response => {
      // Check if verification response is empty
      if (!response) {
        throw new Error('Empty verification response received from the server');
      }
  
      // Update state to indicate OTP is verified
      setIsOTPVerified(true);
  
      // Navigate to the login page after successful OTP verification
      navigate('/login');
    })
    .catch(error => {
      console.error(error.message); // Log error message to console
      
      // Set error message state if applicable
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        console.error('An unexpected error occurred:', error); // Log unexpected errors
      }
    });
  };
  

  return (
    <div className="form-container">
        <div className="form-section1">
        <img src={profileImage} alt="Profile" className="input-image" />
      </div>
      <div className="form-section">
        
      

      <form onSubmit={handleVerifyOTP}>
        {step === 1 && (
          <>
          
            <div><h2>OTP</h2></div>
           
            <Step3Form formData={formData} handleChange={handleChange}  handleVerifyOTP={handleVerifyOTP}/>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </>
        )}
        
      </form>
    </div>
    </div>
  );
};

export default Otp;
