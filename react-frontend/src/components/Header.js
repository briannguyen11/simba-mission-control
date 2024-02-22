// Header.js

import React, { useState } from "react";
import axios from "axios";

import { Button, Typography, TextField, Grid, Box } from "@mui/material";

const inputLabelStyle = {
  color: "white",
};

const inputStyle = {
  color: "white",
  marginRight: "5px",
};

const outlinedInputStyle = {
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "white",
  },
  "& input": {
    color: "white",
  },
};

export default function Header({ updateLog, isConnected, setIsConnected }) {
  const [connectionData, setConnectionData] = useState({
    ip: "",
    port: "",
  });

  // validates input is number
  const isNumber = (value) => !isNaN(parseFloat(value)) && isFinite(value);

  // update text field data
  function handleChange(event) {
    const { name, value } = event.target;
    setConnectionData({ ...connectionData, [name]: value });
  }

  // connect to tover
  const sendConnectRequest = async () => {
    const { port } = connectionData;
    if (isConnected === false) {
      if (isNumber(port)) {
        try {
          const response = await axios.post("/api/connect", connectionData);
          if (response && response.status === 200) {
            setIsConnected(true);
            updateLog(response.data.message);
          } else {
            alert("Failed to connect to rover with given input.");
          }
        } catch (error) {
          console.log(error);
          alert("Error connecting to rover");
        }
      } else {
        alert("Invalid input. Port must be a number.");
      }
    }
  };

  // disconnect from rover
  const sendDisconnectRequest = async () => {
    if (isConnected === true) {
      try {
        const response = await axios.post("/api/disconnect");
        if (response.data.message === "Success") {
          setIsConnected(false);
          setConnectionData({ ip: "", port: "" });
        }
      } catch (error) {
        console.error("Error disconnecting to rover:", error);
      }
    } else {
      alert("Rover already disconnected.");
    }
  };

  return (
    <Box
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        border: "1px solid white",
        borderRadius: "5px",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={7} sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ marginLeft: "10px" }} variant="h6">
            SIMBA Mission Control
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Box style={{ display: "flex", justifyContent: "flex-end" }}>
            <TextField
              id="ip"
              name="ip"
              label="IP address"
              size="small"
              variant="outlined"
              value={connectionData.ip}
              onChange={handleChange}
              InputLabelProps={{
                style: inputLabelStyle,
              }}
              InputProps={{
                style: inputStyle,
                sx: outlinedInputStyle,
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
                style: inputLabelStyle,
              }}
              InputProps={{
                style: inputStyle,
                sx: outlinedInputStyle,
              }}
            />

            <Button
              variant="contained"
              onClick={sendConnectRequest}
              style={{
                backgroundColor: isConnected ? "green" : "#FD7F20",
                color: "white",
                marginRight: "10px",
              }}
            >
              {isConnected ? "Connected" : "Connect"}
            </Button>
            {isConnected && (
              <Button
                variant="contained"
                onClick={sendDisconnectRequest}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  marginLeft: "5px",
                  marginRight: "10px",
                }}
              >
                Disconnect
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
