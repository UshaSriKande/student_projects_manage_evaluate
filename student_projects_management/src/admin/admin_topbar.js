// App.js
import React from 'react';
import { BrowserRouter as Router, Route,Routes,Navigate} from 'react-router-dom';
import { Link } from 'react-router-dom';


const AdminTop = () => {
  return (/*
    <div className="app">
    <div class="page-hdr">
    <div class="row align-items-center" style={{background: "linear-gradient(to right,#0acffe 0,#495aff 100%)","Right":"200px"}}>
        <div class="col-4 col-md-7 page-hdr-left" >
        
            <div id="logo" style={{background: "linear-gradient(to right,#0acffe 0,#495aff 100%);"}}>
                <div class="tbl-cell logo-icon">
                    <a href="#"></a>
                </div>
                <div class="tbl-cell logo">
                    <a href="#">VARR</a>
                </div>
            </div>
            <div class="page-menu menu-icon">
                <a class="animated menu-close"><i class="far fa-hand-point-left"></i></a>
            </div>
        </div>
        <div class="col-8 col-md-5 page-hdr-right" >
            <div class="page-hdr-desktop">
                <div class="page-menu menu-dropdown-wrapper menu-user">
                    <a class="user-link">
                        <span class="tbl-cell user-name pr-3" style={{color: "aliceblue","font-size": "initial"}}>Hello <span class="pl-2">Admin</span>
                        </span>
                        <span class="tbl-cell avatar"><img src="uploads/author-4.jpg" alt=""/></span>
                    </a>
                    <div class="menu-dropdown menu-dropdown-right menu-dropdown-push-right">
                        <div class="arrow arrow-right"></div> 
                        <div class="menu-dropdown-inner">
                            <div class="menu-dropdown-footer text-right">
                                <a href="logout.php" class="btn btn-outline btn-primary btn-block btn-pill btn-outline-2x font-12 btn-sm">Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


            
        </div>
        */

        
        
            <div className="container1">
              <div className="row1">
                <div className="column1 left-align">VARR</div>
                <div className="column1 double right-align">
                <span className="white-text">Hello</span> Admin</div>
              </div>
            </div>
        
        
  );
};

export default AdminTop;
