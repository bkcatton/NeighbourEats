import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapContainer from './MapContainer';
import VendorsList from './VendorsList';

const Browse = () => {
  const [info, setInfo] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [mapCoords, setMapCoords] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8080/api/dishes/information'),
      axios.get('http://localhost:8080/api/dishes/reviews'),
    ]).then(all => {
      // console.log(all[0], all[1]);
      setInfo(all[0].data);
      setAllReviews(all[1].data);
    });
  }, []);
  // https://maps.googleapis.com/maps/api/geocode/outputFormat?parameters
  //parameters address=24%20Sussex%20Drive%20Ottawa%20ON
  //outputformat = json

  //https://maps.googleapis.com/maps/api/geocode/json?address=${parameters}&key=AIzaSyDhp8LqdW-X8POJhX8QFV-ERtVBLr0ujZo

  useEffect(() => {
    if (!allReviews.length || !info.length) return;
    const getCoordinates = dishItem => {
      console.log(dishItem);
      const { street_number, street_name, city, state_code } = dishItem;

      const parameter = encodeURIComponent(
        `${street_number} ${street_name} ${city} ${state_code}`
      );

      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${parameter}&key=AIzaSyDhp8LqdW-X8POJhX8QFV-ERtVBLr0ujZo`
        )
        .then(response => {
          const location = response.data.results[0].geometry.location || {};
          const name = dishItem.street_name;
          setMapCoords(prev => [...prev, { name, location }]);
        });
    };
    // results.geometry.location
    const dishItems = info.map(item => {
      item.reviews = [];

      for (const review of allReviews) {
        if (review.dish_id === item.id) {
          item.reviews.push(review);
        }
      }

      return item;
    });

    dishItems.forEach(item => getCoordinates(item));
  }, [allReviews.length, info.length]);

  console.log('here are the mapcoords', mapCoords);

  return (
    <div>
      <MapContainer mapCoords={mapCoords} />
      <VendorsList />
    </div>
  );
};

export default Browse;
