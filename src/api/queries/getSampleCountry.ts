import axios from "axios";

export interface SampleCountry {
  [key: string]: string | number;
}

const getSampleCountry = async (accessToken: string) => {
  const controller = new AbortController();
  const { data } = await axios<SampleCountry[]>({
    method: "get",
    url: "http://127.0.0.1:8000/samples/countries",
    signal: controller.signal,
    headers: { Authorization: "Bearer " + accessToken }  });

  return data;
};

export default getSampleCountry;
