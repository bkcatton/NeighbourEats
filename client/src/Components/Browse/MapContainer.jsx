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
  const locations = props.mapCoords;
  const [selected, setSelected] = useState({});
  console.log(selected);
  const onSelect = item => {
    setSelected(item);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDhp8LqdW-X8POJhX8QFV-ERtVBLr0ujZo">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
        return (
        <Fragment>
          {locations.map(item => {
            return (
              <Marker
                key={item.name}
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
