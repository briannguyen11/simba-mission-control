import React, { useState } from "react";
import axios from "axios";
import { Button, Typography, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

function Header() {
  const [connectionData, setConnectionData] = useState({
    ip: "",
    port: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setConnectionData({ ...connectionData, [name]: value });
  }

  const sendConnectionRequest = async () => {
    try {
      const response = await axios.post("/api/connect", connectionData);
      console.log(response.data);
    } catch (error) {
      console.error("Error sending route plan to backend:", error);
    }
  };

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
        <Grid item xs={8} sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">SIMBA Mission Control</Typography>
        </Grid>
        <Grid item xs={4}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <TextField
              id="ip"
              name="ip"
              label="IP address"
              size="small"
              variant="outlined"
              value={connectionData.ip}
              onChange={handleChange}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
              InputProps={{
                sx: {
                  color: "white",
                  marginRight: "5px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "& input": {
                    color: "white",
                  },
                },
              }}
            />

            <TextField
              id="port"
              name="port"
              label="Port"
              size="small"
              variant="outlined"
              value={connectionData.port}
              onChange={handleChange}
              InputLabelProps={{
                style: {
                  color: "white",
                },
              }}
              InputProps={{
                sx: {
                  color: "white",
                  marginRight: "5px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "& input": {
                    color: "white",
                  },
                },
              }}
            />

            <Button
              variant="contained"
              onClick={sendConnectionRequest}
              style={{ backgroundColor: "#FD7F20", color: "white" }}
            >
              Connect
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Header;
