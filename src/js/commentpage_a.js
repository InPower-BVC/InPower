import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TypewriterEffect from '../js/typewriter';
import magazine1 from "../../src/img/magazine1.jpeg"
import magazine2 from "../../src/img/magazineInformation2/magazine14.jpg"
import magazine3 from "../../src/img/magazineInformation3/magazineInformation2/magazine20.jpg"                   
import magazine4 from "../../src/img/magazineInformation4/magazineInformation2/magazine28.jpg"
import '../css/magazine.css'; // Import the CSS file
import magazineFont from "../../src/img/Magazine.png"
import main from '../img/main.jpg';

function Magazine() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate loading delay
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const handleVolumeClick = () => {
    setLoading(true);
  };

  return (
    <div  style={{marginBottom: "40px"}} className="container">
      <div className="magazine">
        <br />
        <img style={{
          margin:"4px 0px",
          width: "320px",
          height: "140px",
          transform: "rotate(-6deg)"
        }} src={magazineFont} /><br></br>
        <h2 className="line">THE LATEST</h2>
      </div>

      <div className="hero-content">
        <div className="hero-text">
          <h1 className="typewriter">
            <TypewriterEffect text="THE THOUGHT, THE PLAN, THE ACTION: Razan Talebian   Women Funded Grants: InPower Start-Up " />
          </h1>
        </div>
        <div>
          <img src={main} alt="Main Image" className="hero-img" />
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop:"12px" }} className="volumes">
  <h1>VOLUMES</h1>
  <br></br>
  <div style={{ margin: "20px 0", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }} className="volume-card">
    <Link to="/MagazineInformation" onClick={handleVolumeClick} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className='volume-1' style={{width: "507.54px"}}>
        <img style={{ width: "100%", maxWidth: "340px", height: "480.61px", boxShadow: "0.5px 2px 1.5px 1.8px" }} src={magazine1} alt="Volume 1" />
        <h2 style={{marginTop: "18px", color:"#ca4a51"}}>Volume 1</h2>
        <p style={{ fontFamily: 'sans-serif', fontWeight: 'bold' }}>EMBRACING ONE'S DISTINCTIVENESS</p>
      </div>
    </Link>

    <Link to="/MagazineInformation1" onClick={handleVolumeClick} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className='volume-2' style={{width: "507.54px"}}>
        <img style={{ width: "100%", maxWidth: "340px", height: "481.61px", boxShadow: "0.5px 2px 1.5px 1.8px" }} src={magazine2} alt="Volume 2" />
        <h2 style={{marginTop: "18px", color:"#ca4a51"}}>Volume 2</h2>
        <p style={{ fontFamily: 'sans-serif', fontWeight: 'bold' }}>EMBODYING INDIVIDUALITY AND AUTHENTICITY</p>
      </div>
    </Link>

    <Link to="/MagazineInformation2" onClick={handleVolumeClick} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className='volume-3' style={{width: "507.54px"}}>
        <img style={{ width: "100%", maxWidth: "340px", height: "481.61px", boxShadow: "0.5px 2px 1.5px 1.8px" }} src={magazine3} alt="Volume 3" />
        <h2 style={{marginTop: "18px", color:"#ca4a51"}}>Volume 3</h2>
        <p style={{ fontFamily: 'sans-serif', fontWeight: 'bold' }}>EMBRACING INDIVIDUALITY & AUTHENTICITY</p>
      </div>
    </Link>

    <Link to="/MagazineInformation3" onClick={handleVolumeClick} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className='volume-4' style={{width: "507.54px"}}>
        <img style={{ width: "100%", maxWidth: "340px", height: "481.61px", boxShadow: "0.5px 2px 1.5px 1.8px" }} src={magazine4} alt="Volume 4" />
        <h2 style={{marginTop: "18px", color:"#ca4a51"}}>Volume 4</h2>
        <p style={{ fontFamily: 'sans-serif', fontWeight: 'bold' }}>FOSTERING INDIVIDUALITY AND GENUINENESS</p>
      </div>
    </Link>
  </div>
</div>


      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}

export default Magazine;
