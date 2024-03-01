import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import '../css/footer.css';

function Footer() {
  
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <div className='footer-content'>
          <h2>Contact Us</h2>
          <p>Email:razan@weareinpower.com</p>
          <p>Phone: (123) 456-7890</p>
          <Link to='/Admin'>Admin</Link> 
        </div>
        <div className='footer-content'>
          <h2>Follow Us</h2>
          <a href='https://www.instagram.com/'>Facebook</a>
          <a href='https://www.instagram.com/'>Twitter</a>
          <a href='https://www.instagram.com/'>Instagram</a>
          
        </div>
      </div>
      <p className='footer-bottom'>© 2023 Your Company. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
