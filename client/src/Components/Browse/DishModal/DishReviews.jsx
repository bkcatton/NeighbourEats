import React, { Fragment } from "react";
import { Card, CardContent, Typography } from "@mui/material/";

import HeartRating from "../HeartRating";

const DishReviews = (props) => {
  const reviewsList = props.dishReviews.map((item) => {
    return (
      <Card key={item.id} sx={{ minWidth: 275, mb: 1 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {item.full_name}
          </Typography>
          <Typography variant="body2">{item.content}</Typography>
          <HeartRating rating={item.star_rating} />
        </CardContent>
      </Card>
    );
  });

  return <Fragment>{reviewsList}</Fragment>;
};

export default DishReviews;
