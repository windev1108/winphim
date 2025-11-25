import { client } from "../client"
import { IMovieDetailParams, IMovieDetailResponse, IMovieHomePageResponse, IMovieImagesParams, IMovieListParams, IMovieListResponse, IMoviePeopleParams, IImageOverview, IPeopleOverview } from "./types";


export const getMovieHomepageRequest = async (): Promise<IMovieHomePageResponse> => {
    const { data } = await client({
        url: '/movie/homepage',
        method: 'GET',
    });
    return data?.data
};


export const getMovieListRequest = async (params: IMovieListParams): Promise<IMovieListResponse> => {
    const { data } = await client({
        url: `/movie/list`,
        method: 'GET',
        params: params
    });
    return data?.data
};


export const getMovieDetailRequest = async (params: IMovieDetailParams): Promise<IMovieDetailResponse> => {
    const { data } = await client({
        url: `/movie/detail`,
        method: 'GET',
        params: params
    });
    return data?.data
};


export const getMovieImagesRequest = async (params: IMovieImagesParams): Promise<IImageOverview> => {
    const { data } = await client({
        url: `/movie/images`,
        method: 'GET',
        params: params
    });
    return data?.data
};


export const getMoviePeoplesRequest = async (params: IMoviePeopleParams): Promise<IPeopleOverview> => {
    const { data } = await client({
        url: `/movie/peoples`,
        method: 'GET',
        params: params
    });
    return data?.data
};

