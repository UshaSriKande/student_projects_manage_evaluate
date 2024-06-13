import React, { useState, useEffect  } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {Link} from 'react-router-dom';
export default function EditBatch(){
  
    const navigate = useNavigate();
  
    const [inputs, setInputs] = useState([]);
    const [options, setOptions] = useState([]);
    const [options1, setOptions1] = useState([]);
    const [Avail, setAvail] = useState([]);
    const {id} = useParams('id');
    const {sec} = useParams('sec');
    const {year} = useParams('year');
    const [Student1, setStudent1] = useState('');
    const [Student2, setStudent2] = useState('');
    const [StudentAvail, setStudentAvail] = useState('');
    const [Batch, setBatch] = useState('');
    const [DropdownValues,setDropdownValues] = useState([])


    const [showLoginForm, setShowLoginForm] = useState(false);

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  const [showLoginForm1, setShowLoginForm1] = useState(false);

  const toggleLoginForm1 = () => {
    setShowLoginForm1(!showLoginForm1);
  };
  const [showLoginForm2, setShowLoginForm2] = useState(false);

  const toggleLoginForm2 = () => {
    setShowLoginForm2(!showLoginForm2);
  };


  useEffect(() => {
  
    fetchOptions(id,sec,year); // Fetch options based on initial selected value
  }, [id,sec,year]);
  
  const fetchOptions = async (id,sec,year) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/dropdown_batches/${id}/${sec}/${year}`);
      console.log(response.data);
      //setDropdownValues(response.data.options || []);
      setDropdownValues(response.data.options);
      console.log(DropdownValues);
      //console.log(value)
      //console.log(response);
      
      // Other dropdowns or options handling
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };
    

    useEffect(() => {
        getUser();
    }, []);
  
    function getUser() {
      
        axios.get(`http://127.0.0.1:5000/api/batchdetails/${id}/${sec}/${year}`).then(function(response) {
            console.log(response.data);
            setInputs(response.data);
            const studentIds = response.data.map(item => item.studentid);
        // Set options state
        setOptions(studentIds);
        console.log("options");
        console.log(options);
        });
    }
  

    const handleSelectChange1 = (event) => {
      setBatch(event.target.value);
    };

    useEffect(() => {
      getUser1(Batch);
  }, [Batch]);
/*
  function getUser1(Batch) {
    console.log("Batch");
      console.log(Batch);
      axios.get(`http://127.0.0.1:5000/api/batchdetails/${Batch}/${sec}`).then(function(response) {
          console.log(response.data);
          //setInputs(response.data);
          const studentIds = response.data.map(item => item.studentid);
      // Set options state
      setOptions1(studentIds);
      console.log("options1");
      console.log(options1);
      });
  }*/

  const  getUser1 = async (Batch) => {
    try {
      console.log("Batch");
      console.log(Batch);
      const response = await axios.get(`http://127.0.0.1:5000/api/batchdetails/${Batch}/${sec}/${year}`);
      console.log(response.data);
      
      
      const studentIds = response.data.map(item => item.studentid);
      // Set options state
      setOptions1(studentIds);
      console.log("options1");
      console.log(options1);
      
      // Other dropdowns or options handling
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };


  useEffect(() => {
    getFreeStudentDetails();
}, []);

function getFreeStudentDetails() {
  
    axios.get(`http://127.0.0.1:5000/api/availstudents/${sec}/${year}`).then(function(response) {
        console.log(response.data);
        setInputs(response.data);
        const studentIds = response.data.map(item => item.studentid);
    // Set options state
    setAvail(studentIds);
    console.log("Availstudents");
    console.log(Avail);
    });
}

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }


    const shouldRenderLink = Object.keys(inputs).length >= 4;

    const handleSelectChange = (event) => {
      setStudent1(event.target.value);
    };
    const handleSelectChange2 = (event) => {
      setStudent2(event.target.value);
    };

    const handleSelectAvail = (event) => {
      setStudentAvail(event.target.value);
    };



    const handleSubmit = (id, Student1, Batch, Student2,year) => (event) => {
      console.log(id);
      console.log(Batch);
      event.preventDefault();
  
      const inputData = {
          // Assuming inputs is an object containing form data
          // Add additional parameters to the data object as needed
          id: id,
          Student1: Student1,
          Batch: Batch,
          Student2: Student2,
          year:year,
          ...inputs
      };
  
      axios.put(`http://127.0.0.1:5000/api/batchupdate/`, inputData)
          .then(function(response) {
              console.log(response.data);
              navigate('/listbatch');
          })
          .catch(function(error) {
              console.error('Error updating batch:', error);
          });
  };

  const handleSubmit2 = (id,sec,Student1) => (event) => {
    console.log(id);
    console.log(Batch);
    event.preventDefault();

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
            navigate('/listbatch');
        })
        .catch(function(error) {
            console.error('Error updating batch:', error);
        });
};


