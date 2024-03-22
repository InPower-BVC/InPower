/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import TypewriterEffect from '../js/typewriter';
import BubblyButton from '../js/BubblyButton.js';
import { Link } from 'react-router-dom';
import main  from '../img/main.png';
import  '../css/landing.css';
import logo1 from "../img/logo1.png";
import logo2 from "../img/logo2.png";
import logo3 from "../img/logo3.png";
import logo4 from "../img/logo4.png";
import image1 from "../img/landing2.jpeg";
function Landing() {
   return (
    <div className="container-new">
      <div className='first_head'>
      <div className="hero-content-new">
         <div className="hero-text-new">
           <h1 className="typewriter-new">
            <TypewriterEffect text="Welcome to InPower:" />
          </h1>
          <p className="feature-content-p-new">Your Online Community for Healing and Empowerment</p>
          <Link to="/invite">
            <div className="button-container-new">
               <BubblyButton />
             </div>
           </Link>
         </div>
         <div>
           <img src={main} alt="Main Image" className="hero-img-new" />
         </div>
       </div>
       </div>
       <div className='summary'>
        <h2>At InPower, we believe in the transformative power of connection, healing, and empowerment. Our platform provides a safe and inclusive space exclusively designed for women and nonbinary individuals to come together, support each other, and thrive.</h2>
      
      </div>

      <div className='features'>
      <img src={image1} alt="Image1" className="custom-image" />
        <h2>What We Offer:</h2> 

        <div class="grid-container">

          <div class="grid-item">

         
          <div class="content">

          <img src={logo1} alt="logo 1" className="circle-img" />
          <h3>Community Support</h3>
          Connect with like-minded individuals who understand and support you on your journey. Share your experiences, stories, and struggles in a supportive and nonjudgmental environment.
          </div>
         </div>
          <div class="grid-item">
    
          <div class="content">
          <img src={logo2} alt="logo 2" className="circle-img" />
          <h3>Personal Growth Resources</h3>
           Access a wealth of resources, including articles, podcasts, workshops, and expert advice, to help you on your path to personal growth and healing. Learn practical strategies for overcoming challenges and developing a stronger sense of self
          </div>
         </div>
          <div class="grid-item">
    
          <div class="content">
          <img src={logo3} alt="logo 3" className="circle-img" />
          <h3>Mental Health Support</h3>
          Take advantage of our mental health resources and tools designed to support your emotional well-being. From guided meditations to online counselling services, we're here to help you navigate life's ups and downs with resilience and strength.
          </div>
          </div>
         <div class="grid-item">
  
         <div class="content">
          <img src={logo4} alt="logo 4" className="circle-img" />
          <h3>Exclusive Member Perks</h3>
         Enjoy special discounts, freebies, and exclusive offers from our partners and sponsors with the InPower membership card. Treat yourself to self-care products, wellness services, and more, all while supporting your fellow InPower members.
          </div>
  </div>
</div>

        
        </div>
        <div className='summary-text'>
        <h1>Join the InPower Community Today!</h1>
        <h3>Ready to embark on your journey of healing and empowerment? Join the InPower community today and connect with a supportive network of women and nonbinary individuals who are committed to empowering each other and creating positive change. Together, we can overcome obstacles, embrace our strengths, and live our lives to the fullest. Join InPower and unleash your true potential today!</h3>
        <Link to="/invite">
  <div className="button-invite">
    <button className="button-form">Apply For Invite Code</button>
  </div>
</Link>
      </div>
       
    </div>
    
   );
 }

export default Landing;
