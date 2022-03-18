import React, { useEffect } from 'react';
import axios from 'axios';
import MapContainer from './MapContainer';
import VendorsList from './VendorsList';

const Browse = () => {
  useEffect(() => {
    axios
      .get('localhost:8080/api/browse')
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <MapContainer />
      <VendorsList />
    </div>
  );
};

export default Browse;
