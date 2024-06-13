
import React, {  useState,useEffect } from "react";
import { useMyContext } from "../pages/MyContext";
import axios from "axios" //npm install axios --save 
import "../pages/menu.css"
import Admin from "../pages/Admin";
import '../pages/style.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import { useAuth } from "../AuthContext";

const ListReview = () => {
 const {user} = useAuth();
/*
  const fetchDataFromBackend = () => {
    axios.post('http://localhost:5000/api/listbatch', { selectedOption })
      .then(response => {
        // Handle the response data from Flask
        setResponseData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };*/

  
  const basename = useMyContext;

  const [selectedOption, setSelectedOption] = useState('b');
  const [receivedData, setReceivedData] = useState(null);

  const [pdfUrl, setPdfUrl] = useState('');
  
  const [users, setUsers] = useState([]);
  

   

  useEffect(() => {
    sendDataToBackend(selectedOption);
  }, [selectedOption,user.year]);

  const sendDataToBackend = (value) => {
    // Send a POST request to your Flask API with the selected radio button value in the route
    const year = user.year;
    axios.get(`http://localhost:5000/api/reviewprojects/${value}/${year}`)
      .then(response => {
        // Handle the response from the backend and set the received data state
        console.log("response data");
        //console.log(response.data.Batches);
        //console.log(response.data.Problems);
        let batches = response.data;
        

        setReceivedData(response.data);
        setUsers(batches);
        
        
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

const deleteReview = (id, sec) => {
  const numericId = parseInt(id, 10);
  const year = user.year;
  axios.delete(`http://127.0.0.1:5000/reviewdelete/${numericId}/${sec}/${year}`)
    .then(function (response) {
      sendDataToBackend(selectedOption);
    });
  alert("Successfully Deleted");
};

const handleDownload = (id,year,sec) => {
    
  //window.open('http://localhost:5000/download/13', '_blank');
  const downloadUrl = `http://localhost:5000/downloadrev/${id}/${year}/${sec}`;
  setPdfUrl(downloadUrl);
  console.log(downloadUrl);
  console.log(pdfUrl);
    // Open the download URL in a new tab/window
    window.open(downloadUrl, '_blank');
  
};


  return (
    
    <div className="">
      <h2 style={{marginLeft:'30px',color:'Gray'}}>Reviews</h2>
      
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
  
      <div className="table-container" style={{ background:"FFF", marginBottom: '20px' }}>
          <div class="text-with-line" style={{display:"flex"}}>
          
          
          </div>
          <table className="table table-bordered table-striped" style={{ marginTop: '20px' }}>
            <thead>
              <tr>
                <th>Review No</th>
                <th>Review Date</th>
                <th>Mode of Review</th>
                <th>Location</th>
                <td>Action</td>
                <td>PDF</td>
              </tr>
            </thead>
            <tbody>

            {users.map((user, key) =>
                                <tr key={key}>
                                    <td>{user.reviewid}</td>
                                    <td>{user.reviewdate}</td>
                                    <td>{user.reviewmode}</td>
                                    <td>{user.reviewdescription}</td>
                                    <td><Link
                    to={`user/${user.reviewid}/${selectedOption}/${user.year}/editreview`}
                    className="btn btn-success btn-list-rev"
                    style={{width:'300px' ,marginRight: "5px"}}
                  >
                    <FontAwesomeIcon icon={faEdit} /> 
                  </Link>

                  <button
                    onClick={() => deleteReview(user.reviewid,selectedOption)}
                    className="btn btn-danger btn-rev"
                    style={{width:'100px'}}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} /> 
                  </button></td>
                  <td><button onClick={() => handleDownload(user.reviewid,user.year,selectedOption)}>Download</button></td>
                                </tr>
                    )}

            </tbody>
          </table>

          <div class="text-with-line-top" style={{display:"flex"}}>
          
          </div>
       </div>

      {/*
      <div style={{marginTop:'30px'}}>
      
      <table className="table table-striped">
        <thead>
          <tr>
            <th >Review No</th>
            
            <th>Revie Date</th>
            <th>Mode</th>
            <th >Location</th>

            <th>Action</th>
            
          </tr>
        </thead>
        <tbody>
                            {users.map((user, key) =>
                                <tr key={key}>
                                    

                                    <td>{user.reviewid}</td>
                                    
                                    <td>{user.reviewdate}</td>
                                    <td>{user.reviewmode}</td>
                                    <td>{user.reviewdescription}</td>
                                    <td><Link
                    to={`user/${user.reviewid}/${selectedOption}/editreview`}
                    className="btn btn-success btn-list-rev"
                    style={{width:'300px' ,marginRight: "5px"}}
                  >
                    <FontAwesomeIcon icon={faEdit} /> 
                  </Link>

                  <button
                    onClick={() => deleteReview(user.reviewid,selectedOption)}
                    className="btn btn-danger btn-rev"
                    style={{width:'100px'}}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} /> 
                  </button></td>
                                </tr>)}

                          </tbody>
      </table>
    </div>
          */}
    </div>
  );
};

export default ListReview;
