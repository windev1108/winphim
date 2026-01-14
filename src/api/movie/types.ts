import { ICategory, ICountry, IDataResponse, IListDataResponse, IPaging, SortFieldType, SortType } from "@/types/common"
import { IUser } from "../auth"

export interface IMovieHomePageResponse extends IListDataResponse<IMovieItem> { }


export interface IMovieListResponse extends IListDataResponse<IMovieItem> { }

export interface IMovieListParams extends Partial<IMovieListQuery> {
  slug: string
};

export interface ISearchMovieListParams extends IPaging {
  keyword?: string
}

export interface IMovieDetailParams {
  slug: string
}

export interface IMovieDetailResponse extends IDataResponse<IMovie> { }

export interface IMovieListQuery extends IPaging {
  sort_field: SortFieldType
  sort_type: SortType
  category: string
  country: string
  year: string
}

export interface IMovie {
  tmdb: Tmdb
  imdb: Imdb
  created: IModified
  modified: IModified
  _id: string
  name: string
  slug: string
  origin_name: string
  alternative_names: string[]
  content: string
  type: MovieType
  status: string
  thumb_url: string
  poster_url: string
  is_copyright: boolean
  sub_docquyen: boolean
  chieurap: boolean
  trailer_url: string
  time: string
  episode_current: string
  episode_total: string
  quality: string
  lang: string
  notify: string
  showtimes: string
  year: number
  view: number
  actor: string[]
  director: string[]
  category: ICategory[]
  country: ICountry[]
  episodes: IEpisode[]
}

export type MovieType = 'single' | 'series' | 'hoathinh'

export interface IMovieItem extends IMovie {
}


export interface IModified {
  time: string
}

export interface Tmdb {
  id: string
  type: string
  season: number
  vote_average: number
  vote_count: number
}

export interface Imdb {
  id: string
  vote_average: number
  vote_count: number
}


export interface IEpisode {
  server_name: string
  is_ai: boolean
  server_data: IServerDaum[]
}

export interface IServerDaum {
  name: string
  slug: string
  filename: string
  link_embed: string
  link_m3u8: string
}


//  IMAGE

export interface IMovieImagesParams extends IMovieDetailParams { }

export interface IImageOverview {
  tmdb_id: number
  tmdb_type: string
  ophim_id: string
  slug: string
  imdb_id: string
  image_sizes: ImageSizes
  images: IImage[]
}

export interface ImageSizes {
  backdrop: IBackdrop
  poster: IPoster
}

export interface IBackdrop {
  original: string
  w1280: string
  w780: string
  w300: string
}

export interface IPoster {
  original: string
  w780: string
  w342: string
  w185: string
}

export interface IImage {
  width: number
  height: number
  aspect_ratio: number
  type: string
  file_path: string
}

// PEOPLES 

export interface IMoviePeopleParams extends IMovieDetailParams { }

export interface IPeopleOverview {
  tmdb_id: number
  tmdb_type: string
  ophim_id: string
  slug: string
  imdb_id: string
  profile_sizes: IProfileSizes
  peoples: IPeople[]
}

export interface IProfileSizes {
  h632: string
  original: string
  w185: string
  w45: string
}

export interface IPeople {
  tmdb_people_id: number
  adult: boolean
  gender: number
  gender_name: string
  name: string
  original_name: string
  character: string
  known_for_department: string
  profile_path: string
}


//  FAVORITE

export interface IAddFavoriteMovieParams extends IMovieFavorite {
  countryName?: string
  categoryName?: string
}

export interface IRemoveFavoriteMovieParams {
  movieId: number
}

export interface IMovieFavorite extends Omit<IMovie, 'category' | 'country'> {
  id: number
  external_id: string
  vote_average: number
  category: string
  country: string
}

//  Comments

export interface IAddCommentParams {
  movieId: string
  content?: string
  rating: number // 1-5
}
export interface IComment {
  id: number
  movieId: string
  content?: string
  rating: number
  user: IUser
}

export interface IGetCommentByMovie {
  movieId: string
}