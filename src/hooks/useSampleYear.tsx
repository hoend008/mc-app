import axios, { CanceledError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export interface SampleYear {
  [key: string]: string | number;
}

const useSampleYear = (accessToken: string, countryID: string) => {
  const [data, setData] = useState<SampleYear[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    axios<SampleYear[]>({
      method: "get",
      url: "http://127.0.0.1:8000/samples/years",
      signal: controller.signal,
      headers: { Authorization: "Bearer " + accessToken },
      params: { country_id: countryID ? parseInt(countryID) : 0 },
    })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
  }, [countryID]);
  
  return { data, error, isLoading };

  /*
  const fetchSampleYears = () => {
    const controller = new AbortController();
    console.log(countryID);

    return axios<SampleYear[]>({
      method: "get",
      url: "http://127.0.0.1:8000/samples/years",
      signal: controller.signal,
      headers: { Authorization: "Bearer " + accessToken },
      params: { country_id: countryID ? parseInt(countryID) : 0 },
    }).then((res) => res.data);
  };
  console.log("second: ", countryID);
  return useQuery<SampleYear[], Error>({
    queryKey: ["sampleyears"],
    queryFn: fetchSampleYears,
  });
  */
};

export default useSampleYear;
