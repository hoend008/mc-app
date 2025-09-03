import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";

export interface SampleYear {
  count: number;
  year: number;
}

const useSampleCountry = (accessToken: string) => {
  const [data, setData] = useState<SampleYear[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    axios<SampleYear[]>({
      method: "get",
      url: "http://127.0.0.1:8000/samples/countries",
      signal: controller.signal,
      headers: { Authorization: "Bearer " + accessToken },
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
  }, []);

  return { data, error, isLoading };
};

export default useSampleCountry;
