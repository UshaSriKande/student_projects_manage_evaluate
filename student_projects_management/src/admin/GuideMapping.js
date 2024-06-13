import React, { useEffect, useState } from "react";
import axios from "axios" //npm install axios --save 
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Admin from "../pages/Admin";
import '../pages/style.css';
import '../pages/menu.css';
import { useAuth } from "../AuthContext";

export default function GuideMapping(){
   const {user} = useAuth();
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    const [selectedOption1, setSelectedOption1] = useState('');

    
     
    const handleChange = (event) => {
      
        setSelectedOption1(event.target.value);
        console.log(selectedOption1);
        //setSelectedOption1(event.target.value);
        
        
      }
      const handleSubmit = (event) => {
        event.preventDefault();
        const year = user.year;
        axios.post('http://127.0.0.1:5000/api/guidemapping/', {selectedOption1,year}).then(function(response){
            console.log(response.data);
            navigate('/listbatch');
            //console.log(response.data)
        });
          
    }

    return (
      <div>
        
      <div className="guide-map">
          <div className="row h-100">
              <div className="col-12">

             
                  
                  <center>
                  <form onSubmit={handleSubmit}>
                  
                  <div className="mb-3">
                    
                    <label for="section" style={{color:'black',marginBottom:'30px'}} className="relative-label">Choose a section:</label>
                    <select name="section"  onChange={handleChange} style={{marginBottom:'30px'}}>
                      <option value=''></option>
                      <option value="a" >A</option>
                      <option value="b">B</option>
                      <option value="c">C</option>
                      
                      </select>
                    
                  </div>

                  
          

            <button type="submit" name="add" className="btn btn-primary">Save</button>
                  
              </form></center>
              <div>
    
   
  </div>



              </div>
          </div>
      </div>
  </div>
);
}

