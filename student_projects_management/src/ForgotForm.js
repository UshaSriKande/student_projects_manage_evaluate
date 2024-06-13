// Step1Form.js
import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ForgotForm = ({ formData, handleChange, handleSubmit,handleRoleChange,role}) => {
  
  const [isUserNameFocused, setIsUserNameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const onRoleChange = (e) => {
    const selectedRole = e.target.value; // Get the selected role from the event
    handleRoleChange(selectedRole);
     // Call the handleRoleChange function passed from LoginForm.js
  };

    
  const navigate = useNavigate();
  const handlePasswordChange = (event) => {
    handleChange(event);

    // Check if passwords match
    setPasswordsMatch(event.target.value === formData.password);
  };

  console.log(passwordsMatch);

  const handleFocus = (field) => {
    if (field === 'userName') {
        setIsUserNameFocused(true);
      }
      else if (field === 'password') {
        setIsPasswordFocused(true);
      }
  };

  const handleBlur = (field) => {
    if (field === 'userName') {
        setIsUserNameFocused(formData.userName !== '');
      }
      else if (field === 'password') {
        setIsPasswordFocused(formData.password !== '');
      }
  };


  

  const handleSignupClick = () => {
    // Add logic to navigate to the login page
    navigate('/'); // Replace '/login' with the actual path to your login page
  };

  const handleForgotClick = () => {
    // Add logic to navigate to the login page
    navigate('/login'); // Replace '/login' with the actual path to your login page
  };
  
  return (
    <>
    <div class='sign-up'>

    <div className={`input-container ${isUserNameFocused ? 'focused' : ''}`}>
        <label className={isUserNameFocused ? 'label-float' : ''} style={{paddingLeft:'0px'}}>User Name-Ex(20B01A0568)<span className="required">*</span>:</label>
        <input style={{width:'330px'}}
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          onFocus={() => handleFocus('userName')}
          onBlur={() => handleBlur('userName')}
          required
        />
      </div>
     

      <div className={`input-container ${formData.email!='' ? 'focused' : ''}`}>
      <label className={formData.email!='' ? 'label-float' : ''}>Email<span className="required">*</span>:</label>
      <input style={{width:'330px'}}
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
    </div> 
    
    <div className={`input-container ${formData.password!='' ? 'focused' : ''}`}>
      <label className={formData.password!='' ? 'label-float' : ''}>Password<span className="required">*</span>:</label>
      <input style={{width:'330px'}}
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
    </div>
    

      
      <button type="button" onClick={handleSubmit} style={{width:'350px',borderRadius:'20px',marginBottom:'20px'}}>Submit</button>

      {/*<button type="button" className="forgot-button" style={{width:'350px',borderRadius:'20px',backgroundColor:'gray'}}></button>*/}
      <p style={{width:'240px',borderRadius:'30px',border:'1px solid black',paddingLeft:'100px',paddingTop:'10px',paddingBottom:'10px',backgroundColor:'gray'}}><Link to="/login" onClick={handleForgotClick}> <FontAwesomeIcon icon={faArrowLeft} /> Bank to Link</Link></p>
      
      
      </div>
     
    </>
  );
};

export default ForgotForm;
