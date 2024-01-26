import React, { useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";

function MapContainer() {
  const mapStyles = {
    height: "100%",
    width: "100%",
    borderRadius: "5px",
  };

  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey,
    version: "weekly", // Specify the version of Google Maps API
    scriptLoading: "async", // Load the script asynchronously
  });

  useEffect(() => {
    const defaultCenter = {
      lat: 35.305,
      lng: -120.6625,
    };

    const redMarkerIcon = {
      url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      scaledSize: { width: 30, height: 30 },
    };

    if (isLoaded) {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: defaultCenter,
        zoom: 15,
      });

      new window.google.maps.Marker({
        position: defaultCenter,
        map,
        icon: redMarkerIcon,
      });
    }
  }, [isLoaded]);

  if (loadError) return "Error loading Google Maps";
  if (!isLoaded) return "Loading...";

  return <div id="map" style={mapStyles}></div>;
}

export default MapContainer;
