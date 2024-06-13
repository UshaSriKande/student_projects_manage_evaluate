
import React, {  useState,useEffect } from "react";
import { useMyContext } from "./MyContext";
import axios from "axios" //npm install axios --save 
import "./menu.css"
import Admin from "./Admin";
import './style.css';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";


const ListBatch_NA = () => {
 const {user} = useAuth();


  const navigate = useNavigate();
  const basename = useMyContext;

  const [selectedOption, setSelectedOption] = useState('b');
  const [receivedData, setReceivedData] = useState(null);

  
  const [users, setUsers] = useState([]);
  const [users1, setUsers1] = useState([]);
  useEffect(() => {
    sendDataToBackend(selectedOption);
  }, [selectedOption,user.year]);

  const sendDataToBackend = (value) => {
    const year = user.year
    // Send a POST request to your Flask API with the selected radio button value in the route
    axios.get(`http://localhost:5000/api/batch/${value}/${year}`)
      .then(response => {
        // Handle the response from the backend and set the received data state
        console.log("response data");
        //console.log(response.data.Batches);
        //console.log(response.data.Problems);
        let batches = response.data.groups;
        let problems = response.data.Problems;

        setReceivedData(response.data);
        setUsers(batches);
        setUsers1(problems)
        
        //setUsers(response.data.Problems)
      })
      .catch(error => {
        // Handle error
        console.error('Error:', error);
      });
}

const handleOptionChange = (event) => {
  if (event && event.target && event.target.value) {
      setSelectedOption(event.target.value);
    }
  
};
console.log("users");
console.log(users);
console.log("");
console.log(users1);
const data = users;
const data1 = users1;
const uniqueBatchIds = [...new Set(data.map(student => student.batchid))];

const deleteUser = (id,sec,guide) => {
  axios.delete(`http://127.0.0.1:5000/api/batchdelete/${id}/${sec}/${guide}`).then(function(response){
      console.log(response.data);
      sendDataToBackend(selectedOption);
      navigate('/listbatch')

  });
  //alert("Successfully Deleted");
}

const deleteStudent = (id,sec,Student1) => {
  const inputData2 = {
    // Assuming inputs is an object containing form data
    // Add additional parameters to the data object as needed
    id: id,
    sec:sec,
    Student1: Student1
};
console.log("inputdata");
console.log(inputData2);

axios.put(`http://127.0.0.1:5000/api/batchdeletestudent/`, inputData2)
    .then(function(response) {
        console.log(response.data);
        sendDataToBackend(selectedOption);
        navigate('/listbatch');
        sendDataToBackend();
    })
    .catch(function(error) {
        console.error('Error updating batch:', error);
    });
  //alert("Successfully Deleted");
}
  return (
    <div>
      {/*
      <center>
        <div className="list_bat">
      <form className="list-batch">
        
        <label style={{marginRight:'20px',marginBottom:'20px'}}>Choose a Section:</label>
        <label>
          A
          <input
            type="radio"
            name="option"
            value="a"
            checked={selectedOption === 'a'}
            onChange={handleOptionChange}
          />
        </label>
        <label>
          B
          <input
            type="radio"
            name="option"
            value="b"
            checked={selectedOption === 'b'}
            onChange={handleOptionChange}
          />
        </label>
        <label style={{marginBottom:'20px'}}>
          C
          <input
            type="radio"
            name="option"
            value="c"
            checked={selectedOption === 'c'}
            onChange={handleOptionChange}
          />
        </label>
        </form>
      </div>
      </center>
  */}
      
      <h2 style={{marginLeft:'30px',color:'Gray'}}>Groups</h2>
      
        <div className="table-container" style={{ marginTop:'30px',background:"FFF", marginBottom: '20px' }}>
          <div class="text-with-line" style={{marginBottom:'30px',width:'100%'}}>
          <h2 style={{marginLeft:"0px"}}>Search by Section</h2>
          </div>
          <select style={{marginLeft:"30px",paddingLeft:"30px",width: '95%',height:'45px'}} onChange={handleOptionChange}>
          <option value="">Choose Section</option>
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
        </select>
          </div>
          
        
      

      {/* Display fetched data */}
      {/*
      <div>
      
      <table className="table table-striped" style={{marginTop:'20px'}}>
        <thead>
          <tr>
            <th >Batch ID</th>
            
            <th >Student ID</th>
            <th>Full Name</th>
            
            <th>Phone Number</th>
            
            <th>GuideName</th>
            
          </tr>
        </thead>
        <tbody>
          {uniqueBatchIds.map((batchId, index) => {
            const batchStudents = data.filter(student => student.batchid === batchId);
            
            

            return (
              <React.Fragment key={index}>
                {batchStudents.map((student, studentIndex) => (
                  <tr key={`${index}-${studentIndex}`}>
                    {studentIndex === 0 ? (
                      <td rowSpan={batchStudents.length} >{batchId}</td>
                    ) : null}
                    <td >{student.studentid}</td>
                    <td>{student.full_name}</td>
                    
                    <td>{student.phn}</td>
                    {studentIndex === 0 ? (
                      <td rowSpan={batchStudents.length} >{student.guidename}</td>
                    ) : null}
                    
                  </tr>
                ))}
              </React.Fragment>
            );
            
            
            
              
          })}
          
        </tbody>
        </table>
    </div>
    */}

{data.map((group, index) => (
        <div key={index} className="table-container" style={{ background:"FFF", marginBottom: '20px' }}>
          <div class="text-with-line" style={{display:"flex"}}>
          <h2 style={{paddingRight:"480px"}}>Batch Number: Batch{group.batchNumber}</h2>
          <h4>Guide:{group.guidename}</h4>
          </div>
          <table className="table table-bordered table-striped" style={{ marginTop: '20px' }}>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Full Name</th>
                <th>Phone Number</th>
                
              </tr>
            </thead>
            <tbody>

              {group.students &&
              group.students.map((student, studentIndex) => (
                <tr key={studentIndex}>
                  <td>{student.studentid}</td>
                  <td>{student.full_name}</td>
                  <td>{student.phn}</td>
                  
                </tr>
              ))}

            </tbody>
          </table>

          <div class="text-with-line-top" style={{display:"flex"}}>
          
          </div>
          
        </div>
      ))}
        </div>

  );
};

export default ListBatch_NA;
