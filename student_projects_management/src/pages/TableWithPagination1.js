import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import axios from "axios";
import { Link } from 'react-router-dom';
import './TableWithPagination.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import { useAuth } from "../AuthContext";

const TableWithPagination1 = ({ itemsPerPage }) => {
  const {user} = useAuth()
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTerm1, setSearchTerm1] = useState('');
  const [data, setData] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    domain: '',
    section: '',
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
  }, [user.year]);

  const getUsers = () => {
    const year=user.year;
    axios.get(`http://127.0.0.1:5000/api/listusers/${year}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  useEffect(() => {
    filterData();
  }, [data, filterOptions, searchTerm]);

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

  return (
    <div className='container mt-5'>
      <div className='top' style={{marginLeft:'40px',marginTop:'30px',border:'1px solid black ',borderRadius:'10px',marginBottom:'30px',marginRight:'50px',backgroundColor:'#f5f5f5'}}>
      <div className="search-filter-container" style={{ display: 'flex',  alignItems: 'center', marginBottom: '20px' ,paddingLeft:'0px'}}>

        <div className="search-container" style={{ marginTop:'30px',marginRight: '50px'}}>
          <label style={{marginRight:'15px',marginTop:'20px'}} className='relative-label'>Search:</label>
          <input
            type="text"
            placeholder="Search for Titles..."
            value={searchTerm}
            onChange={handleSearch} style={{width:'400px',marginTop:'00px'}}
          />
        </div>

        
          <div className="filter-dropdown" style={{marginRight:'20px'}}>
            <label className='relative-label'>Domain:</label>
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
            <label className='relative-label'>Section:</label>
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
      
      </div>
      <div className='bottom' style={{borderRadius:'20px',overflow:'hidden', marginBottom: '-1px'}}>
      <div className="table-search-container-proj" style={{borderRadius:'20px',overflow:'hidden'}}>
        
        <table className='proj' style={{ borderCollapse: 'collapse',borderRadius:'20px',overflow:'visible'}}>
          <thead>
            <tr>
              <th>Problem Statement</th>
              <th>Domain</th>
              <th>Category</th>
              <th>Section</th>
              <th>Batch</th>
              
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

export default TableWithPagination1;
