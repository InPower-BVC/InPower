import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/communities.css'; 

//importing images 
import cb1 from '../img/cb1.svg';
import cs1 from '../img/cs1.svg';
import cs1_1 from '../img/cs1_1.svg';
import cb2 from '../img/cb2.svg';
import cs2 from '../img/cs2.svg';
import cs2_1 from '../img/cs2_1.svg';
import cb3 from '../img/cb3.svg';
import cs3 from '../img/cs3.svg';

function CommunitySection() {
  // Function to handle the intersection observer callback
  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // When the section becomes visible in the viewport
        entry.target.classList.add('animate'); // Add the animate class to trigger the animation
      }
    });
  };

  useEffect(() => {
    // Create an Intersection Observer
    const observer = new IntersectionObserver(handleIntersection);

    // Select the element you want to observe
    const sectionContainer = document.querySelector('.section-container');

    // Observe the element
    observer.observe(sectionContainer);

    // Clean up the observer when the component unmounts
    return () => {
      observer.unobserve(sectionContainer);
    };
  }, []);

  return (
    <div className="section-container">
      <div className="grid">
        <div>
        <Link to="/discussion/a">
          <img className='smaller' src={cs1} alt="communities small circle 1" />
            <img className='largest' src={cb1} alt="Discussion A" />
          <img className='smaller' src={cs1_1} alt="communities small circle 2" />
          <h2 className='grid-h2'>Career</h2> {/* Name for the first grid */}
          </Link>
        </div>
      </div>
      <div className="grid">
        <div>
        <Link to="/discussion/b">
          <img className='smaller' src={cs2} alt="communities small circle 1" />
            <img className='largest' src={cb2} alt="Discussion B" />
          <img className='smaller' src={cs2_1} alt="communities small circle 2" />
          <h2 className='grid-h2'>Wellbeing</h2> {/* Name for the second grid */}
          </Link>
        </div>
        
      </div>
      <div className="grid">
        <div>
        <Link to="/discussion/c">
          <img className='smaller' src={cs3} alt="communities small circle 1" />
            <img className='largest' src={cb3} alt="Discussion C" />
          <img className='smaller' src={cs1_1} alt="communities small circle 2" />
          <h2 className='grid-h2'>Lifestyle</h2> {/* Name for the third grid */}
          </Link>  
        </div>
      </div>
    </div>
  );
}

export default CommunitySection;
