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
import maleuser from '../img/maleuser.png';
import comment from '../img/speechbubble.svg';
import heart from '../img/heart.svg';
import f1 from '../img/feature_1.svg';
import f2 from '../img/feature_2.svg';
import f3 from '../img/feature_3.svg';

const images = [hero1, hero2, hero3];

function Landing() {
  return (
    <div className="container">
      <section className="section-pink">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="typewriter">
              <TypewriterEffect text="Safe communities to make friends, find support, and express yourself, where cyber bullying doesn't exist." />
            </h1>
            <p className="feature-content-p">Join our online groups and connect with quality members who have pledged to make a safe, healthy environment for everyone</p>
            <Link to="/invite">
              <div className="button-container">
                <BubblyButton />
              </div>
            </Link>
          </div>
          <div>
            <PictureCarousel images={images} />
          </div>
        </div>
      </section>
      <section className="section">
        <CommunitySection />
        <h2 className="comtext">View our Community Questions</h2>
        <div className="grid-container">
          <div className="grid-item">
            <div className="flex-container">
              <h3>Mommy Meet And Greet!</h3>
              <p>Hey guys! Got my blood drawn for NIPPT on Monday. They told me 7-10 days.</p>
              <div className="user-info">
                <img src={maleuser} alt="User" className="user-image" />
                <div className="comment-like-info">
                  <img src={comment} alt="comment" className="commentlike-image" />
                  <span className="count">12</span>
                  <img src={heart} alt="like" className="commentlike-image" />
                  <span className="count">42</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid-item">
            <div className="flex-container">
              <h3>Test Content</h3>
              <p>Hey guys! Got my blood drawn for NIPPT on Monday. They told me 7-10 days.</p>
              <div className="user-info">
                <img src={maleuser} alt="User" className="user-image" />
                <div className="comment-like-info">
                  <img src={comment} alt="comment" className="commentlike-image" />
                  <span className="count">12</span>
                  <img src={heart} alt="like" className="commentlike-image" />
                  <span className="count">42</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid-item">
            <div className="flex-container">
              <h3>Test Content</h3>
              <p>Hey guys! Got my blood drawn for NIPPT on Monday. They told me 7-10 days.</p>
              <div className="user-info">
                <img src={maleuser} alt="User" className="user-image" />
                <div className="comment-like-info">
                  <img src={comment} alt="comment" className="commentlike-image" />
                  <span className="count">12</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-pink center-content">
        <div>
          <h2 className="feature-content-h1">
            <TypewriterEffect text={"InPower is a safe space that's free of judgement and social prejudice. A space where healthy communication is a reality, and kindness is prioritized above all else. So where do we begin?"} />
          </h2>
        </div>
      </section>
      <section className="section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="feature-content-h1">
              Educational <br/> Modules
            </h1>
            <p className="feature-content-p">We honour those who’ve put infinite hours in emotional labour to spread awareness to the world on important topics, so we’ve teamed up with researchers, psychologists, and activists to educate members before joining specific groups.</p>
          </div>
          <div>
            <img src= {f1} alt= 'feature 1 image educational modules'className='hero-img'/>
          </div>
        </div>  
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="feature-content-h1">
              Integrity <br/> Badges
            </h1>
            < p className="feature-content-p">Fundamentally, we had to rethink social interactions. Understanding cause and effect, and its impact on behaviour. We’ve gone back to the basics of healthy social skills and created badges that members need to acquire before joining groups. We believe it’s the foundational practice of maintaining a safe platform.</p>
          </div>
          <div>
            <img src= {f2} alt= 'feature 2 image educational modules'className='hero-img'/>
          </div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="feature-content-h1">
              Privacy & <br/> Protection
            </h1>
            <p className="feature-content-p">Confide in us. Post anonymously and feel secure knowing that screenshots and screenrecordings are disabled for your protection. And because we care about the authenticity of our members, we have a three-step verification process, so that you always know you’re connecting with someone real.</p>
          </div>
          <div>
            <img src= {f3} alt= 'feature 3 image educational modules'className='hero-img' />
          </div>
        </div>
      </section>
      <section>
        <TestimonialSlider />
      </section>
    </div>
  );
}

export default Landing;
