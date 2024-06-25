import React from 'react'
import shoppingIcon from '../Images/shopping-icon.svg'
import user from "../Images/user.png";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar">
        <h1>Emmerse</h1>
        <div className="personal-info">
          <div className="cart">
            <p>My Cart</p>
            <img src={shoppingIcon} alt="shopping-icon" />
          </div>
          <div className="profile">
            <p>My Profile</p>
            <img src={user} alt="user-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar