import React from "react";
// import dotenv from "dotenv";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

function MapContainer() {
  const mapStyles = {
    height: "100%",
    width: "100%",
    borderRadius: "5px",
  };

  const defaultCenter = {
    lat: 35.270378,
    lng: -120.680656,
  };

  const redMarkerIcon = {
    url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
    scaledSize: { width: 30, height: 30 },
  };

  // dotenv.config();
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap mapContainerStyle={mapStyles} zoom={15} center={defaultCenter}>
        <Marker position={defaultCenter} icon={redMarkerIcon} />
      </GoogleMap>
    </LoadScript>
  );
}

export default MapContainer;
