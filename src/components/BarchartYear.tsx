import { ResponsiveBar } from "@nivo/bar";
import useSampleYear from "../hooks/useSampleYear";
import useAuth from "../hooks/useAuth";
import useData from "../hooks/useData";

const BarchartYear = () => {
  // get user authentication data
  const { auth } = useAuth();

  // get country info
  const { countryID } = useData();

  // get sample year data
  const { data, error, isLoading } = useSampleYear(auth.accessToken, countryID);

  return (
    <div style={{ height: 500, width: 1000 }}>
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
            legend: "degrees",
            legendPosition: "middle",
            legendOffset: -40,
          }}
        />
      ) : null}
    </div>
  );
};

export default BarchartYear;
