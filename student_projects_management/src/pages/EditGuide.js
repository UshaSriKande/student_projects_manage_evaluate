import React, { useState, useEffect  } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {Link} from 'react-router-dom';
import ListBatch from "../admin/ListBatch";
import { useAuth } from "../AuthContext";

export default function EditGuide({id, sec, guide,year,setShowEditGuide,refreshListBatch}){
  //const { id, sec, guide} = props;
    const navigate = useNavigate();
    const {user} = useAuth();
  
    const [inputs, setInputs] = useState([]);
    const [options1, setOptions1] = useState([]);
    /*
    const {id} = useParams('id');
    const {sec} = useParams('sec');
    const {guide} = useParams('guide');*/
    console.log("id");
    console.log(id);
    console.log("sec");
    console.log(sec);
    console.log("guide");
    console.log(guide);

    const [Guide, setGuide] = useState('');
    
    const [Batch, setBatch] = useState('');
    const [DropdownValues,setDropdownValues] = useState([]);
    


    const [showLoginForm, setShowLoginForm] = useState(false);

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
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
    

   
  

    const handleSelectChange1 = (event) => {
      setBatch(event.target.value);
    };

    useEffect(() => {
      getUser1(Batch);
  }, [Batch]);


  const  getUser1 = async (Batch) => {
    try {
      console.log("Batch");
      console.log(Batch);
      const response = await axios.get(`http://127.0.0.1:5000/api/guidedetails/${Batch}/${sec}/${guide}/${year}`);
      console.log(response.data);
      
      
      const studentIds = response.data.map(item => item.guidename);
      // Set options state
      setOptions1(studentIds);
      console.log("options1");
      console.log(options1);
      
      // Other dropdowns or options handling
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };




    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }


    const shouldRenderLink = Object.keys(inputs).length >= 4;

  
    const handleSelectChange2 = (event) => {
      setGuide(event.target.value);
    };

    

    console.log(id);
    
    console.log(sec);
    console.log(guide);

    console.log(Guide);
   

    const handleSubmit = (id,sec,guide,Batch,Guide,year) => (event) => {
      event.preventDefault();
      console.log(id);
      
      console.log(sec);
      console.log(guide);
      console.log(Batch);
      console.log(Guide);
      event.preventDefault();
  
      const inputData = {
          // Assuming inputs is an object containing form data
          // Add additional parameters to the data object as needed
          id: id,
          sec:sec,
          guide:guide,
          Batch: Batch,
          Guide:Guide,
          year:year
      };
  
      axios.put(`http://127.0.0.1:5000/api/guideupdate/`, inputData)
          .then(function(response) {
              console.log(response.data);
              
              setShowEditGuide(false);
              refreshListBatch();
              navigate('/listbatch')
              
          })
          .catch(function(error) {
              console.error('Error updating batch:', error);
          });
  };
   const handleFormSubmit = handleSubmit(id,sec, guide,Batch,Guide,year);

   
   const handleCloseEditGuide = () => {
    setShowEditGuide(false); // Call setShowEditGuide to hide the EditGuide component
  };
   
   
   

    return (
      
      <div className="edit-guide-overlay">
      <div className="edit-guide-container">
      <button className="close-button" onClick={() => setShowEditGuide(false)}>Close</button>
      
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="batch" className='relative-label'>Choose Batchno:</label>
            <select name="sec" value={Batch} onChange={handleSelectChange1} style={{marginBottom:'20px'}}>
              <option value=""></option>
              {DropdownValues.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            
          </div>
          <div>
            <label htmlFor="Guide" className='relative-label'>Select Guide:</label>
            <select id="Guide" value={Guide} onChange={handleSelectChange2} style={{marginBottom:'30px'}}>
              <option value=""></option>
              {options1.map((guidename, index) => (
                <option key={index} value={guidename}>
                  {guidename}
                </option>
              ))}
            </select>
            
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
      

      /*
        <div>
            <div className="container h-100">
            <div className="row">

      

    <div>
    <div style={{ flex: '1', marginLeft: '600px' }}>
      
        <form style={{marginRight:'30pxpx'}} onSubmit={handleFormSubmit}>
         

    <div>
    <label for="batch">Choose Batchno:</label>
                      <select name="sec" value ={Batch} onChange={handleSelectChange1}>
                        <option value=""></option>
                      {DropdownValues.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}+

      </select>
      <p>{Batch}</p>
      </div>

      <div>
      <label htmlFor="Guide">Select Guide:</label>
      <select id="Guide" value={Guide} onChange={handleSelectChange2}>
        {/* Render options dynamically 
        <option value=""></option>
        {options1.map((guidename, index) => (
          <option key={index} value={guidename}>
            {guidename}
          </option>
        ))}
      </select>
      <p>{Guide}</p>
    </div>
    
    <button type="submit">Submit</button>
        </form>
      
</div>

</div>
</div>
</div>
</div>*/

      );
    }
