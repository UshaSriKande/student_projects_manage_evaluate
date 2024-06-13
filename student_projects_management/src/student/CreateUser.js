import React, { useState ,useEffect } from "react";
//import { useMyContext } from "./MyContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../pages/style.css'
import "../pages/menu.css"
import Admin from "../pages/Admin"; 
import { useAuth } from "../AuthContext";

const CreateUser = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    title: "",
    category: "",
    domain: "",
    batch: "",
    description: ""
  });
  const [selectedOption, setSelectedOption] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [dropdownValues, setDropdownValues] = useState([]);

  useEffect(() => {
    fetchOptions(selectedOption, user.year);
  }, [selectedOption, user.year]);

  const fetchOptions = async (value, year) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/listbatch/${value}/${year}`);
      setDropdownValues(response.data.map(item => item));
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSectionChange = (event) => {
    setSelectedOption(event.target.value);
  };
/*
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const year = user.year;
      const { title, category, domain, batch, description} = inputs;
      
      const value = selectedOption;
      await axios.post(`http://127.0.0.1:5000/api/useradd/${value}/${year}`, {
        title,
        category,
        domain,
        batch,
        description
      });
      navigate('/list');
    } catch (error) {
      handleErrorMessage(error.response?.data?.error || "Failed to submit project");
    }
  };
  */

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = selectedOption;
    const year = user.year;
    console.log("year");
    console.log(year);
    axios.post(`http://127.0.0.1:5000/api/useradd/${value}/${year}`, inputs)
      .then(function(response) {
        console.log("response for create is");
        console.log(response.data);
        navigate('/liststudent');
      })
      .catch(function(error) {
        handleErrorMessage(error.response?.data?.error || "Failed to submit project,The batch is already submitted");
      });
   /*
    axios.post(`http://127.0.0.1:5000/api/useradd/${value}/${year}`, inputs).then(function(response){
      console.log("response for create is");
        console.log(response.data);
        navigate('/liststudent');
    });*/
      
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
       
      <h2 style={{marginLeft:'30px',color:'Gray'}}>Project</h2>
      </div>
    <div className='page-body-creat-proj'>
    <div className='row-creat-proj' style={{marginTop:'30px'}}>
      <div className='col-md-12-creat-proj'>
        <div className='panel-creat-proj'>
          <div className='panel-head-creat-proj'>
            <h5 className='panel-title-creat-proj'>Add Project</h5>
            
          </div>
          <div className='panel-body-creat-proj'>
            <form onSubmit={handleSubmit}>

            <div className='row-creat-proj'>
              <div className='col-md-12-creat-proj'>
                  <div className='form-group-creat-proj'>
                    <div style={{display:"flex"}}>
                    <label className="relative-label">Project Title:</label>
                    {errorMessage && 
                    <div className={errorMessage} style={{marginLeft:'600px',marginBottom:'00px'}}>
          <span style={{color:'red'}}>{errorMessage}</span>
          <button className ='error-btn' onClick={handleCloseError}>×</button>
        </div>
        
      }</div>
                    <br/>
                    <input type="text" name='title'  placeholder="Title of the Project" className='form-control-creat-proj' onChange={handleChange}/>
                   
                  </div>
                </div>
              </div>

              <div className='row-creat-proj creat-proj-dis' style={{display:"flex"}}>
                <div className='col-md-6-creat-proj'>
                  <div className='form-group-creat-proj'>
                    <label className="relative-label">Section:</label><br/>
                    <select  className='form-control-creat-proj' required name='section' onChange={handleSectionChange}>
                      <option value=" ">Select Section</option>
                      <option value="a">A</option>
                      <option value="b">B</option>
                      <option value="c">C</option>
                    </select>
                  </div>
                </div>
                <div className='col-md-6-creat-proj '>
                  <div className='form-group-creat-proj'>
                    <label className="relative-label">Select Category :</label><br/>
                    <div className="form-control-creat-proj">
                    <label className="relative-label" style={{padding:'10px',paddingRight:'20px'}}><input type="radio" name="category" value="software"  onChange={handleChange} style={{padding:'50px'}} />SOFTWARE</label>
                    <label className="relative-label"><input type="radio" name="category" value="hardware"  onChange={handleChange} />Hardware</label>
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
                    <label className="relative-label">Choose Domain:</label><br/>
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
                    <label className="relative-label">Choose BatchNumber:</label><br/>
                    <select  className='form-control-creat-proj'  name='batch' onChange={handleChange} required>
                      <option value=" ">Choose Batchno</option>
                      {dropdownValues.map((option, index) => (
                      <option key={index} value={option}>
                        {"Batch"+option}
                      </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              <div className='row-creat-proj'>
              <div className='col-md-12-creat-proj'>
                  <div className='form-group-creat-proj'>
                    <label className="relative-label">Project Description:</label><br/>
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
      <center>
        
        <div className="create_user" style={{
            marginLeft:'430px',
            marginRight:'190px',
            marginTop:'180px',
            marginBottom:'180px',
            background: '#f2f2f2',
            paddingLeft:'200px',
            paddingRight: '200px',
            borderRadius: '20px',
            border: '1px solid #ccc',
            
            maxWidth: '800px'}}>
            <div className="container h-100">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">
                    <center><h1>Create Project</h1></center>
                    <center>
                    <form onSubmit={handleSubmit}>
                    
                        <div className="mb-3">
                          <label>Project Title</label>
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
                         
                          <label for="domain">Choose a Domain:</label>
                         
                          <select name="domain"  onChange={handleChange} style={{marginBottom:'10px'}} value={selectedOption} placeholder='batch3'>
                          <option></option>
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

                        <div className="mb-3">
                        
                          <label for="section">Choose a Section:</label>
                          <select name="section"  onChange={handleChange} style={{marginBottom:'10px'}}>
                          <option></option>
                            <option value="a">A</option>
                            <option value="b">B</option>
                            <option value="c">C</option>
                            
                            </select>
                          
                        </div>

                        

                        

                        <div className="mb-3">
                      
                      <label for="batch">Choose a Batch:</label>
                      <select name="batch" onChange={handleChange}>
                        
                      {dropdownValues.map((option, index) => (
          <option key={index} value={option}>
            {"Batch"+option}
          </option>
        ))}

        </select>
            </div>

                        <button type="submit" name="add" className="btn btn-primary">Save</button>
                        
                    </form></center>
                    
                    
                    </div>
                   
                </div>
            </div>
        </div>
        </center>*/

      );
    }

    export default CreateUser;
