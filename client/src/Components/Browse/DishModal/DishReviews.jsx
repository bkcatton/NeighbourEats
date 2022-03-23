import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import HeartRating from '../HeartRating';

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
        <HeartRating rating={item.star_rating}/>
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