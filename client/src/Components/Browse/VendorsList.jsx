import React from 'react';
import { Link } from 'react-router-dom';

const VendorsList = props => {
  // addresses, dishes, setDishId
  console.log("in vendors list", props)
  const addressList = props.dishesRatings.map(item => {
    const {average_rating, id, title} = item;

    return <li key={id}>
      <Link to={`/dishes/${id}`}>{title} {average_rating}</Link>
      </li>
  })

  

  return (
    <div>
      VendorsList
      {addressList}
    </div>
  );
};

export default VendorsList;
