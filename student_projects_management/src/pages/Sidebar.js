/*
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList,
    FaSignOutAlt,
    FaTrash
}from "react-icons/fa";



const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(true);
    const toggle = () => setIsOpen (!isOpen);
    const { user } = useAuth();
    const { logout } = useAuth();
    const navigate = useNavigate();

    const adminMenu=[
    
    { name: 'BatchDividing', path: '/batchdividing',icon:<FaUserAlt/>},
    {name: 'ListBatches', path: '/listbatch',icon:<FaThList/>},
    {name: "ListProblemStatements",path:'list',icon:<FaTh/>},
    {name:'GuideMapping',path: '/guidemapping'},
    {name:'ScheduleReview',path: '/review'},
    {name: 'ListReviews', path: '/listreview',icon:<FaThList/>},
    {name:'PowerBIDashboard',path: '/power',icon:<FaRegChartBar/>},
    {name:'AssessProject',path: '/admin',icon:<FaRegChartBar/>},
    
    //{name:'LogOut',path: '/logout',icon:<FaSignOutAlt/>},
    
    ]
   
    const facultyMenu = [
      {name: 'ListBatches', path: '/listbatch',icon:<FaRegChartBar/>},
        { path: '/list',name: "ListProblemStatements",icon:<FaTh/>},
        {name: 'ListReviews', path: '/listreview_na',icon:<FaThList/>},
        {name:'PowerBIDashboard',path: '/power',icon:<FaRegChartBar/>},
    {name:'AssessProject',path: '/faculty',icon:<FaRegChartBar/>},
    
    //{name:'LogOut',path: '/logout',icon:<FaSignOutAlt/>},
    
      ];
    
      const studentMenu = [
        { path: '/list',name: "ListProblemStatements",icon:<FaTh/>},
    
    {name: 'ListBatches', path: '/listbatch',icon:<FaRegChartBar/>},

    {name: 'CreateProject', path: '/addnewuser',icon:<FaCommentAlt/>}, 
    {name: 'ListReviews', path: '/listreview_na',icon:<FaThList/>},
    {name:'PowerBIDashboard',path: '/power',icon:<FaRegChartBar/>},
    {name: 'Certificate', path: '/certificate-download',icon:<FaCommentAlt/>},  
    
    //{name:'LogOut',path: '/logout',icon:<FaSignOutAlt/>},
    
    
      ];
    
      const getMenuItems = () => {
        switch (user?.role) {
          case 'admin':
            return adminMenu;
          case 'faculty':
            return facultyMenu;
          case 'student':
            return studentMenu;
          default:
            return [];
        }
      };
    
      const menuItem = getMenuItems();
      const handleLogout = () => {
         // Call your logout function from AuthContext
        logout();
    navigate('/login');
    };
    return (
      
        <div className="container">
           <div style={{width:isOpen?"270px":"50px"}} className="sidebar">
           
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
                   <div style={{marginLeft: isOpen ? "150px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
        <div className="container">
            
            <div className="row1">
                <div className="column1 left-align">VARR</div>
                <div className="column1 double right-align"><span className="white-text">Hello</span> Admin</div>
              </div>
             
            <div className='row2'>
           <div style={{marginTop:"0px",width:"280px"}} className="sidebar">
           <div className="row1">
                <div className="column1 left-align">VARR</div>
                
              </div>
              <h1 style={{display:"block",width:"00px",color:"black"}} className="logo">Logo</h1>
              {/*
               <div className="top_section">
                   <h1 style={{display:"block",width:"00px",color:"black"}} className="logo">Logo</h1>
                   {/*<div style={{marginLeft: "120px" }} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>*
               </div>*/
               /*
               {
                
                   menuItem.map((item, index)=>(
                       <Link to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display:  "block",textDecoration:""}} className="link_text">{item.name}</div>
                       </Link>
                   ))
               }
               <div onClick={handleLogout} className="link" activeclassName="active" >
                   <div className="icon"><FaSignOutAlt/></div>
                   <div style={{ display:"block",textDecoration:'underline',cursor:'pointer'}} className="link_text">Log Out</div>
               </div>
           </div>
           </div>
           <main>{children}</main>
        
        </div>
    );
};

export default Sidebar;*/

