import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

import ArrowKeys from "./components/ArrowKeys";
import RoutePlanner from "./components/RoutePlanner";
import MapContainer from "./components/Map";
import LogContainer from "./components/Log";

function App() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "#0f1114",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const [directionLog, setDirectionLog] = useState("");
  const handleDirectionChange = (direction) => {
    setDirectionLog(direction);
  };

  return (
    <div
      className="container"
      style={{ backgroundColor: "#0f1114", minHeight: "100vh" }}
    >
      <Box sx={{ flexGrow: 1, marginLeft: "20px", marginRight: "20px" }}>
        {/* Header Row */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper>
              {/* Content for xs=12 */}
              <Item>xs=12</Item>
            </Paper>
          </Grid>

          {/* Log Column */}
          <Grid item xs={4}>
            <LogContainer direction={directionLog} />
          </Grid>

          <Grid container xs={8} spacing={2}>
            {/* Google Maps */}
            <Grid item xs={12}>
              <MapContainer />
            </Grid>
            {/* Route Input */}
            <Grid item xs={8}>
              <RoutePlanner />
            </Grid>

            {/* Manual Controls */}
            <Grid item xs={4}>
              <ArrowKeys onDirectionChange={handleDirectionChange} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
