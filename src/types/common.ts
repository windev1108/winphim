import { DefinedInitialDataInfiniteOptions, DefinedInitialDataOptions, UseQueryOptions } from "@tanstack/react-query"

export interface IListDataResponse<T> {
  seoOnPage: ISeoOnPage
  items: T[]
  params: IParams
  titlePage?: string
  breadCrumb?: IBreadCrumb[]
  itemsSportsVideos?: any[]
  type_list?: string
  APP_DOMAIN_FRONTEND: string
  APP_DOMAIN_CDN_IMAGE: string
}

export interface IDataResponse<T> {
  seoOnPage: ISeoOnPage
  item: T
  params: IParams
  breadCrumb?: IBreadCrumb[]
  APP_DOMAIN_CDN_IMAGE: string
}

export interface IBreadCrumb {
  name: string
  slug: string
  isCurrent: boolean
}

export interface IParams {
  pagination: IPagination
  type_slug?: string
  filterCategory?: any[]
  filterCountry?: any[]
  filterYear?: string
  sortField?: string
  itemsUpdateInDay?: number
  totalSportsVideos?: number
  itemsSportsVideosUpdateInDay?: number
}

export interface ISeoOnPage {
  titleHead: string
  descriptionHead: string
  og_type?: string
  og_image?: string[]
}

export interface IPagination {
  currentPage: number,
  totalItems: number,
  totalItemsPerPage: number,
  totalPages?: number
  pageRanges: number
}


export interface IPaging {
  page?: number | string
  limit?: number | string
}

export type SortFieldType = 'modified.time' | 'year' | '_id'

export type SortType = 'desc' | 'asc'

export interface ICategory {
  id: string
  name: string
  slug: string
}

export interface ICountry {
  id: string
  name: string
  slug: string
}


export interface IId {
  id?: string | number
}

export type QueryOptionsWithoutKeys<T> = Omit<
  UseQueryOptions<T>,
  'queryKey' | 'queryFn'
>;

export type InfiniteQueryOptionsWithoutKeys<T> = Omit<
  DefinedInitialDataInfiniteOptions<T>,
  'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
>;


export interface UseQueryParams<TParams, TResponse> {
  params?: TParams,
  options?: QueryOptionsWithoutKeys<TResponse>
}

export interface UseQueryInfinityParams<TParams, TResponse> {
  params?: TParams,
  options?: InfiniteQueryOptionsWithoutKeys<TResponse>
}