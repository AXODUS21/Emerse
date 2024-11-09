import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/details.css"

const Details = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productID = searchParams.get("id");
  const [product, setProduct] = useState()
  const navigate = useNavigate()

  // Use the productID to fetch product details from the API

    const getProductDetails = async () => {
        try {
            const response = await axios.get(
              `${process.env.REACT_APP_API_URL}/products/details/${productID}`
            );
            setProduct(response.data.product)
            console.log(response.data.product)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getProductDetails()
    }, [])

  return (
    <div className="details-container">
      <div className="back-to-home-btn">
        <button onClick={() => navigate(-1)}>&#8592; Return </button>
      </div>
      <div className="detail-title">
        <h1>Product Detail</h1>
      </div>

      <div className="details-product">
        <img src={product?.imageURL} alt={product?.name} />
        <div className="details-product-info">
          <div className="details-name-and-price">
            <h1>{product?.name}</h1>
            <h2>${product?.price}</h2>
          </div>
          <p className="details-product-description">{product?.description}</p>
        </div>

        <button className="CartBtn" onClick={() => addToCart(product._id)}>
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
      </div>
    </div>
  );
};

export default Details;
