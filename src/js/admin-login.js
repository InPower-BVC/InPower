import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/admin.css';
import axios from 'axios'; 

function AdminLogin() {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Make a POST request to the /admin/login endpoint with the username and password
      const response = await axios.post('http://localhost:5000/admin/login', { username, password });

      // If login is successful, you can redirect the user to a dashboard or perform other actions
      console.log('Login successful:', response.data);
      setMessage('Login successful');
    } catch (error) {
      // If there's an error, you can handle it here
      console.error('Login failed:', error.response.data);
      setMessage('Login failed');
    } finally {
      // Reset the form after submission
      setUsername('');
      setPassword('');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit" className="admin-button">Login</button>
      </form>
      {/* Display message */}
      {message && <p>{message} <Link to="/contentManagement">Go to Content Management</Link></p>}
    </div>
  );
}

export default AdminLogin;
