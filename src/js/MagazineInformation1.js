import React, { useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import '../css/MagazineInformation.css'; // Import CSS file for styling
import magazine1 from '../../src/img/magazineInformation2/magazine13.jpg'
import magazine2 from '../../src/img/magazineInformation2/magazine14.jpg'
import magazine3 from '../../src/img/magazineInformation2/magazine15.jpg'
import magazine4 from '../../src/img/magazineInformation2/magazine16.jpg'
import magazine5 from '../../src/img/magazineInformation2/magazine17.jpg'
import magazine6 from '../../src/img/magazineInformation2/magazine18.jpg'


const MagazineInformation1 = () => {
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
       
      </HTMLFlipBook>
    </div>
  );
};

export default MagazineInformation1;
