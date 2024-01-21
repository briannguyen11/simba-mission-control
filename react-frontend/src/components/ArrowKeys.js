import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import UpArrowIcon from "../icons/UpArrowIcon";
import DownArrowIcon from "../icons/DownArrowIcon";
import RightArrowIcon from "../icons/RightArrowIcon.js";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import Grid from "@mui/material/Unstable_Grid2";

function ArrowKeys({ onDirectionChange }) {
  const [highlightedKey, setHighlightedKey] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
        case "ArrowDown":
        case "ArrowLeft":
        case "ArrowRight":
          setHighlightedKey(event.key);
          onDirectionChange(event.key);

          console.log("Pressed direction:", event.key);
          break;
        default:
          break;
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
  }, [onDirectionChange]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        backgroundColor: "#4a4e52",
        borderRadius: "10px",
      }}
    >
      <h3>Manual Control</h3>
      <Grid container spacing={1}>
        <Grid item>
          <div
            style={{
              background:
                highlightedKey === "ArrowUp" ? "#f5b301" : "transparent",
            }}
          >
            <UpArrowIcon size={50} />
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
            <LeftArrowIcon size={50} />
          </div>
        </Grid>
        <Grid item>
          <div
            style={{
              background:
                highlightedKey === "ArrowDown" ? "#f5b301" : "transparent",
            }}
          >
            <DownArrowIcon size={50} />
          </div>
        </Grid>
        <Grid item>
          <div
            style={{
              background:
                highlightedKey === "ArrowRight" ? "#f5b301" : "transparent",
            }}
          >
            <RightArrowIcon size={50} />
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ArrowKeys;
