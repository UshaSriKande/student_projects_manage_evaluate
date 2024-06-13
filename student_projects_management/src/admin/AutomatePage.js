import React, { useEffect, useState } from "react";
import axios from "axios" //npm install axios --save 
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import '../pages/style.css';
import '../pages/menu.css';
import Admin from "../pages/Admin";
import { useAuth } from "../AuthContext";

export default function AutomatePage(){
  const {user} = useAuth()
  
    const [inputs, setInputs] = useState('');
    const [inputs1, setInputs1] = useState('');
    const [selectedOption1, setSelectedOption1] = useState('A');

    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers(selectedOption1);
    }, [selectedOption1]);
  

    const getUsers = async (value) => {
      try {
        const year = user.year;
        const response = await axios.get(`http://127.0.0.1:5000/api/listautomatebatch/${year}/${value}`);
        setUsers(response.data || []);
        //console.log(value)
        //console.log(response);
        
        // Other dropdowns or options handling
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };


    const navigate = useNavigate();

    const handleChange = (event) => {
        
        
        setInputs(event.target.value);
    }

    const handleselectChange = (event) => {
        
        
        setInputs1(event.target.value);
        setSelectedOption1(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const year = user.year;
        axios.post(`http://127.0.0.1:5000/api/automate/${year}`, {inputs,inputs1}).then(function(response){
            console.log(response.data);
            navigate('/listbatch');
        });
          
    }

    const deleteUser = (id,sec,guide) => {
        axios.delete(`http://127.0.0.1:5000/api/batchdelete/${id}/${sec}/${guide}`).then(function(response){
            console.log(response.data);
            getUsers();
            navigate('/listbatch');
        });
    }


    return (
        <div>
      <div className=''>
      <h2 style={{marginLeft:'30px',color:'Gray'}}>Automate Batch Dividing</h2>
      </div>
    <div className='page-body-automate'>
    <div className='row-automate' style={{marginTop:'30px'}}>
      <div className='col-md-12-automate'>
        <div className='panel-automate'>
          <div className='panel-head-automate'>
            <h5 className='panel-title-automate'>Add Batches</h5>
           
          </div>
          <div className='panel-body-automate'>
            <form onSubmit={handleSubmit}>

            <div className='row-automate'>
              <div className='col-md-12-automate'>
                  <div className='form-group-automate'>
                    <label className="relative-label">Number of Groups:</label><br/>
                    <input type="text" name='reviewno' placeholder="Number ..... " className='form-control-automate' onChange={handleChange}/>
                  </div>
                </div>
              </div>
              <div className='row-automate'>
                <div className='col-md-12-automate'>
                  <div className='form-group-automate'>
                    <label className="relative-label">Section:</label><br/>
                    <select className='form-control-automate' required name='sec' onChange={handleselectChange}>
                      <option value=" ">Select Section</option>
                      <option value="a">A</option>
                      <option value="b">B</option>
                      <option value="c">C</option>
                    </select>
                  </div>
                </div>
              </div>
              
            
             
              <div className='panel-footer-automate text-right'>
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
        
        <div className="automate-bat">
            <div className="row h-100">
                <div className="col-12">
                <center>
                <form onSubmit={handleSubmit}>
                    
                        <div style={{
            marginLeft:'250px',
            marginRight:'200px',
            marginTop:'10px',
            marginBottom:'30px',
            background: '#f2f2f2',
            paddingLeft:'50px',
            paddingRight: '200px',
            borderRadius: '20px',
            border: '1px solid #ccc',
            
            maxWidth: '300px',
            maxHeight:'200px'}}>
                <div className="mb-3">
                          <label>Number of Groups</label>
                          <input type="text" className="form-control" name="title" 
                          onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                      
                      <label for="section">Choose a section:</label>
                      <select name="section"  onChange={handleselectChange}>
                      <option></option>
                        <option value="a">A</option>
                        <option value="b">B</option>
                        <option value="c">C</option>
                        
                        </select>
                      
                    </div>
                   

                    <button type="submit" name="add" className="btn btn-primary">Save</button>
                    </div>
                    <div className="table-aut">
                    <table class="table table-bordered table-striped" style={{marginLeft:'100px'}}>
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
                                        <button onClick={() => deleteUser(user.batchid)} className="btn btn-danger">Delete</button>
                                        </td>
                                        <td>
                                        <Link to={`user/${user.batchid}/${user.section}/${user.guidename}/editguide`} className="btn btn-success" style={{marginRight: "0px"}}>Edit</Link>
                            </td>
                                </tr>)}

                          </tbody>
                        </table>
                        </div>
                    
                </form>
                </center>
                
                </div>
            </div>
        </div>
    </div>*/
  );
}
