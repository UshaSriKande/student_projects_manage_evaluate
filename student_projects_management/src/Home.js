import './style.css';
import  aboutImage from './about.jpg';
import logo from './logo.png';
import backgroundimage from './background.jpg';
import {Link} from 'react-router-dom';
function Home() {
return(
    <div className='contai' style={{marginTop:'200px'}}>
      <div className="subheader" style={{height: '50vh',width: '100%', backgroundImage: `linear-gradient(rgba(4, 9, 30, 0.7), rgba(4, 9, 30, 0.7)),url(${backgroundimage})`,backgroundPosition:'center',backgroundSize:'center',color:'white',textAlign:'center',overflow:'hidden'}}><nav ></nav>
    <nav style={{padding:'5% 6%'}}>
<img src={logo} alt='logo'></img>
        
        <br/>
        <br/>
        <div className='nav-links'>
        <ul>
        <li><Link to ="/listhome" style={{color:'white', textDecoration:'none',fontSize:'17px'}}>Projects</Link></li>
        <li><Link to="/Home" style={{color:'white', textDecoration:'none',fontSize:'17px'}}>About</Link></li>
        <li><Link to ="/Login" style={{color:'white', textDecoration:'none',fontSize:'17px'}}>Login</Link></li>
        <li><Link to ="/Contact" style={{color:'white', textDecoration:'none',fontSize:'17px'}}>Contact</Link></li>
        </ul>
        </div>
        
      </nav>
      <center><h1 style={{}}>About Us</h1></center>
      </div>
<br/>
<br/>
<br/>
<br/>
    <div className="Home">
 <section className="about-us">
        <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
        <div className="about-col">
                <img src={aboutImage} alt="about" style={{   marginLeft: '70px',marginRight: '40px', height : '300px', width :'600px' ,borderRight: '6px solid #00CED1',borderBottom: '6px solid #00CED1',borderRadius:'10px'}}/>
            </div>
            <div className="about-col">
                
                <center style={{color:'blue'}}><h1>Shri Vishnu Engineering College For Women</h1></center>
                  <p style={{color: '#A9A9A9', fontFamily:'inherit',fontSize:'17px'}}>We are a dedicated group of students from SVECW, Bhimavaram Engineering College. 
                  Our initiative revolves around creating an online platform for  project submissions and evaluations and the innovative platform that is revolutionizing academic project management. 
                  Our goal is not only to introduce students to the process of project submission in a digital environment but also to provide comprehensive assistance throughout their journey.
                  Our platform is designed to satisfy the diverse needs of students, faculty, and review panelists, empowering users at every step of the way. Whether you are a student 
                  seeking automated batch allocation and domain-specific mentorship or a faculty member
                   looking for streamlined group assignments, our platform has got you covered. The transparent assessment process during review cycles ensures valuable feedback, 
                   while intuitive search and filtering options make the platform easily accessible. We also celebrate the dedication of top-performing groups by rewarding them with certificates. 
                   To drive data-driven decision-making, our insightful dashboard offers valuable statistics.
                   In, total this website will make the review process much efficient.
                We at SVECW believe that every student has
                innate potential that can be unlocked through quality teaching and mentorship.</p>
            </div>  
            <br/>
            <br/>
        </div>
    </section>

    </div>
    
    <div className="course">
    <br/>
        <center style={{color:'blue'}}><h2>Courses SVECW Offer</h2></center>

        <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="course-col" style={{flexBasis:'21%',
    background: '#F0F8FF',
    borderRadius: '10px',
    marginBottom: '5%',
    padding: '20px 12px',
    boxSizing: 'border-box',
    transition: '0.1s',
    marginLeft:'50px'}} >
                  
                <p><b>CSE</b> <span>commonly denotes the specialization within the field of engineering that focuses on computer science principles and applications.</span><br/><br/>
                        <b>IT</b> <span> stands for Information Technology, encompassing the use of computer systems to store and manipulate data for various purposes.</span></p>
            </div>
            <div className="course-col" style={{flexBasis:'21%',
    background: '#F0F8FF',
    borderRadius: '10px',
    marginBottom: '5%',
    padding: '20px 12px',
    boxSizing: 'border-box',
    transition: '0.1s',
    marginLeft:'50px'}}>
              
                <p><b>ECE</b> <span>refers to Electronics and Communication Engineering, which involves the study and application of electronics, telecommunications.</span><br/><br/>
                        <b>EEE</b> <span>stands for Electrical and Electronics Engineering, which involves the study and application of electrical systems.</span></p>
            </div>
            <div className="course-col" style={{flexBasis:'21%',
    background: '#F0F8FF',
    borderRadius: '10px',
    marginBottom: '5%',
    padding: '20px 12px',
    boxSizing: 'border-box',
    transition: '0.1s',
    marginLeft:'50px'}}>
               
                <p><b>Mechanical</b> <span>refers to the branch of engineering that deals with the design, construction, and operation of machinery.</span><br/><br/>
                        <b>CIVIL</b> <span>likely refers to "Civil Engineering," which involves the design, construction, and maintenance of infrastructure such as buildings, roads.</span></p>
            </div>
            <div className="course-col" style={{flexBasis:'21%',
    background: '#F0F8FF',
    borderRadius: '10px',
    marginBottom: '5%',
    padding: '20px 12px',
    boxSizing: 'border-box',
    transition: '0.1s',
    marginLeft:'80px'}}>
               
                <p><b>AIDS</b> <span>can be considered as a branch or specialization within the broader fields of computer science and data analysis</span><br/><br/>
                        <b>AIML</b> <span>represent a specialized branch within computer science focusing on the development of algorithms and models that enable computers to perform tasks</span></p>
            </div>
        </div>
    </div>


    </div>

    
    );
    }   
export default Home;