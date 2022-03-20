import React, { useState, useEffect } from 'react';
import axiosConfig from '../axiosConfig';

const CurrentOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axiosConfig.get('/orders/current');
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const ordersList = orders.map((item, i) => {
    const { title, paid_price_cents, country_style, quantity, image_link } =
      item;
    return (
      <li key={i}>
        <p>{title}</p>
        <p>{paid_price_cents}</p>
        <p>{country_style}</p>
        <p>{quantity}</p>
        <img src={image_link} alt={title} />
      </li>
    );
  });

  return (
    <div>
      CurrentOrders
      <ul>{ordersList}</ul>
    </div>
  );
};

export default CurrentOrders;
