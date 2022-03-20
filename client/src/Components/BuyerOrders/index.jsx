import React, { useState, useEffect } from 'react';
import axiosConfig from '../../axiosConfig';
import { Link } from 'react-router-dom';

const BuyerOrders = () => {
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders = await axiosConfig.get(`/orders/user/1`); // hardcoded logged in user
        setUserOrders(orders.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const deleteFromOrder = orderId => {
    axiosConfig
      .delete(`/orders/delete/${orderId}`)
      .then(() => {
        const remainingOrders = userOrders.filter(item => {
          return item.order_items_id !== orderId;
        });

        setUserOrders(remainingOrders);
      })
      .catch(error => console.log(error));
  };

  const ordersList = userOrders.map((item, i) => {
    return (
      <div key={i}>
        {item.title}
        <img
          src={item.image_link}
          alt={item.title}
          style={{ maxWidth: '100px' }}
        />
        {item.quanity}
        {item.paid_price_cents}
        {item.dish_description}
        <button onClick={() => deleteFromOrder(item.order_items_id)}>
          {' '}
          remove from order{' '}
        </button>
      </div>
    );
  });

  return (
    <div>
      Pending Orders
      {ordersList.length ? ordersList : <p>No Orders</p>}
      <button>
        <Link to="/checkout">Stripe Checkout</Link>
      </button>
    </div>
  );
};

export default BuyerOrders;
