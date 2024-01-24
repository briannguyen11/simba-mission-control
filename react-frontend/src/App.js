import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

import Header from "./components/Header";
import LogContainer from "./components/Log";
import MapContainer from "./components/Map";
import ArrowKeys from "./components/ArrowKeys";
// import ArrowKeys from "./components/ArrowKeys";
// import RoutePlanner from "./components/RoutePlanner";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function App() {
  const [log, setLog] = useState([]);

  const updateLog = (input) => {
    const currentTime = new Date().getTime();
    const newLog = [...log, { time: currentTime, data: input }];
    setLog(newLog);
    console.log(log);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        margin: "20px",
      }}
    >
      <Grid container spacing={2}>
        <Grid xs={12} style={{ height: "7vh", backgroundColor: "red" }}>
          <Header />
        </Grid>
        <Grid xs={4} style={{ height: "60vh", backgroundColor: "green" }}>
          <LogContainer logData={log} />
        </Grid>
        <Grid xs={8} style={{ height: "60vh" }}>
          <MapContainer />
        </Grid>
        <Grid xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid xs={4} style={{ height: "30vh", backgroundColor: "blue" }}>
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
