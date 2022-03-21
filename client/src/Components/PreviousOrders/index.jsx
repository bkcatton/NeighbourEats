import React, { useState, useEffect, useContext } from 'react';
import axiosConfig from '../../axiosConfig';
import { UserContext } from '../UserProvider';
import LeaveReview from './';

const PreviousOrders = () => {
  const [orders, setOrders] = useState([]);
  const [showReviewInput, setShowReviewInput] = useState(false);
  const [reviewId, setReviewId] = useState(null);
  const [reviewBody, setReviewBody] = useState('');
  const { user } = useContext(UserContext);
  const { userId } = user;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosConfig.get(`/orders/previous/${userId}`);
        console.log(data);
        if (data) {
          setOrders(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const handleClick = id => {
    setReviewId(id);
    setShowReviewInput(true);
  };

  const ordersList = orders.map(item => {
    const { dish_id, title, paid_price_cents, quantity, image_link } = item;
    return (
      <div key={dish_id}>
        {title}
        {quantity}
        {paid_price_cents}
        <img src={image_link} alt={title} style={{ maxWidth: '100px' }} />
        <button onClick={() => handleClick(dish_id)}>Leave Review</button>
      </div>
    );
  });

  return (
    <div>
      PreviousOrders
      <ul>{ordersList}</ul>
      <LeaveReview reviewBody={reviewBody} setReviewBody={setReviewBody} />
    </div>
  );
};

export default PreviousOrders;
