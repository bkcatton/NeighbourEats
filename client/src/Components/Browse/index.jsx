import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapContainer from './MapContainer';
import VendorsList from './VendorsList';

const Browse = () => {
  const [info, setInfo] = useState([]);
  const [allReviews, setAllReviews] = useState([]);

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

  const infoReviews = info.map(item => {
    item.reviews = [];

    for (const review of allReviews) {
      if (review.dish_id === item.id) {
        item.reviews.push(review);
      }
    }

    return item;
  });
  console.log(infoReviews);

  return (
    <div>
      <MapContainer />
      <VendorsList />
    </div>
  );
};

export default Browse;
