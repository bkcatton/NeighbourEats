import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import axiosConfig from '../../axiosConfig';
import AddToOrder from './AddToOrder';

import DishDetails from "./DishDetails";
import DishReviews from "./DishReviews";

const Dish = () => {
  const [dishDetails, setDishDetails] = useState({})
  const [dishReviews, setDishReviews] = useState([])
  const { id } = useParams();
  
  useEffect( () => {
    const fetchData = async () => {
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
    }
    fetchData()
  }, [id])

  console.log("this is the dish details", dishDetails);
  return (
    <div>Dish
      <DishDetails dishDetails={dishDetails} />
      <AddToOrder dishDetails={dishDetails} />
      <DishReviews dishReviews={dishReviews} />
    </div>
  )
}

export default Dish
