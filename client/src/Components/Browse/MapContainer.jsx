import React, { Fragment, useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';

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

const center = {
  lat: 40.712776,
  lng: -74.005974,
};

function MapContainer(props) {
  let locations = [...props.mapCoords];

  // filters the pins on the map when a search is run
  if (props.searchValue) {
    locations = props.mapCoords.filter(item => {
      const title = item.title.toLowerCase();
      const searchValue = props.searchValue.toLowerCase();
      return title.includes(searchValue)
    })
  }
  
  const [selected, setSelected] = useState({});
  
  useEffect(() => {
    setSelected({});

    if (locations.length && props.selectionModel) {
      for (const location of locations) {
        if (location.id === props.selectionModel) {
          setSelected(location)
        }
      }
    };
  }, [props.selectionModel])

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GMAPS_APIKEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
        return (
        <Fragment>
          {locations.map((item, i) => {
              const image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
            return (
              <Marker
                icon={image}
                key={i}
                style={{margin: "20px", color: "pink"}}
                position={item.location}
                onMouseOver={() => {
                  setSelected(item)
                }}
                onMouseOut={() => setSelected({})}
              />
            );
          })}
          {selected.location && (
            <InfoWindow
              position={selected.location}
              options={{pixelOffset: new window.google.maps.Size(0,-30)}}
              // clickable={true}
              // onMouseOut={() => setSelected({})}
            >
              <Typography>
                {selected.title}
                
              </Typography>
            </InfoWindow>
          )}
        </Fragment>
        )
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MapContainer);
