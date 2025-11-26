import { IDataResponse, IListDataResponse } from "@/types/common";

export interface IYearListResponse extends IListDataResponse<IYear> { }

export interface IYear {
  year: number
  name?: string
}
