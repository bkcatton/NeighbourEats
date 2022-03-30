import React, { useState, useEffect } from "react";
import { Backdrop, Modal, Card, CardContent, CardMedia, Fade, Typography, Grid } from "@mui/material";

import AddToOrder from "./AddToOrder";
import DishReviews from "./DishReviews";
import axiosConfig from "../../../axiosConfig";
import getFormattedCurrency from '../../../Helpers/getFormattedCurrency'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 450,
  bgcolor: "info.main",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "10px",
};

/*
props passed in from browse/index:
1. dishId: used to make axios get request for a particular dish
2. open, setOpen: used to open and close modal
*/

const TransitionsModal = (props) => {
  const [quantity, setQuantity] = useState(1);
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
                <CardContent>
                  <Typography
                    id="transition-modal-title"
                    variant="h5"
                    component="h2"
                  >
                    {dishDetails.title}
                  </Typography>
                  <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                    {dishDetails.dish_description}
                  </Typography>
                    <CardMedia
                      component="img"
                      width="100%"
                      image={dishDetails.image_link}
                      alt={dishDetails.title}
                      sx={{ boxShadow: 4}}
                    />
                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                      Price: {getFormattedCurrency(dishDetails.price_cents)}
                    </Typography>
                    <Typography>
                      Total: {getFormattedCurrency(dishDetails.price_cents * quantity)}
                    </Typography>
                  <AddToOrder dishDetails={dishDetails} quantity={quantity} setQuantity={setQuantity} />

                </CardContent>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                style={{ padding: "1rem", background: "linear-gradient(to right, white, #eee2dc)"}}
                >
                <Typography variant="h5" pb="10px">Reviews</Typography>
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
