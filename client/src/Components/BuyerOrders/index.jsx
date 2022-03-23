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
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(0),
//   color: theme.palette.text.secondary,
// }));

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
        <Stack direction="row" justifyContent="space-between">
          <Box sx={{ width: '100%' }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h6" color="text.primary" textAlign="left">
                {item.title}
              </Typography>
              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => deleteFromOrder(item.order_items_id)}
              >
                Cancel Item
              </Button>
            </Stack>
            <Typography
              sx={{ mb: 1.5 }}
              color="text.secondary"
              textAlign="left"
            >
              {item.dish_description}
            </Typography>
            <Typography variant="body2" sx={{ mt: 'auto' }}>
              {`${item.paid_price_cents}`}
            </Typography>
          </Box>
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
    <Box sx={{ minWidth: 275 }}>
      <Typography variant="h4" textAlign="center">
        Pending Orders
      </Typography>
      {ordersList.length ? ordersList : <p>No Orders</p>}
      <Typography>Your Total: {orderTotal}</Typography>
      <PaymentForm
        orderTotal={orderTotal}
        userOrders={userOrders}
        onCheckout={onCheckout}
      />
    </Box>
  );
};

export default BuyerOrders;
