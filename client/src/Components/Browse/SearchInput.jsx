import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import {  TextField, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';

const SearchInput = (props) => {

  return (
    <TextField
      fullWidth
      id="standard-bare"
      variant="outlined"
      placeholder="Find a dish!"
      value={props.searchValue}
      onChange={(e) => props.setSearchValue(e.target.value)}
      InputProps={{
        endAdornment: (
          <IconButton>
            <SearchOutlined />
          </IconButton>
        ),
      }}
    />
  )
}

export default SearchInput
