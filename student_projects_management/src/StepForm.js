// Step1Form.js
import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';

const StepForm = ({showRadioButtons ,formData, handleChange, handleSubmit,handleRoleChange,role}) => {
  
  const [isUserNameFocused, setIsUserNameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
 
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  
  const onRoleChange = (e) => {
    const selectedRole = e.target.value; // Get the selected role from the event
    handleRoleChange(selectedRole);
     // Call the handleRoleChange function passed from LoginForm.js
  };
    console.log("role is");
    console.log(role);
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
    navigate('/forgot-password'); // Replace '/login' with the actual path to your login page
  };

  return (
    <>
    <div class='sign-up'>
    <div class="radio-buttons-container" style={{position:'relative',display:'flex',marginBottom:'30px'}}>
          {/* Use labels with custom class */}
          <input type="radio" className='radio-sign' id="student" name="role" value="student" checked={role === 'student'} onChange={onRoleChange} />
          <label htmlFor="student" className="radio-button">Student</label>
  
          <input type="radio" className='radio-sign' id="faculty" name="role" value="faculty" checked={role === 'faculty'} onChange={onRoleChange} />
          <label htmlFor="faculty" className="radio-button">Faculty</label>
  
          <input type="radio" className='radio-sign' id="admin" name="role" value="admin" checked={role === 'admin'} onChange={onRoleChange} />
          <label htmlFor="admin" className="radio-button">Admin</label>
        </div>
      

    <div className={`input-container ${isUserNameFocused ? 'focused' : ''}`}>
        <label className={isUserNameFocused ? 'label-float' : ''} style={{paddingLeft:'0px'}}>User Name-Ex(College Id)<span className="required">*</span>:</label>
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
     
    
    <div className={`input-container ${formData.password!='' ? 'focused' : ''}`}>
      <label className={formData.password!='' ? 'label-float' : ''}>Password<span className="required">*</span>:</label>
      <input style={{width:'330px'}}
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <a><Link to="/forgot-password" onClick={handleForgotClick}>Forgot Password</Link></a>
    </div>
    
  
      
    
      
      <button type="button" onClick={handleSubmit} style={{width:'350px',borderRadius:'20px'}}>Submit</button>

      <p style={{width:'320px',borderRadius:'30px',border:'1px solid black',padding:'15px'}}>Dont Have an Account?<Link to="/signup" onClick={handleSignupClick}>Sign Up</Link></p>
      </div>
     
    </>
  );
};

export default StepForm;
