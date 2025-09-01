import { Box, Typography } from "@mui/material";
import { MAPCOLORS } from "./ColorUtils";
import { chartMainColor } from "../MapGauge";

interface Props {
  chartMainColor: chartMainColor[];
}

const Legend = ({ chartMainColor }: Props) => {
  return (
    <Box className={"LegendBox"}>
      <Typography variant="h5">Legend</Typography>
      {chartMainColor.map((c) => (
        <div
          key={c.value}
          style={{
            display: "flex",
            gap: 5,
            alignItems: "center",
          }}
        >
          <div
            key={c.value}
            style={{
              width: "1rem",
              height: "1rem",
              backgroundColor: c.color,
            }}
          ></div>
          <div style={{ fontSize: 14 }}>{c.range}</div>
        </div>
      ))}
    </Box>
  );
};

export default Legend;
