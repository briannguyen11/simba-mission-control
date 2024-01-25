import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";

function RouteForm(props) {
  const [location, setLocation] = useState({
    latitude: "",
    longitude: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setLocation({ ...location, [name]: value });
  }

  function submitForm() {
    props.handleSubmit(location);
    setLocation({ latitude: "", longitude: "" });
  }

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
                style: {
                  color: "white",
                },
              }}
              InputProps={{
                sx: {
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "& input": {
                    color: "white",
                  },
                },
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
                style: {
                  color: "white", // Set label text color to white
                },
              }}
              InputProps={{
                sx: {
                  color: "white",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                  "& input": {
                    color: "white",
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={submitForm}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default RouteForm;
