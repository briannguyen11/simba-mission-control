// RouteForm.js

import React, { useState } from "react";
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

export default function RouteForm({ setRouteData }) {
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
  });

  const isNumber = (value) => !isNaN(parseFloat(value)) && isFinite(value);

  function handleChange(event) {
    const { name, value } = event.target;
    setLocation({ ...location, [name]: value });
  }

  function submitForm() {
    if (isNumber(location.latitude) && isNumber(location.longitude)) {
      setRouteData((prevData) => [...prevData, location]);
    } else {
      alert("Invalid input. Latitude and longitude must be valid numbers.");
    }
    setLocation({ latitude: "", longitude: "" });
  }

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
      <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
        Coordinate Input
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="latitude"
            name="latitude"
            label="Latitude"
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
        <Grid item xs={12}>
          <TextField
            id="longitude"
            name="longitude"
            label="Longitude"
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
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={submitForm}
            fullWidth
            style={{ color: "black", backgroundColor: "white" }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
