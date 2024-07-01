import React from 'react'
import shoppingIcon from '../Images/shopping-icon.svg'
import user from "../Images/user.png";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar">
        <h1>Emmerse</h1>
        <div className="personal-info">
          <div className='nav-cart'>
            <Link to="/cart">
              <p>My Cart</p>
              <img src={shoppingIcon} alt="shopping-icon" />
            </Link>
          </div>
          <div className="profile">
            <Link to="/auth">
              <p>My Profile</p>
              <img src={user} alt="user-icon" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar