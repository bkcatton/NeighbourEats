import React, { useState, useEffect, useContext, Fragment } from "react";
import axiosConfig from "../../axiosConfig";
import { UserContext } from "../../Providers/UserProvider";
import LeaveReview from "./LeaveReview";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const PreviousOrders = () => {
  const [orders, setOrders] = useState([]);
  const [showReviewInput, setShowReviewInput] = useState(false);
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

  const toggleShow = (id) => {
    setDishId(id);
    setShowReviewInput(true);
  };

  const handleSubmit = async () => {
    try {
      await axiosConfig.post("/orders/reviews", {
        userId,
        dishId,
        reviewBody,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const ordersList = orders.map((item, i) => {
    const { dish_id, title, paid_price_cents, quantity, image_link } = item;

    return (
      <Card key={i} variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 20 }} gutterBottom>
            {item.title}
          </Typography>
          <CardMedia
            component="img"
            src={item.image_link}
            alt={item.title}
            style={{ width: "200px" }}
          />
          <Typography variant="body2">{`${item.paid_price_cents}`}</Typography>
        </CardContent>
        <CardActions>
          <LeaveReview
            reviewBody={reviewBody}
            setReviewBody={setReviewBody}
            handleSubmit={handleSubmit}
          />
        </CardActions>
      </Card>
    );
  });

  return (
    <Fragment>
      <Box sx={{ minWidth: 275 }}>
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          textAlign="center"
        >
          Previous Orders
        </Typography>
        {ordersList.length ? ordersList : <Typography>No Orders</Typography>}
      </Box>
    </Fragment>
  );
};

export default PreviousOrders;
