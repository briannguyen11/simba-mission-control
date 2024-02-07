import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Grid,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

function RouteTable(props) {
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
        <Grid container item xs={12}>
          <Grid item xs={8}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
              Route Table
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                style={{ width: "100px", height: "30px", marginRight: "5px" }}
                onClick={props.onSendRoutePlan}
              >
                Run
              </Button>
              <Button
                variant="contained"
                style={{
                  width: "100px",
                  height: "30px",
                  backgroundColor: "red",
                }}
              >
                Stop
              </Button>
            </div>
          </Grid>
        </Grid>

        <TableContainer
          style={{
            border: "1px solid white",
            maxHeight: "240px",
            overflowY: "auto",
          }}
        >
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>
                  Route #
                </TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>
                  Latitude
                </TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>
                  Longitude
                </TableCell>
                <TableCell style={{ fontWeight: "bold", color: "white" }}>
                  Clear
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.routeData.map((route, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ color: "white" }}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    {route.latitude}
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    {route.longitude}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => props.onDeleteRoute(index)}
                      color="error"
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default RouteTable;
