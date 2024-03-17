import React, { useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Header from "./components/Header";
import LogContainer from "./components/Log";
import MapContainer from "./components/Map";
import ArrowKeys from "./components/ArrowKeys";
import UserInput from "./components/UserInput";
import RouteTable from "./components/RouteTable";

function App() {
  const [log, setLog] = useState([]);
  const [routeData, setRouteData] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  // Log output
  const updateLog = useCallback((input) => {
    const currentTime = new Date().getTime();
    setLog((oldLog) => [...oldLog, { time: currentTime, data: input }]);
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={12}>
          <Header
            updateLog={updateLog}
            isConnected={isConnected}
            setIsConnected={setIsConnected}
          />
        </Grid>
        <Grid item xs={4}>
          <LogContainer logData={log} />
        </Grid>
        <Grid item xs={8}>
          <MapContainer routeData={routeData} setRouteData={setRouteData} />
        </Grid>
        <Grid item xs={4}>
          <UserInput
            updateLog={updateLog}
            setRouteData={setRouteData}
            isConnected={isConnected}
          />
        </Grid>
        <Grid item xs={5}>
          <RouteTable
            routeData={routeData}
            setRouteData={setRouteData}
            isConnected={isConnected}
          />
        </Grid>
        <Grid item xs={3}>
          <ArrowKeys updateLog={updateLog} isConnected={isConnected} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
