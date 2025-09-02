import { chartMainColor } from "../MapGauge";

export const MAPCOLORS = [
  { color: "#a50f15", value: 10000, range: "> 10,000", max: 10000 },
  { color: "#de2d26", value: 5000, range: "5,000 - 10,000", max: 5000 },
  { color: "#fb6a4a", value: 2500, range: "2,500 - 5,000", max: 2500 },
  { color: "#fc9272", value: 1000, range: "1,000 - 2,500", max: 1000 },
  { color: "#fcbba1", value: 500, range: "500 - 1,000", max: 500 },
  { color: "#fee5d9", value: 0, range: "0 - 500", max: 0 },
];

export const mapPolygonColorToDensity = (
  density: number,
  MAPCOLORS: chartMainColor[]
) => {
  return density > 10000 //0000000
    ? MAPCOLORS[0].color
    : density > 5000 //0000000
    ? MAPCOLORS[1].color
    : density > 2500 //0000000
    ? MAPCOLORS[2].color
    : density > 1000 //0000000
    ? MAPCOLORS[3].color
    : density > 500 //0000000
    ? MAPCOLORS[4].color
    : MAPCOLORS[5].color;
};
