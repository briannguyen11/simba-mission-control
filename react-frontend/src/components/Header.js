import React from "react";
import { Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

function Header({ onSendRoutePlan }) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        border: "1px solid white",
        borderRadius: "5px",
      }}
    >
      <Grid container spacing={2} xs={12}>
        <Grid item xs={9}>
          <Typography variant="h6">SIMBA Mission Control</Typography>
        </Grid>
        <Grid item xs={3}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              style={{ width: "100px", marginRight: "5px" }}
              onClick={onSendRoutePlan}
            >
              Run
            </Button>
            <Button
              variant="contained"
              style={{ width: "100px", backgroundColor: "red" }}
            >
              Stop
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Header;
