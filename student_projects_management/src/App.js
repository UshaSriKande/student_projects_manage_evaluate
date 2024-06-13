// App.js
import React from 'react';
import { BrowserRouter as Router, Route,Routes,Navigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
//import './pages/menu.css'
import './App.css'
//import './pages/style.css'
import Student from './pages/Student';
import LeftMenu from './pages/LeftMenu';
import ListUserPage from './admin/ListUserPage'
import CreateUser from './student/CreateUser';
import ListBatch from './admin/ListBatch';
import EditProject from './pages/EditProject';
import Admin from './pages/Admin';
import AutomatePage from './admin/AutomatePage';
import CustomPage  from './admin/CustomPage';
import EditBatch from './pages/EditBatch';
import BatchDividing from './pages/BatchDividing';
import GuideMapping from './admin/GuideMapping';
import ReviewSchedule from './admin/ReviewSchedule';
import Sidebar from './pages/Sidebar';
import Power from './power';
import { useAuth } from './AuthContext';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import Adm from './admin/adm';
import Fac from './faculty/fac';
import LogoutButton from './LogOut';
import CertificateDownload from './student/CertificateDownload';
import ListReview from './admin/ListReview';
import ListReview_NA from './pages/ListReview_NA';
import EditReview from './pages/EditReview';
import EditGuide from './pages/EditGuide';
import ForgotPassword from './ForgotPassword';
import AdminTop from './admin/admin_topbar';
import ListBatch_NA from './pages/ListBatch_NA';
import SettingsPage from './student/SettingsPage';
import AddDocument from './pages/AddDocument';
import PdfViewer from './pages/PdfViewer';
import SettingsPageFaculty from './faculty/SettingsPageFaculty';
import SignUpForm from './SignupForm';
import Otp from './Otp';
import ListUserPage1 from './pages/ListUserPage1';
import ListUserPagehome from './pages/ListUserPagehome';
import Home from './Home';
import Intro from './intro';

import Contact from './Contact';
import MarksList from './faculty/ListMarks';
import MarksListAdmin from './admin/ListMarksAdmin';

const AuthenticatedRoute = ({ element }) => {
    const { user } = useAuth();
    return user ? element : <Navigate to="/login" />;
};

const App = () => {
  const { user } = useAuth();
  console.log(user);
  const [isOTPVerified, setIsOTPVerified] = useState(false);

  return (
   
         
            
            <Router>
            
                <Routes>
                <Route path="/admintop" element={<AdminTop />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    
                    <Route path="/adddocument" element={<AddDocument />} />
                    <Route path="/" element={<Navigate to="/Intro" />} />
                    <Route path="/user/:id/:sec/editproject" element={<EditProject />}  />
                    <Route path="/pdf" element={<PdfViewer />} />
                     {/* Authrnticated sidebar routes */}
                     <Route path="/signup" element={<SignUpForm isOTPVerified={isOTPVerified}/>} />
                     <Route path="/otp" element={< Otp setIsOTPVerified={setIsOTPVerified}/>} />
                     <Route path="/listhome" element={<ListUserPagehome />} />
                     
                     <Route path="/intro" element={<Intro />}/>
          <Route path="/Home" element={<Home />} /> 
          
          <Route path="/Contact" element={<Contact />} />
                    </Routes>
                
                {user && (
                    
                        <Sidebar>
                            
                        <Routes>
                        
                        <Route path="/list" element={<AuthenticatedRoute element={<ListUserPage />} />} />
                        <Route path="/liststudent" element={<AuthenticatedRoute element={<ListUserPage1 />} />} />
                            
                            <Route path="/addnewuser" element={<AuthenticatedRoute element={<CreateUser />} />} />
                            <Route path="/addnewuser/list" element={<AuthenticatedRoute element={<ListUserPage />} />} />

                            <Route path="/user/:id/:sec/editproject" element={<AuthenticatedRoute element={<EditProject />} />} />
                            <Route path="/user/:id/:sec/:year/editproject" element={<AuthenticatedRoute element={<EditProject />} />} />
                            <Route path="settings/user/:id/:sec/:year/editproject" element={<AuthenticatedRoute element={<EditProject />} />} />
                            <Route path="facultysettings/user/:id/:sec/:year/editproject" element={<AuthenticatedRoute element={<EditProject />} />} />

                            <Route path="listreview/user/:id/:sec/:year/editreview" element={<AuthenticatedRoute element={<EditReview />} />} />

                            <Route path="/list/user/:id/:sec/:year/editproject" element={<AuthenticatedRoute element={<EditProject />} />} />
                            <Route path="/dashboard/user/:id/:sec/:year/editproject" element={<AuthenticatedRoute element={<EditProject />} />} />
                            <Route path="/dashboard/user/:id/:sec/:year/editproject" element={<AuthenticatedRoute element={<EditProject />} />} />
                            <Route path="/listbatch" element={<AuthenticatedRoute element={<ListBatch />} />} />
                            <Route path="/listbatchna" element={<AuthenticatedRoute element={<ListBatch_NA />} />} />
                            <Route path="/automate" element={<AuthenticatedRoute element={<AutomatePage />} />} />
                            <Route path="/custom" element={<AuthenticatedRoute element={<CustomPage />} />} />
                            <Route path="/custom/user/:id/:sec/editbatch" element={<AuthenticatedRoute element={<EditBatch />} />} />
                            <Route path="/listbatch/user/:id/:sec/:year/editbatch" element={<AuthenticatedRoute element={<EditBatch />} />} />
                            <Route path="/batchdividing" element={<AuthenticatedRoute element={<BatchDividing />} />} />
                            <Route path="/guidemapping" element={<AuthenticatedRoute element={<GuideMapping />} />} />
                            <Route path="/automate/user/:id/:sec/editbatch" element={<AuthenticatedRoute element={<EditBatch />} />} />
                            <Route path="/review" element={<AuthenticatedRoute element={<ReviewSchedule />} />} />
                            <Route path="/power" element={<AuthenticatedRoute element={<Power />} />} />
                            <Route path="/admin" element={<Adm />} />
                            <Route path="/faculty" element={<Fac />} />
                            <Route path="/listmarks" element={<AuthenticatedRoute element={<MarksList />} />} />
                            <Route path="/faculty/listmarks" element={<AuthenticatedRoute element={<MarksList />} />} />
                            <Route path="/listmarksadmin" element={<AuthenticatedRoute element={<MarksListAdmin />} />} />
                            <Route path="/admin/listmarksadmin" element={<AuthenticatedRoute element={<MarksListAdmin />} />} />
                            <Route path="/logout" element={<LogoutButton />} />
                            <Route path="/listreview" element={<AuthenticatedRoute element={<ListReview />} />} />
                            <Route path="/listreview_na" element={<AuthenticatedRoute element={<ListReview_NA />} />} />
                            <Route path="/custom/user/:id/:sec/:guide/editguide" element={<AuthenticatedRoute element={<EditGuide />} />} />
                            <Route path="/listbatch/user/:id/:sec/:guide/editguide" element={<AuthenticatedRoute element={<EditGuide />} />} />
                            <Route path="/automate/user/:id/:sec/:guide/editguide" element={<AuthenticatedRoute element={<EditGuide />} />} />

                            <Route path="/settings" element={<AuthenticatedRoute element={<SettingsPage />} />} />
                            <Route path="/settings/user/:id/:sec/editproject" element={<AuthenticatedRoute element={<EditProject />} />} />

                            <Route path="/facultysettings" element={<AuthenticatedRoute element={<SettingsPageFaculty />} />} />
                            <Route path="/facultysettings/user/:id/:sec/editproject" element={<AuthenticatedRoute element={<EditProject />} />} />


                            <Route path="/certificate-download" element={<AuthenticatedRoute element={<CertificateDownload />} />}  />
                        </Routes>
                    </Sidebar>
                )}
             

            </Router>
           
        
  );
};

export default App;
