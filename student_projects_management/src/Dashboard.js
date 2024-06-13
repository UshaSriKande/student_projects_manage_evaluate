// src/Dashboard.js
// App.js
import React from 'react';
import { BrowserRouter as Router, Route,Routes,Navigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import './pages/menu.css'
import './App.css'
import './pages/style.css'
import Student from './pages/Student';
import LeftMenu from './pages/LeftMenu';
import ListUserPage from './admin/ListUserPage';
import CreateUser from './student/CreateUser';
import ListBatch from './admin/ListBatch';
import EditProject from './pages/EditProject';
import Admin from './pages/Admin';
import AutomatePage from './admin/AutomatePage';
import CustomPage from './admin/CustomPage';
import EditBatch from './pages/EditBatch';
import BatchDividing from './pages/BatchDividing';
import GuideMapping from './admin/GuideMapping';
import ReviewSchedule from './admin/ReviewSchedule';
import Sidebar from './pages/Sidebar';
import Power from './power';
import LogoutButton from './LogOut';
import Adm from './admin/adm';
import ListReview from './admin/ListReview';
import { useAuth } from './AuthContext';

const AdminDashboard = () => {
    return (
        
        <ListUserPage/>

        /*
        <Sidebar>
            <ListUserPage />
            </Sidebar>
            {/*
      <Routes>
            <Route path="/list" element={<ListUserPage />} />
            <Route path="/addnewuser" element={<CreateUser />} />
            <Route path="list/user/:id/editproject" element={<EditProject />} />
            <Route path="/listbatch" element={<ListBatch />} />
            <Route path="/automate" element={<AutomatePage />} />
            <Route path="/custom" element={<CustomPage />} />
            <Route path="/custom/user/:id/:sec/editbatch" element={<EditBatch />} />
            <Route path="/batchdividing" element={<BatchDividing />} />
            <Route path="/guidemapping" element={<GuideMapping />} />
            <Route path="/automate/user/:id/:sec/editbatch" element={<EditBatch />} />
            <Route path='/review_sch' element={<ReviewSchedule />} />
            <Route path='/power' element={<ReviewSchedule />} />
            <Route path='/admin' element={<Adm />} />
            <Route path='/logout' element={<LogoutButton />} />
            <Route path='/listreview' element={<ListReview />} />
    </Routes>*/
        
    );
};

const FacultyDashboard = () => {
    return (
        <div>
            {/*
            <Sidebar>
                <ListUserPage />
                </Sidebar>
      <Routes>
            <Route path="/list" element={<ListUserPage />} />
            <Route path="/addnewuser" element={<CreateUser />} />
            <Route path="list/user/:id/editproject" element={<EditProject />} />
            <Route path="/listbatch" element={<ListBatch />} />
            
            <Route path='/power' element={<ReviewSchedule />} />
            
            <Route path='/logout' element={<LogoutButton />} />
            <Route path='/listreview' element={<ListReview />} />
    </Routes>*/}
        
        </div>
    );
};

const StudentDashboard = () => {
    return (
        <div>     
            
            
            
        {/*    
      <Routes>
            <Route path="/list" element={<ListUserPage />} />
            <Route path="/addnewuser" element={<CreateUser />} />
            <Route path="list/user/:id/editproject" element={<EditProject />} />
            <Route path="/listbatch" element={<ListBatch />} />
            
            <Route path='/power' element={<ReviewSchedule />} />
            
            <Route path='/logout' element={<LogoutButton />} />
            <Route path='/listreview' element={<ListReview />} />
        </Routes>
    */}
        
        </div>
    );
};

const Dashboard = () => {
    const { user } = useAuth();

    if (!user) {
        return <p>Loading...</p>;
    }

    let dashboardContent;
    switch (user.role) {
        case 'admin':
            dashboardContent = <AdminDashboard />;
            break;
        case 'faculty':
            dashboardContent = <FacultyDashboard />;
            break;
        case 'student':
            dashboardContent = <StudentDashboard />;
            break;
        
    }

   
};

export default Dashboard;
