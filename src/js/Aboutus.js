import React from 'react';
import '../css/aboutus.css';

function AboutUs() {
  return (
    <div className="about-us-container">
      
      {/*A message from our Founder */}
      <div className="about-us-section">
        <h2>A message from our Founder</h2>
        <p>
          "It all started with our imagination to build a safe space that’s free from harsh judgement and social prejudice. 
          A space where healthy communication is a reality, and kindness is prioritized above all else.
          So, where do we begin?"
        </p>
      </div>

      {/*Re-thinking social interaction */}
      <div className="about-us-section-bordered">
        <h2>Re-thinking social interaction</h2>
        <p>
          Fundamentally, we had to rethink social interactions. Understanding cause and effect, and its impact on behavior, 
          emerged as a cornerstone in maintaining a safe space.
          At InPower, we recognize the uniqueness of everyone's experiences...
        </p>
      </div>

      {/*Humble Beginnings */}
      <div className="about-us-section">
        <h2>Humble Beginnings..</h2>
        <p>
          Razan Talebian founded InPower in 2014 originally as a private Facebook group for women...
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
