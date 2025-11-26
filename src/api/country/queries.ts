import { UseQueryOptions } from "@tanstack/react-query";
import { createQuery } from "@/lib/query";
import { getCountryListRequest } from "./requests";
import { ICountryListResponse } from "./types";

export const useCountryListQuery = (options?: UseQueryOptions<ICountryListResponse>) => createQuery({
  key: "country/list",
  queryFn: getCountryListRequest,
  options: { staleTime: 5000, ...options }
});

