import React from "react";
import Typography from "@mui/material/Typography";

const Header = () => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        border: "1px solid white",
        borderRadius: "5px",
      }}
    >
      <Typography variant="h6">Mission Control</Typography>
    </div>
  );
};

export default Header;
