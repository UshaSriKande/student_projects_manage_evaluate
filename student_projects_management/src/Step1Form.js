// Step1Form.js
import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';

const Step1Form = ({ formData, handleChange, nextStep,handleRoleChange,role}) => {
  const [isFirstNameFocused, setIsFirstNameFocused] = useState(false);
  const [isLastNameFocused, setIsLastNameFocused] = useState(false);
  const [isUserNameFocused, setIsUserNameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const navigate = useNavigate();
  const handlePasswordChange = (event) => {
    handleChange(event);

    // Check if passwords match
    setPasswordsMatch(event.target.value === formData.password);
  };

  console.log(passwordsMatch);

  const handleFocus = (field) => {
    if (field === 'firstName') {
      setIsFirstNameFocused(true);
    } else if (field === 'lastName') {
      setIsLastNameFocused(true);
    }else if (field === 'userName') {
        setIsUserNameFocused(true);
      }else if (field === 'password') {
        setIsPasswordFocused(true);
      }
      else if (field === 'email') {
        setIsEmailFocused(true);
      }
  };

  const handleBlur = (field) => {
    if (field === 'firstName') {
      setIsFirstNameFocused(formData.firstName !== '');
    } else if (field === 'lastName') {
      setIsLastNameFocused(formData.lastName !== '');
    }else if (field === 'userName') {
        setIsUserNameFocused(formData.userName !== '');
      }else if (field === 'password') {
        setIsPasswordFocused(formData.password !== '');
      }else if (field === 'email') {
        setIsEmailFocused(formData.email !== '');
      }
  };


  const isFormValid = () => {
    return (
      formData.firstName !== '' &&
      formData.lastName !== '' &&
      formData.userName !== '' &&
      formData.email !== '' &&
      formData.phone !== '' &&
      formData.password !== '' &&
      formData.confirmpassword !== '' &&
      passwordsMatch
    );
  };



  const handleLoginClick = () => {
    // Add logic to navigate to the login page
    navigate('/login'); // Replace '/login' with the actual path to your login page
  };


  const onRoleChange = (e) => {
    const selectedRole = e.target.value; // Get the selected role from the event
    handleRoleChange(selectedRole);
     // Call the handleRoleChange function passed from LoginForm.js
  };

  const handleNextClick = () => {
    if (isFormValid()) {
      // Proceed to the next step
      console.log("roleis role is role is");
      console.log(role);
      nextStep();
    } 
    else {
      // Display an error message or take appropriate action
      console.log('please fill all details')
      alert('Please fill out all required fields and ensure passwords match.');
    }
  };

  return (
    <>
    <div className='sign-up'>
    
    <div style={{ display: 'flex', gap: '10px' }}>

      <div className={`input-container ${isFirstNameFocused ? 'focused' : ''}`}>
      <label className={isFirstNameFocused ? 'label-float' : ''} style={{paddingLeft:'0px'}}>First Name<span className="required">*</span>:</label>

        <input style={{width:'150px'}}
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          onFocus={() => handleFocus('firstName')}
          onBlur={() => handleBlur('firstName')} required
        />
        
      </div>
      <div className={`input-container ${isLastNameFocused ? 'focused' : ''}`}>
        <label className={isLastNameFocused ? 'label-float' : ''} style={{paddingLeft:'0px'}}>Last Name<span className="required">*</span>:</label>
        <input style={{width:'150px'}}
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          onFocus={() => handleFocus('lastName')}
          onBlur={() => handleBlur('lastName')}
          required
        />
      </div>

      </div>

      <div className={`input-container ${isUserNameFocused ? 'focused' : ''}`}>
        <label className={isUserNameFocused ? 'label-float' : ''} style={{paddingLeft:'0px'}}>UserName-Ex(College ID)<span className="required">*</span>:</label>
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
      <div className={`input-container ${formData.email !== '' ? 'focused' : ''}`}>
    <label className={formData.email !== '' ? 'label-float' : 'label-sgn'}>Email<span className="required">*</span>:</label>
      <input style={{width:'330px'}}
        type="email"
        name="email"
        
        value={formData.email}
        onChange={handleChange} 
        required
      />
    </div>

    <div className={`input-container ${formData.phone !== '' ? 'focused' : ''}`}>
      <label className={formData.phone !== '' ? 'label-float' : ''}>Phone<span className="required">*</span>:</label>
      <input style={{width:'330px'}}
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />
    </div>
    <div style={{ display: 'flex', gap: '10px' }}>
    <div className={`input-container ${formData.password !== '' ? 'focused' : ''}`}>
      <label className={formData.password !== '' ? 'label-float' : 'label-sign'}>Password<span className="required">*</span>:</label>
      <input style={{width:'150px'}}
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
    </div>
    <div className={`input-container ${formData.confirmpassword !== '' ? 'focused' : ''}`}>
      <label className={formData.confirmpassword !== '' ? 'label-float' : 'label-sign'}>Confirm Password<span className="required">*</span>:</label>
      <input style={{width:'150px'}}
        type="password"
        name="confirmpassword"
        value={formData.confirmpassword}
        onChange={handlePasswordChange}
        required
      />

{!passwordsMatch && (
          <div className="error-message" style={{color:'red'}}>Passwords do not match</div>
        )}
    </div>
    </div>
    </div>
      <div style={{paddingLeft:'15px',display:'flex',gap:'90px',marginRight:'00px'}}>
      <p>Already have an account?<Link to="/login" onClick={handleLoginClick}>Login</Link></p>
      
      <button type="button" onClick={handleNextClick} disabled={!isFormValid()}>Next</button>
      
      </div>
    </>
  );
};

export default Step1Form;
