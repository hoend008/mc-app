import axios from "axios";
import { DataRow } from "../../components/DataTable";

interface returnMessage {
  msg: string;
}

const postMCData = async (accessToken: string, mcdata: DataRow[]) => {
  const controller = new AbortController();
  
  const { data } = await axios<DataRow[]>({
    method: "post",
    url: "http://127.0.0.1:8000/mcdata",
    signal: controller.signal,
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    data: mcdata,
  });
  
  return data;
};

export default postMCData;
