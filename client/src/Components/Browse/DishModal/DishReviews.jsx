import React from "react";
import { Divider, Typography, Box } from "@mui/material/";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import FavoriteIcon from "@mui/icons-material/Favorite";
import ListItemIcon from "@mui/material/ListItemIcon";


const DishReviews = (props) => {
  const reviewsList = props.dishReviews.map((item) => {
    return (
      <Box key={item.id} sx={{ width: '100%' }}>
        <Divider />
        <ListItem key={item.id}>
            <ListItemIcon>
              <FavoriteIcon sx={{ mr: 0.5, color: "#ff6d75" }} size="small" />
              <Typography variant="subtitle2">{item.star_rating}</Typography>
            </ListItemIcon>
          <ListItemText primary={`${item.full_name}`} secondary={item.content} />
        </ListItem>
      </Box>
    );
  });

  return (
  <Box sx={{height: '30vh', borderRadius: "50px"}}>
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: '100%',
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
      >
        {reviewsList}
      </List>
    </Box>
  )};

export default DishReviews;
