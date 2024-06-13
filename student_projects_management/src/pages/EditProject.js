import React, { useState, useEffect  } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Admin from './Admin';
import './menu.css';
import './style.css'

export default function EditProject(){
  
    const navigate = useNavigate();
  
    const [inputs, setInputs] = useState([]);
    const [inputs1, setInputs1] = useState([])
    const {id} = useParams('id');
    const {sec} = useParams('sec');
    const {year} = useParams('year');
    const [forceRender, setForceRender] = useState(false);
    
    useEffect(() => {
        getUser();
    }, []);
  
    function getUser() {
        axios.get(`http://127.0.0.1:5000/api/user/${id}/${sec}/${year}`).then(function(response) {
            console.log(response.data);
            //setInputs(response.data);
        });
    }
  

    const handleClick = () => {
      // Toggle forceRender to trigger a re-render
      setForceRender(prevState => !prevState);
    };
    
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
        console.log(inputs)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);
        console.log(id);
        console.log(sec);
        axios.put(`http://127.0.0.1:5000/api/userupdate/${id}/${sec}/${year}`, inputs).then(function(response){
            console.log(response.data);
            navigate('/list');
        });
          
    }
    /*
    return (
        <div>
          
            <div className="edit-proj">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">
                    <center><h1>Create Project</h1></center>
                    <center>
                    <form onSubmit={handleSubmit}>
                    
                        <div className="mb-3">
                          <label>Problem Title</label>
                          <input type="text" className="form-control" name="title" 
                          onChange={handleChange} />
                        </div>


                        <div className="mb-3">
                        <label>Category</label>
          <label>
            <input
              type="radio"
              name="category"
              value="software"
              
              onChange={handleChange}
            />
            SOFTWARE
          </label>
          <label>
            <input
              type="radio"
              name="category"
              value="hardware"
              
              onChange={handleChange}
            />
            hardware
          </label>
        </div>

                        <div className="mb-3">
                          <label>Domain Name</label>
                          <label for="domain">Choose a domain:</label>
                         
                          <select name="domain"  onChange={handleChange}>
                          <option></option>
                            <option value="Web Development">Web Development</option>
                            <option value="Machine Learning">Machine Learning</option>
                            <option value="Deep Learning">Deep Learning</option>
                            <option value="Cloud Computing">Cloud Computing</option>
                            <option value="Cyber Security">Cyber Security</option>
                            <option value="NLP">NLP</option>
                            <option value="Blockchain">Blockchain</option>
                            <option value="Android Development">Android Development</option>
                            <option value="Artificial Intelligence">Artificial Intelligence</option>
                            </select>
                          
                        </div>

                        <div className="mb-3">
                        
                          <label for="section">Choose a section:</label>
                          <select name="section"  onChange={handleChange}>
                          <option></option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            
                            </select>
                          
                        </div>

                        

                        

                        <button type="submit" name="add" className="btn btn-primary">Save</button>
                        <p>{inputs.name}</p>
                    </form></center>
                    
                    
                    </div>
                    <div className="col-2">
                      
                    </div>
                </div>
            </div>
        </div>
      )*/

      return (

        <div>
      <div className=''>
       
      <h2 style={{marginLeft:'30px',color:'Gray'}}>Project</h2>
      </div>
    <div className='page-body-creat-proj'>
    <div className='row-creat-proj' style={{marginTop:'30px'}}>
      <div className='col-md-12-creat-proj'>
        <div className='panel-creat-proj'>
          <div className='panel-head-creat-proj'>
            <h5 className='panel-title-creat-proj'>Update/Edit Project</h5>
            
          </div>
          <div className='panel-body-creat-proj'>
            <form onSubmit={handleSubmit}>

            <div className='row-creat-proj'>
              <div className='col-md-12-creat-proj'>
                  <div className='form-group-creat-proj'>
                    <div style={{display:"flex"}}>
                    <label className='relative-label'>Project Title:</label>
                    </div>
                    <br/>
                    <input type="text" name='title'  placeholder="Title of the Project" className='form-control-creat-proj' onChange={handleChange}/>
                   
                  </div>
                </div>
              </div>

              <div className='row-creat-proj' style={{display:"flex"}}>
                <div className='col-md-6-creat-proj'>
                  <div className='form-group-creat-proj'>
                    <label className='relative-label'>Section:</label><br/>
                    <select  className='form-control-creat-proj' required name='section' value={sec}  disabled>
                      <option value=" ">Select Section</option>
                      <option value="a">A</option>
                      <option value="b">B</option>
                      <option value="c">C</option>
                    </select>
                  </div>
                </div>
                <div className='col-md-6-creat-proj'>
                  <div className='form-group-creat-proj'>
                    <label className='relative-label'>Select Category :</label><br/>
                    <div className="form-control-creat-proj">
                    <label className='relative-label' style={{padding:'10px',paddingRight:'20px'}}><input type="radio" name="category" value="software"  onChange={handleChange} style={{padding:'50px'}} />SOFTWARE</label>
                    <label className='relative-label'><input type="radio" name="category" value="hardware"  onChange={handleChange} />Hardware</label>
                    </div>
                  </div>
                </div>

              </div>

              
               
               {/*
              <div className='row-creat-proj'>
              <div className='col-md-12-creat-proj'>
                  <div className='form-group-creat-proj'>
                    <label>Select Category :</label><br/>
                    <label><input type="radio" name="category" value="software" className='form-control-creat-proj' onChange={handleChange}/>SOFTWARE</label>
                    <label><input type="radio" name="category" value="hardware" className='form-control-creat-proj' onChange={handleChange} />Hardware</label>
                  </div>
                </div>

              </div>
               */}
              <div className='row-creat-proj'>
              <div className='col-md-12-creat-proj'>
                  <div className='form-group-creat-proj'>
                    <label className='relative-label'>Choose Domain:</label><br/>
                    <select  className='form-control-creat-proj'  name='domain' onChange={handleChange} required>
                      <option value=" ">Choose Domain</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Machine Learning">Machine Learning</option>
                            <option value="Deep Learning">Deep Learning</option>
                            <option value="Cloud Computing">Cloud Computing</option>
                            <option value="Cyber Security">Cyber Security</option>
                            <option value="NLP">NLP</option>
                            <option value="Block Chain">Block Chain</option>
                            <option value="Android Development">Android Development</option>
                            <option value="Artificial Intelligence">Artificial Intelligence</option>
                            <option value="Image Processing">Image Processing</option>
                            <option value="Data Science">Data Science</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className='row-creat-proj'>
              <div className='col-md-12-creat-proj'>
                  <div className='form-group-creat-proj'>
                    <label className='relative-label'>Choose BatchNumber:{id}</label><br/>
                    <select  className='form-control-creat-proj'  name='batch'  required value={sec} disabled>
                      
                      <option value={id}>{id}</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className='row-creat-proj'>
              <div className='col-md-12-creat-proj'>
                  <div className='form-group-creat-proj'>
                    <label className='relative-label'>Project Description:</label><br/>
                    <textarea name="description" placeholder="Enter Description" className='form-control-creat-proj' onChange={handleChange} style={{height:'100px'}}></textarea>
                  </div>
                </div>

              </div>
              <div className='panel-footer-creat-proj text-right-creat-proj'>
             
              <button className='btn btn-primary-creat-proj m-1-creat-proj' type="submit">Submit</button>
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
                        <center><h1 style={{ color: '#333' }}>Edit Project</h1></center>
                        <center>
                            <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>

                                <div className="mb-3">
                                    <label style={{marginBottom: '10px',marginRight:'30px' }}>Problem Title</label>
                                    <input type="text" className="form-control" name="title" style={{width:'200px'}}
                                        onChange={handleChange} />
                                </div>
                                <div className="mb-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div className="mb-3">
                                    <label style={{ marginBottom: '20px' ,marginRight:'20px'}}>Category</label>
                                    <label style={{ marginRight: '20px'}}>
                                        <input
                                            type="radio"
                                            name="category"
                                            value="software"
                                            onChange={handleChange}
                                        />
                                        SOFTWARE
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="category"
                                            value="hardware"
                                            onChange={handleChange}
                                        />
                                        hardware
                                    </label>
                                    </div>
                                </div>
                               
                                <div className="mb-3">
                                    
                                    <label htmlFor="domain" style={{marginRight:'40px',marginBottom:'200px'}}>Choose a domain:</label>
                                    <select name="domain" onChange={handleChange} style={{ width: '40%',marginBottom:'10px'}}>
                                        <option></option>
                                        <option value="Web Development">Web Development</option>
                                        <option value="Machine Learning">Machine Learning</option>
                            <option value="Deep Learning">Deep Learning</option>
                            <option value="Cloud Computing">Cloud Computing</option>
                            <option value="Cyber Security">Cyber Security</option>
                            <option value="NLP">NLP</option>
                            <option value="Blockchain">Blockchain</option>
                            <option value="Android Development">Android Development</option>
                            <option value="Artificial Intelligence">Artificial Intelligence</option>
                                        
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label style={{ paddingTop:'20px',marginBottom: '10px' }}>Choose a section:</label>
                                    <select name="section" onChange={handleChange} style={{ width: '40%' ,marginBottom:'10px'}}>
                                        <option></option>
                                        <option value="a">A</option>
                                        <option value="b">B</option>
                            <option value="c">C</option>
                                        
                                    </select>
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

    