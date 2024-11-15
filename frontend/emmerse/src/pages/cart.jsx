import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import useGetUserId from "../hooks/getUserId";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import "../css/cart.css";

const Cart = () => {
  const userID = useGetUserId();
  const [userCart, setUserCart] = useState([]);
  const navigate = useNavigate();
  const [fastShipping, setFastShipping] = useState(false);
  const [daysToAdd, setDaysToAdd] = useState();
  const today = DateTime.local();
  const deliveryDate = today.plus({ days: daysToAdd });
  const dateString = deliveryDate.toFormat("cccc, LLLL d");
  const [clientId, setClientId] = useState("");

  const fetchUserCart = async () => {
    if (!userID) {
      navigate("/");
      alert("Please log in to view your cart");
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/userCart/${userID}`
      );
      setUserCart(addQuantityToProduct(response.data.userCart));
    } catch (err) {
      console.log(err);
    }
  };

  const addQuantityToProduct = (products) => {
    return products.map((product) => ({ ...product, quantity: 1 }));
  };

  useEffect(() => {
    const fetchPaypalClientId = async () => {
      try {
        const { data: clientId } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/config/paypal`
        );
        setClientId(clientId);
      } catch (error) {
        console.error("Failed to fetch PayPal client ID:", error);
      }
    };

    fetchUserCart();
    fetchPaypalClientId();
  }, [userID]);

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
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/users/cart/${userID}/${productId}`
      );
      fetchUserCart();
    } catch (error) {
      console.log(error);
    }
  };

  const setDeliveryDate = () => {
    setDaysToAdd(fastShipping ? 2 : 5);
  };

  useEffect(() => {
    setDeliveryDate();
  }, [fastShipping]);

  const successPaymentHandler = () => {
    alert("Payment Successful!");
    navigate("/store");
  };

  return (
    <div className="cart-container">
      <div className="back-to-home-btn">
        <button onClick={() => navigate(-1)}>&#8592; Return</button>
      </div>
      <div className="cart-title">
        <h1>CART</h1>
      </div>
      <div className="cart">
        <div className="user-cart">
          {userCart.map((product) => (
            <div key={product._id} className="cart-item-details">
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
          ))}
        </div>

        <div className="checkout-container">
          <h1>CHECKOUT</h1>
          <div className="checkout">
            <div className="checkout-items">
              {userCart.map((product) => (
                <div key={product._id} className="checkout-product">
                  <h4>
                    {product.name} x {product.quantity}
                  </h4>
                  <h4>${(product.price * product.quantity).toFixed(2)}</h4>
                </div>
              ))}
            </div>
          </div>

          <div className="shipping-options">
            <h3>Shipping Options</h3>
            <div className="options">
              <div className="standard-shipping">
                <h4>{fastShipping ? "Fast" : "Standard"} Shipping</h4>
                <h4>${fastShipping ? "9.00" : "4.00"}</h4>
              </div>
              <div className="date">{dateString}</div>
              <div className="fast-shipping">
                <input
                  onChange={() => setFastShipping((prev) => !prev)}
                  type="checkbox"
                />
                Fast Shipping
              </div>
            </div>
          </div>

          <div className="total-price">
            <h1>
              Total: $
              {userCart
                .reduce(
                  (acc, product) =>
                    acc +
                    product.price * product.quantity +
                    (fastShipping ? 9 : 4),
                  0
                )
                .toFixed(2)}
            </h1>
          </div>
          <div className="checkout-btn-container">
            {clientId && (
              <PayPalScriptProvider options={{ "client-id": clientId }}>
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: userCart
                              .reduce(
                                (acc, product) =>
                                  acc +
                                  product.price * product.quantity +
                                  (fastShipping ? 9 : 4),
                                0
                              )
                              .toFixed(2),
                          },
                        },
                      ],
                    });
                  }}
                />
              </PayPalScriptProvider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
