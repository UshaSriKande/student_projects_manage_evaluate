// src/Step3Form.js
import React from 'react';

const Step3Form = ({ formData, handleChange, handleVerifyOTP }) => {

  return(
    <>
    <div className='sign-up'>      
      <div className={`input-container ${formData.otp!='' ? 'focused' : ''}`}>
      <label style={{paddingBottom:'20px'}}>Enter OTP<span className="required" style={{paddingBottom:'20px'}}>*</span>:</label>
      <input style={{marginTop:'30px',width:'300px'}}
        type="text"
        name="otp"
        
        onChange={handleChange} 
        required
        
      />
    </div>
    </div>
      <div style={{paddingLeft:'0px',display:'flex',gap:'150px',marginLeft:'70px'}}>
      
      
      
    <button type="submit" onClick={handleVerifyOTP}>Submit</button>
      
      </div>
    </>
    /*
  <>
    <div className={`input-container ${formData.additionalInfo !== '' ? 'focused' : ''}`}>
      <label className={formData.additionalInfo !== '' ? 'label-float' : ''}>Additional Information:</label>
      <textarea
        name="additionalInfo"
        value={formData.additionalInfo}
        onChange={handleChange}
      />
    </div>
    <button type="button" onClick={prevStep}>Previous</button>
    <button type="submit" onClick={handleSubmit}>Submit</button>
  </>*/
)};

export default Step3Form;
