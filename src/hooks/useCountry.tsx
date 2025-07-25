import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export interface Country   {
  id: number;
  code2: string;
  code3: string;
  country: string;
}

const useCountry = (accessToken: string) => {
  const fetchCountries = () => {
    const controller = new AbortController();

    return axios<Country[]>({
      method: "get",
      url: "http://127.0.0.1:8000/countries",
      signal: controller.signal,
      headers: { Authorization: "Bearer " + accessToken },
    }).then((res) => res.data);
  };

  return useQuery<Country[], Error>({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });
};

export default useCountry;
