import React, {useState, useEffect} from 'react'
import axios from 'axios'
import useGetUserId from '../hooks/getUserId'
import {useNavigate, Link} from'react-router-dom'
import '../css/cart.css'

const Cart = () => {
    const userID = useGetUserId()
    const [userCart, setUserCart] = useState([])
    const navigate = useNavigate()

    const fetchUserCart = async () => {
        if(!userID){
            navigate("/");
            alert('Please log in to view your cart')
            return
        }
        try{
            const response = await axios.get(`http://localhost:5000/users/userCart/${userID}`)
            setUserCart(response.data.userCart)
        } catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetchUserCart()
    }, [])

    const changeQuantity = async () => {
      
    }


  return (
    <div className="cart-container">
      <div className="back-to-home-btn">
        <Link to="/store">
          <button>Back To Store</button>
        </Link>
      </div>
      <div className="cart-title">
        <h1>Cart</h1>
      </div>
      <div className="cart">
        <div className="user-cart">
          {userCart.map((product) => {
            return (
              <div className="cart-item-details">
                <div className="cart-image">
                  <img src={product.imageURL} alt={product.name} />
                </div>
                <div className="product-info">
                  <div className="plain-text">
                    <div className="name-n-price product-text">
                      <h3>{product.name}</h3>
                      <p>${product.price}</p>
                    </div>
                    <div className="details product-text">
                        <p>{product.description}</p>
                    </div>
                  </div>
                  <div className="item-buttons">
                    <div className="product-quantity">
                      <h3>Quantity:</h3>
                      <input type="number" />
                    </div>
                    <button className='CartBtn'>Remove from cart</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="checkout">
            <h1>CHECKOUT</h1>
            <button>Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default Cart