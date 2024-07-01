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
            const response = await axios.get(`http://localhost:5000/products/details/${productID}`,)
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
        <h1>{product?.name}</h1>
        <p>{product?.description}</p>
        <img src={product?.imageURL} alt={product?.name} />
        <h2>${product?.price}</h2>
        <button>Add to Cart</button>
      </div>
    </div>
  );
};

export default Details;
