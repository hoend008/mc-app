import axios from "axios";
import createMapData from "../../hooks/useGeoDensityData";
import { GeoJsonObject } from "geojson";
import densityData from "../../data/testdata.json";
import { chartMainColor } from "../../components/MapGauge";

//export interface SampleCountry {
//  [key: string]: string | number;
//}

export interface SampleCountry {
  iso_a3: string;
  density: number;
}

const getSampleCountryMap = async (
  accessToken: string,
  geodata: GeoJsonObject,
) => {
  const controller = new AbortController();
  const { data } = await axios<SampleCountry[]>({
    method: "get",
    url: "http://127.0.0.1:8000/samples/countries",
    signal: controller.signal,
    headers: { Authorization: "Bearer " + accessToken },
  });

  const mapData = createMapData(geodata, data);
  return {data, mapData };
};

export default getSampleCountryMap;
