import ReactSpeedometer, { Transition } from "react-d3-speedometer";
import { MAPCOLORS } from "./map/ColorUtils";
import useAuth from "../hooks/useAuth";
import useData from "../hooks/useData";
import createSampleCountryQueryOptions from "../api/queryOptions/sampleCountryQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress, Typography } from "@mui/material";

const GaugeChart = () => {
  // styles
  const defaultDiv = { height: "300px", width: "100%" };
  const extraDiv = {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  };

  // get user authentication data
  const { auth } = useAuth();

  // get country info
  const { countryCode } = useData();

  // get sample year data
  const { data, error, isPending } = useQuery(
    createSampleCountryQueryOptions(auth.accessToken, countryCode)
  );

  if (error)
    return (
      <div style={{ ...defaultDiv, ...extraDiv }}>
        <Typography variant="h6" color="warning">
          Oops, something went wrong
        </Typography>
      </div>
    );


  return (
    <>
      <ReactSpeedometer
        customSegmentStops={MAPCOLORS.map((c) => c.value).reverse()}
        segmentColors={MAPCOLORS.map((c) => c.color).reverse()}
        needleColor="steelblue"
        needleTransitionDuration={1000}
        needleTransition={Transition.easePolyInOut}
        value={data ? (data[0].density as number) : 0}
        minValue={0}
        maxValue={10000}
      />
      <div>{data ? data[0].density : "niets"}</div>
    </>
  );
};

export default GaugeChart;
