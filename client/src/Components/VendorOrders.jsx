import React, { useState, useEffect, useContext } from 'react';
import axiosConfig from '../axiosConfig';
import { UserContext } from '../Providers/UserProvider';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(UserContext);
  const { userId } = user;
  console.log("right component", userId)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosConfig.get(`/orders/current/${userId}`);
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [userId]);

  const ordersList = orders.map((item, i) => {
    const { title, paid_price_cents, country_style, quantity, image_link, bought_by } =
      item;
    return (
      <Card key={i} variant="outlined" sx={{ mb: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <CardContent
            sx={{ width: '100%', display: 'flex', flexDirection: 'column', mb: 0 }}
          >
            <Stack direction="row" justifyContent="space-between" >
              <Typography variant="h6" color="text.primary" textAlign="left">
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ mt: 'auto' }}>
                Price: {`$${item.paid_price_cents}`}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
            </Stack>
            <Stack direction="column" justifyContent="space-between" style={{ height: "100%" }}>
              <Typography textAlign="right">
                Quantity: {item.quantity}
              </Typography>
              <Stack direction="row" alignItems="baseline" justifyContent="space-between">
                <Typography>
                  Customer: {item.bought_by}
                </Typography>
                <Typography variant="h6">
                  Total: ${item.quantity * item.paid_price_cents}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
          <Box>
            <CardMedia
              component="img"
              src={item.image_link}
              alt={item.title}
              sx={{ width: '9rem', border: '0.5rem solid black' }}
            />
          </Box>
        </Stack>
      </Card>
    );
  });

  return (
    <Box>
      <Typography variant="h4" textAlign="center" sx={{ mb: 2 }}>
        Current Orders:
      </Typography>
      <Box sx={{ maxWidth: 800, mx: 'auto' }} >{ordersList}</Box>
    </Box>

  );
}

export default VendorOrders
