// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../AuthContext';
function Adm() {
  const { user } = useAuth();
  const [studentsData, setStudentsData] = useState([]);
  const [batchNo, setBatchNo] = useState('');
  const [sec, setSec] = useState('');
  const [batchNumbers, setBatchNumbers] = useState([]);
  const navigate = useNavigate();
  const [reviewNumbers, setReviewNumbers] = useState([]);
  const [selectedReviewNumber, setSelectedReviewNumber] = useState('');
  /*
  useEffect(() => {
    const fetchReviewNumbers = async () => {
      try {
        const response = await axios.get('/api/review-numbers');
        console.log('Review Numbers Response:', response);
        setReviewNumbers(response.data);
      } catch (error) {
        console.error('Error fetching review numbers', error);
      }
    };
  
    fetchReviewNumbers();
  }, []);

  */
  const handleChange = (e, studentIndex, fieldName) => {
    const updatedStudents = [...studentsData];
    updatedStudents[studentIndex][fieldName] = e.target.value;
    setStudentsData(updatedStudents);
  };


  const fetchReviewNumbers = async () => {
    try {
      const year = user.year;
      const response = await axios.get(`http://localhost:5000/api/review-numbers/${year}/${sec}`);
      console.log(response.data);
      setReviewNumbers(response.data);
    } catch (error) {
      console.error('Error fetching batch numbers:', error);
    }
  };
  
  // Add this useEffect to observe the updated batchNumbers
  useEffect(() => {
    console.log('Updated ReviewNumbers:', reviewNumbers);
  }, [reviewNumbers]);
  
  useEffect(() => {
    fetchReviewNumbers();
  }, [user.year,sec]); // 


  const fetchBatchNumbers = async () => {
    try {
      console.log(sec);
      const year = user.year
      const response = await axios.get(`http://localhost:5000/api/get-batch-numbers?sec=${sec}&year=${year}`);
      console.log(sec);
      setBatchNumbers(response.data.batch_numbers);
    } catch (error) {
      console.error('Error fetching batch numbers:', error);
    }
  };
  
  // Add this useEffect to observe the updated batchNumbers
  useEffect(() => {
    console.log('Updated batchNumbers:', batchNumbers);
  }, [batchNumbers]);
  
  useEffect(() => {
    fetchBatchNumbers();
  }, [sec,user.year]); // 

  const fetchStudentsData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/get-students?batchno=${batchNo}&sec=${sec}&year=${user.year}`);
      setStudentsData(response.data.students.map(student => ({ ...student, creativity: '', presentation: '' })));
      console.log(studentsData);
    } catch (error) {
      console.error('Error fetching students data:', error);
    }
  };

  useEffect(() => {
    fetchBatchNumbers();
  }, []); // Fetch batch numbers on component mount

  useEffect(() => {
    fetchStudentsData();
  }, [batchNo, sec,user.year]); // Fetch students data when batchNo or sec changes
console.log(user.role);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(studentsData);
      console.log(batchNo);
      console.log(sec);
      console.log({"role":user.role});
      const response = await axios.post('http://localhost:5000/api/submit-form', {students: studentsData,sec,batchNo,selectedReviewNumber,role:user.role,year:user.year});
      console.log(response.data);
      // Refresh students data after submitting the form
      fetchStudentsData();
      navigate('/admin/listmarksadmin');
      navigate('/listmarksadmin');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
    <div className=''>
    <h2 style={{marginLeft:'30px',color:'Gray'}}>Review</h2>
    </div>
  <div className='page-body-automate'>
  <div className='row-automate' style={{marginTop:'30px'}}>
    <div className='col-md-12-automate'>
      <div className='panel-automate'>
        <div className='panel-head-automate'>
          <h5 className='panel-title-automate'>Assess/Review Project</h5>
         
        </div>
        <div className='panel-body-automate'>
          <form onSubmit={handleSubmit}>

            <div className='row-automate'>
              <div className='col-md-12-automate'>
                <div className='form-group-automate'>
                  <label className='relative-label'>Section:</label><br/>
                  <select className='form-control-automate' required name='sec' onChange={(e) => setSec(e.target.value)}>
                    <option value=" ">Select Section</option>
                    <option value="a">A</option>
                    <option value="b">B</option>
                    <option value="c">C</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className='row-automate'>
              <div className='col-md-12-automate'>
                <div className='form-group-automate'>
                  <label className='relative-label'>Review Number:</label><br/>
                  <select className='form-control-automate' value={selectedReviewNumber}  onChange={(e) => setSelectedReviewNumber(e.target.value)}  >
                    <option value=""></option>
                    {reviewNumbers && reviewNumbers.map((number) => (
                    <option key={number} value={number}>{number}</option>))}
                  </select>
                </div>
              </div>
            </div>

            <div className='row-automate'>
              <div className='col-md-12-automate'>
                <div className='form-group-automate'>
                  <label className='relative-label'>Batch Number:</label><br/>
                  <select className='form-control-automate' value={batchNo} onChange={(e) => setBatchNo(e.target.value)}>
                    <option value="">Select Batch Number</option>
                    {batchNumbers.map((batchNumber, index) => (
                    <option key={index} value={batchNumber}>
                      {batchNumber}
                    </option>))}
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


  {studentsData.map((student, studentIndex) => (
  <div key={studentIndex} className='page-body-automate'>
  <div className='row-automate' style={{marginTop:'30px'}}>
    <div className='col-md-12-automate'>
      <div className='panel-automate'>
        <div className='panel-head-automate'>
          <h5 className='panel-title-automate'>{student.name}</h5>
         
        </div>
        <div className='panel-body-automate'>
          <form>

            <div className='row-creat-proj creat-proj-dis' style={{display:"flex"}}>
              <div className='col-md-6-creat-proj'>
                <div className='form-group-creat-proj'>
                  <label className='relative-label'>Creativity:</label><br/>
                  <input type="number" name="creativity"  placeholder="1-5" className='form-control-automate'value={student.creativity}
            onChange={(e) => handleChange(e, studentIndex, 'creativity')}  required/>
                </div>
              </div>
              <div className='col-md-6-creat-proj '>
                <div className='form-group-creat-proj'>
                <label className='relative-label'>Technical Skills:</label><br/>
                <input type="number" name="technicalskills" placeholder="1-5" className='form-control-automate' value={student.technicalskills}
            onChange={(e) => handleChange(e, studentIndex, 'technicalskills')} required/>
                  </div>
                </div>
              </div>

              <div className='row-creat-proj creat-proj-dis' style={{display:"flex"}}>
              <div className='col-md-6-creat-proj'>
                <div className='form-group-creat-proj'>
                  <label className='relative-label'>Project Management:</label><br/>
                  <input type="number" name="projectmanagement"  placeholder="1-5" className='form-control-automate' value={student.projectmanagement}
            onChange={(e) => handleChange(e, studentIndex, 'projectmanagement')} required/>
                </div>
              </div>
              <div className='col-md-6-creat-proj '>
                <div className='form-group-creat-proj'>
                <label className='relative-label'>Documentation:</label><br/>
                <input type="number" name="documentation" placeholder="1-5" className='form-control-automate' value={student.documentation}
            onChange={(e) => handleChange(e, studentIndex, 'documentation')} required/>
                  </div>
                </div>
              </div>
              
              <div className='row-automate'>
              <div className='col-md-12-automate'>
                <div className='form-group-automate'>
                  <label className='relative-label'>Presentation:</label><br/>
                  <input type="number" name="presentation" placeholder="1-5" className='form-control-automate' value={student.presentation}
            onChange={(e) => handleChange(e, studentIndex, 'presentation')} required/>
                </div>
              </div>
            </div>
           
            
          </form>
        </div>
      </div>
    </div>
  </div>
  </div>
  
  ))}
  </div>
   
    /*
    <div className="Adm" style={{
      marginLeft:'400px',
      marginRight:'190px',
      marginTop:'10px',
      marginBottom:'10px',
      background: '#f2f2f2',
      
      paddingLeft:'200px',
      paddingRight: '200px',
      borderRadius: '20px',
      border: '1px solid #ccc',
      
      maxWidth: '1000px'}}>
      <h1>Project Aceess Form</h1>

      <div>
        

        <label>Section:</label>
        <select
          value={sec}
          onChange={(e) => setSec(e.target.value)}
        >
          <option value="">Select Section</option>
          <option value="a">A</option>
          <option value="b">B</option>
          <option value="c">C</option>
          {/* Add more section options as needed 
        </select>
        

        
        <label>Batch Number:</label>
        <select
          value={batchNo}
          onChange={(e) => setBatchNo(e.target.value)}
        >
          <option value="">Select Batch Number</option>
          {batchNumbers.map((batchNumber, index) => (
            <option key={index} value={batchNumber}>
              {batchNumber}
            </option>
          ))}
        </select>
        
      </div>
      
      <label>Select Review Number:</label>
<select
  value={selectedReviewNumber}  // Define selectedReviewNumber state
  onChange={(e) => setSelectedReviewNumber(e.target.value)}  >
    <option value=""></option>
{reviewNumbers && reviewNumbers.map((number) => (
  <option key={number} value={number}>
    {number}
  </option>
))}
  
</select>
      <form onSubmit={handleSubmit}>
        {}
        {studentsData.map((student, studentIndex) => (
          <div key={studentIndex} className="student-section">
            
            <p>Name: {student.name}</p>

            <label>Creativity:</label>
            <input
              type="number"
              name="creativity"
              value={student.creativity}
              onChange={(e) => handleChange(e, studentIndex, 'creativity')}
              required
            />
            
            <label>Technical Skills:</label>
            <input
              type="number"
              name="technicalskills"
              value={student.technicalskills}
              onChange={(e) => handleChange(e, studentIndex, 'technicalskills')}
              required
            />
            
            <label>Project Management:</label>
            <input
              type="number"
              name="projectmanagement"
              value={student.projectmanagement}
              onChange={(e) => handleChange(e, studentIndex, 'projectmanagement')}
              required
            />
            
            <label>Documentation:</label>
            <input
              type="number"
              name="documentation"
              value={student.documentation}
              onChange={(e) => handleChange(e, studentIndex, 'documentation')}
              required
            />

            <label>Presentation:</label>
            <input
              type="number"
              name="presentation"
              value={student.presentation}
              onChange={(e) => handleChange(e, studentIndex, 'presentation')}
              required
            />
          </div>
        ))}
        
       
        <button type="submit">Submit</button>
      </form>

      <div>
        
        
      </div>
    </div>
    */
  );
}

export default Adm;