const handleAdd = (id,sec,StudentAvail,year) => (event) => {
  console.log(id);
  console.log(Batch);
  event.preventDefault();

  const inputData2 = {
      // Assuming inputs is an object containing form data
      // Add additional parameters to the data object as needed
      id: id,
      sec:sec,
      Student: StudentAvail,
      year:year
  };
  console.log("inputdata");
  console.log(inputData2);

  axios.put(`http://127.0.0.1:5000/api/batchaddstudent/`, inputData2)
      .then(function(response) {
          console.log(response.data);
          navigate('/listbatch');
      })
      .catch(function(error) {
          console.error('Error updating batch:', error);
      });
};

   const handleFormSubmit = handleSubmit(id,Student1, Batch, Student2,year);

   const handleFormSubmit2 = handleSubmit2(id,sec,Student1);
   
   const handleAddMember = handleAdd(id,sec,StudentAvail,year);

    return (
        <div>
            <div className="container h-100">
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                <p style={{marginLeft:'500px'}}>{Object.keys(inputs).length}</p>
           
                </div>
                <div className="col-2"></div>

                <table class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>batch No</th>
                                <th>Studentid</th>
                                <th>Section</th>
                                <th>GuideName</th>  
                                 
                            </tr>
                        </thead>
                        <tbody>
                            {inputs.map((user, key) =>
                                <tr key={key}>
                                    

                                    <td>{user.batchid}</td>
                                    
                                    <td>{user.studentid}</td>
                                    <td>{user.section}</td>
                                    <td>{user.guidename}</td>
                                    
                                </tr>)}

                          </tbody>
                        </table>

                      {/*{shouldRenderLink && (<Link to={`user/${id}/${sec}/editbatch`} className="btn btn-success" style={{marginLeft: "400px",paddingTop:'200px'}}>Swap With Other</Link>)}
                        <h1>Welcome to My App</h1>*/}
                        


      <div>
      <button onClick={toggleLoginForm} style={{marginTop:'70px',marginLeft:'300px'}}>Swap</button>
      <button onClick={toggleLoginForm1} style={{marginLeft:'300px'}}>Add Member</button>
      {/*<button onClick={toggleLoginForm2} style={{marginLeft:'300px',marginBottom:'80px'}}>Delete Member</button>*/}
      </div>

    <div style={{display:'flex'}}>
    <div style={{ flex: '1', marginLeft: '300px' }}>
      {showLoginForm && (
        <form style={{marginLeft:'00px'}} onSubmit={handleFormSubmit}>
         <div>
      <label htmlFor="student1" className='relative-label'>Select Fisrt Student:</label>
      <select id="student1" value={Student1} onChange={handleSelectChange}>
        {/* Render options dynamically */}
        <option value=""></option>
        {options.map((studentId, index) => (
          <option key={index} value={studentId}>
            {studentId}
          </option>
        ))}
      </select>
      
    </div>
    

    <div>
    <label for="batch" className='relative-label'>Choose Batchno:</label>
                      <select name="sec" value ={Batch} onChange={handleSelectChange1}>
                        <option value=""></option>
                      {DropdownValues.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}

      </select>
    
      </div>

      <div>
      <label htmlFor="student2" className='relative-label'>Select Second Student:</label>
      <select id="student2" value={Student2} onChange={handleSelectChange2}>
        {/* Render options dynamically */}
        <option value=""></option>
        {options1.map((studentId, index) => (
          <option key={index} value={studentId}>
            {studentId}
          </option>
        ))}
      </select>
     
    </div>
    
    <button type="submit">Submit</button>
        </form>
      )}
</div>

<div style={{ flex: '1', marginLeft: '130px' }}>
{showLoginForm1 && (
  <form style={{marginLeft:'00px'}} onSubmit={handleAddMember}>
    <div>
      <label className='relative-label'>Select Student:</label>
      <select id="student1" value={StudentAvail} onChange={handleSelectAvail}>
        {/* Render options dynamically */}
        <option value=""></option>
        {Avail.map((studentId, index) => (
          <option key={index} value={studentId}>
            {studentId}
          </option>
        ))}
      </select>
     
    </div>
   
    <button type="submit" style={{marginLeft:'30px'}}>Submit</button>
  </form>
)}
</div>


<div style={{ flex: '1', marginLeft: '200px' }}>
{showLoginForm2 && (
  <form style={{marginLeft:'0px'}} onSubmit={handleFormSubmit2}>
   <div>
      <label htmlFor="student1">Select Student:</label>
      <select id="student1" value={Student1} onChange={handleSelectChange}>
        {/* Render options dynamically */}
        <option value=""></option>
        {options.map((studentId, index) => (
          <option key={index} value={studentId}>
            {studentId}
          </option>
        ))}
      </select>
      <p>{Student1}</p>
    </div>
    <button type="submit" style={{marginLeft:'0px'}}>Submit</button>
  </form>
)}
</div>

</div>
</div>
</div>
</div>

      );
    }