import React from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: "auto",
  color: "info.main",
}));

const SearchInput = (props) => {
  return (
    <TextField
      fullWidth
      id="standard-bare"
      placeholder="Find a dish!"
      value={props.searchValue}
      onChange={(e) => props.setSearchValue(e.target.value)}
      sx={{ backgroundColor: "info.main", borderColor: "primary.main", mb: 2 }}
      InputProps={{
        endAdornment: (
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
        ),
      }}
    />
  );
};

export default SearchInput;
