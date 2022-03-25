import React, { useEffect } from "react";
import { Typography, Box, Button, Slider } from "@mui/material";
import axios from "axios";

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
      <Slider
        aria-label="custom thumb label"
        value={props.distance}
        onChange={(e) => props.setDistance(e.target.value)}
        max={60}
      />
    </Box>
  );
};

export default SearchByDistance;