import React, { useState,useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import ListUserPage from '../admin/ListUserPage';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList,
    FaSignOutAlt,
    FaTrash,
    
    FaChevronDown, FaChevronRight, FaDesktop, FaPeopleArrows, FaUserFriends, FaLayerGroup, FaCog, FaNotesMedical, FaClipboard, FaClipboardCheck, FaCertificate, FaFileCsv, FaFileDownload, FaPlus, FaPlusCircle, FaUserPlus, FaList, FaObjectGroup, FaFolder, FaSignInAlt, FaUnlock, FaKey, FaFolderOpen, FaClipboardList 
} from "react-icons/fa";
import './Sidebar.css';
import ListBatch from '../admin/ListBatch';
import BatchDividing from './BatchDividing';
import AutomatePage from '../admin/AutomatePage';
import CustomPage from '../admin/CustomPage';
import EditBatch from './EditBatch';
import CreateUser from '../student/CreateUser';
import ListUserPage1 from './ListUserPage1';
import ListMarks from '../faculty/ListMarks';

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    const { user } = useAuth();
    const { logout } = useAuth();
    const navigate = useNavigate();

    const adminMenu1 = [
        { name: 'BatchDividing', path: '/batchdividing', icon: <FaUserAlt /> },
        { name: 'ListBatches', path: '/listbatch', icon: <FaThList /> },
        { name: "ListProblemStatements", path: 'list', icon: <FaTh /> },
        { name: 'GuideMapping', path: '/guidemapping' },
        { name: 'ScheduleReview', path: '/review' },
        { name: 'ListReviews', path: '/listreview', icon: <FaThList /> },
        { name: 'PowerBIDashboard', path: '/power', icon: <FaRegChartBar /> },
        { name: 'AssessProject', path: '/admin', icon: <FaRegChartBar /> },
       
    ];


    const adminMenu = [
        {
            name: 'Batch',
            icon: <FaLayerGroup />,
            subItems: [
                { name: 'Custom Divide', path: '/custom' },
                { name: "Automate Divide", path: '/automate'},
                /*{ name: 'BatchDividing', path: '/batchdividing' },*/
                
                ],},
        {
            name: 'Student',
            icon: <FaDesktop />,
            subItems: [
                { name: 'View Batches', path: '/listbatch' },
                { name: 'Guide Mapping', path: '/guidemapping' },
                { name: "View Projects", path: '/list', },
            ],
        },
        
        {
            name: 'Phases',
            icon: <FaUserFriends />,
            subItems: [
        { name: 'Schedule Review', path: '/review' },
        { name: 'View Reviews', path: '/listreview'},
            ],
        },
        
        { name: 'PowerBIDashboard', path: '/power', icon: <FaRegChartBar /> },
        { name: 'Assess Project', path: '/admin', icon: <FaFolderOpen /> },
        { name: 'View Marks', path: '/listmarksadmin', icon: <FaFolderOpen /> },

    ];

    const facultyMenu = [
        { name: 'View Batches', path: '/listbatchna', icon: <FaLayerGroup />  },
        { path: '/liststudent', name: "View Projects", icon: <FaClipboardCheck />  },
        { name: 'View Reviews', path: '/listreview_na', icon: <FaThList /> },
        { name: 'Assess Project', path: '/faculty', icon: <FaFolderOpen /> },
        { name: 'View Marks', path: '/listmarks', icon: <FaFolderOpen /> },
        { name: 'Settings', path: '/facultysettings', icon: <FaCog /> },
    ];

    const studentMenu = [
        { path: '/liststudent', name: "View Projects", icon: <FaClipboardCheck /> },
        { name: 'View Batches', path: '/listbatchna', icon: <FaLayerGroup /> },
        { name: 'Upload Project', path: '/addnewuser', icon: <FaUserPlus /> },
        { name: 'View Reviews', path: '/listreview_na', icon: <FaThList /> },
        { name: 'Certificate', path: '/certificate-download', icon: <FaFileDownload/> },
        { name: 'Settings', path: '/settings', icon: <FaCog /> },
    ];

    const getMenuItems = () => {
        switch (user?.role) {
            case 'admin':
                return adminMenu;
            case 'faculty':
                return facultyMenu;
            case 'student':
                return studentMenu;
            default:
                return [];
        }
    };
  
    const [activeMenuItem, setActiveMenuItem] = useState('ListUserPage');

    const handleMenuItemClick = (menuItem) => {
        setActiveMenuItem(menuItem);
    };
    
    const [collapsedMenus, setCollapsedMenus] = useState({});

    useEffect(() => {
        const initialCollapsedState = {};
        const numberOfMenus = 3;
        // Assuming you have an array of menus, you can loop through them to initialize as collapsed
        for (let i = 1; i < numberOfMenus; i++) {
            initialCollapsedState[i] = true; // Collapsed
        }
        setCollapsedMenus(initialCollapsedState);
    }, []);

    const toggleCollapse = (index) => {
        setCollapsedMenus((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };


    
    


    const renderMenuItems = (menuItems) => {
        return menuItems.map((menuItem, index) => (
            <div key={index}>
                <div className="link" onClick={() => {toggleCollapse(index); handleMenuItemClick(menuItem.name)}}>
                <Link to={menuItem.path} className="link" activeClassName="active">
                    <div className="icon">{menuItem.icon}</div>
                    <div className="link-text">{menuItem.name}</div>
                    </Link>
                    {menuItem.subItems && (
                        <div className="collapse-icon" style={{paddingLeft:"80px"}}>
                            {collapsedMenus[index] ? <FaChevronRight /> :<FaChevronDown />}
                        </div>
                    )}
                </div>
                {menuItem.subItems && !collapsedMenus[index] && (
                    <div className="sub-menu">
                        {menuItem.subItems.map((subItem, subIndex) => (
                            <Link to={subItem.path} key={subIndex} className="link sub-link" activeClassName="active">
                                <div className="icon sub-icon" style={{marginLeft:'00px'}}>{subItem.icon}</div>
                                <div className="link-text" style={{color:"white"}}>{subItem.name}</div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        ));
    };

  

    const menuItem = getMenuItems();
    const handleLogout = () => {
        // Call your logout function from AuthContext
        logout();
        navigate('/intro');
    };

    /*
    const renderContent = () => {
        switch (activeMenuItem) {
            case 'ListUserPage':
                return <ListUserPage />;
            
            case 'CreateProject':
                return <CreateUser />
            default:
                return children;
        }
    };
*/

const renderContent = () => {
    // Assuming you have access to the user object
    if (activeMenuItem === 'ListUserPage' && user.role === 'admin') {
        return <ListUserPage />;
    } else if (activeMenuItem === 'ListUserPage' && user.role === 'student') {
        return <ListUserPage1 />;
    }else if (activeMenuItem === 'ListUserPage' && user.role === 'faculty') {
        return <ListUserPage1 />;
    }
     else {
        return children; // Or whatever fallback content you want to render
    }
};

    
        // Function to capitalize the first letter of a string
        const capitalizeFirstLetter = (str) => {
          return str.charAt(0).toUpperCase() + str.slice(1);
        };

    return (
        <div className="sidebar1">
        <div className="top-row">
            <div className="column left-column">
                <h1 className="logo" style={{marginTop:'20px'}}>SVECW</h1>
            </div>
            <div className="column right-column" style={{color:'black',fontSize:'20px'}}>
                <span className="white-text" style={{marginTop:'20px'}}>Hello ,</span> <strong style={{marginTop:'20px'}}>{capitalizeFirstLetter(user.role)}</strong>
            </div>
        </div>
        <div className="bottom-row" style={{marginTop: '0px' }}>
            <br></br>
            <br></br>
            <div className="sidebar-content" style={{ paddingTop: '50px' }}>
                {/*{menuItem.map((item, index) => (
                    <Link to={item.path} key={index} className="link" activeClassName="active">
                        <div className="icon">{item.icon}</div>
                        <div className="link-text">{item.name}</div>
                    </Link>
                ))}*/}
                
                {renderMenuItems(menuItem)}

                <div onClick={handleLogout} className="link">
                    <div className="icon" style={{marginLeft:'15px'}}><FaSignOutAlt /></div>
                    <div className="link-text">Log Out</div>
                </div>
            </div>
            <main className='content'>
            {renderContent()}</main>
        </div>
    </div>
);
};

export default Sidebar;
