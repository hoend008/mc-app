import { Box, Card, Grid, Toolbar, Typography } from "@mui/material";
import { drawerWidth } from "../components/Layout";
import BarchartYear from "../components/BarchartYear";
import BarchartYearApex from "../components/BarchartYearApex";
import MyMap from "../components/map/MyMap";
import useData from "../hooks/useData";

const Home = () => {
  const { selectedFeature, setSelectedFeature, densityData } = useData();

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        height: { sm: "100%", md: "100%" },
        bgcolor: "primary.main",
      }}
    >
      <Toolbar />
      <Grid container direction="column" spacing={2}>
        <Card
          sx={{
            backgroundColor: "secondary.main",
            border: 1,
            borderColor: "border.main",
            borderRadius: "0.6rem",
            padding: "0.5rem",
            width: "100%",
          }}
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <MyMap
              selectedFeature={selectedFeature}
              setSelectedFeature={setSelectedFeature}
              densityData={densityData}
            />
          </Grid>
        </Card>
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
      </Grid>
    </Box>
  );
};

export default Home;
