import React, { useState, useEffect } from 'react'
import axiosConfig from '../../axiosConfig';

const Orders = () => {
  const [userOrders, setUserOrders] = useState([]);

  useEffect(async () => {
    try {
      const orders = await axiosConfig.get(`/orders/user/1`) // hardcoded logged in user
      setUserOrders(orders.data)
    } catch (error) {
      console.log(error)
    }      
  }, [userOrders])

  const deleteFromOrder =  (orderId) => {
    
       axiosConfig.delete(`/orders/delete/${orderId}`)
        .then(() => {
          const remainingOrders = userOrders.filter(item => item.order_item_id !== orderId)
          setUserOrders([...remainingOrders]);
        })
        .catch(error => console.log(error))
   
  }

  const ordersList = userOrders.map((item, i) => {
    return (
      <div key={i}>
        {item.title}
        <img src={item.image_link} alt={item.title} style={{maxWidth: "100px"}}/>
        {item.quanity}
        {item.paid_price_cents}
        {item.dish_description}
        <button onClick={() => deleteFromOrder(item.order_items_id)}> remove from order </button>
      </div>
    );
  })
  
  return (
    <div>
      Pending Orders
      {ordersList.length ? ordersList : <p>No Orders</p>}
      <button>Stripe Checkout</button>
    </div>
  )
}

export default Orders
