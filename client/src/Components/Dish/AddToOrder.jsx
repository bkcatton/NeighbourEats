import React, { useState } from 'react'
import axiosConfig from '../../axiosConfig';

const Counter = props => {
 const [quantity, setQuantity] = useState(1);

  const onSubmit = () => {
    axiosConfig.post('/orders').then(data => {
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
      <button onClick={onSubmit}>  Add to Order  </button>
    </div>
  )
  
}

export default Counter