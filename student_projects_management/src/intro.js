import {Link} from 'react-router-dom';
import homebackgroundimage from './home-background.jpg';
import logo from './logo.png';
import './style.css'
function Intro() {
    return (
<div className='cont' style={{  minHeight: '100vh',
  width: '1500px',
  backgroundImage: `linear-gradient(rgba(4, 9, 30, 0.7), rgba(4, 9, 30, 0.7)),url(${homebackgroundimage})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  position: 'relative'}}>
    <br />
    
    <nav >
    <img src={logo} alt='logo'style={{width :'100px', marginLeft:'20px'}}/ >
      <div className='nav-links'>
      <ul>
      <li><Link to ="/listhome" style={{color:'white', textDecoration:'none',fontSize:'17px'}}>Projects</Link></li>
        <li><Link to="/Home" style={{color:'white', textDecoration:'none',fontSize:'17px'}}>About</Link></li>
        <li><Link to ="/Login" style={{color:'white', textDecoration:'none',fontSize:'17px'}}>Login</Link></li>
        <li><Link to ="/Contact" style={{color:'white', textDecoration:'none',fontSize:'17px'}}>Contact</Link></li>
      </ul>
      </div>
    </nav>
    
    <div className='text-box'>
      <br />
      <center>
        <h1>Shri Vishnu Engineering College For Women<br/>(Project Management System)</h1>
    
        <p>
        Sri Vishnu Project Management System helps studens to explore for different projects and upload their project ideas which enables
          <br />  a good knowledge sharing among peers and also help faculty to automate the review process
          members.
        </p>
      </center>

    </div>
    </div>
    );

}
export default Intro;
  
    