import { queryOptions } from "@tanstack/react-query";
import getSampleCountryMap from "../queries/getSampleCountryMap";
import { GeoJsonObject } from "geojson";
import { chartMainColor } from "../../components/MapGauge";

export default function createSampleCountryMapQueryOptions(
  accessToken: string,
  geodata: GeoJsonObject,
  MAPCOLORS: chartMainColor[],
) {
  return queryOptions({
    queryKey: ["samplecountrymap"],
    queryFn: () => getSampleCountryMap(accessToken, geodata, MAPCOLORS),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}


