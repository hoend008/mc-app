import { queryOptions } from "@tanstack/react-query";
import getSampleProduct from "../queries/getSampleProduct";

export default function createSampleProductQueryOptions(
  accessToken: string,
  countryID: string,
) {
  return queryOptions({
    queryKey: ["sampleproduct", countryID],
    queryFn: () => getSampleProduct(accessToken, countryID),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}