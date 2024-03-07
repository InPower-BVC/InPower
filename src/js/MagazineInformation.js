import React, { useState } from 'react';
import '../css/MagazineInformation.css'; // Import CSS file for styling
import magazine1 from "../../src/img/magazine1.jpeg";
import magazine2 from "../../src/img/magazine2.jpeg";
import magazine3 from "../../src/img/magazine3.jpg";
import magazine4 from "../../src/img/magazine4.jpeg";

const MagazineInformation = () => {
  const cardData = [
    {
      headline: "EMBRACING ONE'S DISTINCTIVENESS AND AUTHENTICITY",
      image: magazine1,
      content: `Embracing one's distinctiveness and authenticity is a profound journey of self-discovery and empowerment. It's about celebrating the unique qualities and traits that make each individual special and valuable. In a world often dictated by societal norms and expectations, embracing authenticity means boldly stepping into one's true self, unapologetically and authentically.

By embracing our distinctiveness, we honor our individuality and embrace the beauty of diversity. It's about recognizing and celebrating our unique talents, quirks, and perspectives, knowing that they contribute to the rich tapestry of human experience.

Authenticity is about living in alignment with our core values, beliefs, and aspirations, rather than conforming to external pressures or societal standards. It requires vulnerability, courage, and self-awareness to show up as our genuine selves, regardless of external judgment or criticism.`
    },
    {
      headline: "EMBODYING INDIVIDUALITY AND AUTHENTICITY",
      image: magazine2,
      content: `Embracing one's distinctiveness and authenticity is a profound journey of self-discovery and empowerment. It's about celebrating the unique qualities and traits that make each individual special and valuable. In a world often dictated by societal norms and expectations, embracing authenticity means boldly stepping into one's true self, unapologetically and authentically.

By embracing our distinctiveness, we honor our individuality and embrace the beauty of diversity. It's about recognizing and celebrating our unique talents, quirks, and perspectives, knowing that they contribute to the rich tapestry of human experience.

Authenticity is about living in alignment with our core values, beliefs, and aspirations, rather than conforming to external pressures or societal standards. It requires vulnerability, courage, and self-awareness to show up as our genuine selves, regardless of external judgment or criticism.`
    },
    {
      headline: "EMBRACING INDIVIDUALITY & AUTHENTICITY",
      image: magazine3,
      content: `Embracing one's distinctiveness and authenticity is a profound journey of self-discovery and empowerment. It's about celebrating the unique qualities and traits that make each individual special and valuable. In a world often dictated by societal norms and expectations, embracing authenticity means boldly stepping into one's true self, unapologetically and authentically.

By embracing our distinctiveness, we honor our individuality and embrace the beauty of diversity. It's about recognizing and celebrating our unique talents, quirks, and perspectives, knowing that they contribute to the rich tapestry of human experience.

Authenticity is about living in alignment with our core values, beliefs, and aspirations, rather than conforming to external pressures or societal standards. It requires vulnerability, courage, and self-awareness to show up as our genuine selves, regardless of external judgment or criticism.`
    },
    {
      headline: "FOSTERING INDIVIDUALITY AND GENUINENESS",
      image: magazine4,
      content: `Embracing one's distinctiveness and authenticity is a profound journey of self-discovery and empowerment. It's about celebrating the unique qualities and traits that make each individual special and valuable. In a world often dictated by societal norms and expectations, embracing authenticity means boldly stepping into one's true self, unapologetically and authentically.

By embracing our distinctiveness, we honor our individuality and embrace the beauty of diversity. It's about recognizing and celebrating our unique talents, quirks, and perspectives, knowing that they contribute to the rich tapestry of human experience.

Authenticity is about living in alignment with our core values, beliefs, and aspirations, rather than conforming to external pressures or societal standards. It requires vulnerability, courage, and self-awareness to show up as our genuine selves, regardless of external judgment or criticism.`
    }
  ];

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Handle next and previous card
  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex === cardData.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrevCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex === 0 ? cardData.length - 1 : prevIndex - 1));
  };

  return (
    <div className="container magazine-container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header text-center">
              <h2 style={{ color: "white" }}>{cardData[currentCardIndex].headline}</h2>
            </div>
            <div className="image-container d-flex justify-content-center">
              <img src={cardData[currentCardIndex].image} className="card-img-top" alt="Magazine Cover" />
            </div>
            <div className="card-body">
              <p className="styled-paragraph">
                <span className="styled-letter">E</span>{cardData[currentCardIndex].content}
              </p>
            </div>
            <div className="card-footer text-center d-flex justify-content-between">
              <button className="btn btn-primary mr-2" onClick={handlePrevCard} style={{ backgroundColor: "white", color: "black" }}>Previous</button>
              <button className="btn btn-primary" onClick={handleNextCard} style={{ backgroundColor: "white", color: "black" }}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagazineInformation;
