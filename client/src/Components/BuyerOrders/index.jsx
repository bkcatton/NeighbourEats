import React, { useState, useEffect, useContext } from 'react';
import axiosConfig from '../../axiosConfig';
import PaymentForm from './PaymentForm';
import { UserContext } from '../../Providers/UserProvider';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const BuyerOrders = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [orderTotal, setOrderTotal] = useState(null);
  const { user } = useContext(UserContext);
  const { userId } = user;

  const calculateOrderTotal = array => {
    let runningTotal = 0;
    if (array.length === 0) {
      setOrderTotal(runningTotal);
    }
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
      calculateOrderTotal(remainingOrders);
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
      <Card key={i} variant="outlined" sx={{ mb: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <CardContent
            sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <Typography variant="h6" color="text.primary" textAlign="left">
              {item.title}
            </Typography>
            <Typography
              sx={{ mb: 1.5 }}
              color="text.secondary"
              textAlign="left"
            >
              {item.dish_description}
            </Typography>
            <Stack direction="row" justifyContent="space-between">
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => deleteFromOrder(item.order_items_id)}
              >
                Cancel Item
              </Button>
              <Typography variant="body2" sx={{ mt: 'auto' }}>
                {`${item.paid_price_cents}`}
              </Typography>
            </Stack>
          </CardContent>
          <Box>
            <CardMedia
              component="img"
              src={item.image_link}
              alt={item.title}
              sx={{ width: '12rem', border: '0.5rem solid black' }}
            />
          </Box>
        </Stack>
      </Card>
    );
  });

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" textAlign="center" sx={{ mb: 2 }}>
        Pending Orders
      </Typography>
      {ordersList.length ? ordersList : <p>No Orders</p>}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography>Total: {orderTotal}</Typography>
        <PaymentForm
          orderTotal={orderTotal}
          userOrders={userOrders}
          onCheckout={onCheckout}
        />
      </Box>
    </Box>
  );
};

export default BuyerOrders;
