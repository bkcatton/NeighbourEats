import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  CardActionArea,
  Divider,
  Grid,
} from "@mui/material";

import getFormattedCurrency from "../Helpers/getFormattedCurrency";
import axiosConfig from "../axiosConfig";
import { UserContext } from "../Providers/UserProvider";

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(UserContext);
  const { userId } = user;

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
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const ordersList = orders.map((item, i) => {
    const { title, paid_price_cents, quantity, image_link, bought_by } = item;

    return (
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              src={image_link}
              alt={title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Typography>Ordered by: {bought_by}</Typography>
              <Divider sx={{ my: 1 }} />
              <Stack direction="row" spacing={2}>
                <Box>
                  <Typography color="text.secondary">Quantity:</Typography>
                  <Typography color="text.secondary">Price:</Typography>
                  <Typography>Total:</Typography>
                </Box>
                <Box>
                  <Typography color="text.secondary">{quantity}</Typography>
                  <Typography color="text.secondary">
                    {`${getFormattedCurrency(paid_price_cents)}`}
                  </Typography>
                  <Typography>
                    {getFormattedCurrency(quantity * paid_price_cents)}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  });

  return (
    <Box>
      <Typography variant="h3" sx={{ m: 4 }}>
        Current Orders:
      </Typography>
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        {ordersList}
      </Grid>
    </Box>
  );
};

export default VendorOrders;
