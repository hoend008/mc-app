export const MAPCOLORS = [
  { color: "#a50f15", value: 90, range: "90 - 100" },
  { color: "#de2d26", value: 70, range: "70 - 90" },
  { color: "#fb6a4a", value: 50, range: "50 - 70" },
  { color: "#fc9272", value: 25, range: "25 - 50" },
  { color: "#fcbba1", value: 10, range: "10 - 25" },
  { color: "#fee5d9", value: 0, range: "0 - 10" },
];

export const mapPolygonColorToDensity = (density: number) => {
  return density > 90 //0000000
    ? MAPCOLORS[0].color
    : density > 70 //0000000
    ? MAPCOLORS[1].color
    : density > 50 //0000000
    ? MAPCOLORS[2].color
    : density > 25 //0000000
    ? MAPCOLORS[3].color
    : density > 10 //0000000
    ? MAPCOLORS[4].color
    : MAPCOLORS[5].color;
};
