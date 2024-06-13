import React, { useEffect, useState } from "react";
import axios from "axios" //npm install axios --save 
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import Admin from "../pages/Admin";
import '../pages/style.css';
import { useAuth } from "../AuthContext";

export default function CustomPage(){
  const {user} = useAuth()
    const navigate = useNavigate();
  
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOption1, setSelectedOption1] = useState('A');
  const [dropdownValues, setDropdownValues] = useState([]);
  const [dropdownValues1, setDropdownValues1] = useState([]);
  const [dropdownValues2, setDropdownValues2] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const [selectedValue1, setSelectedValue1] = useState([]);

  /*
useEffect(() => {
  // Fetch dropdown values from Flask API endpoint
  fetch('http://127.0.0.1:5000/api/dropdown_values',{selectedOption1})
    .then(response => response.json())
    .then(data => {
      setDropdownValues(data); // Set dropdown values in the state
    })
    .catch(error => {
      console.error('Error fetching dropdown values:', error);
    });
}, []);
*/
const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers(selectedOption1);
    }, [selectedOption1]);
  /*
    function getUsers(value) {
        axios.get('http://127.0.0.1:5000/api/listcustombatch/${value}'
        ).then(function(response) {
            console.log("users");
            console.log(response.data);
            setUsers(response.data || []);
        });
    }
     */

    const getUsers = async (value) => {
      try {
        const year = user.year;
        const response = await axios.get(`http://127.0.0.1:5000/api/listcustombatch/${year}/${value}`);
        setUsers(response.data || []);
        //console.log(value)
        //console.log(response);
        
        // Other dropdowns or options handling
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

useEffect(() => {
  
  fetchOptions(selectedOption1); // Fetch options based on initial selected value
}, [user.year,selectedOption1]);

const fetchOptions = async (value) => {
  try {
    const year=user.year;
    const response = await axios.get(`http://127.0.0.1:5000/api/dropdown_values/${year}/${value}`);
    setDropdownValues(response.data.options || []);
    setDropdownValues2(response.data.options.map(item => ({ label: item, value: item })));
    //console.log(value)
    //console.log(response);
    
    // Other dropdowns or options handling
  } catch (error) {
    console.error('Error fetching options:', error);
  }
};

useEffect(() => {
  
  fetchOptions1(selectedOption1); // Fetch options based on initial selected value
}, [selectedOption1]);

const fetchOptions1 = async (value) => {
  try {
    const year=user.year;
    const response = await axios.get(`http://127.0.0.1:5000/api/listguide/${year}/${value}`);
    setDropdownValues1(response.data || []);
    console.log(value)
    //console.log(response);
    
    // Other dropdowns or options handling
  } catch (error) {
    console.error('Error fetching options:', error);
  }
};

    const handleSelectChange = (event) => {
      const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
      setSelectedValue(selectedOptions);
      
    };

    

    const handleSelectChange1 = (SelectedValue1) => {
      setSelectedValue1(SelectedValue1);
    };
   console.log(selectedValue1);
    const handleChange = (event) => {
      
      setSelectedOption1(event.target.value);
      
    }

    const handleChange1 = (event) => {
      
      setSelectedOption(event.target.value);
      console.log(selectedOption);
      }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(selectedValue);
        const year = user.year;

       //console.log(selectedValue1.map(option => option.value));
        axios.post(`http://127.0.0.1:5000/api/customcreate/${year}`, {selectedValue:selectedValue1.map(option => option.value),selectedOption,selectedOption1}).then(function(response){
            console.log(response.data);
            navigate('/listbatch');
            //console.log(response.data)
        });
          
    }

    const deleteUser = (id,sec,guide) => {
      axios.delete(`http://127.0.0.1:5000/api/batchdelete/${id}/${sec}/${guide}`).then(function(response){
          console.log(response.data);
          getUsers();
          navigate('/listbatch')
      });
      //alert("Successfully Deleted");
  }
     
    return (
      
      <div>
      <div className=''>
      <h2 style={{marginLeft:'30px',color:'Gray'}}>Custom Batch Formation</h2>
      </div>
    <div className='page-body-custom'>
    <div className='row-custom' style={{marginTop:'30px'}}>
      <div className='col-md-12-custom'>
        <div className='panel-custom'>
          <div className='panel-head-custom'>
            <h5 className='panel-title-custom'>Add Batch</h5>
           
          </div>
          <div className='panel-body-custom'>
            <form onSubmit={handleSubmit}>
              <div className='row-custom'>
                <div className='col-md-12-custom'>
                  <div className='form-group-custom'>
                    <label className="relative-label">Section:</label><br/>
                    <select className='form-control-custom' required name='sec' onChange={handleChange}>
                      <option value=" ">Select Section</option>
                      <option value="a">A</option>
                      <option value="b">B</option>
                      <option value="c">C</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className='row-custom'>
              <div className='col-md-12-custom'>
                  <div className='form-group-custom'>
                    <label className="relative-label">Choose Guide:</label><br/>
                    
                    <select name="guide" className='form-control-custom' onChange={handleChange1} style={{marginBottom:'20px'}}>
                        <option value="">Choose Guide</option>
                      {dropdownValues1.map((option, index) => (
                        <option key={index} value={option}>{option}</option>))}
                      </select>
                  </div>
                </div>
              </div>
              
              <div className='row-custom'>
              <div className='col-md-12-custom'>
                  <div className='form-group-custom'>
                    <label className="relative-label">Select Students:</label><br/>
                    <Select isMulti options={dropdownValues2}  onChange={handleSelectChange1} value={selectedValue1}/>
                  </div>
                </div>
              </div>
              
              <div className='panel-footer-custom text-right'>
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
    <div>
      
        <div className="custom-bat">
            <div className="row h-100" >
                <div className="col-12" >

                 <div style={{
            marginLeft:'100px',
            marginRight:'200px',
            marginTop:'10px',
            marginBottom:'30px',
            background: '#f2f2f2',
            paddingLeft:'50px',
            paddingRight: '200px',
            borderRadius: '20px',
            border: '1px solid #ccc',
            
            maxWidth: '800px'}}>
                    <h1>Custom Project Dividing Form</h1>
                    <center>
                    <form onSubmit={handleSubmit}>
                    
                    <div className="mb-3">
                      
                      <label for="section">Choose a section:</label>
                      <select name="section"  onChange={handleChange}>
                        
                        <option value="a" checked={selectedOption1 === 'A'} checked >A</option>
                        <option value="b" checked={selectedOption1 === 'B'} checked>B</option>
                        <option value="c" checked={selectedOption1 === 'C'}>C</option>
                        
                        </select>
                      
                    </div>

                      

                    <div className="mb-3" style={{marginTop:'20px',marginBottom:'30px',widht:'200px'}}>
                      {/*
                      <label for="sec">Choose Students:</label>
                      <select name="sec" onChange={handleSelectChange} multiple>
                      {dropdownValues.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}

                      </select>

        
        <Select
        isMulti
        options={dropdownValues2}
        onChange={handleSelectChange1}
        value={selectedValue1}
      />

      
            </div>

            <div className="mb-3">
                      
                      <label for="guide">Choose Guide:</label>
                      <select name="guide" onChange={handleChange1} style={{marginBottom:'20px'}}>
                        <option value=""></option>
                      {dropdownValues1.map((option, index) => (
                        
          <option key={index} value={option}>
            {option}
          </option>
        ))}

        </select>

        
            </div>

              <button type="submit" name="add" className="btn btn-primary">Save</button>
                    
                </form></center>
                <div>
      
      <ul>
        {selectedValue.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      
    </div>
    </div>
    </div>
    <table class="table table-bordered table-striped" style={{marginLeft:'0px'}}>
                        <thead>
                            <tr>
                                <th>batch No</th>
                                
                                <th>Section</th>
                                <th>GuideName</th>  
                                <th>Actions(Batch)</th>
                                <th>Actions(Guide)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, key) =>
                                <tr key={key}>
                                    

                                    <td>{user.batchid}</td>
                                    
                                    <td>{user.section}</td>
                                    <td>{user.guidename}</td>
                                    <td>
                                        <Link to={`user/${user.batchid}/${user.section}/editbatch`} className="btn btn-success" style={{marginRight: "10px"}}>Edit</Link>
                                        <button onClick={() => deleteUser(user.batchid,user.section,user.guidename)} className="btn btn-danger">Delete</button>
                                      </td>
                                      <td>  
                                        <Link to={`user/${user.batchid}/${user.section}/${user.guidename}/editguide`} className="btn btn-success" style={{marginRight: "0px"}}>Edit</Link>
                            </td>
                                </tr>)}

                          </tbody>
                        </table>


                </div>
            </div>
        </div>*/
    
  );
}
