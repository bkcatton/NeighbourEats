import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Stack,
} from "@mui/material";

import { UserContext } from "../../Providers/UserProvider";
import axiosConfig from "../../axiosConfig";
import PaymentForm from "./PaymentForm";

const Cart = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [orderTotal, setOrderTotal] = useState(null);
  const { user } = useContext(UserContext);
  const { userId } = user;

  const getOrderTotal = (array) => {
    let runningTotal = 0;
    
    for (const item of array) {
      runningTotal += item.paid_price_cents;
    }

    return runningTotal;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosConfig.get(`/orders/user/${userId}`);
        console.log(data);
        if (data) {
          setUserOrders(data);
          setOrderId(data[0].order_id);
          const orderTotal = getOrderTotal(data);
          setOrderTotal(orderTotal);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const deleteFromOrder = async (orderItemsId) => {
    try {
      await axiosConfig.delete("/orders/delete", { data: { orderItemsId } });
      const remainingOrders = userOrders.filter((item) => {
        return item.order_items_id !== orderItemsId;
      });

      setUserOrders(remainingOrders);
      const orderTotal = getOrderTotal(remainingOrders);
      setOrderTotal(orderTotal);
    } catch (error) {
      console.log(error);
    }
  };

  const onCheckout = async () => {
    try {
      await axiosConfig.post("/orders/confirm", { orderId });
    } catch (error) {
      console.log(error);
    }
  };

  const ordersList = userOrders.map((item, i) => {
    return (
      <Card key={i} variant="outlined" sx={{ mb: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <CardContent
            sx={{ width: "100%", display: "flex", flexDirection: "column" }}
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
              <Typography variant="body2" sx={{ mt: "auto" }}>
                {`${item.paid_price_cents}`}
              </Typography>
            </Stack>
          </CardContent>
          <Box>
            <CardMedia
              component="img"
              src={item.image_link}
              alt={item.title}
              sx={{ width: "12rem", border: "0.5rem solid black" }}
            />
          </Box>
        </Stack>
      </Card>
    );
  });

  return (
    <Box sx={{ maxWidth: 800, mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        My Cart
      </Typography>
      {ordersList.length ? (
        ordersList
      ) : (
        <Typography>
          You currently have no orders. Back to <Link to="/">Browse</Link>?
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!!ordersList.length && (
          <Typography sx={{ mb: 1 }}>Total: {orderTotal}</Typography>
        )}
        {!!ordersList.length && (
          <PaymentForm
            orderTotal={orderTotal}
            userOrders={userOrders}
            onCheckout={onCheckout}
          />
        )}
      </Box>
    </Box>
  );
};

export default Cart;
