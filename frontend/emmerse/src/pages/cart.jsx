import React, {useState, useEffect} from 'react'
import axios from 'axios'
import useGetUserId from '../hooks/getUserId'
import {useNavigate} from'react-router-dom'

const Cart = () => {
    const userID = useGetUserId()
    const [userCart, setUserCart] = useState([])
    const navigate = useNavigate()

    const fetchUserCart = async () => {
        if(!userID){
            navigate("/");
            alert('Please log in to view your cart')
        }
        try{
            const response = await axios.get(`http://localhost:5000/users/cart/${userID}`)
            setUserCart(response)
            console.log(response)
        } catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetchUserCart()
    }, [])
  return (
    <div className='cart-container'>
        
    </div>
  )
}

export default Cart