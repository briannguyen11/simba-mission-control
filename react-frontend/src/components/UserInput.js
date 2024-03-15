// UserInput.js

import React, { useState, useRef, useEffect, useCallback } from "react";
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
  const [inProgCount, setInProgCount] = useState(0);
  const prevButtonStates = useRef([]);
  const armPickupInterval = useRef(null);

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

  // let inProgCount;
  // let armPickupInterval;
  // const sendStartArm = async () => {
  //   if (isConnected) {
  //     try {
  //       const response = await axios.post("/api/start-pickup");
  //       if (response.data.message === "Started pickup") {
  //         updateLog("Pickup sequence: Started");
  //         setPickupDone(false);
  //         inProgCount = 0;
  //         // start interval to check arm pickup status every 3 seconds
  //         armPickupInterval = setInterval(checkPickupStatus, 3000);
  //       }
  //     } catch (error) {
  //       console.error("Error starting arm pickup sequence:", error);
  //     }
  //   } else {
  //     alert("Rover already disconnected.");
  //   }
  // };

  const checkPickupStatus = useCallback(async () => {
    try {
      const response = await axios.get("/api/pickup-status");
      if (response.data.message === "True") {
        updateLog("Pickup sequence: Completed");
        setPickupDone(true);
        setInProgCount(0);
        // stop further interval checks if the sequence is completed
        clearInterval(armPickupInterval.current);
      } else {
        // arm pickup sequence is still in progress
        setInProgCount((prevCount) => {
          console.log(prevCount); // debug ... just printing 0
          const newCount = prevCount + 1;
          updateLog(`Pickup sequence: In Progress [${newCount}]`);
          return newCount; // Return the updated value
        });
      }
    } catch (error) {
      console.error("Error checking arm pickup status:", error);
    }
  }, [updateLog]);

  // it's ok i will keep this code separate  not sure if it will work
  // thanks
  const sendStartArm = useCallback(async () => {
    if (isConnected) {
      try {
        const response = await axios.post("/api/start-pickup");
        if (response.data.message === "Started pickup") {
          updateLog("Pickup sequence: Started");
          setPickupDone(false);
          setInProgCount(0);
          // Start interval to check arm pickup status every 3 seconds
          armPickupInterval.current = setInterval(checkPickupStatus, 3000);
        }
      } catch (error) {
        console.error("Error starting arm pickup sequence:", error);
      }
    }
  }, [checkPickupStatus, isConnected, updateLog]);

  useEffect(() => {
    const handleGamepadConnection = (event) => {
      const gamepad = event.gamepad;
      console.log("Gamepad connected:", gamepad);
    };

    // Function to handle gamepad disconnection
    const handleGamepadDisconnection = (event) => {
      console.log("Gamepad disconnected:", event.gamepad);
    };
    window.addEventListener("gamepadconnected", handleGamepadConnection);
    window.addEventListener("gamepaddisconnected", handleGamepadDisconnection);

    return () => {
      window.removeEventListener("gamepadconnected", handleGamepadConnection);
      window.removeEventListener(
        "gamepaddisconnected",
        handleGamepadDisconnection
      );
    };
  }, []);

  useEffect(() => {
    // Function to check gamepad input
    const checkGamepadInput = () => {
      let gamepad = navigator.getGamepads()[0];
      if (!gamepad) return [];

      // Check D-PAD button presses
      const dPadButtons = {
        12: "ArrowUp",
        13: "ArrowDown",
        14: "ArrowLeft",
        15: "ArrowRight",
      };

      // Check A, X, B, Y button presses
      const actionButtons = {
        0: "A",
        2: "X",
        1: "B",
        3: "Y",
      };

      // Iterate through buttons and check their states
      gamepad.buttons.forEach((button, index) => {
        const prevButtonState = prevButtonStates.current[index];
        if (button.pressed && prevButtonState === false) {
          // Check D-PAD buttons
          if (dPadButtons[index] || actionButtons[index] === "A") {
            const direction =
              actionButtons[index] === "A" ? "Stop" : dPadButtons[index];
            if (isConnected) {
              axios
                .post("/api/arrow-keys", {
                  direction: direction,
                })
                .then((response) => {
                  updateLog(response.data.message);
                })
                .catch(() => {
                  alert("Rover not connected.");
                });
            }
            console.log("D-PAD Button Pressed:", direction, prevButtonState);
          } else if (actionButtons[index] === "Y") {
            // do arm stuff
            sendStartArm();
            console.log("Action Button Pressed:", actionButtons[index]);
          } else {
            console.log(index, button);
          }
        }
      });
      return gamepad.buttons;
    };

    const gameLoop = () => {
      let buttons = checkGamepadInput();
      buttons.length === 0 && console.log("bad");
      prevButtonStates.current = buttons.map((b) => b.pressed);
      requestAnimationFrame(gameLoop);
    };

    // const intervalId = setInterval(gameLoop, 100);
    // return () => clearInterval(intervalId);

    const animationFrameId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [prevButtonStates, isConnected, updateLog, sendStartArm]);

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
