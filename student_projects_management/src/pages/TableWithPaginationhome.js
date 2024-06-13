import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import axios from "axios";
import { Link } from 'react-router-dom';
import './TableWithPagination.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import { useAuth } from "../AuthContext";

const TableWithPaginationhome = ({ itemsPerPage }) => {
  const {user} = useAuth()
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTerm1, setSearchTerm1] = useState('');
  const [data, setData] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    domain: '',
    year: '',
    title: '',
  });
  const [filteredData, setFilteredData] = useState([]);
  const [filteredData1, setFilteredData1] = useState([]);

  const [forceRender, setForceRender] = useState(false);



  const handleClick = () => {
    setForceRender(prevState => !prevState);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {

    axios.get(`http://127.0.0.1:5000/api/listusers/`)
      .then(response => {
        console.log("response is fro home");
        console.log(response.data);
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

 
/*
  const filterData = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = data.filter(item => {
      return Object.keys(filterOptions).every(key => {
        const columnValue = item[key].toLowerCase();
        return columnValue.includes(filterOptions[key].toLowerCase());
      });
    });

    setFilteredData(filtered);
    setCurrentPage(0);
  };*/

  useEffect(() => {
    filterData();
  }, [data, filterOptions, searchTerm]);

  const filterDatadummy = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = data.filter(item => {
      return Object.keys(filterOptions).every(key => {
        const columnValue = typeof item[key] === 'string' ? item[key].toLowerCase() : item[key];
        if (typeof columnValue === 'string') {
          return columnValue.includes(filterOptions[key].toLowerCase());
        } else if (typeof columnValue === 'number') {
          // Assuming searchTerm is a year, you may want to compare with the year part of the number
          return columnValue.toString().includes(filterOptions[key].toLowerCase());
        }
        return false;
      });
    });
  
    setFilteredData(filtered);
    setCurrentPage(0);
  };
  
  const filterData = () => {
    const filtered = data.filter(item => {
      return Object.keys(filterOptions).every(key => {
        const columnValue = item[key];
        const filterValue = filterOptions[key];
        
        // Check if the filter value is empty, if so, return true for all items
        if (filterValue === "") {
          return true;
        }
        
        // Check if the key is 'year' and the filter value is a number
        if (key === 'year' && !isNaN(filterValue)) {
          return columnValue === parseInt(filterValue);
        } else {
          // For other keys or non-numeric filter values, perform case-insensitive string comparison
          return columnValue.toLowerCase().includes(filterValue.toLowerCase());
        }
      });
    });
  
    setFilteredData(filtered);
    setCurrentPage(0);
  };
  

 
  useEffect(() => {
    filterData1();
  }, [data, searchTerm]);

  const filterData1 = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered1 = data.filter(item => {
      const titleValue = item.title.toLowerCase();
      return titleValue.includes(lowerCaseSearchTerm);
    });

    setFilteredData(filtered1);
    setCurrentPage(0);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRadioChange = (e) => {
    setFilterOptions({ ...filterOptions, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e, columnName) => {
    const updatedFilterOptions = { ...filterOptions, [columnName]: e.target.value };
    setFilterOptions(updatedFilterOptions);
  };

  const deleteUser = (id, sec,year) => {
    const numericId = parseInt(id, 10);
    axios.delete(`http://127.0.0.1:5000/userdelete/${numericId}/${sec}/${year}`)
      .then(function (response) {
        getUsers();
      });
    alert("Successfully Deleted");
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = searchTerm
    ? data.filter(item =>
        item[Object.keys(filterOptions)[2]].toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredData.slice(offset, offset + itemsPerPage);

   
/*
  return (
    <div className='container mt-5'>
      <div className="search-container" style={{ paddingLeft: '80px', marginBottom: '20px' }}>
        <div className="filter-radio-buttons" style={{ paddingLeft: '00px', marginRight: '20px' }}>
          <label>Search:</label>
          <input
            type="text"
            placeholder="Search by..."
            value={searchTerm}
            onChange={handleSearch}
            style={{ marginRight: '20px' }}
          />

          
         
          
        </div>
      </div>

      <div className="filter-container" style={{ paddingLeft: '600px', marginBottom: '20px' }}>
        <div className="filter-dropdown">
          <label>Domain:</label>
          <select
            value={filterOptions.domain}
            onChange={(e) => handleFilterChange(e, 'domain')}
          >
            <option value="">All</option>
            {Array.from(new Set(data.map(item => item.domain))).map((domain) => (
              <option key={domain} value={domain}>{domain}</option>
            ))}
          </select>
        </div>

        <div className="filter-dropdown">
          <label>Section:</label>
          <select
            value={filterOptions.section}
            onChange={(e) => handleFilterChange(e, 'section')}
          >
            <option value="">All</option>
            {Array.from(new Set(data.map(item => item.section))).map((section) => (
              <option key={section} value={section}>{section}</option>
            ))}
          </select>
        </div>

       
      </div>

      <div className="table-search-container">
        <table>
          <thead>
            <tr>
              <th>Problem Statement</th>
              <th>Domain</th>
              <th>Category</th>
              <th>Section</th>
              <th>Batch</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentPageData.map((item) => (
              <tr key={`${item.batchno}-${item.section}`}>
                <td>{item.title}</td>
                <td>{item.domain}</td>
                <td>{item.category}</td>
                <td>{item.section}</td>
                <td>{item.batchno}</td>
                <td>
                <Link to={`user/${item.batchno}/${item.section}/editproject`} className="btn btn-success" style={{marginRight: "5px"}}><FontAwesomeIcon icon={faEdit} /></Link>
                <button
                    onClick={() => deleteUser(item.batchno, item.section)}
                    className="btn btn-danger"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ReactPaginate
        pageCount={Math.ceil(filteredData.length / itemsPerPage)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );*/
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [tableData, setTableData] = useState([]);

  const handleIdClick = (item) => {
    setSelectedItemId(item);
  };
  
  useEffect(() => {
    if (selectedItemId) {
      fetchTable(selectedItemId.batchno, selectedItemId.section,selectedItemId.year);
    }
  }, [selectedItemId]);

  
  const fetchTable = async (id, section, year) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/api/table/${id}/${section}/${year}`, {
    
      });
      console.log("table response dat ais");
      console.log(response.data);
      setTableData(response.data);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  const [downloads, setDownloads] = useState([]);
  const [pdfUrl, setPdfUrl] = useState('');
  
    const handleGetDocs = (year,section,batchno) => {
      console.log("sele year is:",selectedItemId.year);
      console.log("select section is:",selectedItemId.section);
      console.log("select batch is",selectedItemId.batchno);
      //const year = selectedItemId.year;
      //const section = selectedItemId.section;
      //const batchno = selectedItemId.batchno;
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
    if (selectedItemId){
    handleGetDocs(selectedItemId.year,selectedItemId.section,selectedItemId.batchno)}
  }, [selectedItemId]); 

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
    <div className='container mt-5'>


        {selectedItemId && (
          <div className="details-container">
            <button onClick={() => setSelectedItemId(null)} style={{marginLeft:'1150px',background:'none'}}>Close</button>
            <div className='details' style={{ maxHeight: '300px', overflowY: 'auto' }}>
          <table>
              <thead>
                <tr>
                  <th>StudentID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  
                  {/* Add more table headers as needed */}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.studentid}</td>
                    <td>{row.first_name}</td>
                    <td>{row.phn}</td>
                    {/* Add more table cells as needed */}
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <br/>
          <div className="details" style={{ maxHeight: '200px', overflowY: 'auto' }}>
          
          <h2>Details for Project of Batch  {selectedItemId.batchno}</h2>
            <p>Title: {selectedItemId.title}</p>
            <p>Domain: {selectedItemId.domain}</p>
            <p>Section:{selectedItemId.section}</p>
            <p>Year:{selectedItemId.year}</p>
            <p>Description:{selectedItemId.description}</p>
            
            {downloads.map(document => (
                <button key={document.id} onClick={() => handleDownload(document.id,document.year, document.section, document.batchno)}>
                    Download Document
                </button>
            ))}
            {/* Add more details as needed */}
            
          </div>
          <br />
          
          </div>
        )}
      
      
      <div className='top' style={{marginLeft:'40px',marginTop:'30px',border:'1px solid black ',borderRadius:'10px',marginBottom:'30px',marginRight:'50px',backgroundColor:'#f5f5f5'}}>
      <div className="search-filter-container" style={{ display: 'flex',  alignItems: 'center', marginBottom: '20px' ,paddingLeft:'0px'}}>

        <div className="search-container" style={{ marginTop:'30px',marginRight: '50px',marginLeft:'70px'}}>
          <label style={{marginRight:'30px',marginTop:'20px'}} className='relative-label'>Search:</label>
          <input
            type="text"
            placeholder="Search for Titles..."
            value={searchTerm}
            onChange={handleSearch} style={{width:'400px',marginTop:'00px',marginRight:'50px'}}
          />
        </div>

        <div className="filter-dropdown" style={{marginRight:'30px'}}>
            <label className='relative-label'>Year:</label>
            <select
              value={filterOptions.year}
              onChange={(e) => handleFilterChange(e, 'year')}
              style={{width:'150px'}}
            >
              <option value="">All</option>
              {Array.from(new Set(data.map(item => item.year))).map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="filter-dropdown" style={{marginLeft:'30px'}}>
            <label className='relative-label'>Domain:</label>
            <select
              value={filterOptions.domain}
              onChange={(e) => handleFilterChange(e, 'domain')}
              style={{width:'300px'}}
            >
              <option value="">All</option>
              {Array.from(new Set(data.map(item => item.domain))).map((domain) => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>
          </div>

          
        </div>
      
      </div>
      <div className='bottom' style={{borderRadius:'20px',overflow:'hidden', marginBottom: '-1px'}}>
      <div className="table-search-container-proj" style={{borderRadius:'20px',overflow:'hidden'}}>
        
        <table className='proj' style={{ borderCollapse: 'collapse',borderRadius:'20px',overflow:'visible'}}>
          <thead>
            <tr>
            <th>Batch</th>
              <th>Problem Statement</th>
              <th>Year</th>
              <th>Domain</th>
              <th>Category</th>
              <th>Section</th>
              
              
            </tr>
          </thead>

          <tbody>
            {currentPageData.map((item) => (
              <tr key={`${item.batchno}-${item.year}-${item.section}`}>
                <td><button onClick={() => handleIdClick(item)} style={{background:'none',color:'black',textDecoration:'underline',color:'blue'}}>{item.batchno}</button></td>
                <td>{item.title}</td>
                <td>{item.year}</td>
                <td>{item.domain}</td>
                <td>{item.category}</td>
                <td>{item.section}</td>
                
              
              </tr>
              
            ))}
          </tbody>
        </table>
        </div>
      </div>

      <ReactPaginate
        pageCount={Math.ceil(filteredData.length / itemsPerPage)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default TableWithPaginationhome;
