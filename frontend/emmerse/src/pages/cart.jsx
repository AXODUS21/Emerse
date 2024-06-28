import React, {useState, useEffect} from 'react'
import axios from 'axios'
import useGetUserId from '../hooks/getUserId'
import {useNavigate, Link} from'react-router-dom'

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
  return (
    <div className="cart-container">
      <div className="back-to-home-btn">
        <Link to="/store">
          <button role="button">Back To Store</button>
        </Link>
      </div>
      <h1>Cart</h1>
      {userCart.map((product) => {
        return (
          <div className="cart-item">
            <img src={product.imageURL} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Cart