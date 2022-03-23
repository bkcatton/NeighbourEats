import React, { useState, useEffect, useContext } from 'react';
import axiosConfig from '../axiosConfig';
import { UserContext } from '../Providers/UserProvider';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(UserContext);
  const { userId } = user;
  console.log("right component", userId)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosConfig.get(`/orders/current/${userId}`);
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [userId]);

  const ordersList = orders.map((item, i) => {
    const { title, paid_price_cents, country_style, quantity, image_link, bought_by } =
      item;
    return (
      <Card key={i} style={{ margin: 10 }}>
        <CardContent>
          <Typography>
            {title}
          </Typography>
          <Typography>  
          Quantity Purchased: {quantity}
          </Typography>
          <Typography>
          Order Total: {paid_price_cents * quantity}
          </Typography>
          <Typography>  
            Customer Name : {bought_by} 
          </Typography>
          <CardMedia 
          component="img"
          src={image_link} 
          alt={title}
          style={{height: 100, width: 100}}
          />
        </CardContent>
      </Card>
    );
  });

  return (
    <div>
      CurrentOrders
      <Box>{ordersList}</Box>
    </div>
  );
}

export default VendorOrders
