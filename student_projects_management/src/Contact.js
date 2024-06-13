import backgroundimage from './background.jpg';
import logo from './logo.png';
import {Link} from 'react-router-dom';
import './style.css';
import React, { useState } from 'react';
import axios from 'axios';
function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    
      const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async e => {
        e.preventDefault();
        try {
          await axios.post('http://127.0.0.1:5000/submit_feedback', formData);
          alert('Mail Sent successfully');
          setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
          console.error('Error submitting feedback:', error);
          alert('Error submitting feedback');
        }
      };
    return(
        <div className="contact-component" style={{width:'1500px',marginTop:'130px',paddingLeft:'0px',borderRadius:'20px'}}>
            <div className="subheader" style={{height: '50vh',width: '100%', backgroundImage: `linear-gradient(rgba(4, 9, 30, 0.7), rgba(4, 9, 30, 0.7)),url(${backgroundimage})`,backgroundPosition:'center',backgroundSize:'center',color:'white',textAlign:'center',overflow:'hidden'}}><nav >
<img src={logo} alt='logo'></img>
        
        <br/>
        <br/>
        <div className='nav-links'>
        <ul>
        <li><Link to ="/listhome" style={{color:'white', textDecoration:'none',fontSize:'17px'}}>Projects</Link></li> 
        <li><Link to="/Home" style={{color:'white', textDecoration:'none',fontSize:'17px'}}>About</Link></li>
        <li><Link to ="/login" style={{color:'white', textDecoration:'none',fontSize:'17px'}}>Login</Link></li>
        <li><Link to ="/Contact" style={{color:'white', textDecoration:'none',fontSize:'17px'}}>Contact</Link></li>
        </ul>
        </div>
        
      </nav>
      <br/><center ><h1>Contact Us</h1></center>
  <br/>
  <br/>
 </div>
 <br/>
 <br/>
 <div className='formdetails' style={{ display: 'flex' }}>
  <section className="location">
        <center><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3824.166614661931!2d81.51990395034714!3d16.56811898851834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37cd4eb220051d%3A0xea3d7b50d0a1458!2sShri%20Vishnu%20Engineering%20College%20Autonomous!5e0!3m2!1sen!2sin!4v1664869592253!5m2!1sen!2sin"  style={{border:'0',width:'900px', height:'450px', marginLeft:'20px'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="map"></iframe></center>
    </section>
    <div style={{marginLeft:'40px'}}>
        <form className='contact-form' onSubmit={handleSubmit}>
                <h2>Contact Form</h2>
                    <input type="text" name="name" onChange={handleChange} value={formData.name} placeholder="Enter your name" required/>

                    <input type="email" name="email" onChange={handleChange} value={formData.email} placeholder="Enter your email address" required/>
                    <input type="text" name="subject" onChange={handleChange} value={formData.subject} placeholder="Enter your Subject" required/>
                    <textarea rows="8" name="message" onChange={handleChange} value={formData.message} placeholder="Message" required></textarea>
                    <button type="submit" class="btn red-btn">Send Message</button>
                </form>
                </div>
                </div>
        </div>
    );
}
export default Contact;