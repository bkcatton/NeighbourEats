// import React from 'react';
// import { CardElement } from '@stripe/react-stripe-js';

// const PaymentForm = () => {

//   const handleSubmit = async e => {
//     e.preventDefault();
//   };

//   return (
//     <div>
//       <form action="" >
//         <CardElement />
//         <button onClick={handleSubmit}> Pay </button>
//       </form>
//     </div>
//   );
// };

// export default PaymentForm;

import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardElement } from '@stripe/react-stripe-js';
import LoadingButton from '@mui/lab/LoadingButton';

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

const PaymentForm = props => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = () => {
    props.onCheckout();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Pay Now</Button>
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
              Enter Credit Card Details
            </Typography>
            <Typography>
              {`Order Total: ${props.orderTotal}`}
              </Typography>
            <CardElement />

            {!loading && !success && (
              <Button onClick={handleClick}>Confirm Checkout</Button>
            )}

            {success && <Button>Success!</Button>}
            {loading && (
              <LoadingButton loading variant="outlined">
                Submit
              </LoadingButton>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default PaymentForm;
