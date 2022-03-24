import React, {useEffect} from 'react'
import { Box, Button } from '@mui/material'
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import axios from 'axios'
import { loadingButtonClasses } from '@mui/lab/LoadingButton';

const PrettoSlider = styled(Slider)({
  color: '#52af77',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});

const SearchByDistance = props => {
const userLocation = { lat: 50.102214, lng: -119.397488 }
// // axios post to google maps api to get coords
// const getMyLocation = () => {
// // axios.post("https://www.googleapis.com/geolocation/v1/geolocate?key=")
// // .then(({ data }) => props.setUserLocation(JSON.stringify(data))
// //   )
//   props.setCenter({ lat: 50.102214, lng:-119.397488 })
// }
// encodeURIComponent(
//   `${street_number} ${street_name} ${city} ${state_code}`
// );

const encodeMapCoord = (mapCoord) => {
  const allCoordsString = encodeURIComponent(`${mapCoord.location.lat},${mapCoord.location.lng}`);
  return allCoordsString
}

const getAllDistances = (mapCoords) => {
  const newMapCoordsObj = [...mapCoords];
  
  for (const obj in newMapCoordsObj) {
    const coordsString = encodeMapCoord(newMapCoordsObj[obj]);
    axios.get(`
      https://maps.googleapis.com/maps/api/distancematrix/json?origins=${userLocation.lat}%2C${userLocation.lng}&destinations=${coordsString}&key=${process.env.REACT_APP_GMAPS_APIKEY}
      `)
      .then(({data}) => {
          newMapCoordsObj[obj].duration = data.rows[0].elements[0].duration 
        
      })
    }
  return newMapCoordsObj
}

useEffect(() => {
  const delayDebounceFn = setTimeout(() => {
    const newMapCoordsWithDuration = getAllDistances(props.mapCoords);
    props.setMapCoords(newMapCoordsWithDuration)
  }, 1000)

  return () => clearTimeout(delayDebounceFn)
}, [props.mapCoords.length])

// console.log("this is all of the returned distances", setTimeout(() =>  {
//   return getAllDistances(props.mapCoords)
// }, 4000));
// console.log("this is the map coords being sent into function", props.mapCoords);
  
  return (
    <Box>
      <Button onClick={() => props.setCenter(userLocation)}>Find My Location</Button>
      <input type="number" value={props.distance} onChange={(e) => props.setDistance(e.target.value)} />
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        // defaultValue={20}
        value={props.distance}
        onChange={(e) => props.setDistance(e.target.value)}
      />
    </Box>
  )
}

export default SearchByDistance

/* https://maps.googleapis.com/maps/api/distancematrix/json?origins=40.6655101,-73.89188969999998&destinations=40.659569,-73.933783|40.729029,-73.851524|40.6860072,-73.6334271|40.598566,-73.7527626&key=YOUR_API_KEY */