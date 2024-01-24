import React from "react";
import Typography from "@mui/material/Typography";

const formatTime = (time) => {
  const logTime = new Date(time);
  const hours = logTime.getHours();
  const minutes = logTime.getMinutes();
  const seconds = logTime.getSeconds();

  // Format the time
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return formattedTime;
};

function LogContainer({ logData }) {
  return (
    <div
      style={{
        height: "100%",
        border: "1px solid white",
        borderRadius: "5px",
        overflow: "auto",
      }}
    >
      <div
        style={{
          flex: 1,
          color: "white",
          padding: "10px",
        }}
      >
        <Typography variant="h6">Direction Log:</Typography>
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
      </div>
    </div>
  );
}

export default LogContainer;
