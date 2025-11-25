import { QueryOptionsWithoutKeys } from "@/types/common";
import { IGetPeopleListParams, IGetPeopleListResponse } from "./types";
import { getPeopleListRequest } from "./requests";
import { createQuery } from "@/lib/query";

export const usePeopleList = (
  params: IGetPeopleListParams,
  options?: QueryOptionsWithoutKeys<IGetPeopleListResponse>
) => {
  return createQuery(
    "/people/list",
    params,
    getPeopleListRequest,
    options
  );
};
