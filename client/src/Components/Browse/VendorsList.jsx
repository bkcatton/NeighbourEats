import React from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import HeartRating from "./HeartRating"

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

  const rows = filteredList.map(item => {
    const {average_rating, id, price_cents, country_style} = item;
    const rowObj = {id: id, col1: id, col2: country_style, col3: price_cents, col4: average_rating};
    return rowObj;
  })

  const renderTitle = (id, arr) => {
    for (const obj of arr) {
      if (obj.id === id) {
        return obj.title
      }
    }
  }
  
  const columns = [
    { field: 'col1', 
      headerName: 'Dish', 
      width: 200,
      renderCell: ({id}) => (
        <Link component={Typography} style={{textDecoration: 'none'}} to={`dishes/details/${id}`}>{renderTitle(id, filteredList)}</Link>
      )
      },
    { field: 'col2', headerName: 'Country Style', width: 150 },
    { field: 'col3', headerName: 'Price', width: 150 },
    { field: 'col4', 
      headerName: 'Average Rating', 
      width: 150,
      renderCell: ({value}) => (
        <HeartRating averageRating={value} />
      ),
   }
  ];
  return (
    <div>
      <DataGrid rows={rows} columns={columns} style={{ height: 300, width: '100%' }}/>
    </div>
  );
};

export default VendorsList;