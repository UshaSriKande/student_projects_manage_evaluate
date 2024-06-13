
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';
const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div>
      <div style={{marginLeft:'20px',marginTop:'20px'}}>
        <button style={{background:'none',color:'black',fontSize:'30px'}} className={activeTab === 'profile' ? 'active' : ''} onClick={() => handleTabChange('profile')} >Profile</button>
        <button style={{background:'none',color:'black',fontSize:'30px'}} className={activeTab === 'resetPassword' ? 'active' : ''} onClick={() => handleTabChange('resetPassword')} >Reset Password</button>
      </div>
      <div className="line-sett" style={{ background: `linear-gradient(to right, green 20%, black 20%)` }}></div>
      {activeTab === 'profile' && <ProfileSection />}
      {activeTab === 'resetPassword' && <ResetPasswordForm />}
    </div>
  );
};

const ProfileSection = () => {
  const { user } = useAuth();
  console.log("user");
  console.log(user.username);
  const [studentData, setStudentData] = useState({});
  const [projectData, setProjectData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [updatedData, setUpdatedData] = useState({}); 
  const [showFormDown, setShowFormDown] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [downloads, setDownloads] = useState([]);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  
    const fetchData = async () => {
      try {
        // Fetch student data from Flask backend
        const year = user.year;
        console.log("year");
        console.log(year);

        const response = await axios.get(`http://localhost:5000/profile/${user.username}/${year}`);
        const { Student, project } = response.data;
        setStudentData(Student);
        setProjectData(project);
        console.log("studentdata",studentData);
        console.log("project data",projectData);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        
      }
    };

  useEffect(() => {
    fetchData();
  }, [user]);

  console.log(studentData);
  console.log(projectData);
  const deleteUser = (id, sec,year) => {
    const numericId = parseInt(id, 10);
    axios.delete(`http://127.0.0.1:5000/userdelete/${numericId}/${sec}/${year}`)
      .then(function (response) {
       fetchData();
      });
    alert("Successfully Deleted");
  };

  console.log(updatedData);
  const handleProfileUpdate = () => {
    try {
      console.log("password is:",user.password);
  console.log("password is:",user.username);
  console.log("year is:",user.year);
  console.log("updated data is :",updatedData);
  const response = axios.put(`http://127.0.0.1:5000/api/update_profile/${user.username}/${user.password}/${user.year}`, updatedData);

      //const response = axios.put(`/api/http://127.0.0.1:5000/update_profile/${user.username}/${user.password}/${user.year}`, updatedData);
      console.log(response.data); // Log the response from the server
      
      alert('Profile updated successfully!');
      setShowForm(false); // Hide the form after successful update
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };
  console.log("password is:",user.password);
  console.log("password is:",user.username);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };
  
  const uploadFile = (year,section,batchno) => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    console.log("sele year is:",year);
    console.log("select section is:",section);
    console.log("select batch is",batchno);
    axios.post(`http://localhost:5000/uploaddocumentproject/${year}/${section}/${batchno}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }) // Use Axios to make the POST request
      .then(response => {
        console.log(response.data);
        alert("Document uploaded successfully");
        setShowFormDown(false);
        handleGetDocs();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  console.log("sele year is:",projectData.year);
  console.log("select section is:",projectData.section);
  console.log("select batch is",projectData.batchno);

 
    const handleGetDocs = () => {
    console.log("sele year is:",projectData.year);
    console.log("select section is:",projectData.section);
    console.log("select batch is",projectData.batchno);
    const year = projectData.year;
    const section = projectData.section;
    const batchno = projectData.batchno;
    axios.get(`http://localhost:5000/api/num_documents/${year}/${section}/${batchno}`)
        .then(response => {
           
            //const numDocuments = response.data.length;;
            console.log("response data is:",response.data);
            //console.log('number is:',numDocuments);
            //const documentNumbers = Array.from({ length: numDocuments }, (_, index) => index + 1);
            //console.log("number of documents is",documentNumbers);
            const documents = response.data.map(document => ({
              ...document,
              year: year,
              section: section,
              batchno:batchno
          }));
          console.log("document is:",documents);
          setDownloads(documents);
          //setDownloads(documentNumbers);
        })
        .catch(error => {
            console.error('Error fetching number of documents:', error);
        });};

useEffect(() => {
  handleGetDocs();
}, [projectData.year,projectData.section,projectData.batchno]);


const handleDownload = (id,year,section,batchno) => {
  // Implement your download logic here
  console.log(`Download clicked for document${id}, Batchno No: ${batchno}, Sec: ${section}, Year: ${year}`);
  const downloadUrl = `http://localhost:5000/downloadproject/${id}/${year}/${section}/${batchno}`;
  
    setPdfUrl(downloadUrl);
    console.log(downloadUrl);
    console.log(pdfUrl);
      // Open the download URL in a new tab/window
      window.open(downloadUrl, '_blank');
      alert("pdf downloaded successfully");
};

  return (
    <div>
     {/*
      <table>
            <tbody>
              {/*
              {Object.entries(studentData).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}*
              <tr>
                <td>Student Id:</td>
                <td>{studentData.studentid}</td>
              </tr>
              <tr>
                <td>Student Name:</td>
                <td>{studentData.fullname}</td>
              </tr>
              <tr>
                <td>Student Email:</td>
                <td>{studentData.email}</td>
              </tr>
              <tr>
                <td>Phone Number:</td>
                <td>{studentData.phn}</td>
              </tr>
              <tr>
                <td>Section:</td>
                <td>{studentData.section}</td>
              </tr>
            </tbody>
          </table>
          */}
          <div className='col-md-12'> 
          <h2 style={{marginLeft:'10px'}}>Profile Section</h2>
          
          <div className='panel br-20x panel-deafault'>
          <div className='panel-head'>
            <div className='panel-title'>
              <span className='panel-title-text'>Batch:{projectData.batchno}</span>
              
            </div>
          </div>

          <div className='panel-wrapper'>
            <div className='panel-body'>
            <span className='panel-title-text' style={{display:'flex'}}>Student ID : <div style={{paddingLeft:'150px'}}>{studentData.studentid}</div></span><br></br>
            <span className='panel-title-text' style={{display:'flex'}}>Student Name : <div style={{paddingLeft:'120px'}}>{studentData.fullname}</div></span><br></br>
            <span className='panel-title-text' style={{display:'flex'}}>Email:  <div style={{paddingLeft:'200px'}}>{studentData.email}</div></span><br></br>
            <span className='panel-title-text' style={{display:'flex'}}>Phone Number:   <div style={{paddingLeft:'120px'}}>{studentData.phn}</div></span><br></br>
            <span className='panel-title-text' style={{display:'flex'}}>Section: <div style={{paddingLeft:'200px',paddingBottom:'10px'}}>{studentData.section}</div></span>
            <span className='panel-title-text' style={{display:'flex'}}>Year: <div style={{paddingLeft:'220px'}}>{studentData.year}</div></span>
            <span className='panel-title-text' style={{display:'flex',marginLeft:'950px'}}><button onClick={() => setShowForm(true)}>Update Profile</button></span>
            </div>
          </div>
          {showForm && (
          <div className='background-overlay'>  
        <div className='update-form'>
          <form>
            <input type="text" name="firstname" placeholder="First Name" value={updatedData.firstname || user.firstname} onChange={handleInputChange} />
            <input type="text" name="lastname" placeholder="Last Name" value={updatedData.lastname || user.lastname} onChange={handleInputChange} />
            <input type="email" name="email" placeholder="Email" value={updatedData.email} onChange={handleInputChange} />
            <input type="tel" name="phn" placeholder="Phone Number" value={updatedData.phn || studentData.phn} onChange={handleInputChange} />
            <input type="text" name="cgpa" placeholder="Cgpa" value={updatedData.cgpa || studentData.cgpa} onChange={handleInputChange} />
            <input type="text" name="year" placeholder="Year" value={updatedData.year || user.year} onChange={handleInputChange} />
            <select name="section" value={updatedData.section || studentData.section} onChange={handleInputChange}>
              <option value="">Select Section</option>
              <option value="a">Section A</option>
              <option value="b">Section B</option>
              <option value="b">Section C</option>
            </select>
            <select name="branch" value={updatedData.branch || studentData.branch} onChange={handleInputChange}>
              <option value="">Select Branch</option>
              <option value="cse">CSE</option>
              <option value="it">IT</option>
              <option value="ece">ECE</option>
              <option value="aids">AIDS</option>
              <option value="eee">EEE</option>
            </select>
            <button type="button" onClick={handleProfileUpdate}>Save</button>
            <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        </div>
        </div>
      )}
          <div className='panel-footer'>
            <div className='row-profile' style={{display:'flex'}}>
              <div className='col-md-6'></div>
              <div className='col-md-6'>
               
              </div>
            </div>
          </div>
          </div>
          </div>

          <div className='col-md-12'> 
          <h2 style={{marginLeft:'10px'}}>Project Details</h2>
          
          <div className='panel br-20x panel-deafault' style={{backgroundImage: "linear-gradient(to top,#fad0c4 0,#79fb74 100%)"}}>
          <div className='panel-head'>
            <div className='panel-title'>
              <span className='panel-title-text'>Batch:{projectData.batchno}</span>
              
            </div>
          </div>

          <div className='panel-wrapper'>
            <div className='panel-body'>
            <span className='panel-title-text'>Project Title : {projectData.title}</span><br></br>
            <span className='panel-title-text-desc'>{projectData.description}</span><br></br>
            <span className='panel-title-text'>Choosen Domain:{projectData.domain}</span><br></br>
            <span className='panel-title-text'>Choosen Category:{projectData.category}</span>
            </div>
          </div>

          <div className='panel-footer'>
            <div className='row' style={{display:'flex'}}>
              
              <div className='col-md-6'>
               <button className='btn btn-danger' style={{marginLeft:'800px'}} onClick={() => deleteUser(projectData.batchno,studentData.section,user.year)}>Delete</button>
              </div>
              <div className='col-md-6'>
               <button className='btn btn-danger' style={{marginLeft:'9px'}}><Link
                    to={`user/${projectData.batchno}/${studentData.section}/${user.year}/editproject`}
                    className="btn btn-succ"
                    style={{ marginRight: "5px" }}>Edit
                  </Link></button>
              </div>
            </div>
          </div>
          </div>
          {/* Render other project details as needed */}
          <div className='col-md-12'> 
          <h2 style={{marginLeft:'10px'}}>Document Section</h2>
          
          <div className='panel br-20x panel-deafault'>
          <div className='panel-head'>
            <div className='panel-title'>
              <span className='panel-title-text'>Batch:{projectData.batchno}</span>
              
            </div>
          </div>

          <div className='panel-wrapper'>
            <div className='panel-body'>
            
            <span className='panel-title-text' style={{display:'flex',marginLeft:'950px'}}><button onClick={() => setShowFormDown(true)}>+Add Document</button></span>
            {downloads.map(document => (
                <button key={document.id} onClick={() => handleDownload(document.id,document.year, document.section, document.batchno)}>
                    Download Document
                </button>
            ))}
            </div>
          </div>
          {showFormDown && (
          <div className='background-overlay'>  
        <div className='update-form'>
          <form>
           
            <input type="text" name="year" placeholder="First Name" value={projectData.year} onChange={handleInputChange} disabled/>
            <input type="text" name="section" placeholder="First Name" value={projectData.section} onChange={handleInputChange} disabled/>
            <input type="text" name="year" placeholder="First Name" value={projectData.batchno} onChange={handleInputChange} disabled/>
            <input type="file" onChange={handleFileChange} />
            <button type="button" onClick={() => uploadFile(projectData.year,projectData.section,projectData.batchno)}>Save</button>
            <button type="button" onClick={() => setShowFormDown(false)}>Cancel</button>
          </form>
        </div>
        </div>
      )}
          <div className='panel-footer'>
            <div className='row-profile' style={{display:'flex'}}>
              <div className='col-md-6'></div>
              <div className='col-md-6'>
               
              </div>
            </div>
          </div>
          </div>
          </div>
          </div>
    </div>
      
    
  );
};

const ResetPasswordForm = () => {
  const {user} = useAuth();
  console.log("year is");
  console.log(user.year);
  console.log("username");
  console.log(user);
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError('New password and confirm password must match.');
    } else {
      try {
        const response = await axios.post('http://127.0.0.1:5000/reset_password', {
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword,
          confirmPassword: passwords.confirmPassword,
          year: user.year,
          username: user.username,
        });
  
        if (response.status !== 200) {
          throw new Error(response.data.error || 'Failed to reset password');
        }
  
        // Reset form fields
        setPasswords({
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setError('');
        alert('Password reset successfully!');
      } catch (error) {
        setError(error.message);
      }
    }
  };
  return (
    <div style={{marginLeft:'100px'}}>
      {/* Reset password form */}
      <h2>Reset Password</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Example: */}
        <label htmlFor="password" className='relative-label'>Old Password:</label>
        <input type="password" id="password"  name="oldPassword"
          value={passwords.oldPassword}
          onChange={handleInputChange} style={{marginBottom:'20px'}}/><br></br>
        <label htmlFor="password" className='relative-label'>New Password:</label>
        <input type="password" id="password"  name="newPassword"
          value={passwords.newPassword}
          onChange={handleInputChange} style={{marginBottom:'20px'}}/><br></br>
        <label htmlFor="password" className='relative-label'>Confirm Password:</label>
        <input type="password" id="password"  name="confirmPassword"
          value={passwords.confirmPassword}
          onChange={handleInputChange} style={{marginBottom:'20px'}}/><br></br>
        <button type="submit" >Reset Password</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  );
};

export default SettingsPage;
