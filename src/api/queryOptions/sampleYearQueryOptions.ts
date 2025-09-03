import { queryOptions } from "@tanstack/react-query";
import getSampleYear from "../queries/getSampleYear";

export default function createSampleYearQueryOptions(
  accessToken: string,
  countryID: string,
  feedconversionID: number,
) {
  return queryOptions({
    queryKey: ["sampleyear", countryID, feedconversionID],
    queryFn: () => getSampleYear(accessToken, countryID, feedconversionID),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}