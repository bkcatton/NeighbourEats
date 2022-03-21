import React, { useState, useEffect, useContext } from 'react';
import axiosConfig from '../../axiosConfig';
import { UserContext } from '../UserProvider';
import LeaveReview from './LeaveReview';

const PreviousOrders = () => {
  const [orders, setOrders] = useState([]);
  const [showReviewInput, setShowReviewInput] = useState(false);
  const [dishId, setDishId] = useState(null);
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

  const toggleShow = id => {
    setDishId(id);
    setShowReviewInput(true);
  };

  const handleSubmit = async () => {
    try {
      await axiosConfig.post('/orders/reviews', {
        userId,
        dishId,
        reviewBody
      })

    } catch (error) {
      console.log(error)
    }
  }

  const ordersList = orders.map(item => {
    const { dish_id, title, paid_price_cents, quantity, image_link } = item;
    return (
      <div key={dish_id}>
        {title}
        {quantity}
        {paid_price_cents}
        <img src={image_link} alt={title} style={{ maxWidth: '100px' }} />
        <button onClick={() => toggleShow(dish_id)}>Leave Review</button>
      </div>
    );
  });

  return (
    <div>
      PreviousOrders
      <ul>{ordersList}</ul>
      {showReviewInput && <LeaveReview reviewBody={reviewBody} setReviewBody={setReviewBody} handleSubmit={handleSubmit} />}
    </div>
  );
};

export default PreviousOrders;
