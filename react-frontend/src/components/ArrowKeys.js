// ArrowKeys.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Grid } from "@mui/material";
import UpArrowIcon from "../icons/UpArrowIcon";
import DownArrowIcon from "../icons/DownArrowIcon";
import RightArrowIcon from "../icons/RightArrowIcon.js";
import LeftArrowIcon from "../icons/LeftArrowIcon";

function ArrowKeys({ updateLog, isConnected }) {
  const [highlightedKey, setHighlightedKey] = useState(null);
  const [arrowSize, setArrowSize] = useState(24);

  // Make size of arrows dynamic
  useEffect(() => {
    const handleResize = () => {
      const widthSize = Math.max(24, Math.min(window.innerWidth / 15, 100));
      const heightSize = Math.max(24, Math.min(window.innerHeight / 10, 100));

      if (heightSize < widthSize) {
        setArrowSize(heightSize);
      } else {
        setArrowSize(widthSize);
      }
    };

    // call the handleResize function initially and on window resize
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Hanlde pressing keys down
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

  return (
    <div
      style={{ height: "100%", border: "1px solid white", borderRadius: "5px" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px",
          color: "white",
        }}
      >
        <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
          Manual Control
        </Typography>

        <Grid container spacing={1}>
          <Grid>
            <div
              style={{
                background:
                  highlightedKey === "ArrowUp" ? "#0083ce" : "transparent",
              }}
            >
              <UpArrowIcon size={arrowSize} />
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid>
            <div
              style={{
                background:
                  highlightedKey === "ArrowLeft" ? "#0083ce" : "transparent",
              }}
            >
              <LeftArrowIcon size={arrowSize} />
            </div>
          </Grid>
          <Grid>
            <div
              style={{
                background:
                  highlightedKey === "ArrowDown" ? "#0083ce" : "transparent",
              }}
            >
              <DownArrowIcon size={arrowSize} />
            </div>
          </Grid>
          <Grid>
            <div
              style={{
                background:
                  highlightedKey === "ArrowRight" ? "#0083ce" : "transparent",
              }}
            >
              <RightArrowIcon size={arrowSize} />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default ArrowKeys;
