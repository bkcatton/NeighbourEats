import React, { useState, useEffect, useContext } from 'react';
import axiosConfig from '../axiosConfig';
import { UserContext } from './UserProvider';

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(UserContext);
  const { userId } = user;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosConfig.get(`/orders/current/${userId}`);
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
}

export default VendorOrders