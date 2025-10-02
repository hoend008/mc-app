import { queryOptions } from "@tanstack/react-query";
import { DataRow } from "../../components/DataTable";
import postMCData from "../queries/postMCData";

export default function postMCDataQueryOptions(
  accessToken: string,
  mcdata: DataRow[],
) {
  return queryOptions({
    queryKey: ["mcdata"],
    queryFn: () => postMCData(accessToken, mcdata),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}