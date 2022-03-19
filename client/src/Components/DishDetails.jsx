import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import axiosConfig from '../axiosConfig';

const DishDetails = () => {
  const [dishDetails, setDishDetails] = useState([])
  const [dishReviews, setDishReviews] = useState([])
  const { id } = useParams();
  
  useEffect(async () => {
    try {
      const all = await Promise.all([
       axiosConfig.get(`/dishes/details/${id}`),
       axiosConfig.get(`/dishes/reviews/${id}`)
      ]);
      setDishDetails(all[0].data)
      setDishReviews(all[1].data)
    } catch (error) {
      console.log(error)
    }      
  }, [])
 

  return (
    <div>DishDetails</div>
  )
}

export default DishDetails
