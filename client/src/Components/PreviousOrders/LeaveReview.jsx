import React, { useState, Fragment } from "react";
import {
  Backdrop,
  Box,
  Card,
  Modal,
  Fade,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import HeartRating from "./HeartRating";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "10px",
};

const LeaveReview = (props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    props.setDishId(props.dishId);
  };

  const handleClose = () => setOpen(false);

  const handleClick = () => {
    props.handleSubmit();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  return (
    <Fragment>
      <Button
        onClick={handleOpen}
        size="small"
        variant="outlined"
        color="primary"
      >
        Leave a review
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Card sx={style}>
            <Typography
              variant="h5"
              gutterBottom
              component="div"
              textAlign="center"
            >
              Leave a review
            </Typography>
            <TextField
              id="outlined-name"
              fullWidth
              label="Review"
              margin="normal"
              value={props.reviewBody}
              onChange={(e) => props.setReviewBody(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
            <HeartRating
              starRating={props.starRating}
              setStarRating={props.setStarRating}
            />
            {!loading && !success && (
              <Button fullWidth onClick={handleClick}>
                Post review
              </Button>
            )}

            {success && (
              <Button fullWidth sx={{color: "success.main"}}>
                Review Posted!
              </Button>
            )}
            {loading && (
              <LoadingButton fullWidth loading variant="outlined">
                Submit
              </LoadingButton>
            )}
          </Card>
        </Fade>
      </Modal>
    </Fragment>
  );
};

export default LeaveReview;
