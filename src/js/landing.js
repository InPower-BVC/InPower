/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom

// Files
import '../css/landing.css'; // Import the CSS file
import TypewriterEffect from '../js/typewriter';
import BubblyButton from '../js/BubblyButton.js';
import TestimonialSlider from './testimonial.js';
import CommunitySection from './communities.js';
import PictureCarousel from './PictureCarousel.js';

// Images
import hero1 from '../img/hero1.svg';
import hero2 from '../img/hero2.svg';
import hero3 from '../img/hero3.svg';
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

      <div className="volumes">
        <h1>VOLUMES</h1>

        <div  className="volume-card">
          <div className='volume-1'>
            <h2>Volume 1: Title 1</h2>
            <p>Description of Volume 1...</p>
          </div>
          <div className='volume-2'>
            <h2>Volume 2: Title 2</h2>
            <p>Description of Volume 2...</p>
          </div>

          <div className='volume-3'>
            <h2>Volume 2: Title 2</h2>
            <p>Description of Volume 2...</p>
          </div>

          <div className='volume-4'>
            <h2>Volume 2: Title 2</h2>
            <p>Description of Volume 2...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
