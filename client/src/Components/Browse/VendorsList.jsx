import React from 'react';
import { Link } from 'react-router-dom';

const VendorsList = props => {
  // addresses, dishes, setDishId

  // const addressList = props.addresses.map(item => {
  //   const {id, street_name} = item;

  //   return <li key={id}>{street_name}</li>
  // })

  // const dishesList = props.dishes.map(item => {
  //   const {id, title} = item;

  //   return <li key={id} onClick={() => props.setDishId(id)}>
  //     <Link to={`${id}`} >{title}</Link>
  //   </li>
  // })

  return (
    <div>
      VendorsList
      {/* <ul>{addressList}</ul>
      <ul>{dishesList}</ul> */}
    </div>
  );
};

export default VendorsList;
