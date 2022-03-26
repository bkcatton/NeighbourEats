import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  Container,
  CardContent,
  CardActionArea,
  Typography,
  Stack,
} from "@mui/material";

import axiosConfig from "../../axiosConfig";
import { UserContext } from "../../Providers/UserProvider";
import LeaveReview from "./LeaveReview";
import getFormattedCurrency from "../../Helpers/getFormattedCurrency";

const PreviousOrders = () => {
  const [orders, setOrders] = useState([]);
  const [starRating, setStarRating] = useState(1);
  const [dishId, setDishId] = useState(null);
  const [reviewBody, setReviewBody] = useState("");
  const { user } = useContext(UserContext);
  const { userId } = user;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosConfig.get(`/orders/previous/${userId}`);

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

  const handleSubmit = async () => {
    if (!userId || !dishId || !starRating || !reviewBody) {
      return;
    }

    try {
      await axiosConfig.post("/orders/reviews", {
        userId,
        dishId,
        starRating,
        reviewBody,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const ordersList = orders.map((item, i) => {
    return (
      <Card elevation={2} key={i} sx={{ mb: 2, justifyContent: "center" }}>
        <CardActionArea>
          <Stack direction="row" justifyContent="space-between">
            <CardContent
              sx={{ width: "100%", display: "flex", flexDirection: "column" }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="baseline"
              >
                <Typography
                  variant="h6"
                  color="text.primary"
                  textAlign="left"
                  sx={{ mb: "1em" }}
                >
                  {item.quantity} x {item.title}
                </Typography>
                <LeaveReview
                  reviewBody={reviewBody}
                  setReviewBody={setReviewBody}
                  handleSubmit={handleSubmit}
                  starRating={starRating}
                  setStarRating={setStarRating}
                  setDishId={setDishId}
                  dishId={item.dish_id}
                />
              </Stack>
              <Typography>
                {`${getFormattedCurrency(
                  item.paid_price_cents * item.quantity
                )}`}
              </Typography>
            </CardContent>
          </Stack>
        </CardActionArea>
      </Card>
    );
  });

  return (
    <Container maxWidth="md">
      <Typography variant="h3" sx={{ my: 4 }}>
        Previous Orders
      </Typography>
      <Stack>
        {ordersList.length ? ordersList : <Typography>No Orders</Typography>}
      </Stack>
    </Container>
  );
};

export default PreviousOrders;
