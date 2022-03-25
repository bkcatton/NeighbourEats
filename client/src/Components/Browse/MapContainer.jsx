import React, { Fragment, useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import getCountryCode from '../../Helpers/getCountryCode';

import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

function MapContainer(props) {
  const [selected, setSelected] = useState({});
  let locations = [...props.filteredList];

  // watch for dishId to change, set the selected value (for the info window) based on dish id
  useEffect(() => {
    setSelected({});

    if (locations.length && props.dishId) {
      for (const location of locations) {
        if (location.id === props.dishId) {
          setSelected(location);
        }
      }
    }
  }, [props.dishId]);
  
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GMAPS_APIKEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={props.center}
        zoom={14}
        options={{ mapId: '2498605d98cd98cd' }}
      >
        <Fragment>
          {locations.map((item, i) => {
            const countryCode = getCountryCode(item.country_style);
            const flag = `https://flagcdn.com/28x21/${countryCode}.png`;

            return (
              <Marker
                icon={flag}
                key={i}
                position={item.location}
                // highlight the corresponding row in the datagrid table
                onMouseOver={() => {
                  setSelected(item);
                  props.setDishId(item.id);
                }}
                // open the modal window for each dish
                onClick={() => props.dishDetails(item.id)}
                onMouseOut={() => {
                  setSelected({});
                  props.setDishId(null);
                }}
              />
            );
          })}
          {props.center && <Marker position={props.center}/>}
          {selected.location && (
            <InfoWindow
              position={selected.location}
              options={{ pixelOffset: new window.google.maps.Size(0, -30) }}
            >
              <Typography>{selected.title}</Typography>
            </InfoWindow>
          )}
        </Fragment>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MapContainer);
