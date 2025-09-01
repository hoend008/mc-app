import ReactSpeedometer, { Transition } from "react-d3-speedometer";
import { Typography } from "@mui/material";
import { GeoJsonObject } from "geojson";
import { MAPCOLORS } from "./map/ColorUtils";
import useData from "../hooks/useData";
import { SampleCountry } from "../api/queries/getSampleCountryMap";

interface Props {
  data: SampleCountry[];
  error: Error | null;
  isPending: boolean;
  isSuccess: boolean;
}

const GaugeChart = ({ data, error, isPending, isSuccess }: Props) => {
  // get country info
  const { countryCode } = useData();

  const getValue = (countryCode: string) => {
    let resultValue: number = 0;
    for (var i = 0; i < data.length; i++) {
      if (data[i].iso_a3 === countryCode) {
        resultValue = data[i].density;
      }
    }

    return resultValue;
  };

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

  return (
    <div
      style={{
        ...defaultDiv,
        ...extraDiv,
        paddingTop: "10rem",
      }}
    >
      <ReactSpeedometer
        height={400}
        width={400}
        customSegmentStops={MAPCOLORS.map((c) => c.max).reverse()}
        segmentColors={MAPCOLORS.map((c) => c.color).reverse()}
        needleColor="steelblue"
        needleTransitionDuration={1000}
        needleTransition={Transition.easePolyInOut}
        value={getValue(countryCode)}
        minValue={0}
        maxValue={MAPCOLORS.reduce((a, b) => Math.max(a, b.max), -Infinity)}
      />
    </div>
  );
};

export default GaugeChart;
