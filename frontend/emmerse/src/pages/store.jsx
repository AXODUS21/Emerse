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

const Store = () => {
  const [products, setProducts] = useState([])

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

  useEffect(() => {
    getProducts()
  })

  return (
    <div className="store-container">
      <div className="back-to-home-btn">
        <Link to="/">
          <button role="button">
            Back To Home
          </button>
        </Link>
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
                <img
                  className="productImg"
                  src={product.imageURL}
                  alt={product.name}
                />
                <h3>{product.name}</h3>
                {ratingSrc && (
                  <img
                    className="rating"
                    src={ratingSrc}
                    alt={`rating ${product.ratings}`}
                  />
                )}
                <p>${product.price}</p>
                <button>Add To Cart</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Store