import React, { useState } from 'react';
import axios from 'axios';
import '../pages/style.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';


const ReviewSchedule = () => {
   const {user} = useAuth()

  const [date, setDate] = useState('');
  const [inputs,setinputs] = useState([]);
 const navigate = useNavigate();
 const [errorMessage, setErrorMessage] = useState('');

 const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setinputs(values => ({...values, [name]: value}));
    //setSelectedOption(event.target.value);
   
    //console.log(inputs);
}

  

  const handleSubmit = (event) => {
    event.preventDefault();
    const year=user.year;
    console.log(year);
    console.log(inputs)
    const formData = new FormData();
    formData.append('reviewno',inputs.reviewno);
    formData.append('date', inputs.date);
    formData.append('sec', inputs.sec);
    formData.append('reviewmode', inputs.reviewmode);
    formData.append('reviewdescription', inputs.reviewdescription);
    formData.append('year', inputs.year);
    formData.append('file', selectedFile);
    console.log("formdata is:",formData);
    console.log("final formdata is:",formData);
    axios.post('http://127.0.0.1:5000/api/review_sch/',formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(function(response){
        console.log(response.data);
        console.log(inputs)
        console.log('Date submitted successfully');
        navigate('/listreview');
    })
    .catch(function(error) {
      // Handle the error here
      console.error('Error:', error);
      handleErrorMessage(error.response?.data?.message || "The Review Numner is already submitted");
    });

}

const handleErrorMessage = (message) => {
  setErrorMessage(message);
};
const handleCloseError = () => {
  setErrorMessage(null);
};

  return (
    <div>
      <div className=''>
      <h2 style={{marginLeft:'30px',color:'Gray'}}>Review Schedule</h2>
      </div>
    <div className='page-body'>
    <div className='row-rev' style={{marginTop:'30px'}}>
      <div className='col-md-12-rev'>
        <div className='panel'>
          <div className='panel-head'>
            <h5 className='panel-title'>Add Review</h5>
            {errorMessage && 
                    <div className={errorMessage} style={{marginLeft:'600px',marginBottom:'00px'}}>
          <span style={{color:'red'}}>{errorMessage}</span>
          <button className ='error-btn' onClick={handleCloseError}>×</button>
        </div>
        
      }
          </div>
          <div className='panel-body'>
            <form onSubmit={handleSubmit}>
              <div className='row-rev'>
                <div className='col-md-12'>
                  <div className='form-group'>
                    <label className='relative-label'>Section:</label><br/>
                    <select className='form-control' required name='sec' onChange={handleChange}>
                      <option value=" ">Select Section</option>
                      <option value="a">A</option>
                      <option value="b">B</option>
                      <option value="c">C</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className='row-rev' style={{display:'flex'}}>
              <div className='col-md-6-edit-rev'>
                  <div className='form-group'>
                    <label className='relative-label'>Review Number:</label><br/>
                    <input type="text" name='reviewno' placeholder="Reviee Id " className='form-control' onChange={handleChange}/>
                  </div>
                </div>
                <div className='col-md-6-edit-rev'>
                  <div className='form-group'>
                    <label className='relative-label'>Year:</label><br/>
                    <input type="text" name='year' placeholder="Enter Year" className='form-control' onChange={handleChange}/>
                  </div>
                </div>
              </div>
              <div className='row-rev' style={{display:'flex'}}>
              <div className='col-md-6-edit-rev'>
                  <div className='form-group'>
                    <label className='relative-label'>Review Date:</label><br/>
                    <input type="date" name='date' className='form-control' onChange={handleChange}/>
                  </div>
                </div>
                <div className='col-md-6-edit-rev'>
                  <div className='form-group'>
                    <label className='relative-label'>Review Type:</label><br/>
                    <div className="form-control">
                    <select  className='form-control' required name='reviewmode' onChange={handleChange}>
                      <option value=" ">Select Type</option>
                      <option value="online">Online</option>
                      <option value="offline">Offline</option>
                      
                    </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row-rev' style={{display:'flex'}}>
              <div className='col-md-6-edit-rev'>
                  <div className='form-group'>
                    <label className='relative-label'>Review Description:</label><br/>
                    <input type="text" name='reviewdescription' className='form-control' onChange={handleChange}/>
                  </div>
                  </div>
                  <div className='col-md-6-edit-rev'>
                  <div className='form-group'>
                    <label className='relative-label'>Upload File:</label><br/>
                    <input type="file" name='reviewdescription' className='form-control' onChange={handleFileChange}/>
                  </div>
                  {fileName && <p>Selected File: {fileName}</p>}
                </div>

              </div>
              <div className='panel-footer text-right'>
              <button className='btn btn-primary m-1' type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    /*<center>
    <div className='review-sch' style={{
            marginLeft:'430px',
            marginRight:'190px',
            marginTop:'180px',
            marginBottom:'180px',
            background: '#f2f2f2',
            paddingTop:'20px',
            paddingLeft:'200px',
            paddingRight: '200px',
            borderRadius: '20px',
            border: '1px solid #ccc',
            
            maxWidth: '800px'}}>
   
      <form onSubmit={handleSubmit}>
      <h2>Schedule the Review</h2>
      <label>
          ReviewNo:
          <input type="text" name = "reviewno"  onChange={handleChange} />
        </label>
        
        <br></br>
        <br></br>
        <label>
          Date:
          <input type="date" name = "date"  onChange={handleChange} />
        </label>
        <br></br>
        <br></br>
        <label>
          Section:
          <input type="text" name = "sec"  onChange={handleChange} />
        </label>
        <br></br>
        <br></br>
        <label>
          Meeting Link:
          <input type="text" name = "url"  onChange={handleChange} />
        </label>
        <br></br>
        <br></br>
        <button type="submit">Submit</button>
        
      </form>
      
    </div>
    </center>
  */

   
  );
};

export default ReviewSchedule;
