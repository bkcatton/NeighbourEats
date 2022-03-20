import React, { useState, useEffect } from 'react';
import axiosConfig from '../axiosConfig';

const CurrentOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await axiosConfig.get('/orders/current');

        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  console.log(orders);
  return <div>CurrentOrders</div>;
};

export default CurrentOrders;
