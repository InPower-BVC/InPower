/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom

// Files
import '../css/landing.css'; // Import the CSS file
import TypewriterEffect from '../js/typewriter';
import BubblyButton from '../js/BubblyButton.js';
import magazine1 from "../../src/img/magazine1.jpeg"
import magazine2 from "../../src/img/magazine2.jpeg"
import magazine3 from "../../src/img/magazine3.jpg"
import magazine4 from "../../src/img/magazine4.jpeg"


import main from '../img/main.jpg';

function Landing() {
  return (
    <div className="container">
      <div className="magazine">
        <h1>magazine</h1><br></br>
        <h2 className="line">THE LATEST</h2>
      </div>

      <div className="hero-content">
        <div className="hero-text">
          <h1 className="typewriter">
            <TypewriterEffect text="THE THOUGHT, THE PLAN, THE ACTION: Razan Talebian   Women Funded Grants: InPower Start-Up " />
          </h1>
          <p className="feature-content-p">Join our online groups and connect with quality members who have pledged to make a safe, healthy environment for everyone</p>
          <Link to="/invite">
            <div className="button-container">
              <BubblyButton />
            </div>
          </Link>
        </div>
        <div>
          <img src={main} alt="Main Image" className="hero-img" />
        </div>
      </div>

      <div style={{justifyContent: "center"}} className="volumes">
        <h1>VOLUMES</h1>
        

        <div style={{margin: "38px 6px 40px 6px", width: "100%", justifyContent: "space-evenly", padding:"18px 26px 22px 26px"}} className="volume-card">
          <div style={{marginLeft: "55px"}} className='volume-1'>
            <img style={{width:"340px" ,height: "430px",  boxShadow: "0.5px 2px 1.5px 1.8px"}} src={magazine1}/>
            <h2>Volume 1: Title 1</h2>
            <p style={{fontFamily: 'sans-serif', fontWeight: 'bold'}}>EMBRACING ONE'S DISTINCTIVENESS AND AUTHENTICITY</p>
          </div>
          <div style={{marginRight: "180px"}} className='volume-2'>
          <img style={{width:"340px" ,height: "430px",  boxShadow: "0.5px 2px 1.5px 1.8px"}} src={magazine2}/>
            <h2>Volume 2: Title 2</h2>
            <p style={{fontFamily: 'sans-serif', fontWeight: 'bold'}}>EMBODYING INDIVIDUALITY AND AUTHENTICITY</p>
          </div>

          <div style={{marginLeft: "55px"}}className='volume-3'>
          <img style={{width:"340px" ,height: "430px", boxShadow: "0.5px 2px 1.5px 1.8px"}} src={magazine3}/>
            <h2>Volume 2: Title 2</h2>
            <p style={{fontFamily: 'sans-serif', fontWeight: 'bold'}}>EMBRACING INDIVIDUALITY & AUTHENTICITY</p>
          </div>

          <div style={{marginRight: "180px"}} className='volume-4'>
          <img style={{width:"340px" ,height: "430px", boxShadow: "0.5px 2px 1.5px 1.8px"}} src={magazine4}/>
            <h2>Volume 2: Title 2</h2>
            <p style={{fontFamily: 'sans-serif', fontWeight: 'bold'}}>FOSTERING INDIVIDUALITY AND GENUINENESS</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
