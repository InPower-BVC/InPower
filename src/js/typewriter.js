import React, { useState, useEffect } from 'react';

function TypewriterEffect({ text }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(interval);
      }
    }, 60); // Adjust the delay as needed (in milliseconds)

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, text]);

  return <div>{displayText}</div>;
}

export default TypewriterEffect;