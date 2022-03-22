import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosConfig from '../../axiosConfig';
import MapContainer from './MapContainer';
import VendorsList from './VendorsList';
import SearchInput from './SearchInput';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const Browse = () => {
  const [dishesInfo, setDishesInfo] = useState([]);
  const [dishesReviews, setDishesReviews] = useState([]);
  const [dishesRatings, setDishesRatings] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [mapCoords, setMapCoords] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const all = await Promise.all([
          axiosConfig.get('/dishes/information'),
          axiosConfig.get('/dishes/reviews'),
          axiosConfig.get('/dishes/ratings'),
        ]);
        setDishesInfo(all[0].data);
        setDishesReviews(all[1].data);
        setDishesRatings(all[2].data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!dishesReviews.length || !dishesInfo.length) return;
    const getCoordinates = async dishItem => {
      const { street_number, street_name, city, state_code } = dishItem;
      const parameter = encodeURIComponent(
        `${street_number} ${street_name} ${city} ${state_code}`
      );

      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${parameter}&key=AIzaSyDhp8LqdW-X8POJhX8QFV-ERtVBLr0ujZo`
        );
        const location = response.data.results[0].geometry.location || {};
        const { street_name, title, image_link } = dishItem;

        setMapCoords(prev => [
          ...prev,
          { street_name, title, image_link, location },
        ]);
      } catch (error) {
        console.log('this is the error', error);
      }
    };

    // adding the reviews array to each dish
    const dishItems = dishesInfo.map(item => {
      item.reviews = [];
      for (const review of dishesReviews) {
        if (review.dish_id === item.id) {
          item.reviews.push(review);
        }
      }
      return item;
    });

    // calling the function to get the geocoords for each address
    dishItems.forEach(item => getCoordinates(item));
  }, [dishesReviews.length, dishesInfo.length]);

  return (
    <Box >
{/* spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} */}

      <Grid container spacing={2} columnSpacing={{md: 0, lg: 5}} sx={{ mb: 2, mx: 'auto' }}>
        <Grid item xs={12} >
          <SearchInput searchValue={searchValue} setSearchValue={setSearchValue}/>
        </Grid>
        <Grid item xs={12} md={6} sx={{ height: "50vh", width: "50vh" }}>
          <MapContainer mapCoords={mapCoords} searchValue={searchValue} />
        </Grid>
        <Grid item={2} md={6} >
          <VendorsList dishesRatings={dishesRatings} searchValue={searchValue} />
        </Grid>
      </Grid>
    </Box>
     
  );
};

export default Browse;
