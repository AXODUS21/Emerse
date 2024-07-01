import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../css/store.css'
import rating0 from '../Images/ratings/rating-0.png'
import rating5 from '../Images/ratings/rating-05.png'
import rating10 from '../Images/ratings/rating-10.png'
import rating15 from '../Images/ratings/rating-15.png'
import rating20 from '../Images/ratings/rating-20.png'
import rating25 from '../Images/ratings/rating-25.png'
import rating30 from '../Images/ratings/rating-30.png'
import rating35 from '../Images/ratings/rating-35.png'
import rating40 from '../Images/ratings/rating-40.png'
import rating45 from '../Images/ratings/rating-45.png'
import rating50 from '../Images/ratings/rating-50.png'
import useGetUserId from '../hooks/getUserId'
import cartIcon from '../Images/shopping-icon.svg'
import { useNavigate } from 'react-router-dom'
import Details from './details'

const Store = () => {
  const [products, setProducts] = useState([])
  const userID = useGetUserId()
  const [userCartAmount, setUserCartAmount] = useState([])
  const navigate = useNavigate()


  const ratingsMap = {
    0: rating0,
    0.5: rating5,
    1: rating10,
    1.5: rating15,
    2: rating20,
    2.5: rating25,
    3: rating30,
    3.5: rating35,
    4: rating40,
    4.5: rating45,
    5: rating50,
  };

  const getProducts = async () => {
    const response = await axios.get('http://localhost:5000/products')
    setProducts(response.data)
  }

  const addToCart = async (id) => {
    if(!userID){
      alert('Please login to add products to your cart')
      return;
    }
    try{
       const response = await axios.put(`http://localhost:5000/products`, {
         userID,
         id,
       });
    } catch(err){
      console.log(err)
    }
  }

  const getCartamount = async () => {
    if(!userID){
      return;
    }
    try{
      const response = await axios.get(`http://localhost:5000/users/cart/${userID}`)
      setUserCartAmount(response.data.length)
    } catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    getProducts();
  }, []);
  
  useEffect(() => {
    getCartamount();
  }, [addToCart]);

  return (
    <div className="store-container">
      <div className="store-nav">
        <div className="back-to-home-btn">
          <Link to="/">
            <button role="button">Back To Home</button>
          </Link>
        </div>
        <div className="store-cart-btn back-to-home-btn">
          <Link to="/cart">
            <button role="button">
              My Cart <img className="cart-icon" src={cartIcon} />
            </button>
          </Link>
          <div className="notif">{!userID ? 0 : userCartAmount}</div>
        </div>
      </div>

      <div className="store">
        <div className="store-title">
          <h1>Store</h1>
        </div>

        <div className="products-container">
          {products.map((product) => {
            const ratingSrc = ratingsMap[product.ratings] || null;
            return (
              <div className="product" key={product.name}>
                <div className="product-details">
                  <div className="product-image-container">
                    <img
                      className="productImg"
                      src={product.imageURL}
                      alt={product.name}
                    />
                  </div>

                  <h3>{product.name}</h3>
                  {ratingSrc && (
                    <img
                      className="rating"
                      src={ratingSrc}
                      alt={`rating ${product.ratings}`}
                    />
                  )}
                  <p>${product.price.toFixed(2)}</p>
                  <div className="product-buttons">
                    <button
                      className="CartBtn"
                      onClick={() => addToCart(product._id)}
                    >
                      <span className="IconContainer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 576 512"
                          fill="rgb(17, 17, 17)"
                          className="cart"
                        >
                          <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                        </svg>
                      </span>
                      <p className="text">Add to Cart</p>
                    </button>
                    <button
                      className="view-more-button"
                      onClick={() => navigate(`/details?id=${product._id}`)}
                    >
                      View More
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Store