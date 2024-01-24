import React, { useState } from "react";
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
    <form>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item>
          <h3>Input Coordinate</h3>
        </Grid>
        <Grid item>
          <TextField
            id="latitude"
            name="latitude"
            label="Latitude"
            variant="outlined"
            value={location.latitude}
            onChange={handleChange}
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
                "& input": {
                  color: "white",
                },
              },
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            id="longitude"
            name="longitude"
            label="Longitude"
            variant="outlined"
            value={location.longitude}
            onChange={handleChange}
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
                "& input": {
                  color: "white",
                },
              },
            }}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={submitForm}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default RouteForm;
