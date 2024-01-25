import React, { useState } from "react";
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
    console.log(log);
  };

  // Route form submission
  const handleSubmit = (location) => {
    const newRoute = {
      latitude: location.latitude,
      longitude: location.longitude,
    };

    setRouteData((prevData) => [...prevData, newRoute]);
  };

  // Route table delete
  const handleDelete = (index) => {
    setRouteData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
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
          <Header />
        </Grid>
        <Grid xs={4} style={{ height: "60vh" }}>
          <LogContainer logData={log} />
        </Grid>
        <Grid xs={8} style={{ height: "60vh" }}>
          <MapContainer />
        </Grid>
        <Grid xs={4}>
          <RouteForm handleSubmit={handleSubmit} />
        </Grid>
        <Grid xs={4}>
          <RouteTable routeData={routeData} onDelete={handleDelete} />
        </Grid>
        <Grid xs={4} style={{ height: "30vh" }}>
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
