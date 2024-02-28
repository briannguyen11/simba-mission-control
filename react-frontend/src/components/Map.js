// Map.js

import React, { useEffect, useCallback } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { Box } from "@mui/material";

export default function MapContainer({ routeData, setRouteData }) {
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey,
    version: "weekly", // Specify the version of Google Maps API
    scriptLoading: "async", // Load the script asynchronously
  });

  const handleSelectCoord = useCallback(
    (location) => {
      const newDest = {
        latitude: location.lat,
        longitude: location.lng,
      };
      setRouteData((prevData) => [...prevData, newDest]);
    },
    [setRouteData]
  );

  // Re-renders map if need to re-mount to DOM
  useEffect(() => {
    if (isLoaded) {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: {
          lat: routeData[0]?.latitude || 35.305523,
          lng: routeData[0]?.longitude || -120.664352,
        },
      });

      const redMarkerIcon = {
        url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        scaledSize: { width: 30, height: 30 },
      };

      routeData.forEach((coord) => {
        new window.google.maps.Marker({
          position: { lat: coord.latitude, lng: coord.longitude },
          map: map,
          icon: redMarkerIcon,
        });
      });

      if (routeData.length > 1) {
        const routePath = new window.google.maps.Polyline({
          path: routeData.map((coord) => ({
            lat: coord.latitude,
            lng: coord.longitude,
          })),
          geodesic: true,
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeWeight: 2,
        });

        routePath.setMap(map);
      }

      // Calculate bounds of all coordinates
      if (routeData.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        routeData.forEach((coord) => {
          bounds.extend(
            new window.google.maps.LatLng(coord.latitude, coord.longitude)
          );
        });

        // Adjust map viewport to fit the bounds
        const maxZoom = 17;
        map.fitBounds(bounds);
        const listener = window.google.maps.event.addListener(
          map,
          "idle",
          function () {
            if (map.getZoom() > maxZoom) map.setZoom(maxZoom);
            window.google.maps.event.removeListener(listener);
          }
        );
      }

      window.google.maps.event.addListener(map, "rightclick", (event) => {
        const clickedLatLng = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        handleSelectCoord(clickedLatLng);
      });
    }
  }, [isLoaded, handleSelectCoord, routeData]);

  if (loadError) return "Error loading Google Maps";
  if (!isLoaded) return "Loading...";

  return (
    <Box
      id="map"
      style={{ height: "620px", width: "100%", borderRadius: "5px" }}
    ></Box>
  );
}
