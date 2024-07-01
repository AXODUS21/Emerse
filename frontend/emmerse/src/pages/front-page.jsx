import React from 'react'
import '../css/front-page.css'
import cp from '../Images/cp.svg'
import Navbar from "../components/navbar";
import { Link } from 'react-router-dom';
import laptop from "../Images/front-page-icons/laptop.png";
import pants from "../Images/front-page-icons/pants.png";
import TShirt from "../Images/front-page-icons/t-shirt.png";
import Headphones from "../Images/front-page-icons/headphones.png";


const FrontPage = () => {
  return (
    <div className="front-page-container">
      <div className="nav">
        <Navbar />
      </div>
      <div className="front-page">
        <div className="left">
          <div className="flying-icons">
            <img src={laptop} className="laptop" alt="laptop"/>
            <img src={pants} className='pants' alt="pants"/>
            <img src={TShirt} className='t-shirt' alt="t-shirt"/>
            <img src={Headphones} className="headphones" alt="headphones"/>
          </div>
          <img src={cp} alt="cp"/>
        </div>
        <div className="right">
          <div className="moto">
            <h1>Immerse</h1>
            <h3>yourself in the</h3>
            <h1>Ecommerce experience</h1>
          </div>
          <div className="shop-button">
            <Link to="/store">
              <button class="button">
                Shop now
                <svg class="cartIcon" viewBox="0 0 576 512">
                  <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FrontPage