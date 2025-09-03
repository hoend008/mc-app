import axios from "axios";

export interface SampleProduct {
  [key: string]: string | number;
}

const getSampleProduct = async (
  accessToken: string,
  country_code: string,
) => {
  const controller = new AbortController();
  const { data } = await axios<SampleProduct[]>({
    method: "get",
    url: "http://127.0.0.1:8000/samples/products",
    signal: controller.signal,
    headers: { Authorization: "Bearer " + accessToken },
    params: {
      iso_a3: country_code ? country_code : null,
    },
  });

  return data;
};

export default getSampleProduct;
