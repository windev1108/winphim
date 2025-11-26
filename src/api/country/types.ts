import { IListDataResponse } from "@/types/common";
import { IGenre } from "../genre";

export interface ICountryListResponse extends IListDataResponse<ICountry> { }

export interface ICountry extends IGenre { }
