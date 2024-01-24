import React, { useState } from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import RouteForm from "./RouteForm";
import RouteTable from "./RouteTable";

function RoutePlanner() {
  const [routeData, setRouteData] = useState([]);

  const handleSubmit = (location) => {
    const newRoute = {
      latitude: location.latitude,
      longitude: location.longitude,
    };

    setRouteData((prevData) => [...prevData, newRoute]);
  };

  const handleDelete = (index) => {
    setRouteData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "10px",
        color: "white",
      }}
    >
      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{ margin: "10px" }}
      >
        {/* Form component for user input */}
        <Grid item xs={12} md={4}>
          <RouteForm handleSubmit={handleSubmit} />
        </Grid>

        {/* Table component to display the array of routes */}
        <Grid item xs={12} md={8}>
          <RouteTable routeData={routeData} onDelete={handleDelete} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default RoutePlanner;
