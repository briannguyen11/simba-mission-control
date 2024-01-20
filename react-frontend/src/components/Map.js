import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

function MapContainer() {
  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 35.270378,
    lng: -120.680656,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBZ5fLby5ja0TPkDe95jGOyKkIOHLLhweA">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={8}
        center={defaultCenter}
      />
    </LoadScript>
  );
}

export default MapContainer;
