import React from 'react';
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
  lat: 49.2878,
  lng: -123.113503,
};

function MapContainer(props) {
  const locations = props.mapCoords;

  return (
    <LoadScript googleMapsApiKey="AIzaSyDhp8LqdW-X8POJhX8QFV-ERtVBLr0ujZo">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
        {locations.map(item => {
          return <Marker key={item.name} position={item.location} />;
        })}
        <></>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MapContainer);
