import { createQuery } from "@/lib/query";
import { getMovieDetailRequest, getMovieHomepageRequest, getMovieImagesRequest, getMovieListRequest, getMoviePeoplesRequest } from "./requests";
import { UseQueryOptions } from "@tanstack/react-query";
import { IMovieDetailParams, IMovieDetailResponse, IMovieHomePageResponse, IMovieListParams, IMovieListResponse, IImageOverview, IMovieImagesParams, IMoviePeopleParams, IPeopleOverview } from "./types";
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



// INFINITY MOVIE LIST
// export const useInfinityMovies = (
//   params: IGetMovieListParams,
//   options?: InfiniteQueryOptionsWithoutKeys<IGetMovieListResponse>
// ) => {
//   return useInfiniteQuery<IGetMovieListResponse>({
//     queryKey: ["/movie/list/infinity", params],
//     initialPageParam: 1,
//     queryFn: ({ pageParam }) =>
//       getMoviesListRequest({
//         ...params,
//         page: Number(pageParam)
//       }),

//     getNextPageParam: (lastPage) => {
//       const { currentPage, totalPages } = lastPage.pagination ?? {};
//       return currentPage && totalPages && currentPage < totalPages
//         ? currentPage + 1
//         : undefined;
//     },

//     ...options
//   });
// };
