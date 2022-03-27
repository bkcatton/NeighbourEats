import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  Stack,
  IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { UserContext } from "../../Providers/UserProvider";
import axiosConfig from "../../axiosConfig";
import PaymentForm from "./PaymentForm";
import getFormattedCurrency from "../../Helpers/getFormattedCurrency";

const Cart = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [orderTotal, setOrderTotal] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const { userId } = user;

  const getOrderTotal = (array) => {
    let runningTotal = 0;

    for (const item of array) {
      runningTotal += item.paid_price_cents * item.quantity;
    }
    
    return runningTotal;
  };

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const { data } = await axiosConfig.get(`/orders/user/${userId}`);
        setLoading(false);

        if (!data[0]) {
          return;
        }
        
        setUserOrders(data);
        setOrderId(data[0].order_id);
        
        const newOrderTotal = getOrderTotal(data);
        setOrderTotal(newOrderTotal);       
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
      
      const newOrderTotal = getOrderTotal(remainingOrders);
      setOrderTotal(newOrderTotal);
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
    const { title, paid_price_cents, quantity, image_link, dish_description } =
      item;
    return (
      <Card key={i} elevation={2} sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Stack direction="column" justifyContent="space-between">
              <Typography variant="h6" color="text.primary" textAlign="left">
                {title}
              </Typography>
              <Typography style={{ width: "75%" }}>
                {dish_description}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} mt="auto">
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
                  {getFormattedCurrency(paid_price_cents * quantity)}
                </Typography>
              </Box>
            </Stack>
          </CardContent>

          <CardMedia
            component="img"
            src={image_link}
            alt={title}
            sx={{ width: "9rem" }}
          />
          <Stack direction="column" justifyContent="center">
            <IconButton
              size="md"
              variant="outlined"
              // color="error"
              sx={{ m: 1, color: "gray" }}
              onClick={() => deleteFromOrder(item.order_items_id)}
              position="absolute"
              left="50"
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Stack>
      </Card>
    );
  });

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h2" sx={{ my: 3 }}>
        My Cart
      </Typography>
        {!loading && !!ordersList.length && <Box>{ordersList}</Box>}
        {!loading && !ordersList.length && <Box>
          <Typography>
            You currently have no new orders! Back to <Link to="/">Browse</Link>?
          </Typography>
          <CardMedia
            component="img"
            image="https://images.unsplash.com/photo-1598134493179-51332e56807f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
            alt="dog"
          />
        </Box>}
        {!loading && !!ordersList.length && <Card>
          <CardContent>
            <Stack
              direction="row"
              alignItems="baseline"
              justifyContent="space-between"
            >
              <Typography sx={{ mb: 1 }}>
                  Cart Total:{" "}
                  <strong>{getFormattedCurrency(orderTotal)}</strong>
                </Typography>
             
                <PaymentForm
                  orderTotal={orderTotal}
                  userOrders={userOrders}
                  onCheckout={onCheckout}
                />
             
            </Stack>
          </CardContent>
        </Card>}
     
    </Container>
  );
};

export default Cart;
