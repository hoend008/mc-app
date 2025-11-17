import { queryOptions } from "@tanstack/react-query";
import getSopsFromUser from "../queries/getSopsFromUser";

export default function createSopFromUserQueryOptions(
  accessToken: string,
) {
  return queryOptions({
    queryKey: ["sop_user"],
    queryFn: () => getSopsFromUser(accessToken),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}