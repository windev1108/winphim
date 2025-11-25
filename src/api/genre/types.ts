import { IDataResponse } from "@/types/common";

export type GenreType = 'movie' | 'tv' | 'person' | 'all';

export interface IGenreListResponse extends IDataResponse<IGenre> {
}

export interface IGenre {
  _id: string
  name: string
  slug: string
}
