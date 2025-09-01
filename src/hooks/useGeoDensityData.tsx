import { chartMainColor } from "../components/MapGauge";

const mapPolygonColorToDensity = (density: number, MAPCOLORS: chartMainColor[]) => {
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

const createMapData = (geodata: any, densityData: any, MAPCOLORS: chartMainColor[]) => {
  // loop over geodata.features
  for (const key in geodata.features) {
    // get code3 from geodata features
    let iso_a3 = geodata.features[key].properties.iso_a3.toLowerCase();

    // find corresponding match in densityData and get index
    let countryIndex = densityData
      .map((country: any) => country["iso_a3"])
      .indexOf(iso_a3);

    // if an index if found, update geodata.features
    if (countryIndex > 0) {
      geodata.features[key].properties.density =
        densityData[countryIndex].density;
      geodata.features[key].properties.color = mapPolygonColorToDensity(
        densityData[countryIndex].density,
        MAPCOLORS
      );
    } else {
      geodata.features[key].properties.density = null;
    }
  }

  return geodata;
};

export default createMapData;
