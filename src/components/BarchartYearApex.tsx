import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useData from "../hooks/useData";
import createSampleYearQueryOptions from "../api/queryOptions/sampleYearQueryOptions";
import Chart from "react-apexcharts";
import { CircularProgress, Typography } from "@mui/material";
import { themeSettings } from "../themes/theme";
import useTheme from "../hooks/useTheme";

const BarchartYearApex = () => {
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
  const { countryCode } = useData();

  // get sample year data
  const { data, error, isPending } = useQuery(
    createSampleYearQueryOptions(auth.accessToken, countryCode)
  );

  const series = [
    {
      name: "samples per year",
      data: data ? data.map((x) => x.count as number) : [],
    },
  ];

  const options = {
    colors: [chartMainColor.accent.green],
    xaxis: {
      categories: data ? data.map((x) => x.year as string) : [],
      labels: {
        style: {
          colors: Array(data?.length).fill(chartMainColor.text.main),
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: Array(data?.length).fill(chartMainColor.text.main),
        },
      },
    },
    chart: {
      background: "primary.main",
    },
    dataLabels: {
      style: {
        fontSize: "12px",
        fontWeight: "bold",
      },
    },
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
    <div style={defaultDiv}>
      <Chart height={300} options={options} series={series} type="area" />
    </div>
  );
};

export default BarchartYearApex;
