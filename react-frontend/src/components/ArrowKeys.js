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
        console.log(response.data);
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
                  highlightedKey === "ArrowUp" ? "#f5b301" : "transparent",
              }}
            >
              <UpArrowIcon size={100} />
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item>
            <div
              style={{
                background:
                  highlightedKey === "ArrowLeft" ? "#f5b301" : "transparent",
              }}
            >
              <LeftArrowIcon size={100} />
            </div>
          </Grid>
          <Grid item>
            <div
              style={{
                background:
                  highlightedKey === "ArrowDown" ? "#f5b301" : "transparent",
              }}
            >
              <DownArrowIcon size={100} />
            </div>
          </Grid>
          <Grid item>
            <div
              style={{
                background:
                  highlightedKey === "ArrowRight" ? "#f5b301" : "transparent",
              }}
            >
              <RightArrowIcon size={100} />
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default ArrowKeys;
