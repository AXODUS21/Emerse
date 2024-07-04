import React, {useState, useEffect} from 'react'
import axios from 'axios'
import useGetUserId from '../hooks/getUserId'
import {useNavigate} from'react-router-dom'
import '../css/cart.css'

const Cart = () => {
  const userID = useGetUserId();
  const [userCart, setUserCart] = useState([]);
  const navigate = useNavigate();

  const fetchUserCart = async () => {
    if (!userID) {
      navigate("/");
      alert("Please log in to view your cart");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:5000/users/userCart/${userID}`
      );
      setUserCart(addQuantityToProduct(response.data.userCart));
    } catch (err) {
      console.log(err);
    }
  };

  //adds the quantity value in the product array without changing it in the db
  const addQuantityToProduct = (products) => {
    return products.map((product) => ({ ...product, quantity: 1 }));
  };

  useEffect(() => {
    fetchUserCart();
  }, []);

  const changeQuantity = async (productId, newQuantity) => {
    
    const updatedCart = userCart.map((product) => {
      if (product._id === productId) {
        return { ...product, quantity: newQuantity };
      }
      return product;
    });
    setUserCart(updatedCart);
  };

  const removeFromCart = async (productId) => {
      try{
        const response = await axios.delete(`http://localhost:5000/users/cart/${userID}/${productId}`)
        fetchUserCart()
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <div className="cart-container">
      <div className="back-to-home-btn">
        <button onClick={() => navigate(-1)}>&#8592; Return </button>
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
                      <p>${product.price.toFixed(2)}</p>
                    </div>
                    <div className="details product-text">
                      <p>{product.description}</p>
                    </div>
                  </div>
                  <div className="item-buttons">
                    <div className="product-quantity">
                      <h3>Quantity:</h3>
                      <input
                        min="1"
                        type="number"
                        value={product.quantity}
                        onChange={(e) =>
                          changeQuantity(product._id, parseInt(e.target.value))
                        }
                      />
                    </div>
                    <button
                      onClick={() => removeFromCart(product._id)}
                      className="CartBtn"
                    >
                      Remove from cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="checkout-container">
          <h1>CHECKOUT</h1>
          <div className="checkout">
            <div className="checkout-items">
              {userCart.map((product) => {
                return (
                  <div className="checkout-product">
                    <h4>
                      {product.name} x {product.quantity}
                    </h4>
                    <h4>${(product.price * product.quantity).toFixed(2)}</h4>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="total-price">
            <h1>
              Total: $
              {userCart
                .reduce(
                  (acc, product) => acc + product.price * product.quantity,
                  0
                )
                .toFixed(2)}
            </h1>
          </div>
          <div className="checkout-btn-container">
            <button className="CartBtn">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart