import React from 'react'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
// import { SearchOutlined } from '@material-ui/icons';

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 'auto'
}));

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
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
        ),
      }}
    />
  )
}

export default SearchInput
