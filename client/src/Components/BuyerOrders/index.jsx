import React, { useState, useEffect, useContext } from 'react';
import axiosConfig from '../../axiosConfig';
import PaymentForm from './PaymentForm';
import { UserContext } from '../../Providers/UserProvider';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

// const card = (
//   <Card variant="outlined">
//     <CardContent>
//       <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//         Word of the Day
//       </Typography>
//       <Typography variant="h5" component="div">
//         be{bull}nev{bull}o{bull}lent
//       </Typography>
//       <Typography sx={{ mb: 1.5 }} color="text.secondary">
//         adjective
//       </Typography>
//       <Typography variant="body2">
//         well meaning and kindly.
//         <br />
//         {'"a benevolent smile"'}
//       </Typography>
//     </CardContent>
//     <CardActions>
//       <Button size="small">Learn More</Button>
//     </CardActions>
//   </Card>
// );

const BuyerOrders = () => {
  const [userOrders, setUserOrders] = useState([]);
  const { user } = useContext(UserContext);
  const { userId } = user;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosConfig.get(`/orders/user/${userId}`);
        if (data) {
          setUserOrders(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const deleteFromOrder = async orderItemsId => {
    try {
      await axiosConfig.delete('/orders/delete', { data: { orderItemsId } });
      const remainingOrders = userOrders.filter(item => {
        return item.order_items_id !== orderItemsId;
      });
      setUserOrders(remainingOrders);
    } catch (error) {
      console.log(error);
    }
  };

  const ordersList = userOrders.map((item, i) => {
    return (
      // <div key={i}>
      //   {item.title}
      //   <img
      //     src={item.image_link}
      //     alt={item.title}
      //     style={{ maxWidth: '100px' }}
      //   />
      //   {item.quanity}
      //   {item.paid_price_cents}
      //   {item.dish_description}
      //   <button onClick={() => deleteFromOrder(item.order_items_id)}>
      //     remove from order
      //   </button>
      // </div>
      <Card key={i} variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {item.title}
          </Typography>
          <CardMedia
            component="img"
            src={item.image_link}
                alt={item.title}
                style={{width:'400px'}}
          />
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {item.dish_description}
          </Typography>
          <Typography variant="body2">{`${item.paid_price_cents}`}</Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => deleteFromOrder(item.order_items_id)}
          >
            Remove from order
          </Button>
        </CardActions>
      </Card>
    );
  });

  return (
    <Box sx={{ minWidth: 275 }}>
      Pending Orders
      {ordersList.length ? ordersList : <p>No Orders</p>}
      <PaymentForm userOrders={userOrders} />
    </Box>
  );
};

export default BuyerOrders;
