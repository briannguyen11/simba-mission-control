import React, { useState, useCallback } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

import Header from "./components/Header";
import LogContainer from "./components/Log";
import MapContainer from "./components/Map";
import ArrowKeys from "./components/ArrowKeys";
import RouteForm from "./components/RouteForm";
import RouteTable from "./components/RouteTable";

function App() {
  const [log, setLog] = useState([]);
  const [routeData, setRouteData] = useState([]);

  // Log output
  const updateLog = (input) => {
    const currentTime = new Date().getTime();
    const newLog = [...log, { time: currentTime, data: input }];
    setLog(newLog);
  };

  // Route form submission (validates coordinate input)
  const isNumber = (value) => !isNaN(parseFloat(value)) && isFinite(value);
  const handleSubmit = (location) => {
    const newDest = {
      latitude: location.latitude,
      longitude: location.longitude,
    };
    if (isNumber(location.latitude) && isNumber(location.longitude)) {
      setRouteData((prevData) => [...prevData, newDest]);
    } else {
      window.alert(
        "Invalid input. Latitude and longitude must be valid numbers."
      );
    }
  };

  // Map click-on location input
  const handleClick = useCallback(
    (location) => {
      const newDest = {
        latitude: location.lat,
        longitude: location.lng,
      };
      setRouteData((prevData) => [...prevData, newDest]);
    },
    [setRouteData]
  );

  // Route table delete
  const handleDelete = (index) => {
    setRouteData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };

  // Send route data to backend
  const sendRoutePlan = async () => {
    console.log("run pressed");
    try {
      const response = await axios.post("/api/route-plan", routeData);
      window.alert("Sent planned route.");
      console.log(response.data);
    } catch (error) {
      console.error("Error sending route plan to backend:", error);
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        margin: "20px",
      }}
    >
      <Grid container spacing={2}>
        <Grid xs={12} style={{ height: "7vh" }}>
          <Header onSendRoutePlan={sendRoutePlan} />
        </Grid>
        <Grid xs={4} style={{ height: "60vh" }}>
          <LogContainer logData={log} />
        </Grid>
        <Grid xs={8} style={{ height: "60vh" }}>
          <MapContainer handleClick={handleClick} />
        </Grid>
        <Grid xs={4}>
          <RouteForm handleSubmit={handleSubmit} />
        </Grid>
        <Grid xs={5}>
          <RouteTable routeData={routeData} onDelete={handleDelete} />
        </Grid>
        <Grid xs={3} style={{ height: "30vh" }}>
          <ArrowKeys updateLog={updateLog} />
        </Grid>
      </Grid>
    </Box>
    // <div>
    //   {/* Header Row */}
    //   <Grid container spacing={2}>
    //     <Grid item xs={12}>
    //       <Header />
    //     </Grid>

    //     {/* Log Column */}
    //     <Grid item xs={12} md={4}>
    //       <LogContainer direction={directionLog} style={{ height: "100%" }} />
    //     </Grid>

    //     {/* Google Maps */}
    //     <Grid item xs={12} md={8}>
    //       <MapContainer />
    //     </Grid>

    //     {/* Route Input */}
    //     <Grid item xs={12} md={8}>
    //       <RoutePlanner />
    //     </Grid>

    //     {/* Manual Controls */}
    //     <Grid item xs={12} md={4}>
    //       <ArrowKeys onDirectionChange={handleDirectionChange} />
    //     </Grid>
    //   </Grid>
    // </div>
  );
}

export default App;
