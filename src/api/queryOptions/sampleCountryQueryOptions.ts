import { queryOptions } from "@tanstack/react-query";
import getSampleCountry from "../queries/getSampleCountry";

export default function createSampleCountryQueryOptions(
  accessToken: string,
  country_code: string
) {
  return queryOptions({
    queryKey: ["samplecountry", country_code],
    queryFn: () => getSampleCountry(accessToken, country_code),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}


