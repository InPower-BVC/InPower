import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link component from react-router-dom



// Files
//import '../css/volunteer.css'; // Import the CSS file
import '../css/invite.css'

// Images
import hero1 from "../img/hero1.svg";
import hero2 from '../img/hero2.svg';
import hero3 from '../img/hero3.svg';

const images = [
  hero1,
  hero2,
  hero3,
  // Add more image URLs as needed
];

function Volunteer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    // Send the form data to your backend API

    // Reset the form fields
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className='body'>
      <div className='form'>
      <h1>Apply To Be A Volunteer</h1>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='message'>Message:</label>
            <textarea
              id='message'
              name='message'
              value={formData.message}
              onChange={handleChange}
              rows='4'
              required
            ></textarea>
          </div>
          <Link to="/submitted">
            <button className='button-form' type='submit'>Submit</button>
          </Link>
        </form>
        </div> 
      {/* 
      <section className='volunteer-wrap'>
        <div className='volunteer-content'>
          <div>
            <h1>Volunteering with Good Society</h1>
            <p className='volunteer-text'>
              The vision of Good Society is a world where all women and girls are safe, well, strong, and connected.
              Our financial and well-being programs address the social issues that affect the disadvantaged and vulnerable in our community.
              Join us in making an impact in your community by volunteering with Good Society.
            </p>
          </div>
          <div className='volunteer-img'>
            <img src="https://img2.baidu.com/it/u=495845027,2663305775&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500" />
          </div>
          <div className='volunteer-img'>
            <img src="https://pic.kekenet.com/2015/0820/74411440035849.jpg" />
          </div>
          <div>
            <h1>Pro Bono Net - Volunteer</h1>
            <p className='volunteer-text'>
              We offer a searchable database of pro bono opportunities, helping lawyers find cases and projects that match their expertise and interests.
            </p>
          </div>
        </div>
      </section>
      <section className='section-pink'>
        <div className='working-inpower'>
          <h2>“Working for Inpower is a fantastic feeling. It is so rewarding to be part of an organization that makes a real difference to people living.”</h2>
        </div>
      </section>
      */}
    </div>
  );
}

export default Volunteer;
