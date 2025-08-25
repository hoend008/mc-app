import { queryOptions } from "@tanstack/react-query";
import axios, { CanceledError } from "axios";

export interface SampleYear {
  [key: string]: string | number;
}

const getSampleYear = async (accessToken: string, countryID: string) => {
  const controller = new AbortController();

  const { data } = await axios<SampleYear[]>({
    method: "get",
    url: "http://127.0.0.1:8000/samples/years",
    signal: controller.signal,
    headers: { Authorization: "Bearer " + accessToken },
    params: { country_id: countryID ? parseInt(countryID) : 0 },
  });

  return data;
};

export default function createSampleYearQueryOptions(
  accessToken: string,
  countryID: string
) {
  return queryOptions({
    queryKey: ["sampleyear", countryID],
    queryFn: () => getSampleYear(accessToken, countryID),
  });
}
