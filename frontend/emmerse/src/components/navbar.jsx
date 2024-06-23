import React from 'react'
import shoppingIcon from '../Images/shopping-icon.svg'

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar">
        <h1>Emmerse</h1>
        <div className="cart">
          <p>my cart</p>
          <img src={shoppingIcon} alt="shopping-icon" />
        </div>
      </div>
    </div>
  );
}

export default Navbar