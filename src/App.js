import * as React from "react";
import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded";
import ThermostatRoundedIcon from "@mui/icons-material/ThermostatRounded";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import db from "./firebase";
import { Container } from "@mui/system";
import { Avatar, CssBaseline, Divider, Paper } from "@mui/material";

import { ref, onValue } from "firebase/database";
import { LineChart, Line, XAxis, YAxis } from "recharts";

function App() {
  const [Vitals, setVitals] = useState([{}]);
  const [ecgData, setEcgData] = useState([{}]);

  useEffect(() => {
    const vitalRef = ref(db, "vitals");
    onValue(vitalRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        setVitals(data);
      }
      //

      // console.log(Vitals.ecg);
    });
  }, []);

  useEffect(() => {
    setEcgData((curEcg) => [...curEcg, { ecg: Vitals.ecg }]);
  }, [Vitals]);

  console.log(Vitals);
  console.log(ecgData);

  return (
    <Container maxWidth="lg">
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h4" color="#fff" component="div">
            IOT HEALTH MONITORING SYSTEM
          </Typography>
        </Toolbar>
      </AppBar>
      <CssBaseline />

      <Container
        sx={{
          bgcolor: "#efe",
          height: "90vh",
          width: "100%",
          padding: "20px 5px",
          mt: "55px",
          display: "flex",
        }}
      >
        <Box
          sx={{
            bgcolor: "#fff",
            height: "70vh",
            padding: "20px 20px",

            mr: "10px",
            flex: 2,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" color="#111" component="div">
            Patient details
          </Typography>
          <Avatar />

          <Typography variant="span" color="#111" component="div" fontSize={14}>
            name: Joe .B
          </Typography>
          <Divider />
          <Typography variant="span" color="#111" component="div" fontSize={14}>
            age: 49 years
          </Typography>
          <Divider />
          <Typography
            variant="span"
            color="#000000"
            component="div"
            fontSize={14}
          >
            gender: Male
          </Typography>
          <Divider />
          <Typography variant="span" color="#111" component="div" fontSize={14}>
            condition: normal
          </Typography>
          <Divider />
          <Typography variant="span" color="#111" component="div" fontSize={14}>
            hospital: FMC
          </Typography>
          <Divider />
          <Typography variant="span" color="#111" component="div" fontSize={14}>
            Consultant in charge: Dr. Strange
          </Typography>
          <Typography variant="span" color="#111" component="div" fontSize={14}>
            {ecgData.ecgVal} testing
          </Typography>
        </Box>
        <Box
          sx={{
            bgcolor: "#fff",
            height: "100%",
            padding: "20px 15px",
            flex: 8,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" color="#111" component="div">
            vitals
          </Typography>
          <Box
            sx={{
              bgcolor: "#eee",
              height: "40%",
              width: "95%",
              mb: "10px",

              padding: "20px 15px",
              display: "flex",
              borderRadius: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Paper
              sx={{
                bgcolor: "#fff",
                height: "90%",

                padding: "20px 15px",
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                {/* temp icon */}
                <ThermostatRoundedIcon fontSize="large" color="primary" />

                <Typography variant="h2" color="#111" component="div">
                  {Vitals.temperature}°C
                </Typography>
              </Box>
              <Typography variant="span" color="#111" component="div">
                Temperature
              </Typography>
            </Paper>
            <Paper
              sx={{
                bgcolor: "#fff",
                height: "100%",

                padding: "20px 15px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                borderRadius: 2,
                flex: 1,
                ml: 20,
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <HeartBrokenIcon fontSize="large" color="error" />
                <Typography variant="h2" color="#111" component="div">
                  {Vitals.bpm} bpm
                </Typography>
              </Box>
              <Typography variant="span" color="#111" component="div">
                BPM
              </Typography>
            </Paper>
          </Box>
          <Box
            sx={{
              bgcolor: "#fff",
              height: "55%",
              width: "95%",
              padding: "15px 5px",
              display: "flex",
              borderRadius: 2,
              border: "1px solid #eee",

              flexDirection: "column",
            }}
          >
            <MonitorHeartRoundedIcon fontSize="large" color="secondary" />
            <Typography variant="span" color="#111" component="div">
              ECG
            </Typography>

            <Box>
              {/* <Line data={data} options={options} /> */}

              <LineChart width={700} height={300} data={ecgData.slice(-72)}>
                <Line type="monotone" dataKey="ecg" stroke="#8884d8" />
                {/* <CartesianGrid stroke="#ccc" /> */}
                <XAxis dataKey={Math.random()} />
                <YAxis />
              </LineChart>
            </Box>
          </Box>
        </Box>
      </Container>
    </Container>
  );
}

export default App;
