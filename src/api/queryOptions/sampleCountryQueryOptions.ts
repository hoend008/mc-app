import { queryOptions } from "@tanstack/react-query";
import getSampleCountry from "../queries/getSampleCountry";
import { GeoJsonObject } from "geojson";

export default function createSampleCountryQueryOptions(
  accessToken: string,
  geodata: GeoJsonObject
) {
  return queryOptions({
    queryKey: ["sampleyear"],
    queryFn: () => getSampleCountry(accessToken, geodata),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}