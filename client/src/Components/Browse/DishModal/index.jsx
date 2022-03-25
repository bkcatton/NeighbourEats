import React, { useState, useEffect } from "react";
import {
  Backdrop,
  Box,
  Modal,
  Card,
  Fade,
  Typography,
  Grid,
} from "@mui/material";

import AddToOrder from "./AddToOrder";
import DishReviews from "./DishReviews";
import axiosConfig from "../../../axiosConfig";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 450,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const TransitionsModal = (props) => {
  const [dishDetails, setDishDetails] = useState({});
  const [dishReviews, setDishReviews] = useState([]);
  const handleClose = () => props.setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const all = await Promise.all([
          axiosConfig.get(`/dishes/details/${props.dishId}`),
          axiosConfig.get(`/dishes/reviews/${props.dishId}`),
        ]);
        setDishDetails(all[0].data);
        setDishReviews(all[1].data);
      } catch (error) {
        console.log(error);
      }
    };

    if (props.dishId) {
      fetchData();
    }
  }, [props.dishId]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Card sx={style}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  {dishDetails.title}
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  {dishDetails.dish_description}
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  {dishDetails.paid_price_cents}
                </Typography>
                <img
                  src={dishDetails.image_link}
                  alt={dishDetails.title}
                  style={{ height: "100px" }}
                />
                <AddToOrder dishDetails={dishDetails} />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{ backgroundColor: "#D3D3D3", padding: "1.2rem" }}
              >
                <Typography>Reviews</Typography>
                <DishReviews dishReviews={dishReviews} />
              </Grid>
            </Grid>
          </Card>
        </Fade>
      </Modal>
    </div>
  );
};

export default TransitionsModal;
