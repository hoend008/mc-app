import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export interface SampleYear   {
  [key: string]: string | number;
}

const useSampleYear = (accessToken: string, countryID: string) => {
  const fetchSampleYears = () => {
    
    const controller = new AbortController();
    console.log(countryID);

    return axios<SampleYear[]>({
      method: "get",
      url: "http://127.0.0.1:8000/samples/years",
      signal: controller.signal,
      headers: { Authorization: "Bearer " + accessToken },
      params: {country_id: countryID ? parseInt(countryID) : 0},
    }).then((res) => res.data);
  };

  return useQuery<SampleYear[], Error>({
    queryKey: ["sampleyears"],
    queryFn: fetchSampleYears,
  });
};

export default useSampleYear;
