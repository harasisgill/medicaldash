// import * as React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

export default function DataTable({ data }) {
  return (
    <>
      <Grid container spacing={2} rowSpacing={10}>
        <Grid item xs={6} sm={6}>
          <Card
            variant="outlined"
            style={{ height: "100%", minHeight: "50%", border: "none" }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Typography fontWeight={"bolder"} variant="h5" component="h2">
                SGOT ALT
              </Typography>
              <Typography
                variant="h5"
                color={parseFloat(data[0]["SGOT_ALT"]) > 50 ? "red" : "green"}
                fontWeight={"bolder"}
              >
                {data[0]["SGOT_ALT"]}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Card
            variant="outlined"
            style={{ height: "100%", minHeight: "50%", border: "none" }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h5" component="h2" fontWeight={"bolder"}>
                SGOT AST
              </Typography>
              <Typography
                fontWeight={"bolder"}
                variant="h5"
                color={parseFloat(data[0]["SGOT_AST"]) > 50 ? "red" : "green"}
              >
                {data[0]["SGOT_AST"]}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Card
            variant="outlined"
            style={{ height: "100%", minHeight: "50%", border: "none" }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h5" component="h2" fontWeight={"bolder"}>
                Smoker or Drinker
              </Typography>
              <Typography
                fontWeight={"bolder"}
                variant="h5"
                color={data[0]["Drink"] === "Y" ? "red" : "green"}
              >
                {data[0]["Drink"] === "Y" ? "Yes" : "No"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Card
            variant="outlined"
            style={{ height: "100%", minHeight: "50%", border: "none" }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h5" component="h2" fontWeight={"bolder"}>
                Blood Glucose
              </Typography>
              <Typography
                fontWeight={"bolder"}
                variant="h5"
                color={
                  data[0].BLDS >= 70 && data[0].BLDS <= 100
                    ? "green"
                    : data[0].BLDS > 100 && data[0].BLDS <= 125
                    ? "#fcba03"
                    : data[0].BLDS > 125
                    ? "red"
                    : "textSecondary"
                }
              >
                {data[0].BLDS}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* ))} */}
      </Grid>
    </>
    // <TableContainer component={Paper}>
    //   <Table sx={{ minWidth: 650 }} aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell align="center">Patient ID</TableCell>
    //         {/* <TableCell align="center">Drinking/Smoking</TableCell> */}
    //         <TableCell align="center">LDL</TableCell>
    //         <TableCell align="center">Triglycerides</TableCell>
    //         <TableCell align="center">HDL</TableCell>
    //         <TableCell align="center">Blood Glucose</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       <TableRow key={data.name}>
    //         <TableCell align="center">{data[0].p_id}</TableCell>
    //         {/* <TableCell align="center">{data[0]["Drink "]}</TableCell> */}
    //         <TableCell align="center">{data[0].triglyceride}</TableCell>
    //         <TableCell align="center">{data[0].LDL_chole}</TableCell>
    //         <TableCell align="center">{data[0].HDL_chole}</TableCell>
    //         <TableCell align="center">{data[0].BLDS}</TableCell>
    //       </TableRow>
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
}
