import React, { useState, useEffect } from "react";
import axios from 'axios';

function App() {
  const [addresses, setAddresses] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8080/api/addresses')
      .then((data) => {
        setAddresses(data.data.addresses)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  console.log(addresses)
  const addressList = addresses.map(items => {
    return <li>{items.street_name}</li>   
  })

  return (
    <div className="App">
      <h1>HI</h1>
      <ul>{addressList}</ul>
    </div>
  );
}

export default App;
