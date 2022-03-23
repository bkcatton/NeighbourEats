import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosConfig from '../../axiosConfig';
import MapContainer from './MapContainer';
import VendorsList from './VendorsList';
import SearchInput from './SearchInput';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DishDetailsModal from './DishDetailsModal'

const Browse = () => {
  const [dishesInfo, setDishesInfo] = useState([]);
  const [dishesReviews, setDishesReviews] = useState([]);
  const [dishesRatings, setDishesRatings] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [mapCoords, setMapCoords] = useState([]);
  const [open, setOpen] = useState(false);
  const [dishId, setDishId] = useState(null);

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
  
  const dishDetails = function (id) {
    console.log(id)
    for (const item of dishesInfo) {
      if (item.id === id) {
        setDishId(id);
        setOpen(true);
      }
    }
  }

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
        const { id, street_name, title, image_link } = dishItem;

        setMapCoords(prev => [
          ...prev,
          { id, street_name, title, image_link, location },
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
      <Grid container spacing={2} columnSpacing={{ md: 2 }} rowSpacing={{ md: 2 }} sx={{ mb: 2, mx: 'auto' }}>
        <Grid item xs={12} md={6} sx={{ height: "52vh", width: "548" }}>
          <MapContainer dishId={dishId} setDishId={setDishId} mapCoords={mapCoords} searchValue={searchValue} dishDetails={dishDetails} />
        </Grid>
        <Grid item xs={12} md={6} >
          <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />
          <VendorsList dishDetails={dishDetails} dishId={dishId} setDishId={setDishId} dishesRatings={dishesRatings} searchValue={searchValue} />
        </Grid>
      </Grid>
      <DishDetailsModal dishId={dishId} open={open} setOpen={setOpen} />
    </Box>

  );
};

export default Browse;
