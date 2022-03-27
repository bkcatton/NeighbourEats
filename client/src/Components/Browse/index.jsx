import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Grid, Box, Typography, Divider, Skeleton } from "@mui/material";

import axiosConfig from "../../axiosConfig";
import getFilteredTitlesBySearch from "../../Helpers/getFilteredTitlesBySearch";
import getFilteredTitlesByDistance from "../../Helpers/getFilteredTitlesByDistance";
import MapContainer from "./MapContainer";
import VendorsList from "./VendorsList";
import SearchInput from "./SearchInput";
import DishModal from "./DishModal";
import SearchByDistance from "./SearchByDistance";

// get map to start centered at this location
const initialCenter = {
  lat: 40.719344,
  lng: -74.003431,
};

const Browse = () => {
  const [dishId, setDishId] = useState(null);
  const [dishesInfo, setDishesInfo] = useState([]);
  const [dishesReviews, setDishesReviews] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [distance, setDistance] = useState(60);
  const [loadingMap, setLoadingMap] = useState(true)
  const [loadingVendorList, setLoadingVendorList] = useState(true)
  const [center, setCenter] = useState(initialCenter);
  
  // initial load; get all dishes and all reviews
  useEffect(() => {
    const fetchData = async () => {
      try {
        const all = await Promise.all([
          axiosConfig.get("/dishes/information"),
          axiosConfig.get("/dishes/reviews"),
        ]);
        setDishesInfo(all[0].data);
        setDishesReviews(all[1].data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // setting the modal dish id and opening the modal that shows all details for each dish
  const dishDetails = (id) => {
    for (const item of dishesInfo) {
      if (item.id === id) {
        setDishId(id);
        setOpen(true);
      }
    }
  };

// 3. getting the geocoordinates back based on an inputed address
const getCoordinatesForDishItem = async (dishItem) => {
  const { id, street_number, street_name, city, state_code } = dishItem;
  const parameter = encodeURIComponent(
    `${street_number} ${street_name} ${city} ${state_code}`
  );

  // adding the geocoordinates to each item in dishesInfo. Set dishesInfo = to the new object with all dish info and coords
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${parameter}&key=${process.env.REACT_APP_GMAPS_APIKEY}`
    );
    
  // 1. loop through each item, axios fetch its location
  // 2. for each item, create new array, loop through entire new array to find its id
  // 3. when id found, add location key-value pair to new array
  // 4. set state as new array
  const { location } = response.data.results[0].geometry;
  const dishesInfoClone = [...dishesInfo];
    for (const dish of dishesInfoClone) {
      if (dish.id === id) {
        dish.location = location;
      }
    }
    setDishesInfo(dishesInfoClone);
    setTimeout(() => {
      
      setLoadingMap(false)
    }, 1000);
    setTimeout(() => {
      
      setLoadingVendorList(false)
    }, 1250);
  } catch (error) {
    console.log("this is the error", error);
  }
};

  useEffect(() => {
    if (!dishesReviews.length || !dishesInfo.length) return;
    
    // 1. adding 2 key-value pairs to each dish => reviews: [], average_rating: int
    const dishItemsWithReview = dishesInfo.map((item) => {
      item.reviews = [];
      let runningTotal = 0;

      for (const review of dishesReviews) {
        if (review.dish_id === item.id) {
          item.reviews.push(review);
          runningTotal += review.star_rating;
        }
      }

      let averageRating = runningTotal / item.reviews.length;
      item.average_rating = averageRating;

      return item;
    });

    // 2. calling the function to get the geocoords for each address
    dishItemsWithReview.forEach((item) => {
      getCoordinatesForDishItem(item);
    });
  }, [dishesReviews.length, dishesInfo.length]);

  // filter search results based on search term and distance willing to travel
  let filteredList = [...dishesInfo];

  if (searchValue) {
    filteredList = getFilteredTitlesBySearch(searchValue, filteredList);
  }

  if (distance < 60) {
    filteredList = getFilteredTitlesByDistance(distance, filteredList);
  }

  return (
    <Box>
      <Typography variant="h4" component="h2" sx={{ my: 3 }} textAlign="center">What are you in the mood for today?</Typography>
      <Divider sx={{ my: 2, borderBottomWidth: 4 }} color="#123C69" />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {loadingMap ?
          <Fragment>
            <Skeleton variant="rectangular" height="70vh" />
          </Fragment>
          :
          <MapContainer
            center={center}
            setCenter={setCenter}
            dishId={dishId}
            setDishId={setDishId}
            filteredList={filteredList}
            dishDetails={dishDetails}
          />}
        </Grid>
        <Grid item xs={12} md={6}>
          <SearchByDistance
            dishesInfo={dishesInfo}
            setDishesInfo={setDishesInfo}
            setCenter={setCenter}
            center={center}
            distance={distance}
            setDistance={setDistance}
          />
          <SearchInput
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          {loadingVendorList ? 
          <Fragment>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </Fragment>
          :
          <VendorsList
            dishId={dishId}
            setDishId={setDishId}
            filteredList={filteredList}
            dishDetails={dishDetails}
            searchValue={searchValue}
          />}
        </Grid>
      </Grid>
      <DishModal dishId={dishId} open={open} setOpen={setOpen} />
    </Box>
  );
};

export default Browse;
