import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import HeartRating from './HeartRating';
import getFormattedCurrency from '../../Helpers/getFormattedCurrency';

const VendorsList = props => {
  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(() => {
    setSelectionModel([props.dishId]);
  }, [props.dishId]);

  // filter search results only if user is actively searching
  let filteredList = [...props.dishesRatings];
  if (props.searchValue) {
    filteredList = props.dishesRatings.filter(item => {
      const title = item.title.toLowerCase();
      const searchValue = props.searchValue.toLowerCase();
      return title.includes(searchValue);
    });
  }

  const rows = filteredList.map(item => {
    const { average_rating, title, id, price_cents, country_style } = item;
    const rowObj = {
      id: id,
      col1: title,
      col2: country_style,
      col3: price_cents,
      col4: average_rating || 0,
    };
    return rowObj;
  });

  // gets title into render cell for each item in the datagrid
  const getId = (title, arr) => {
    for (const obj of arr) {
      if (obj.title === title) {
        return obj.id;
      }
    }
  };


  const columns = [
    {
      field: 'col1',
      headerName: 'Dish',
      minWidth: 200,
      renderCell: ({ value }) => (
        <Typography
          onClick={() => props.dishDetails(getId(value, filteredList))}
          onMouseOver={() => props.setDishId(getId(value, filteredList))}
          onMouseOut={() => props.setDishId(null)}
        >
          { value }
        </Typography>
      ),
    },
    { field: 'col2', flex: 1, headerName: 'Style', width: 100 },
    { field: 'col3', 
      flex: 1, 
      headerName: 'Price', 
      width: 100,
      renderCell: ({value}) => (
        <Typography> 
          {getFormattedCurrency(value)}
        </Typography>

      ),
    },
    {
      field: 'col4',
      flex: 1,
      headerName: 'Rating',
      width: 150,
      renderCell: ({ value }) => <HeartRating rating={value} />,
    },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <DataGrid
        selectionModel={selectionModel}
        rows={rows}
        columns={columns}
        style={{ minHeight: '50vh', width: 548 }}
      />
    </Box>
  );
};

export default VendorsList;
