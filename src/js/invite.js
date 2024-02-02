// import React, { Component } from 'react';
import '../css/invite.css'; // Import the CSS file
// import { Link } from 'react-router-dom'; // Import Link component from react-router-dom
// import { bounce, rubberBand,tada } from 'react-animations'; // Import the rubberBand animation
// import styled, { keyframes } from 'styled-components';
// import axios from 'axios';

// const Bounce = styled.div`
//   animation: 2s ${keyframes`${bounce}`} infinite;
// `;

// const RubberBand = styled.div` // Create a new styled component for the rubberBand animation
//   animation: 2s ${keyframes`${rubberBand}`};
// `;

// const Tada = styled.div` // Create a new styled component for the tada animation
//   animation: 2s ${keyframes`${tada}`};
// `;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Invite() {
  const [phone, setPhone] = useState('');
  //const navigate = useNavigate();

  const initiateLogin = async () => {
    const apiUrl = 'https://api.inpwr.co/auth/initiate';
    try {
      const response = await axios.post(apiUrl, { phone }, { headers: { 'Content-Type': 'application/json' } });
      console.log(response.data);
    } catch (error) {
      console.error('Error initiating login:', error);
    }
  }

  return (
    <div className="body">
      <div className="form">
        <h1>Apply For Invite Code</h1>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
              <label htmlFor="birthday">Date of Birth:</label>
              <input type="date" id="birthday" name="birthday" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="example@aa.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                pattern="^[0-9\+\-]+$"
                required
                placeholder="+123-45678901 / 1234567890"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">
                Why do you want to be part of the community?:
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                required
                placeholder="The reason why I want to be part of the community ...."
              ></textarea>
            </div>
          <Link to="/submitted">
            <button className="button-form" type="button" onClick={initiateLogin}>
              Apply for Invite Code
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
