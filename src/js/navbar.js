import React, { useState } from 'react';
import '../css/navbar.css'; // Import the CSS file
import logoImage from '../img/logo.png'; // Import your logo image
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
      <div className="logo">
        <img src={logoImage} alt="Logo" />
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={`nav-list ${menuOpen ? 'open' : ''}`}>
        <li onClick={toggleMenu}><Link to="/">Home</Link></li>
        <li onClick={toggleMenu}><Link to="/discussion/a">Career</Link></li>
        <li onClick={toggleMenu}><Link to="/discussion/b">Wellbeing</Link></li>
        <li onClick={toggleMenu}><Link to="/discussion/c">Lifestyle</Link></li>
        <li onClick={toggleMenu}><Link to="/volunteer">Volunteer Now</Link></li>
        <li onClick={toggleMenu}><Link to="/aboutus">About Us</Link></li>
      </ul>
      <button className={`join-button ${menuOpen ? 'open' : ''}`}><Link to="/invite">Join</Link></button>
    </nav>
  );
}

export default Navbar;
