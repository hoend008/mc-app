import axios from "axios";

export interface SampleYear {
  [key: string]: string;
}

const getSop = async (
  accessToken: string,
) => {
  const controller = new AbortController();
  const { data } = await axios<SampleYear[]>({
    method: "get",
    url: "http://127.0.0.1:8000/sop",
    signal: controller.signal,
    headers: { Authorization: "Bearer " + accessToken },
  });

  return data;
};

export default getSop;
