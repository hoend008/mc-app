import { queryOptions } from "@tanstack/react-query";
import getSop from "../queries/getSop";

export default function createSopQueryOptions(
  accessToken: string,
) {
  return queryOptions({
    queryKey: ["sop"],
    queryFn: () => getSop(accessToken),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}