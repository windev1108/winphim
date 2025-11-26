import { UseQueryOptions } from "@tanstack/react-query";
import { createQuery } from "@/lib/query";
import { getYearListRequest } from "./requests";
import { IYearListResponse } from "./types";

export const useYearListQuery = (options?: UseQueryOptions<IYearListResponse>) => createQuery({
  key: "year/list",
  queryFn: getYearListRequest,
  options: { staleTime: 5000, ...options }
});

