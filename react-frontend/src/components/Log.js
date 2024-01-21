import React, { useState, useEffect, useCallback } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LogContainer({ direction }) {
  const [logs, setLogs] = useState([]);

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const updateDirectionChange = useCallback((dir) => {
    const currentTime = getCurrentTime();
    const logEntry = `${currentTime} - ${dir}`;

    // Update the logs state
    setLogs((prevLogs) => [...prevLogs, logEntry]);
  }, []);

  useEffect(() => {
    // Call updateDirectionChange when the direction prop changes
    updateDirectionChange(direction);
  }, [direction, updateDirectionChange]);

  return (
    <Box
      sx={{
        maxHeight: "900px",
        overflowY: "auto",
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "10px",
        marginTop: "10px",
        color: "white",
      }}
    >
      <Typography variant="h6">Direction Log:</Typography>
      {logs.map((log, index) => (
        <Typography key={index} variant="body1" color="white">
          {log}
        </Typography>
      ))}
    </Box>
  );
}

export default LogContainer;
