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
    color: "#ff3d47",
  },
});

export default function CustomizedRating(props) {
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <StyledRating
        name="customized-color"
        getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
        value={props.starRating}
        // set minimum value
        onChange={(event, starRating) => {
          props.setStarRating(starRating ? starRating : 1);
        }}
        precision={1}
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
      />
    </Box>
  );
}
