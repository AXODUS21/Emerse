import React from 'react'
import '../css/front-page.css'
import cp from '../Images/cp.svg'
import Navbar from "../components/navbar";

const FrontPage = () => {
  return (
    <div className="front-page-container">
      <div className="nav">
        <Navbar />
      </div>
      <div className="front-page">
        <div className="right">
          <img src={cp} alt="cp" />
        </div>
        <div className="left">
          <div className="moto">
            <h1>Immerse</h1>
            <h3>yourself in the</h3>
            <h1>Ecommerce experience</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FrontPage