import React, { useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import '../css/MagazineInformation.css'; // Import CSS file for styling
import magazine1 from "../../src/img/magazine1.jpeg";
import magazine2 from "../../src/img/magazine2.jpeg";
import magazine3 from "../../src/img/magazine3.jpg";
import magazine4 from "../../src/img/magazine4.jpeg";
import magazine5 from '../../src/img/magazine5.jpg'
import magazine6 from "../../src/img/magazine6.jpg"
import magazine7 from "../../src/img/magazine7.png";
import magazine8 from "../../src/img/magazine8.jpg";
import magazine9 from "../../src/img/magazine9.jpg";
import magazine10 from "../../src/img/magazine10.jpeg";
import magazine11 from "../../src/img/magazine11.jpg";
import magazine12 from "../../src/img/magazine12.jpg";


const MagazineInformation = () => {
  const flipBook = useRef(null);

  const renderPage = (image, index) => {
    return (
      <div className="page" key={index} data-density="hard">
        <div className="page-content">
          <img src={image} alt={`Magazine ${index}`} className="full-page-image" />
        </div>
      </div>
    );
  };

  return (
    <div className="container magazine-container">
      <HTMLFlipBook
        width={450}
        height={560}
        size="stretch"
        minWidth={315}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1533}
        maxShadowOpacity={0.5}
        showCover={false}
        mobileScrollSupport={true}
        className="demo-book"
        ref={flipBook}
      >
        {renderPage(magazine1, 0)}
        {renderPage(magazine2, 1)}
        {renderPage(magazine3, 2)}
        {renderPage(magazine4, 3)}
        {renderPage(magazine5, 4)}
        {renderPage(magazine6, 5)}
        {renderPage(magazine7,6)}
        {renderPage(magazine8, 7)}
        {renderPage(magazine9, 8)}
        {renderPage(magazine10, 9)}
        {renderPage(magazine11, 10)}
        {renderPage(magazine12, 11)}
      </HTMLFlipBook>
    </div>
  );
};

export default MagazineInformation;
