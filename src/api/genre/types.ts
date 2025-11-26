import { IListDataResponse } from "@/types/common";

export type GenreType = 'movie' | 'tv' | 'person' | 'all';

export interface IGenreListResponse extends IListDataResponse<IGenre> {
}

export interface IGenre {
  _id: string
  name: string
  slug: string
}
