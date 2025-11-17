import axios from "axios";

export interface SOP {
  [key: string]: string;
}

const getSopsFromUsers = async (
  accessToken: string,
) => {
  const controller = new AbortController();
  const { data } = await axios<SOP[]>({
    method: "get",
    url: "http://127.0.0.1:8000/sop/user",
    signal: controller.signal,
    headers: { Authorization: "Bearer " + accessToken },
  });

  return data;
};

export default getSopsFromUsers;
