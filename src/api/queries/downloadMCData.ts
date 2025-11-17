import axios from "axios";

const downloadMCData = async (accessToken: string, sop: string[]) => {
  const controller = new AbortController();
  const sopString = sop.join(",");

  const { data } = await axios("http://127.0.0.1:8000/mcdata/download/", {
    method: "GET",
    responseType: "blob",
    signal: controller.signal,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    params: {
      sop: sopString,
    },
  });
  return data;
};

export default downloadMCData;
