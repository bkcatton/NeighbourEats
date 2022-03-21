import React, { useState, useEffect, useContext } from 'react';
import axiosConfig from '../../axiosConfig';
import PaymentForm from './PaymentForm';
import { UserContext } from '../UserProvider';

const BuyerOrders = () => {
  const [userOrders, setUserOrders] = useState([]);
  const { user } = useContext(UserContext);
  const { userId } = user;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosConfig.get(`/orders/user/${userId}`);
        if (data) {
          setUserOrders(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const deleteFromOrder = orderItemsId => {
    axiosConfig
      .delete('/orders/delete', { orderItemsId })
      .then(() => {
        const remainingOrders = userOrders.filter(item => {
          return item.order_items_id !== orderItemsId;
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
          remove from order
        </button>
      </div>
    );
  });
  return (
    <div>
      Pending Orders
      {ordersList.length ? ordersList : <p>No Orders</p>}
      <PaymentForm userOrders={userOrders} />
    </div>
  );
};

export default BuyerOrders;
