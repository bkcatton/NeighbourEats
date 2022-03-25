import React, { useState } from "react";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { CardElement } from "@stripe/react-stripe-js";

import getFormattedCurrency from "../../Helpers/getFormattedCurrency";

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
  pb: 2,
};

const PaymentForm = (props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if (success) {
      window.location.reload(false)
    };

    setOpen(false)
  };

  const handleClick = () => {
    props.onCheckout();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  return (
    <Box>
      <Button onClick={handleOpen} variant="outlined">
        Pay Now
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
          <Box sx={style}>
            <Typography
              variant="h5"
              gutterBottom
              component="div"
              textAlign="center"
              sx={{ mb: 2 }}
            >
              Checkout
            </Typography>
            <CardElement />
            <Stack direction="column" alignItems="center" sx={{ mt: 2 }}>
              <Typography
                sx={{ mb: 1 }}
              >
                {`Order Total: ${getFormattedCurrency(props.orderTotal)}`}
              </Typography>
              {!loading && !success && (
                <Button fullWidth onClick={handleClick} variant="outlined">
                  Confirm Payment
                </Button>
              )}
              {success && (
                <Button fullWidth variant="outlined" color="success">
                  Thank You!
                </Button>
              )}
              {loading && (
                <LoadingButton fullWidth loading variant="outlined">
                  Submit
                </LoadingButton>
              )}
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default PaymentForm;
