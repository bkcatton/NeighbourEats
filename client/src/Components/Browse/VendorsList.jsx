import React from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

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

  //console.log(typeof rows[0].col1)
  const renderTitle = (id, arr) => {
    for (const obj of arr) {
      if (obj.id === id) {
        return obj.title
      }
    }
  }
  // renderTitle(id, filteredList)
  
  const columns = [
    { field: 'col1', 
      headerName: 'Dish', 
      width: 200,
      renderCell: ({id}) => (
        <Link to={`dishes/details/${id}`}>{renderTitle(id, filteredList)}</Link>
      )
      },
    { field: 'col2', headerName: 'Country Style', width: 150 },
    { field: 'col3', headerName: 'Price', width: 150 },
    { field: 'col4', headerName: 'Average Rating', width: 150 },
  ];
  return (
    <div>
      <DataGrid rows={rows} columns={columns} style={{ height: 300, width: '100%' }}/>
    </div>
  );
};

export default VendorsList;

// const columns: ColDef[] = [
//   {
//     field: "id",
//     headerName: "ID",
//     width: 70
//   },
//   { field: "firstName", headerName: "First name", width: 130 },
//   { field: "lastName", headerName: "Last name", width: 130 },
//   {
//     field: "age",
//     headerName: "Age",
//     type: "number",
//     width: 90
//   },
//   {
//     field: "email",
//     headerName: "Email",
//     width: 300,
//     renderCell: (params) => (
//       <Link href={`mailto:${params.value}`}>{params.value!.toString()}</Link>
//     )
//   }
// ];

// const rows = [
//   {
//     id: 1,
//     lastName: "Snow",
//     firstName: "Jon",
//     age: 35,
//     email: "Snow@gmail.com"
//   },
//   {
//     id: 2,
//     lastName: "Lannister",
//     firstName: "Cersei",
//     age: 42,
//     email: "Lannister@gmail.com"
//   },
// ];