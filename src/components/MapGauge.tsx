import { Box, Card, CircularProgress, Grid, Typography } from "@mui/material";
import MyMap2 from "./map/MyMap2";
import GaugeChart2 from "./GaugeChart2";
import { useQuery } from "@tanstack/react-query";
import { GeoJsonObject } from "geojson";
import useAuth from "../hooks/useAuth";
import createSampleCountryMapQueryOptions from "../api/queryOptions/SampleCountryMapQueryOptions";
import geodata from "../data/countries_WH.json";

const MapGauge = () => {
  // get user authentication data
  const { auth } = useAuth();

  // get map density data
  const {
    data,
    error,
    isPending,
    isSuccess,
  } = useQuery(
    createSampleCountryMapQueryOptions(
      auth.accessToken,
      geodata as GeoJsonObject
    )
  );

  // styles
  const defaultDiv = { height: "300px", width: "100%" };
  const extraDiv = {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  };

  if (error)
    return (
      <div style={{ ...defaultDiv, ...extraDiv }}>
        <Typography variant="h6" color="warning">
          Oops, something went wrong
        </Typography>
      </div>
    );

  if (isPending)
    return (
      <div style={{ ...defaultDiv, ...extraDiv }}>
        <CircularProgress color="success" size="5rem" />
      </div>
    );

  return (
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
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <MyMap2
          mapData={data.mapData}
          error={error}
          isPending={isPending}
          isSuccess={isSuccess}
        />
        <Box sx={{ margin: "auto" }}>
          <GaugeChart2 data={data.data}
          error={error}
          isPending={isPending}
          isSuccess={isSuccess}/>
        </Box>
      </Grid>
    </Card>
  );
};

export default MapGauge;
