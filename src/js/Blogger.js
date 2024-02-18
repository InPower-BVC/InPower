import React, { useState, useEffect } from 'react';
import BubblyButton from '../js/BubblyButton.js';

const Blogger = () => {
    const [title, setTitle] = useState('');
    const [subtitles, setSubtitles] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('Beauty & Wellness');
    const [date, setDate] = useState('');
    const [featuredImage, setFeaturedImage] = useState('');
  
    const handlePublish = () => {
      // Implement your logic to publish the blog post
      // This is where you would typically send the data to your backend
      // to store in a database or perform other actions.
      console.log({
        title,
        subtitles,
        content,
        author,
        category,
        date,
        featuredImage,
      });
    };
  
    return (
      <div>
        <h2>Create a New Blog Post</h2>
  
        {/* Category Options */}
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Beauty & Wellness">Beauty & Wellness</option>
          <option value="Mind & Soul">Mind & Soul</option>
          <option value="Entertainment">Entertainment</option>
        </select>
  
        {/* Author Name */}
        <label>Author:</label>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
  
        {/* Date */}
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
  
        {/* Title */}
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
  
        {/* Subtitles */}
        <label>Subtitles:</label>
        <textarea value={subtitles} onChange={(e) => setSubtitles(e.target.value)} />
  
        {/* Featured Images */}
        <label>Featured Image URL:</label>
        <input
          type="text"
          value={featuredImage}
          onChange={(e) => setFeaturedImage(e.target.value)}
        />
  
        {/* Content */}
        <label>Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
  
        {/* Publish Button */}
        <button onClick={handlePublish}>Publish</button>
      </div>
    );
  };





export default Blogger;