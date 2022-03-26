import React, { useState, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { Box, Button, ButtonGroup, Stack, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Divider } from "@mui/material";

import axiosConfig from "../../../axiosConfig";
import { UserContext } from "../../../Providers/UserProvider";

const AddToOrder = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [checkout, setCheckout] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);
  const { userId } = user;

  // create an order, use newly created order_id to add order with details to cart
  const onSubmit = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setCheckout(true);
    }, 1500);

    if (!userId) {
      return;
    }

    axiosConfig
      .post("/orders", { userId })
      .then((data) => {
        const { id: order_id } = data.data;
        const { id: dish_id } = props.dishDetails;
        const paid_price_cents = Number(props.dishDetails.price_cents);
        // create new order item using newly created order id
        axiosConfig
          .post(`/orders/order_item`, {
            order_id,
            dish_id,
            quantity,
            paid_price_cents,
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  return (
    <Box>
      <Stack direction="row" sx={{ mt: 2 }}>
        <ButtonGroup sx={{ marginRight: 'auto' }}>
          {!checkout ? (
            <Fragment>
              <Button
                disabled={quantity < 2}
                onClick={() => setQuantity((prev) => prev - 1)}
              >
                -
              </Button>
              <Button style={{ color: "black" }} disabled>
                <strong>{quantity}</strong>
              </Button>
              <Button onClick={() => setQuantity((prev) => prev + 1)}>+</Button>
            </Fragment>
          ) : (
            <Button variant="text" sx={{ color: "black" }}>
              Quantity: {quantity}
            </Button>
          )}
        </ButtonGroup>
        {!checkout && !loading && (
          <Button onClick={onSubmit} variant="outlined">
            Add to Order
          </Button>
        )}
        {loading && (
          <LoadingButton
            loading
            variant="outlined"
            sx={{ color: "primary.main" }}
          >
            Add to Order
          </LoadingButton>
        )}
        {checkout && (
          <Button
            variant="outlined"
            sx={{ color: "success.main", borderColor: "success.main", width: "133px" }}
          >
            Added!
          </Button>
        )}
      </Stack>
      <Divider sx={{ mt: 2 }} />
      <Link
        component={Typography}
        style={{ textDecoration: 'none', color: 'black', display: 'flex', alignItems: "center", margin: '1rem 0 0 1rem' }}
        to='/orders/cart'>
        View Cart
        <ShoppingCartIcon style={{ marginLeft: '0.5rem' }}/>
      </Link>
    </Box>
  );
};

export default AddToOrder;
