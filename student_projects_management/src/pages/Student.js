// App.js
import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import './menu.css'
import { Link } from 'react-router-dom';

import './style.css'
import LeftMenu from './LeftMenu';
import ListUserPage from '../admin/ListUserPage';
import CreateUser from '../student/CreateUser';
import ListBatch from '../admin/ListBatch';
import EditProject from './EditProject';

import AutomatePage from '../admin/AutomatePage';
import CustomPage from '../admin/CustomPage';
import EditBatch from './EditBatch';
import BatchDividing from './BatchDividing';
import GuideMapping from '../admin/GuideMapping';



const Student = () => {
  const menus = [
    { title: 'List Problem Statements', path: '/list', component: ListUserPage },
   
    { title: 'List Batches', path: '/listbatch', component: ListBatch },
    { title: 'Create Problem', path: '/addnewuser', component: CreateUser },
    
  ];

  return (
    <div className='app'>
    
      <div style={{ display: 'flex' }}>
        <div style={{ width: '200px', borderRight: '1px solid #ccc' }}>
          <LeftMenu menus={menus} />
        </div>
        </div>
        
            
        <div style={{ padding: '00px' }} className='content'>
        
          {menus.map((menu) => (
            <Link key={menu.path} path={menu.path} element={<menu.component />} />
          ))}
          

           
            <Link path="user/:id/editproject" element={<EditProject />} />
            
            
         
          
        
        
        </div>
      </div>
      
    
  );
};

export default Student;
