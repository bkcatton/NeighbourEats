import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardElement } from "@stripe/react-stripe-js";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import HeartRating from "./HeartRating"

const LeaveReview = (props) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = () => {
    props.handleSubmit()

    setLoading(true);

    setTimeout(() => {
        setLoading(false);
        setSuccess(true);
    }, 2000);
  };


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Leave a review</Button>
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
          <Box sx={style}>
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
            <HeartRating />
            {!loading && !success && (
              <Button onClick={handleClick}>Post review</Button>
            )}

            {success && <Button>Review Posted!</Button>}
            {loading && (
              <LoadingButton loading variant="outlined">
                Submit
              </LoadingButton>
            )}
          </Box>
        </Fade>
      </Modal>
    </React.Fragment>
  );
};

export default LeaveReview;
