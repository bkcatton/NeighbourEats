import React, { useState, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, ButtonGroup } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

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
    <div>
      <ButtonGroup>
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
        <Button fullWidth onClick={onSubmit} variant="outlined">
          Add to Order
        </Button>
      )}
      {loading && (
        <LoadingButton
          fullWidth
          loading
          variant="outlined"
          sx={{ color: "primary.main" }}
        >
          Submit
        </LoadingButton>
      )}
      {checkout && (
        <Button
          fullWidth
          variant="outlined"
          sx={{ color: "success.main", borderColor: "success.main" }}
        >
          Added!
        </Button>
      )}
      <Button fullWidth component={Link} to={`/orders/cart`}>
        View Cart
      </Button>
    </div>
  );
};

export default AddToOrder;
