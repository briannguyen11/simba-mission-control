// UserInput.js

import React, { useState } from "react";
import axios from "axios";
import { Typography, Button, TextField, Grid, Box } from "@mui/material";

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

export default function UserInput({ updateLog, setRouteData, isConnected }) {
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
  });

  const [motorSpeed, setMotorSpeed] = useState("");
  const [motorDist, setMotorDist] = useState("");
  const [pickupDone, setPickupDone] = useState(true);

  const isNumber = (value) => !isNaN(parseFloat(value)) && isFinite(value);

  function handleChange(event) {
    const { name, value } = event.target;
    setLocation({ ...location, [name]: value });
  }

  const addRouteData = () => {
    if (isNumber(location.latitude) && isNumber(location.longitude)) {
      setRouteData((prevData) => [...prevData, location]);
    } else {
      alert("Invalid input. Latitude and longitude must be valid numbers.");
    }
    setLocation({ latitude: "", longitude: "" });
  };

  const sendMotorSpeed = async () => {
    if (isConnected) {
      if (isNumber(motorSpeed)) {
        try {
          const response = await axios.post("/api/motor-speed", {
            motorSpeed: motorSpeed,
          });
          if (response.status === 200) {
            updateLog(response.data.message);
            setMotorSpeed("");
          }
        } catch (error) {
          console.error("Error sending motor speed", error);
        }
      } else {
        alert("Motor speed must be a number.");
      }
    } else {
      alert("Rover not connected.");
    }
  };

  const sendMotorDist = async () => {
    if (isConnected) {
      if (isNumber(motorDist)) {
        try {
          const response = await axios.post("/api/motor-dist", {
            motorDist: motorDist,
          });
          if (response.status === 200) {
            updateLog(response.data.message);
            setMotorDist("");
          }
        } catch (error) {
          console.error("Error sending motor speed", error);
        }
      } else {
        alert("Motor distance must be a number.");
      }
    } else {
      alert("Rover not connected.");
    }
  };

  let inProgCount;
  let armPickupInterval;
  const sendStartArm = async () => {
    if (isConnected) {
      try {
        const response = await axios.post("/api/start-pickup");
        if (response.data.message === "started pickup") {
          updateLog("Pickup sequence: Started");
          setPickupDone(false);
          inProgCount = 0;
          // start interval to check arm pickup status every 3 seconds
          armPickupInterval = setInterval(checkPickupStatus, 3000);
        }
      } catch (error) {
        console.error("Error starting arm pickup sequence:", error);
      }
    } else {
      alert("Rover already disconnected.");
    }
  };

  const checkPickupStatus = async () => {
    try {
      const response = await axios.get("/api/pickup-status");
      if (response.data.message === "True") {
        updateLog("Pickup sequence: Completed");
        setPickupDone(true);
        inProgCount = 0;
        // stop further interval checks if the sequence is completed
        clearInterval(armPickupInterval);
      } else {
        // arm pickup sequence is still in progress
        inProgCount += 1;
        updateLog(`Pickup sequence: In Progress [${inProgCount}]`);
      }
    } catch (error) {
      console.error("Error checking arm pickup status:", error);
    }
  };

  return (
    <Box
      style={{
        height: "300px",
        backgroundColor: "#537072",
        borderRadius: "5px",
        color: "white",
        padding: "10px",
      }}
    >
      <Grid container item xs={12}>
        <Grid item xs={6}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
            User Input
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            {isConnected && (
              <Button
                variant="contained"
                onClick={sendStartArm}
                style={{
                  height: "30px",
                  backgroundColor: pickupDone ? "#FD7F20" : "grey",
                  color: "white",
                }}
                disabled={!pickupDone}
              >
                Begin Pickup Sequence
              </Button>
            )}
          </div>
        </Grid>
      </Grid>

      <Typography sx={{ mb: 1, font: "10px" }}>Set Motor Speed</Typography>
      <Grid container spacing={1} alignItems={"center"} marginBottom={"10px"}>
        <Grid item xs={12} sm={10}>
          <TextField
            id="motor-speed"
            name="motor-speed"
            label="Motor Speed"
            size="small"
            variant="outlined"
            value={motorSpeed}
            onChange={(e) => setMotorSpeed(e.target.value)}
            fullWidth
            InputLabelProps={{
              style: inputLabelStyle,
            }}
            InputProps={{
              style: inputStyle,
              sx: outlinedInputStyle,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            variant="contained"
            onClick={sendMotorSpeed}
            fullWidth
            style={{ color: "black", backgroundColor: "white" }}
          >
            Send
          </Button>
        </Grid>
      </Grid>

      <Typography sx={{ mb: 1, font: "10px" }}>Set Motor Distance</Typography>
      <Grid container spacing={1} alignItems={"center"} marginBottom={"10px"}>
        <Grid item xs={12} sm={10}>
          <TextField
            id="motor-dist"
            name="motor-dist"
            label="Motor Distance"
            size="small"
            variant="outlined"
            value={motorDist}
            onChange={(e) => setMotorDist(e.target.value)}
            fullWidth
            InputLabelProps={{
              style: inputLabelStyle,
            }}
            InputProps={{
              style: inputStyle,
              sx: outlinedInputStyle,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            variant="contained"
            onClick={sendMotorDist}
            fullWidth
            style={{ color: "black", backgroundColor: "white" }}
          >
            Send
          </Button>
        </Grid>
      </Grid>

      <Typography sx={{ mb: 1, font: "10px" }}>Add Coordinates</Typography>
      <Grid container spacing={1} alignItems={"center"} marginBottom={"10px"}>
        <Grid item xs={12} sm={5}>
          <TextField
            id="latitude"
            name="latitude"
            label="Latitude"
            size="small"
            variant="outlined"
            value={location.latitude}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              style: inputLabelStyle,
            }}
            InputProps={{
              style: inputStyle,
              sx: outlinedInputStyle,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            id="longitude"
            name="longitude"
            label="Longitude"
            size="small"
            variant="outlined"
            value={location.longitude}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{
              style: inputLabelStyle,
            }}
            InputProps={{
              style: inputStyle,
              sx: outlinedInputStyle,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            variant="contained"
            onClick={addRouteData}
            fullWidth
            style={{ color: "black", backgroundColor: "white" }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
