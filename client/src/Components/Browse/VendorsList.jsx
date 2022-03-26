import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Box, Card, CardActionArea } from "@mui/material";

import HeartRating from "./HeartRating";
import getFormattedCurrency from "../../Helpers/getFormattedCurrency";

const VendorsList = (props) => {
  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(() => {
    setSelectionModel([props.dishId]);
  }, [props.dishId]);

  let rows = [...props.filteredList];

  if (props.filteredList.length && props.filteredList[0].reviews) {
    rows = props.filteredList.map((item) => {
      const { average_rating, title, id, price_cents, country_style } = item;
      const rowObj = {
        id: id,
        col1: title,
        col2: country_style,
        col3: price_cents,
        col4: average_rating,
      };

      return rowObj;
    });
  }

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
      field: "col1",
      headerName: "Dish",
      minWidth: 200,
      renderCell: ({ value }) => (
        <Typography
          onClick={() => props.dishDetails(getId(value, props.filteredList))}
          onMouseOver={() => props.setDishId(getId(value, props.filteredList))}
          onMouseOut={() => props.setDishId(null)}
        >
          {value}
        </Typography>
      ),
    },
    { field: "col2", flex: 1, headerName: "Style", width: 100 },
    {
      field: "col3",
      flex: 1,
      headerName: "Price",
      width: 100,
      renderCell: ({ value }) => (
        <Typography>{getFormattedCurrency(value)}</Typography>
      ),
    },
    {
      field: "col4",
      flex: 1,
      headerName: "Rating",
      width: 150,
      renderCell: ({ value }) => <HeartRating rating={value} />,
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <DataGrid
        selectionModel={selectionModel}
        rows={rows}
        columns={columns}
        sx={{ borderColor: "primary.main", backgroundColor: "info.main" }}
        style={{ minHeight: "55vh", width: 548 }}
      />
    </Box>
  );
};

export default VendorsList;
