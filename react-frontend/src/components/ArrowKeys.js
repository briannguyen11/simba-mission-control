import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import UpArrowIcon from "../icons/UpArrowIcon";
import DownArrowIcon from "../icons/DownArrowIcon";
import RightArrowIcon from "../icons/RightArrowIcon.js";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import Grid from "@mui/material/Unstable_Grid2";

function ArrowKeys({ updateLog }) {
  const [highlightedKey, setHighlightedKey] = useState(null);
  const [arrowSize, setArrowSize] = useState(24);

  // Make size of arrows dynamic
  useEffect(() => {
    const handleResize = () => {
      const newSize = Math.max(24, Math.min(window.innerWidth / 15, 100));
      setArrowSize(newSize);
    };

    // call the handleResize function initially and on window resize
    handleResize();
    window.addEventListener("resize", handleResize);

    // cleanup the event listener on component unmount
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

      // update log when arrow keys passed, not any key press
      if (direction != null) {
        updateLog(direction);
      }

      try {
        const response = await axios.post("/api/arrow-keys", {
          direction,
        });
        if (direction != null) {
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error making request:", error);
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
  }, [updateLog]);

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
          <Grid item>
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
          <Grid item>
            <div
              style={{
                background:
                  highlightedKey === "ArrowLeft" ? "#0083ce" : "transparent",
              }}
            >
              <LeftArrowIcon size={arrowSize} />
            </div>
          </Grid>
          <Grid item>
            <div
              style={{
                background:
                  highlightedKey === "ArrowDown" ? "#0083ce" : "transparent",
              }}
            >
              <DownArrowIcon size={arrowSize} />
            </div>
          </Grid>
          <Grid item>
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
