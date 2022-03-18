import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 49.287800,
  lng: -123.113503
};

function MyComponent() {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDhp8LqdW-X8POJhX8QFV-ERtVBLr0ujZo"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MyComponent)