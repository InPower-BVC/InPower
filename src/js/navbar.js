import React, { useState } from 'react';
import '../css/navbar.css'; // Import the CSS file
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom
import logo from '../img/logo_nav.png';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${menuOpen ? 'open' : ''}`}>
      <div className="logo-container">
        <img className="logo-img" src={logo} alt="Logo" />
        <div className="logo-text">InPower</div>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <ul className={`nav-list ${menuOpen ? 'open' : ''}`}>
        <li onClick={toggleMenu}><Link to="/">Home</Link></li>
        <li onClick={toggleMenu}><Link to="/discussion/a">Magazine</Link></li>
        <li onClick={toggleMenu}><Link to="/blog">Blog</Link></li>
      </ul>

      <div className="join-button-container">
        <button className={`join-button ${menuOpen ? 'open' : ''}`}>
          <Link to="/invite" style={{ color: '#7C0C24' }}>Join</Link>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
