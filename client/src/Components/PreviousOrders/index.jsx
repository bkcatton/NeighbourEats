import React, { useState, useEffect, useContext, Fragment } from "react";
import axiosConfig from "../../axiosConfig";
import { UserContext } from "../../Providers/UserProvider";
import LeaveReview from "./LeaveReview";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

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
      <Card
        key={i}
        variant="outlined"
        sx={{ mb: 2, width: "50%", justifyContent: "center" }}
      >
        <Stack direction="row" justifyContent="space-between">
          <CardContent
            sx={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <Typography
              variant="h6"
              color="text.primary"
              textAlign="left"
              sx={{ mb: "1em" }}
            >
              {item.title}
            </Typography>
            <Stack direction="row" justifyContent="space-between">
              <LeaveReview
                reviewBody={reviewBody}
                setReviewBody={setReviewBody}
                handleSubmit={handleSubmit}
                starRating={starRating}
                setStarRating={setStarRating}
                setDishId={setDishId}
                dishId={item.dish_id}
              />
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
    <Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          textAlign="center"
          sx={{ mb: 1 }}
        >
          Previous Orders
        </Typography>
        {ordersList.length ? ordersList : <Typography>No Orders</Typography>}
      </Box>
    </Fragment>
  );
};

export default PreviousOrders;
