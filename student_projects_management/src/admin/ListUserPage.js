import React, { useEffect, useState } from "react";
import Admin from "../pages/Admin"
//import "./style.css"
import { useMyContext } from "../pages/MyContext";
import axios from "axios" 
import {Link} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import TableWithPagination from './TableWithPagination';
import { useAuth } from "../AuthContext";

export default function ListUserPage(){
    const {user} = useAuth()
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers();
    }, [user.year]);
  
    function getUsers() {
        const year = user.year;
        console.log("year is");
        console.log(year);
        axios.get(`http://127.0.0.1:5000/api/listusers/${year}`
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
        
        <div className="container h-100">
      
                    
      <TableWithPagination data={users} itemsPerPage={5} />
    </div>
                
            </div>
       
  );
}
