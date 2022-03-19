import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import axiosConfig from '../axiosConfig';

const DishDetails = () => {
  const { id } = useParams();
  
  useEffect(() => {
    axiosConfig.get(`/dishes/details/${id}`)
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div>DishDetails</div>
  )
}

export default DishDetails
