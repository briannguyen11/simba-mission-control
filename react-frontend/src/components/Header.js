// Header.js

import React, { useRef, useState } from "react";
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
    // ip: "",
    // port: "",
    ip: "192.168.1.1",
    port: "6500",
  });
  const intervalId = useRef();

  // validates input is number 
  const isNumber = (value) => !isNaN(parseFloat(value)) && isFinite(value);

  // update text field data
  function handleChange(event) {
    const { name, value } = event.target;
    setConnectionData({ ...connectionData, [name]: value });
  }

  const checkConnectionStatus = async () => {
    try {
      // we don't want this to be called if we are not connected, this check if we are connected
      const response = await axios.get("/api/connection-status");
      const status = response.data.connection;
      if (status === true) {
        updateLog("Connected");
      } else {
        updateLog("Disconnected");
        alert("Disconnected from rover.");
        setIsConnected(false);
        intervalId.current && clearInterval(intervalId.current);
      }
    } catch (error) {
      console.error("Error checking connection status:", error);
    }
  };

  // connect to tover
  const sendConnectRequest = async () => {
    const { port } = connectionData;
    if (!isConnected) {
      if (isNumber(port)) {
        try {
          const response = await axios.post("/api/connect", connectionData);
          if (response && response.status === 200) {
            setIsConnected(true);
            intervalId.current = setInterval(checkConnectionStatus, 5000);
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
    if (isConnected) {
      try {
        const response = await axios.post("/api/disconnect");
        if (response.data.message === "Successfully disconnected") {
          setIsConnected(false);
          intervalId.current && clearInterval(intervalId.current);
          updateLog(response.data.message);
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
        height: "55px",
        backgroundColor: "#537072",
        borderRadius: "5px",
        color: "white",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={7} sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={process.env.PUBLIC_URL + "/images/simba-logo.png"}
            alt="Logo"
            style={{
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              marginRight: "15px",
              display: "flex",
              alignItems: "center",
              marginLeft: "10px",
              marginBottom: "5px",
            }}
          />
          <Typography sx={{ marginLeft: "5px" }} variant="h6">
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
