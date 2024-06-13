// src/Step2Form
import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import Select from 'react-select';
const Step2Form = ({ formData, handleChange, prevStep,  handleSubmit,role,setFormData }) => {
  const [isDepartmentFocused, setIsDepartmentFocused] = useState(false);
  const [isSectionFocused, setIsSectionFocused] = useState(false);
  const [isyearFocused, setIsyearFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isCgpaFocused, setIsCgpaFocused] = useState(false);
  const [isDomainFocused, setIsDomainFocused] = useState(false);
  const [selectedValue1, setSelectedValue1] = useState([]);
  const [selectedValue2, setSelectedValue2] = useState([]);

  const [sections, setSections] = useState([]);
  const [domains, setDomains] = useState([]);

  console.log("role");
  console.log(role);
  const navigate = useNavigate();
  const handlePasswordChange = (event) => {
    handleChange(event);

    // Check if passwords match
    
  };


  const handleFocus = (field) => {
    if (field === 'department') {
      setIsDepartmentFocused(true);
    } else if (field === 'section') {
      setIsSectionFocused(true);
    }else if (field === 'year') {
        setIsyearFocused(true);
      }else if (field === 'password') {
        setIsPasswordFocused(true);
      }
      else if (field === 'cgpa') {
        setIsCgpaFocused(true);
      }
      else if (field === 'domain') {
        setIsDomainFocused(true);
      }
  };

  const handleBlur = (field) => {
    if (field === 'department') {
      setIsDepartmentFocused(formData.department !== '');
    } else if (field === 'lastName') {
      setIsSectionFocused(formData.section !== '');
    }else if (field === 'year') {
        setIsyearFocused(formData.year !== '');
      }else if (field === 'password') {
        setIsPasswordFocused(formData.password !== '');
      }else if (field === 'cgpa') {
        setIsCgpaFocused(formData.cgpa !== '');
      }
      else if (field === 'domain') {
        setIsCgpaFocused(formData.domain !== '');
      }
  };

  const options = [
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
    { label: 'C', value: 'c' },

  ];

  const options1 = [
    { label: 'Web Development', value: 'Web Development' },
    { label: 'Machine Learning', value: 'Machine Learning' },
    { label: 'Deep Learning', value: 'Deep Learning' },
    { label: 'Cloud Computing', value: 'Cloud Computing' },
    { label: 'NLP', value: 'NLP' },
    { label: 'Block Chain', value: 'Block Chain' },
    {label:'Android Development',value:'Android Development'},
    { label: 'Image Processing', value: 'Image Processing' },
    {label:'Artificial Intelligence',value:'Artificial Intelligence'},
    {label:'Data Science',value:'Data Science'}

  ];
    
  const setFormDataValue = (name, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  
  const handleSelectChange1 = (SelectedValue1) => {
    const selectsections = SelectedValue1.map(option => option.value);
    
    setSelectedValue1(SelectedValue1);
    setSections(selectsections);
    setFormData({ ...formData, sections: selectsections }); // Update formData state
    console.log("selec");
    console.log(selectedValue1.value);
  };
  console.log("selected values");
 console.log(selectedValue1);
 console.log("selected values");
 console.log(sections);

 const handleSelectChange2 = (SelectedValue2) => {
  const selectdomains = SelectedValue2.map(option => option.value);
  setSelectedValue2(SelectedValue2);
  setDomains(selectdomains);
  setFormData({...formData,domains:selectdomains});
  console.log("selec");
  console.log(selectedValue2.value);
};
console.log("selected values");
 console.log(selectedValue2);

 console.log("selected values");
 console.log(domains);
 return(
  <>
  {role === 'student' && (
    <>
  <div className='sign-up'>
    
  <div className={`input-container ${isDepartmentFocused ? 'focused' : ''}`}>
    <label className={isDepartmentFocused ? 'label-float' : ''} style={{paddingLeft:'0px'}}>Department<span className="required">*</span>:</label>
      
    <select
  style={{ width: '350px' ,padding:'10px'}}
  name="department"
  onChange={handleChange}
  onFocus={() => handleFocus('department')}
  onBlur={() => handleBlur('department')}
  required
>
  <option></option>
  <option value="cse">CSE</option>
  <option value="it">IT</option>
  <option value="aids">AIDS</option>
  <option value="ece">ECE</option>
  {/* Add more options as needed */}
</select>
      
    </div>

  <div style={{ display: 'flex', gap: '10px' }}>

    
    <div className={`input-container ${isSectionFocused ? 'focused' : ''}`}>
      <label className={isSectionFocused ? 'label-float' : ''} style={{paddingLeft:'0px'}}>Section<span className="required">*</span>:</label>
        
    <select
  style={{ width: '170px' ,padding:'10px'}}
  name="section"
  onChange={handleChange}
  onFocus={() => handleFocus('section')}
  onBlur={() => handleBlur('section')}
  required
>
  <option></option>
  <option value="a">A</option>
  <option value="b">B</option>
  <option value="c">C</option>
  {/* Add more options as needed */}
</select>
    </div>

    <div className={`input-container ${isyearFocused ? 'focused' : ''}`}>
      <label className={isyearFocused ? 'label-float' : ''} style={{paddingLeft:'0px'}}>Current Year<span className="required">*</span>:</label>
      <input style={{width:'150px'}}
        type="number"
        name="year"
        onChange={handleChange}
        onFocus={() => handleFocus('year')}
        onBlur={() => handleBlur('year')}
        required
      />
    </div>

    </div>

    

    
    <div className={`input-container ${formData.cgpa!='' ? 'focused' : ''}`}>
    <label className={isCgpaFocused ? 'label-float' : ''}>CGPA<span className="required">*</span>:</label>
    <input style={{width:'330px'}}
      type="text"
      name="cgpa"
      
      onChange={handleChange} 
      required
    />
  </div>

  
  <div style={{ display: 'flex', gap: '10px' }}>
  <div className={`input-container ${formData.dob !== '' ? 'focused' : ''}`}>
    <label className={formData.dob !== '' ? 'label-float' : ''}><span className="required"></span>:</label>
    <input style={{width:'150px'}}
      type="date"
      name="dob"
      onChange={handleChange}
      required
    />
  </div>
  <div className={`input-container ${formData.gender !== '' ? 'focused' : ''}`}>
    <label className={formData.gender !== '' ? 'label-float' : ''}>Gender<span className="required">*</span>:</label>
     
    <select
  style={{ width: '170px' ,padding:'10px'}}
  name="gender"
  onChange={handleChange} required>
  <option></option>
  <option value="male">MALE</option>
  <option value="female">FEMALE</option>
  {/* Add more options as needed */}
</select>


  </div>
  </div>
  </div>
    <div style={{paddingLeft:'15px',display:'flex',gap:'150px',marginLeft:'20px'}}>
    
    
    <button type="button" onClick={prevStep}>Previous</button>
    <button type="submit" onClick={handleSubmit}>SUBMIT</button>
    
    </div>
    </>
  )}


{/*faculty role form*/}

{role === 'faculty' && (
    <>
  <div className='sign-up'>
    
  <div className={`input-container ${isDepartmentFocused ? 'focused' : ''}`}>
    <label className={isDepartmentFocused ? 'label-float' : ''} style={{paddingLeft:'0px'}}>Department<span className="required">*</span>:</label>
      
    <select
  style={{ width: '350px' ,padding:'10px'}}
  name="department"
  onChange={handleChange}
  onFocus={() => handleFocus('department')}
  onBlur={() => handleBlur('department')}
  required
>
  <option></option>
  <option value="cse">CSE</option>
  <option value="it">IT</option>
  <option value="aids">AIDS</option>
  <option value="ece">ECE</option>
  {/* Add more options as needed */}
</select>
      
    </div>

  <div style={{ display: 'flex', gap: '10px' }}>

    
    <div className={`input-container ${isSectionFocused ? 'focused' : ''}`}>
      <label className={isSectionFocused ? 'label-float' : ''} style={{paddingLeft:'0px'}}>Section<span className="required">*</span>:</label>
        
      <Select isMulti options={options}  onChange={handleSelectChange1} value={selectedValue1}/>
    </div>

    <div className={`input-container ${isyearFocused ? 'focused' : ''}`}>
      <label className={isyearFocused ? 'label-float' : ''} style={{paddingLeft:'0px'}}>Current Year<span className="required">*</span>:</label>
      <input style={{}}
        type="number"
        name="year"
        onChange={handleChange}
        onFocus={() => handleFocus('year')}
        onBlur={() => handleBlur('year')}
        required
      />
    </div>

    </div>

    

    
    <div className={`input-container ${isDomainFocused ? 'focused' : ''}`}>
      <label className={isDomainFocused ? 'label-float' : ''} style={{paddingLeft:'0px'}}>Domains<span className="required">*</span>:</label>
        
      <Select isMulti options={options1}  onChange={handleSelectChange2} value={selectedValue2}/>
    </div>

  
  <div style={{ display: 'flex', gap: '10px' }}>
  <div className={`input-container ${formData.dob !== '' ? 'focused' : ''}`}>
    <label className={formData.dob !== '' ? 'label-float' : ''}>Dateof Birth<span className="required">*</span>:</label>
    <input style={{width:'150px'}}
      type="date"
      name="dob"
      onChange={handleChange}
      required
    />
  </div>
  <div className={`input-container ${formData.gender !== '' ? 'focused' : ''}`}>
    <label className={formData.gender !== '' ? 'label-float' : ''}>Gender<span className="required">*</span>:</label>
     
    <select
  style={{ width: '170px' ,padding:'10px'}}
  name="gender"
  onChange={handleChange} required>
  <option></option>
  <option value="male">MALE</option>
  <option value="female">FEMALE</option>
  {/* Add more options as needed */}
</select>


  </div>
  </div>
  </div>
    <div style={{paddingLeft:'15px',display:'flex',gap:'150px',marginLeft:'20px'}}>
    
    
    <button type="button" onClick={prevStep}>Previous</button>
    <button type="submit" onClick={handleSubmit}>SUBMIT</button>
    
    </div>
    </>
  )}

  </>
  
  /*
  <>
    <div className={`input-container ${formData.email !== '' ? 'focused' : ''}`}>
      <label className={formData.email !== '' ? 'label-float' : ''}>Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
    </div>
    <div className={`input-container ${formData.password !== '' ? 'focused' : ''}`}>
      <label className={formData.password !== '' ? 'label-float' : ''}>Password:</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
    </div>
    <button type="button" onClick={prevStep}>Previous</button>
    <button type="button" onClick={nextStep}>Next</button>
  </>*/
)};

export default Step2Form;
