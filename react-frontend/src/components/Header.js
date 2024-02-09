import React, { useState } from "react";
import axios from "axios";
import { Button, Typography, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

function Header() {
  const [connectionData, setConnectionData] = useState({
    ip: "",
    port: "",
  });
  const [isConnected, setIsConnected] = useState(false);
  const isNumber = (value) => !isNaN(parseFloat(value)) && isFinite(value);

  function handleChange(event) {
    const { name, value } = event.target;
    setConnectionData({ ...connectionData, [name]: value });
  }

  const sendConnectRequest = async () => {
    const { port } = connectionData;
    if (isConnected === false) {
      if (isNumber(port)) {
        try {
          const response = await axios.post("/api/connect", connectionData);
          if (response.data.message === "Success") {
            setIsConnected(true);
          }
        } catch (error) {
          console.error("Error connecting to rover:", error);
        }
      } else {
        window.alert("Invalid input. Port must be a number.");
      }
    }
  };

  const sendDisconnectRequest = async () => {
    try {
      const response = await axios.post("/api/disconnect");
      if (response.data.message === "Success") {
        setIsConnected(false);
        setConnectionData({ ip: "", port: "" });
      }
    } catch (error) {
      console.error("Error disconnecting to rover:", error);
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
        <Grid xs={7} sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">SIMBA Mission Control</Typography>
        </Grid>
        <Grid xs={5}>
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
              onClick={sendConnectRequest}
              style={{
                backgroundColor: isConnected ? "green" : "#FD7F20",
                color: "white",
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
                }}
              >
                Disconnect
              </Button>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Header;
