import React, { useEffect } from "react";
import { Typography, Box, Button, Slider } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";

const PrettoSlider = styled(Slider)({
  color: "#52af77",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const SearchByDistance = (props) => {
  const userLocation = props.center;

  const encodeMapCoord = (mapCoord) => {
    const allCoordsString = encodeURIComponent(
      `${mapCoord.location.lat},${mapCoord.location.lng}`
    );
    return allCoordsString;
  };

  const getAllDistances = (mapCoords) => {
    const newMapCoordsObj = [...mapCoords];

    for (const obj in newMapCoordsObj) {
      const coordsString = encodeMapCoord(newMapCoordsObj[obj]);
      axios
        .get(
          `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${userLocation.lat}%2C${userLocation.lng}&destinations=${coordsString}&key=${process.env.REACT_APP_GMAPS_APIKEY}`
        )
        .then(({ data }) => {
          newMapCoordsObj[obj].duration = data.rows[0].elements[0].duration;
        });
    }

    return newMapCoordsObj;
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getAllDistances(props.dishesInfo);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [props.dishesInfo.length, props.center]);

  return (
    <Box>
      <Button
        onClick={() => props.setCenter({ lat: 50.102214, lng: -119.397488 })}
      >
        Find My Location
      </Button>
      <Typography gutterBottom>
        How far are you willing to travel?{" "}
        <strong>{`${props.distance} minutes`}</strong>
      </Typography>
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        value={props.distance}
        onChange={(e) => props.setDistance(e.target.value)}
        max={60}
      />
    </Box>
  );
};

export default SearchByDistance;
