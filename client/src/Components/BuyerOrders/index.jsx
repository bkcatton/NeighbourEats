import React, { useState, useEffect, useContext } from 'react';
import axiosConfig from '../../axiosConfig';
import PaymentForm from './PaymentForm';
import { UserContext } from '../../Providers/UserProvider';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const BuyerOrders = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [orderTotal, setOrderTotal] = useState(null);
  const { user } = useContext(UserContext);
  const { userId } = user;

  const calculateOrderTotal = array => {
    let runningTotal = 0;

    for (const item of array) {
      runningTotal += item.paid_price_cents;
    }

    setOrderTotal(runningTotal);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosConfig.get(`/orders/user/${userId}`);

        if (data) {
          setUserOrders(data);
          setOrderId(data[0].order_id);
          calculateOrderTotal(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const deleteFromOrder = async orderItemsId => {
    try {
      await axiosConfig.delete('/orders/delete', { data: { orderItemsId } });
      const remainingOrders = userOrders.filter(item => {
        return item.order_items_id !== orderItemsId;
      });
      setUserOrders(remainingOrders);
    } catch (error) {
      console.log(error);
    }
  };

  const onCheckout = async () => {
    try {
      await axiosConfig.post('/orders/confirm', { orderId });
    } catch (error) {
      console.log(error);
    }
  };

  const ordersList = userOrders.map((item, i) => {
    return (
      <Card key={i} variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {item.title}
          </Typography>
          <CardMedia
            component="img"
            src={item.image_link}
            alt={item.title}
            style={{ width: '400px' }}
          />
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {item.dish_description}
          </Typography>
          <Typography variant="body2">{`${item.paid_price_cents}`}</Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => deleteFromOrder(item.order_items_id)}
          >
            Remove from order
          </Button>
        </CardActions>
      </Card>
    );
  });

  return (
    <Box sx={{ minWidth: 275 }}>
      Pending Orders
      {ordersList.length ? ordersList : <p>No Orders</p>}
      <Typography>TOTAL: {orderTotal}</Typography>
      <PaymentForm
        orderTotal={orderTotal}
        userOrders={userOrders}
        onCheckout={onCheckout}
      />
    </Box>
  );
};

export default BuyerOrders;
