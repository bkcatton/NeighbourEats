import React, {useState, useEffect} from 'react'
import axios from 'axios'


const Dish = (props) => {
  // useEffect(() => {
  //   axios.get('http://localhost:8080/api/dishes')
  //   .then ((data) => {
  //     // setDishes(data.data.dishes)
  //   })
  //   .catch((e) => {
  //     console.log(e)
  //   })
  // }, [])

 

  return (
    <div>{props.dishesID}</div>
  )
}

export default Dish