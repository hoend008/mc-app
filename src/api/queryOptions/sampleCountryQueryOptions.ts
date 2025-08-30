import { queryOptions } from "@tanstack/react-query";
import getSampleCountry from "../queries/getSampleCountry";

export default function createSampleCountryQueryOptions(
  accessToken: string,
) {
  return queryOptions({
    queryKey: ["sampleyear"],
    queryFn: () => getSampleCountry(accessToken),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}