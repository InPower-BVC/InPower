// src/components/PictureCarousel.js
import React, { useState, useEffect } from 'react';
import '../css/landing.css'; // Import the CSS file

const PictureCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 1700); // Change slide every 1.7 seconds (adjust the interval as needed)

    return () => {
      clearInterval(intervalId);
    };
  }, [images]); // Include 'images' in the dependency array

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="picture-carousel">
      <img src={images[currentIndex]} alt={`image ${currentIndex}`} className='hero-img' />
      <div className="dot-container">
        {images.map((image, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default PictureCarousel;
