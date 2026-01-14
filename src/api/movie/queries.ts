import { createQuery } from "@/lib/query";
import { getMovieDetailRequest, getMovieHomepageRequest, getMovieImagesRequest, getMovieListRequest, getMoviePeoplesRequest, getMyFavoriteMovies, searchMovieListRequest, getCommentByMovieRequest } from "./requests";
import { UseQueryOptions } from "@tanstack/react-query";
import { IMovieDetailParams, IMovieDetailResponse, IMovieHomePageResponse, IMovieListParams, IMovieListResponse, IImageOverview, IMovieImagesParams, IMoviePeopleParams, IPeopleOverview, ISearchMovieListParams, IMovie, IMovieFavorite, IComment, IGetCommentByMovie, IAddCommentParams } from "./types";
import { UseQueryParams } from "@/types/common";

// MOVIE LIST
export const useMovieHomepageQuery = (options?: UseQueryOptions<IMovieHomePageResponse>) => createQuery({
  key: "movie/homepage",
  queryFn: getMovieHomepageRequest,
  options: { staleTime: 5000, ...options }
});


export const useMovieListQuery = ({ options, params }: UseQueryParams<IMovieListParams, IMovieListResponse>) => createQuery({
  key: "movie/list",
  queryFn: getMovieListRequest,
  params,
  options: { staleTime: 5000, ...options }
});

export const useSearchMovieListQuery = ({ options, params }: UseQueryParams<ISearchMovieListParams, IMovieListResponse>) => createQuery({
  key: "movie/search",
  queryFn: searchMovieListRequest,
  params,
  options: { staleTime: 5000, ...options }
});

export const useMovieDetailQuery = ({ options, params }: UseQueryParams<IMovieDetailParams, IMovieDetailResponse>) => createQuery({
  key: "movie/detail",
  queryFn: getMovieDetailRequest,
  params,
  options: { staleTime: 5000, ...options }
});

export const useMovieImagesQuery = ({ options, params }: UseQueryParams<IMovieImagesParams, IImageOverview>) => createQuery({
  key: "movie/images",
  queryFn: getMovieImagesRequest,
  params,
  options: { staleTime: 5000, ...options }
});

export const useMoviePeoplesQuery = ({ options, params }: UseQueryParams<IMoviePeopleParams, IPeopleOverview>) => createQuery({
  key: "movie/peoples",
  queryFn: getMoviePeoplesRequest,
  params,
  options: { staleTime: 5000, ...options }
});


export const useMyFavoriteMoviesQuery = (options?: UseQueryOptions<IMovieFavorite[]>) => createQuery({
  key: "movie/my-favorites",
  queryFn: getMyFavoriteMovies,
  options: { staleTime: 5000, ...options }
});


export const useCommentByMoviesQuery = ({ options, params }: UseQueryParams<IGetCommentByMovie, IComment[]>) => createQuery({
  key: "movie/comments",
  queryFn: getCommentByMovieRequest,
  params,
  options: { staleTime: 5000, ...options }
});
