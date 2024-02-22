import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Header from "./components/Header";
import LogContainer from "./components/Log";
import MapContainer from "./components/Map";
import ArrowKeys from "./components/ArrowKeys";
import RouteForm from "./components/RouteForm";
import RouteTable from "./components/RouteTable";

function App() {
  const [log, setLog] = useState([]);
  const [routeData, setRouteData] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  // Log output
  const updateLog = (input) => {
    const currentTime = new Date().getTime();
    const newLog = [...log, { time: currentTime, data: input }];
    setLog(newLog);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={12} style={{ height: "7vh" }}>
          <Header
            updateLog={updateLog}
            isConnected={isConnected}
            setIsConnected={setIsConnected}
          />
        </Grid>
        <Grid item xs={4} style={{ height: "60vh" }}>
          <LogContainer logData={log} />
        </Grid>
        <Grid item xs={8} style={{ height: "60vh" }}>
          <MapContainer setRouteData={setRouteData} />
        </Grid>
        <Grid item xs={4}>
          <RouteForm setRouteData={setRouteData} />
        </Grid>
        <Grid item xs={5}>
          <RouteTable
            routeData={routeData}
            setRouteData={setRouteData}
            isConnected={isConnected}
          />
        </Grid>
        <Grid item xs={3} style={{ height: "30vh" }}>
          <ArrowKeys updateLog={updateLog} isConnected={isConnected} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
