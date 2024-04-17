import React, { useState, useEffect } from "react";
import { Grid, Box, Card, Typography } from "@mui/material";
import DropdownWithSearch from "./components/DropdownWithSearch";
import DataTable from "./components/Table";
import AnimatedBarChart from "./components/AnimatedBarChart";
import GaugeChart from "./components/GaugeChart";
import CholestrolChart from "./components/CholestrolChart";
import { filter } from "d3";

function App() {
  const [options, setOptions] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([
    {
      p_id: "",
      Drink: "",
      triglyceride: "",
      LDL_chole: "",
      HDL_chole: "",
      BLDS: "",
      DBP: "",
      SBP: "",
      tot_chole: "",
      SGOT_AST: "",
      SGOT_ALT: "",
    },
  ]);

  const convertCsvToJson = (csv) => {
    const lines = csv.split("\n");
    const result = [];
    const headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentLine = lines[i].split(",");

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j];
      }

      result.push(obj);
    }

    return result;
  };

  const fetchCsvData = async () => {
    try {
      const response = await fetch("./smoking_driking_dataset_Ver01.2.csv");
      if (!response.ok) {
        throw new Error("Failed to fetch CSV data");
      }
      const csvData = await response.text();
      return convertCsvToJson(csvData);
    } catch (error) {
      console.error("Error fetching CSV data:", error);
      return [];
    }
  };

  const handleOptionSelect = (selectedOption) => {
    let filtered = data.filter((item) => item.p_id === selectedOption);

    if (filtered.length === 0) {
      filtered = [
        {
          p_id: "",
          Drink: "",
          triglyceride: "",
          LDL_chole: "",
          HDL_chole: "",
          BLDS: "",
          DBP: "",
          SBP: "",
          tot_chole: "",
          SGOT_AST: "",
          SGOT_ALT: "",
        },
      ];
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    const fetchData = async () => {
      const jsonData = await fetchCsvData();
      setData(jsonData);
      setOptions(jsonData.map((d) => d.p_id)); // Assuming 'p_id' is the property you want to use as options
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <Typography variant="h4" textAlign={"center"}>
        Patient Medical Report
      </Typography>
      <Grid container>
        <Grid item sm={3} xs={12}>
          <Box sx={{ mt: 1, ml: 1 }}>
            <DropdownWithSearch
              options={options}
              onSelect={handleOptionSelect}
            />
          </Box>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2}>
        <Grid item sm={5.95} xs={12} ml={1}>
          <Card
            sx={{
              width: "100%",
              minHeight: 300,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              textAlign: "center",
            }}
          >
            <Typography variant="h4">
               Blood Pressure
            </Typography>
            <br />
            <br />
            <GaugeChart
              value={filteredData[0].DBP}
              title={"Diastolic"}
              range={[65, 80, 90, 95]}
            />
            <GaugeChart
              value={filteredData[0].SBP}
              title={"Systolic"}
              range={[105, 120, 130, 140]}
            />
          </Card>
        </Grid>
        <Grid item sm={5.95} xs={12}>
          <Card
            sx={{
              width: "100%",
              minHeight: 300,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              textAlign: "center",
            }}
          >
            <Typography variant="h4">Hemoglobin</Typography>
            <AnimatedBarChart value={filteredData[0].hemoglobin} />
          </Card>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2} mb={1}>
        <Grid item sm={5.95} xs={12} ml={1}>
          <Card
            sx={{
              width: "100%",
              minHeight: 300,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              textAlign: "center",
            }}
          >
            <Typography variant="h4">Cholestrol Levels</Typography>
            <CholestrolChart
              data={[
                filteredData[0].tot_chole,
                filteredData[0].LDL_chole,
                filteredData[0].HDL_chole,
                filteredData[0].triglyceride,
              ]}
            />
          </Card>
        </Grid>
        <Grid item sm={5.95} xs={12}>
          <Card
            sx={{
              width: "100%",
              minHeight: 300,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <DataTable data={filteredData} />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
