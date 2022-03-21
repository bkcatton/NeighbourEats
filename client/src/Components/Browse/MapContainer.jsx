import React, { Fragment, useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const center = {
  lat: 40.712776,
  lng: -74.005974,
};

function MapContainer(props) {
  let locations = [...props.mapCoords];

  if (props.searchValue) {
    locations = props.mapCoords.filter(item => {
      const title = item.title.toLowerCase();
      const searchValue = props.searchValue.toLowerCase();
      return title.includes(searchValue)
    })
  }
  
  const [selected, setSelected] = useState({});
  const onSelect = item => {
    setSelected(item);
  };

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
                position={item.location}
                onClick={() => onSelect(item)}
              />
            );
          })}
          {selected.location && (
            <InfoWindow
              position={selected.location}
              clickable={true}
              onCloseClick={() => setSelected({})}
            >
              <p>
                {selected.title}
                <img
                  src={selected.image_link}
                  alt={selected.title}
                  style={{ maxWidth: '100px' }}
                />
              </p>
            </InfoWindow>
          )}
        </Fragment>
        )
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MapContainer);
