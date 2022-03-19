import React, { useEffect } from 'react';
import axios from 'axios';
import MapContainer from './MapContainer';
import VendorsList from './VendorsList';

const Browse = () => {
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8080/api/browse'),
      axios.get('http://localhost:8080/api/browse'),
    ]).then(all => {
      console.log(all[0], all[1]);
    });

  }, []);

  return (
    <div>
      <MapContainer />
      <VendorsList />
    </div>
  );
};

export default Browse;
