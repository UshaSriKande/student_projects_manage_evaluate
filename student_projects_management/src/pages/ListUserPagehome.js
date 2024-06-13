import React, { useEffect, useState } from "react";
import Admin from "./Admin"
//import "./style.css"

import { useMyContext } from "./MyContext";
import axios from "axios" 
import {Link} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import TableWithPaginationhome from './TableWithPaginationhome';
import { useAuth } from "../AuthContext";
import '../style.css';
import  aboutImage from '../about.jpg';
import logo from '../logo.png';
import backgroundimage from '../background.jpg';

export default function ListUserPagehome(){
    const {user} = useAuth()
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers();
    }, []);
  
    function getUsers() {
        
      
        axios.get(`http://127.0.0.1:5000/api/listusers`
        ).then(function(response) {
            console.log(response.data);
            setUsers(response.data);
            //console.log("users");
            //console.log(users);
        });
    }
     
    const deleteUser = (id) => {
        axios.delete(`http://127.0.0.1:5000/userdelete/${id}`).then(function(response){
            console.log(response.data);
            getUsers();
        });
        alert("Successfully Deleted");
    }

    
   
    return (
    <div>
        <div style={{position:'relative',marginTop:'20px'}}>
        <div className='contai' style={{width:'1450px'}}>
      
        <div className="subheader" style={{height: '50vh',width: '100%', backgroundImage: `linear-gradient(rgba(4, 9, 30, 0.7), rgba(4, 9, 30, 0.7)),url(${backgroundimage})`,backgroundPosition:'center',backgroundSize:'center',color:'white',textAlign:'center',overflow:'hidden'}}><nav ></nav>
    <nav style={{marginTop:'0px',padding:'50px 70px'}}>
<img src={logo} alt='logo'></img>
        
        <br/>
        <br/>
        <br/>
        {/*<h1 style={{marginTop:'10px',marginLeft:'450px',fontSize:'30px'}}>List of Projects</h1>*/}
        <div className='nav-links'>
        <ul>
        <li><Link to ="/listhome" style={{color:'white', textDecoration:'none',fontSize:'17px'}}>Projects</Link></li>
        <li><Link to="/Home" style={{color:'white', textDecoration:'none',fontSize:'17px'}}>About</Link></li>
        <li><Link to ="/Login" style={{color:'white', textDecoration:'none',fontSize:'17px'}}>Login</Link></li>
        <li><Link to ="/Contact" style={{color:'white', textDecoration:'none',fontSize:'17px'}}>Contact</Link></li>
        </ul>
        <h1 style={{paddingBottom:'0px',marginRight:'550px'}}>List of Projects</h1>
        </div>
        
      </nav>
      {/*<h1 style={{paddingBottom:'0px'}}>List of Projects</h1>*/}
      </div>
      </div>
                    
      <TableWithPaginationhome data={users} itemsPerPage={5} />
    </div>
                
            </div>
       
  );
}
