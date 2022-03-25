import React, { useState, useEffect, useContext } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Stack } from '@mui/material/';

import getFormattedCurrency from '../Helpers/getFormattedCurrency';
import axiosConfig from '../axiosConfig';
import { UserContext } from '../Providers/UserProvider';

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(UserContext);
  const { userId } = user;
  console.log("right component", userId)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosConfig.get(`/orders/current/${userId}`);

        if (data) {
          setOrders(data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (userId) {
      fetchData();
    }
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
                {title}
              </Typography>
              <Typography variant="body2" sx={{ mt: 'auto' }}>
                Price: {`${getFormattedCurrency(paid_price_cents)}`}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
            </Stack>
            <Stack direction="column" justifyContent="space-between" style={{ height: "100%" }}>
              <Typography textAlign="right">
                Quantity: {quantity}
              </Typography>
              <Stack direction="row" alignItems="baseline" justifyContent="space-between">
                <Typography>
                  Customer: {bought_by}
                </Typography>
                <Typography variant="h6">
                  Total: {getFormattedCurrency(quantity * paid_price_cents)}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
          <Box>
            <CardMedia
              component="img"
              src={image_link}
              alt={title}
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
