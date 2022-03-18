import React, { useState, useEffect } from "react";
import axios from 'axios';
import MapContainer from "./Components/MapContainter";
import VendorsList from "./Components/VendorsList";
import Dish from "./Components/Dish";


const App = () => {
  const [addresses, setAddresses] = useState([])
  const [dishes, setDishes] = useState([])
  const [dishId, setDishId] = useState(null)

  useEffect(() => {
    axios.get('http://localhost:8080/api/addresses')
      .then((data) => {
        setAddresses(data.data.addresses)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8080/api/dishes')
    .then ((data) => {
      setDishes(data.data.dishes)
    })
    .catch((e) => {
      console.log(e)
    })
  }, [])

  return (
    <div className="App">
      <MapContainer />
      <VendorsList addresses={addresses} dishes={dishes} setDishId={setDishId}/>
      {/* <Dish dishes={dishes} dishID={dishes.id}/> */}
    </div>
  );
}

export default App;
