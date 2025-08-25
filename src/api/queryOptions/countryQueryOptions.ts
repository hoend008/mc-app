import { queryOptions } from "@tanstack/react-query";
import getCountries from "../queries/getCountries";

export default function createCountriesQueryOptions(accessToken: string) {
  return queryOptions({
    queryKey: ["countries"],
    queryFn: () => getCountries(accessToken),
  });
}