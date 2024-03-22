import React, { useState } from 'react';
import '../css/navbar.css'; // Import the CSS file

import { Link } from 'react-router-dom'; // Import Link component from react-router-dom


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
      <nav className={`navbar ${menuOpen ? 'open' : ''}`}>

  
</nav>

      <div className="hamburger" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <ul className={`nav-list ${menuOpen ? 'open' : ''}`}>
        <li onClick={toggleMenu}><Link to="/">Home</Link></li>
        <li onClick={toggleMenu}><Link to="/discussion/a">Magazine</Link></li>
       
        <li onClick={toggleMenu}><Link to="/blog">Blog</Link></li>
        <li onClick={toggleMenu}><Link to="/volunteer">Volunteer Now</Link></li>
        <li onClick={toggleMenu}><Link to="/aboutus">About Us</Link></li>

      </ul>

      
      <button className={`join-button ${menuOpen ? 'open' : ''}`}>
  <Link to="/invite" style={{ color: '#7C0C24' }}>Join</Link>
</button>


      
      
      

      <div className="logo">
    
    InPower
  </div>


    {/* 
      <p className="quote">
        InPower
      </p>
  */}

    </nav>
    
    
  );
}

export default Navbar;
