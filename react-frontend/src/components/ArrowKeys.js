// ArrowKeys.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Grid, Box } from "@mui/material";
import UpArrowIcon from "../icons/UpArrowIcon";
import DownArrowIcon from "../icons/DownArrowIcon";
import RightArrowIcon from "../icons/RightArrowIcon.js";
import LeftArrowIcon from "../icons/LeftArrowIcon";

export default function ArrowKeys({ updateLog, isConnected }) {
  const [highlightedKey, setHighlightedKey] = useState(null);
  const [arrowSize, setArrowSize] = useState(24);

  // Make size of arrows dynamic
  useEffect(() => {
    const handleResize = () => {
      const widthSize = Math.max(24, Math.min(window.innerWidth / 15, 100));
      const heightSize = Math.max(24, Math.min(window.innerHeight / 7, 100));

      if (heightSize < widthSize) {
        setArrowSize(heightSize);
      } else {
        setArrowSize(widthSize);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = async (event) => {
      let direction = null;

      switch (event.key) {
        case "ArrowUp":
        case "ArrowDown":
        case "ArrowLeft":
        case "ArrowRight":
          direction = event.key;
          break;
        case " ":
          direction = "Stop";
          break;
        default:
          break;
      }

      setHighlightedKey(direction);

      if (direction !== null) {
        if (isConnected) {
          try {
            const response = await axios.post("/api/arrow-keys", {
              direction,
            });
            updateLog(response.data.message);
          } catch (error) {
            console.error("Error making request:", error);
          }
        } else {
          alert("Rover not connected.");
        }
      }
    };

    const handleKeyUp = () => {
      setHighlightedKey(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [updateLog, isConnected]);

  // Arrow Button Feedback
  const ArrowButton = ({ direction, highlightedKey }) => (
    <Grid item>
      <div
        style={{
          background: highlightedKey === direction ? "#FD7F20" : "transparent",
        }}
      >
        {direction === "ArrowUp" && <UpArrowIcon size={arrowSize} />}
        {direction === "ArrowLeft" && <LeftArrowIcon size={arrowSize} />}
        {direction === "ArrowDown" && <DownArrowIcon size={arrowSize} />}
        {direction === "ArrowRight" && <RightArrowIcon size={arrowSize} />}
      </div>
    </Grid>
  );

  return (
    <Box
      style={{
        height: "300px",
        backgroundColor: "#537072",
        borderRadius: "5px",
        color: "white",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
        Rover Control
      </Typography>

      <Grid container spacing={1} justifyContent={"center"}>
        <ArrowButton direction="ArrowUp" highlightedKey={highlightedKey} />
      </Grid>
      <Grid container spacing={1} justifyContent={"center"}>
        <ArrowButton direction="ArrowLeft" highlightedKey={highlightedKey} />
        <ArrowButton direction="ArrowDown" highlightedKey={highlightedKey} />
        <ArrowButton direction="ArrowRight" highlightedKey={highlightedKey} />
      </Grid>
    </Box>
  );
}
