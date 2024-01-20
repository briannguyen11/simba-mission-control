import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

function RouteTable(props) {
  return (
    <>
      <h3> Planned Route </h3>
      <TableContainer
        style={{
          border: "1px solid black",
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Route Number</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Latitude</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Longitude</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Clear</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.routeData.map((route, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1} {/* Adding 1 to make it 1-based index */}
                </TableCell>
                <TableCell>{route.latitude}</TableCell>
                <TableCell>{route.longitude}</TableCell>
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
    </>
  );
}

export default RouteTable;
