import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Rating } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#f00",
  },
});

/*
props passed down: 
rating passed from browse/index to render ratings
*/
export default function HeartRating(props) {
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <StyledRating
        size="small"
        name="customized-color"
        value={+props.rating}
        getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
        precision={0.5}
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        readOnly
      />
    </Box>
  );
}
