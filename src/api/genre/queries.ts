import { UseQueryOptions } from "@tanstack/react-query";
import { IGenreListResponse } from "./types";
import { getGenreListRequest } from "./requests";
import { createQuery } from "@/lib/query";

export const useGenreListQuery = (options?: UseQueryOptions<IGenreListResponse>) => createQuery({
  key: "genre/list",
  queryFn: getGenreListRequest,
  options: { staleTime: 5000, ...options }
});

