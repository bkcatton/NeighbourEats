import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HeartRating from '../HeartRating';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
)

const DishReviews = props => {

  const reviewsList = props.dishReviews.map((item)=>{
    
    return (
      
    <Card key={item.id} sx={{ minWidth: 275, mb: 1 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {item.full_name}
        </Typography>
        <Typography variant="body2">
          {item.content}
        </Typography>
        <Typography variant="body2">
          <HeartRating rating={item.star_rating}/>
        </Typography>
      </CardContent>
    </Card>
    )
  })


  return (
    <React.Fragment>

      {reviewsList}
    </React.Fragment>
  );
}

export default DishReviews;