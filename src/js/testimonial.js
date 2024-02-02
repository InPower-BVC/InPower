import React, { useState, useEffect } from 'react';
import '../css/testimonial.css'; // Import the CSS file

const testimonials = [
  {
    id: 1,
    name: 'Karen Tello, Coquitlam',
    content: "As someone who's personally had struggles with anxiety and abuse, it was very hard for me to talk about it or express myself about how I felt. InPower has given me an outlet without being judged and I'm grateful I was able to find somewhere where I don't have to feel alone."
  },
  {
    id: 2,
    name: 'Liza Hamed, Maple Ridge',
    content: '"Having a Bachelors in Psychology, I know how important healthy communication is. Having a safe-space like InPower that focuses on this mission is going to revolutionize the way we connect, and teach the world how to have compassion. I cant not wait to watch everyone blossom!"',
  },
  {
    id: 3,
    name: 'Isha Danielz, Vancouver',
    content: '"One of my favourite social media platforms to connect with people about interests, tips, and advice. A safe space to be yourself. I am glad to be a part of this movement. Amazing platform for mothers where I can ask questions and not feel judged."',
  }
  // Add more testimonials here
];

const TestimonialSlider = () => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const currentTestimonial = testimonials[currentTestimonialIndex];

  // const showPreviousTestimonial = () => {
  //   const newIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
  //   setCurrentTestimonialIndex(newIndex);
  // };

  const showNextTestimonial = () => {
    const newIndex = (currentTestimonialIndex + 1) % testimonials.length;
    setCurrentTestimonialIndex(newIndex);
  };

  useEffect(() => {
    // Auto slide after a delay
    const autoSlide = setInterval(showNextTestimonial, 4000); // Change delay as needed
    return () => clearInterval(autoSlide);
  }, [currentTestimonialIndex]);

  return (
    <div className="testimonial-container">
      <div className="testimonial-content">
        <p>{currentTestimonial.content}</p>
        <p>{currentTestimonial.name}</p>
      </div>
      <div className="dots-container">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`dot ${index === currentTestimonialIndex ? 'active-dot' : ''}`}
            onClick={() => setCurrentTestimonialIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;
