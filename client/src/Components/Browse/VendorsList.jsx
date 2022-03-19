import React from 'react';
import { Link } from 'react-router-dom';

const VendorsList = props => {
  
  // filter search results only if user is actively searching
  let filteredList = [...props.dishesRatings]
  if (props.searchValue) {
    filteredList = props.dishesRatings.filter(item => {
      const title = item.title.toLowerCase();
      const searchValue = props.searchValue.toLowerCase();
      return title.includes(searchValue)
    })
  }
  
  const addressList = filteredList.map(item => {
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
