import { queryOptions } from "@tanstack/react-query";
import getSampleYear from "../queries/getSampleYear";

export default function createSampleYearQueryOptions(
  accessToken: string,
  countryID: string
) {
  return queryOptions({
    queryKey: ["sampleyear", countryID],
    queryFn: () => getSampleYear(accessToken, countryID),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}