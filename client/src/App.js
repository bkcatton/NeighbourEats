import React, { useState, useEffect } from "react";
import axios from 'axios';
import MapContainer from "./Components/MapContainter";
import { Link } from "react-router-dom";

const App = () => {
  const [addresses, setAddresses] = useState([])
  const [dishes, setDishes] = useState([])

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
    axios.get('http://localhost:8080/api/dishesID')
    .then ((data) => {
      setDishes(data.data.dishes)
    })
    .catch((e) => {
      console.log(e)
    })
  }, [])

  console.log(addresses)
  const addressList = addresses.map(items => {
    return <li key={items.id}>{items.street_name}</li>   
  })

  const dishesList = dishes.map(items => {
    return <li key={items.id}>
      <Link to={`${items.id}`}>{items.title}</Link>
    </li>
  })

  return (
    <div className="App">
      <h1>HI</h1>
      <ul>{addressList}</ul>
      <ul>{dishesList}</ul>
      <MapContainer />
    </div>
  );
}

export default App;
