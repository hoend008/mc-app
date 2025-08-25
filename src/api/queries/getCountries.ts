import axios from "axios";

export interface Country {
  id: number;
  code2: string;
  code3: string;
  country: string;
}

const getCountries = async (accessToken: string) => {
  const controller = new AbortController();

  const { data } = await axios<Country[]>({
    method: "get",
    url: "http://127.0.0.1:8000/countries",
    signal: controller.signal,
    headers: { Authorization: "Bearer " + accessToken },
  });

  return data;
};

export default getCountries;