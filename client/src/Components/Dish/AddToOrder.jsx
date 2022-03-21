import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import axiosConfig from '../../axiosConfig';
import { UserContext } from '../UserProvider';

const Counter = props => {
 const [quantity, setQuantity] = useState(1);
 const { user } = useContext(UserContext);
  const { userId } = user;


 // create an order, use newly created order_id to add order with details to cart
  const onSubmit = () => {
    axiosConfig.post('/orders', { userId }).then(data => {
      const { id: order_id } = data.data;
      const { id: dish_id } = props.dishDetails;
      const paid_price_cents = quantity * Number(props.dishDetails.price_cents);

      axiosConfig.post(`/orders/order_item`, { order_id, dish_id, quantity, paid_price_cents })
        .then(data => console.log(data))
        .catch(error => console.log(error))
    })
  }

  return (
    <div>Quantity = {quantity}
      <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
      <button onClick={() => setQuantity(prev => prev - 1)}>-</button>
      <button onClick={onSubmit}>Add to Order</button>
      <Link to="/orders"> Continue to Checkout </Link>
      <Link to="/"> Continue Shopping </Link>
    </div>
  )
  
}

export default Counter