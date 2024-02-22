// Log.js

import React from "react";
import { Typography, Box } from "@mui/material";

const formatTime = (time) => {
  const logTime = new Date(time);
  const hours = logTime.getHours();
  const minutes = logTime.getMinutes();
  const seconds = logTime.getSeconds();

  // Format the time
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return formattedTime;
};

export default function LogContainer({ logData }) {
  return (
    <Box
      style={{
        height: "600px",
        backgroundColor: "#537072",
        borderRadius: "5px",
        overflow: "auto",
        color: "white",
        padding: "10px",
      }}
    >
      <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
        Direction Log
      </Typography>
      {logData
        .slice()
        .reverse()
        .map((logEntry, index) => (
          <div key={index}>
            <Typography variant="body2" color="white">
              {formatTime(logEntry.time)} - {logEntry.data}
            </Typography>
          </div>
        ))}
    </Box>
  );
}
