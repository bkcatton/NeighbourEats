import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import axiosConfig from '../../../axiosConfig';
import { UserContext } from '../../../Providers/UserProvider'
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const AddToOrder = props => {
  const [quantity, setQuantity] = useState(1);
  const [checkout, setCheckout] = useState(false);
  const { user } = useContext(UserContext);
  const { userId } = user;

 // create an order, use newly created order_id to add order with details to cart
  const onSubmit = () => {
    axiosConfig.post('/orders', { userId })
      .then(data => {  
        const { id: order_id } = data.data;
        const { id: dish_id } = props.dishDetails;
        const paid_price_cents = Number(props.dishDetails.price_cents);

        // create new order item using newly created order id
        axiosConfig.post(`/orders/order_item`, { order_id, dish_id, quantity, paid_price_cents })
          .then(setCheckout(true))
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
  }

  return (
    <div>
      <ButtonGroup>      
      { (quantity > 1) && <Button onClick={() => setQuantity(prev => prev - 1)}>-</Button>}
      <Button  style={{color:"black"}} disabled><strong>{quantity}</strong></Button>
      <Button onClick={() => setQuantity(prev => prev + 1)}>+</Button>
      </ButtonGroup>
      {!checkout ? <Button onClick={onSubmit} variant='outlined'>Add to Order</Button>
      :
      <Button color="success">Added!</Button>}
      {checkout && <Button component={Link} to="/orders">Continue to Checkout</Button>}
      {checkout && <Button component={Link} to="/">Continue Shopping</Button>}
    </div>
  )
  
}

export default AddToOrder
