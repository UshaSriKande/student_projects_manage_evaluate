import React, { useState, useEffect  } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Admin from './Admin';
import './menu.css';
import './style.css'

export default function EditReview(){
  
  const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);
    const { id, sec, year } = useParams();
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');
    
    useEffect(() => {
        console.log("inputs is: ", inputs);
    }, [inputs]); // Run this effect whenever inputs change

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(prevInputs => ({...prevInputs, [name]: value}));
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('reviewno', id);
      formData.append('date', inputs.reviewdate);
      formData.append('sec', sec);
      formData.append('year', year);
      formData.append('reviewmode', inputs.reviewmode);
      formData.append('reviewdescription', inputs.reviewdescription);

      axios.put('http://127.0.0.1:5000/api/review_update/', formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      }).then(function(response){
          console.log(response.data);
          console.log('Review updated successfully');
          navigate('/listreview')
          // Redirect or navigate to another page after successful update
      }).catch(function(error) {
          console.error('Error:', error);
      });
    }


      return (
          
        <div>
      <div className=''>
      <h2 style={{marginLeft:'30px',color:'Gray'}}>Review</h2>
      </div>
    <div className='page-body'>
    <div className='row-rev' style={{marginTop:'30px'}}>
      <div className='col-md-12-rev'>
        <div className='panel'>
          <div className='panel-head'>
            <h5 className='panel-title'>Update/Change Review</h5>
          </div>
          <div className='panel-body'>
            <form onSubmit={handleSubmit}>
              <div className='row-rev'>
                <div className='col-md-12'>
                  <div className='form-group'>
                    <label className='relative-label'>Section:</label><br/>
                    <select value = {sec} className='form-control' required name='sec' onChange={handleChange} disabled>
                      <option value=" ">Select Section</option>
                      <option value="a">A</option>
                      <option value="b">B</option>
                      <option value="c">C</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className='row-rev'>
              <div className='col-md-12'>
                  <div className='form-group'>
                    <label className='relative-label'>Review Number:</label><br/>
                    <input type="text" name='reviewno' value= {id} placeholder="Reviee Id " className='form-control' onChange={handleChange} disabled/>
                  </div>
                </div>
              </div>
              
              <div className='row-rev' style={{display:"flex"}}>
              <div className='col-md-6-edit-rev'>
                  <div className='form-group'>
                    <label className='relative-label'>Review Date:</label><br/>
                    <input type="date" name='reviewdate' className='form-control' onChange={handleChange}/>
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
                    <input type="text" name="reviewdescription" className='form-control' onChange={handleChange}/>
                  </div>
                </div>
                <div className='col-md-6-edit-rev'>
                  <div className='form-group'>
                    <label className='relative-label'>Upload File:</label><br/>
                    <input type="file" name="reviewdescription" className='form-control' onChange={handleFileChange}/>
                  </div>
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

        /*
        <div className="edit-proj" style={{
            marginLeft:'430px',
            marginRight:'190px',
            marginTop:'180px',
            marginBottom:'180px',
            background: '#f2f2f2',
            paddingLeft:'200px',
            paddingRight: '200px',
            borderRadius: '20px',
            border: '1px solid #ccc',
            
            maxWidth: '800px'
        }}>
            <div  style={{ padding: '20px' }}>
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <center><h1 style={{ color: '#333' }}>Edit Review</h1></center>
                        <center>
                            <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                            <div className="mb-3">
                                    <label style={{marginBottom: '10px',marginRight:'30px' }}>Review Date</label>
                                    <input type="date" className="form-control" name="reviewdate" style={{width:'200px'}}
                                        onChange={handleChange} />
                                </div>

                                <div className="mb-3">
                                    <label style={{marginBottom: '10px',marginRight:'30px' }}>Review Link</label>
                                    <input type="text" className="form-control" name="reviewlink" style={{width:'200px'}}
                                        onChange={handleChange} />
                                </div>
                                
                                <button type="submit" name="add" className="btn btn-primary">Save</button>
                                <p>{inputs.name}</p>
                            </form>
                        </center>
                    </div>
                    <div className="col-2">

                    </div>
                </div>
            </div>
        </div>
        */
    );
    }

    