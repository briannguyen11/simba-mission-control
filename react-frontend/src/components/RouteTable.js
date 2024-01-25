import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { Typography } from "@mui/material";

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
        <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
          Route Table
        </Typography>
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
                      onClick={() => props.onDelete(index)}
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
