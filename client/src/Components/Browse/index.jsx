import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Box } from "@mui/material";

import axiosConfig from "../../axiosConfig";
import getFilteredTitlesBySearch from "../../Helpers/getFilteredTitles";
import getFilteredTitlesByDistance from "../../Helpers/getFilteredTitlesByDistance";
import MapContainer from "./MapContainer";
import VendorsList from "./VendorsList";
import SearchInput from "./SearchInput";
import DishModal from "./DishModal";
import SearchByDistance from "./SearchByDistance";

const Browse = () => {
  const [dishId, setDishId] = useState(null);
  const [dishesInfo, setDishesInfo] = useState([]);
  const [dishesReviews, setDishesReviews] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [distance, setDistance] = useState(60);
  const [open, setOpen] = useState(false);

  // get map to start centered at this location
  const initialCenter = {
    lat: 40.712776,
    lng: -74.005974,
  };
  const [center, setCenter] = useState(initialCenter);

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

  // setting the modal dish id and opening the modal
  const dishDetails = (id) => {
    for (const item of dishesInfo) {
      if (item.id === id) {
        setDishId(id);
        setOpen(true);
      }
    }
  };

  useEffect(() => {
    if (!dishesReviews.length || !dishesInfo.length) return;

    // adding the reviews array and average rating to each dish
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

    // getting the geocoordinates back based on an inputed address
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

        const { location } = response.data.results[0].geometry;
        const dishesInfoClone = [...dishesInfo];
        for (const dish of dishesInfoClone) {
          if (dish.id === id) {
            dish.location = location;
          }
        }

        setDishesInfo(dishesInfoClone);
      } catch (error) {
        console.log("this is the error", error);
      }
    };

    // calling the function to get the geocoords for each address
    dishItemsWithReview.forEach((item) => {
      getCoordinatesForDishItem(item)
    });
  }, [dishesReviews.length, dishesInfo.length]);

  // filter search results
  let filteredList = [...dishesInfo];

  if (searchValue) {
    filteredList = getFilteredTitlesBySearch(searchValue, filteredList)
  }
  
  if (distance < 60) {
    filteredList = getFilteredTitlesByDistance(distance, filteredList)
  }

  return (
    <Box>
      <Grid
        container
        spacing={2}
        columnSpacing={{ md: 2 }}
        rowSpacing={{ md: 2 }}
        sx={{ mb: 2, mx: "auto" }}
      >
        <Grid item xs={12} md={6} sx={{ height: "52vh", width: "548" }}>
          <MapContainer
            center={center}
            setCenter={setCenter}
            dishId={dishId}
            setDishId={setDishId}
            filteredList={filteredList}
            dishDetails={dishDetails}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SearchInput
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <SearchByDistance
            dishesInfo={dishesInfo}
            setDishesInfo={setDishesInfo}
            setCenter={setCenter}
            center={center}
            distance={distance}
            setDistance={setDistance}
          />
          <VendorsList
            dishId={dishId}
            setDishId={setDishId}
            filteredList={filteredList}
            dishDetails={dishDetails}
            searchValue={searchValue}
          />
        </Grid>
      </Grid>
      <DishModal dishId={dishId} open={open} setOpen={setOpen} />
    </Box>
  );
};

export default Browse;
