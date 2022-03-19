import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapContainer from './MapContainer';
import VendorsList from './VendorsList';
import Search from './Search';

const Browse = () => {
  const [dishesInfo, setDishesInfo] = useState([]);
  const [dishesReviews, setDishesReviews] = useState([]);
  const [dishesRatings, setDishesRatings] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  
//   console.log(typeof searchValue)

//  const filteredDishes = dishesRatings;
  
//   useEffect(() => {
//     //  (new RegExp('word')).test(str)
//     const filteredDishesRatings = filteredDishes.filter(item => item.title.includes(searchValue))
    
//     setDishesRatings(filteredDishesRatings)
//     console.log("this is the dishesRatings", dishesRatings)
//   }, [searchValue])

  const [mapCoords, setMapCoords] = useState([]);
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8080/api/dishes/information'),
      axios.get('http://localhost:8080/api/dishes/reviews'),
      axios.get('http://localhost:8080/api/dishes/ratings'),
    ]).then(all => {
      setDishesInfo(all[0].data);
      setDishesReviews(all[1].data);
      setDishesRatings(all[2].data);
    });
  }, []);

  useEffect(() => {
    if (!dishesReviews.length || !dishesInfo.length) return;

    const getCoordinates = dishItem => {
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
          const title = dishItem.title;
          const image_link = dishItem.image_link;
          setMapCoords(prev => [...prev, { name, title, image_link, location }]);
        });
    };

    const dishItems = dishesInfo.map(item => {
      item.reviews = [];

      for (const review of dishesReviews) {
        if (review.dish_id === item.id) {
          item.reviews.push(review);
        }
      }

      return item;
    });

    dishItems.forEach(item => getCoordinates(item));
  }, [dishesReviews.length, dishesInfo.length]);

  return (
    <div>
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <MapContainer mapCoords={mapCoords} />
      <VendorsList dishesRatings={dishesRatings} searchValue={searchValue}/>
    </div>
  );
};

export default Browse;
