import { Box, Card, Grid, Toolbar, Typography } from "@mui/material";
import { drawerWidth } from "../components/Layout";
import BarchartYear from "../components/BarchartYear";
import BarchartYearApex from "../components/BarchartYearApex";
import MapGauge from "../components/MapGauge";
import BarchartYearRecharts from "../components/BarchartYearRecharts";
import PiechartRecharts from "../components/PIechartRecharts";

const Home = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 2,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        height: { sm: "100%", md: "100%" },
        bgcolor: "primary.main",
      }}
    >
      <Toolbar />
      <Grid container direction="column" spacing={2}>
        <MapGauge />
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" sx={{ color: "text.main" }}>
              Nivo Chart
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Some text on the graph here
            </Typography>
            <Card
              sx={{
                backgroundColor: "secondary.main",
                border: 1,
                borderColor: "border.main",
                borderRadius: "0.6rem",
              }}
            >
              <BarchartYear />
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" sx={{ color: "text.main" }}>
              Apex Chart
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Some text on the graph here
            </Typography>
            <Card
              sx={{
                backgroundColor: "secondary.main",
                border: 1,
                borderColor: "border.main",
                borderRadius: "0.6rem",
              }}
            >
              <BarchartYearApex />
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" sx={{ color: "text.main" }}>
              ReCharts
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Some text on the graph here
            </Typography>
            <Card
              sx={{
                backgroundColor: "secondary.main",
                border: 1,
                borderColor: "border.main",
                borderRadius: "0.6rem",
              }}
            >
              <BarchartYearRecharts />
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" sx={{ color: "text.main" }}>
              Piechart ReCharts
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Some text on the graph here
            </Typography>
            <Card
              sx={{
                backgroundColor: "secondary.main",
                border: 1,
                borderColor: "border.main",
                borderRadius: "0.6rem",
              }}
            >
              <PiechartRecharts />
            </Card>
          </Grid>
          
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
