import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { ResponsiveBar } from "@nivo/bar";
import useAuth from "../hooks/useAuth";
import useData from "../hooks/useData";
import { useQuery } from "@tanstack/react-query";
import createSampleYearQueryOptions from "../api/queryOptions/sampleYearQueryOptions";
import useTheme from "../hooks/useTheme";
import { themeSettings } from "../themes/theme";

const BarchartYear = () => {
  // styles
  const defaultDiv = { height: "300px", width: "100%" };
  const extraDiv = {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  };

  const { mode } = useTheme();
  const chartMainColor = themeSettings(mode);

  // get user authentication data
  const { auth } = useAuth();

  // get country info
  const { countryID } = useData();

  // get sample year data
  const { data, error, isPending } = useQuery(
    createSampleYearQueryOptions(auth.accessToken, countryID)
  );

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
    <div style={defaultDiv}>
      {data ? (
        <ResponsiveBar
          data={data}
          keys={["count"]}
          indexBy="year"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.4}
          valueScale={{ type: "linear" }}
          colors="#5ea500"
          animate={true}
          enableLabel={false}
          axisTop={null}
          axisRight={null}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
          }}
          theme={{
            axis: {
              ticks: { text: { fill: chartMainColor.text.main } },
            },
          }}
        />
      ) : null}
    </div>
  );
};

export default BarchartYear;
