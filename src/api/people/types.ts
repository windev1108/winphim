import { ILanguage, IResponse } from "@/types/common";


export interface IGetPeopleListParams extends ILanguage {
  page: number | string
}

export interface IGetPeopleListResponse extends IResponse<IPeople> { }

export interface IPeople {
  adult: boolean
  gender: number
  id: number
  original_name: string
  known_for: IKnownFor[]
  known_for_department: string
  name: string
  popularity: number
  profile_path: string
}

export interface IKnownFor {
  adult?: boolean
  backdrop_path?: string
  genre_ids: number[]
  id: number
  media_type: string
  original_language: string
  original_title?: string
  overview: string
  poster_path: string
  release_date?: string
  title?: string
  video?: boolean
  vote_average: number
  vote_count: number
  first_air_date?: string
  name?: string
  origin_country?: string[]
  original_name?: string
}
