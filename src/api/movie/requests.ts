import { client } from "../client"
import { server } from "../server";
import { IMovieDetailParams, IMovieDetailResponse, IMovieHomePageResponse, IMovieImagesParams, IMovieListParams, IMovieListResponse, IMoviePeopleParams, IImageOverview, IPeopleOverview, ISearchMovieListParams, IAddFavoriteMovieParams, IMovie, IRemoveFavoriteMovieParams, IMovieFavorite, IAddCommentParams, IComment, IGetCommentByMovie } from "./types";


export const getMovieHomepageRequest = async (): Promise<IMovieHomePageResponse> => {
    const { data } = await client({
        url: '/movie/homepage',
        method: 'GET',
    });
    return data?.data
};


export const getMovieListRequest = async (params: IMovieListParams): Promise<IMovieListResponse> => {
    const { data } = await client({
        url: '/movie/list',
        method: 'GET',
        params
    });
    return data?.data
};

export const searchMovieListRequest = async (params: ISearchMovieListParams): Promise<IMovieListResponse> => {
    const { data } = await client({
        url: '/movie/search',
        method: 'GET',
        params
    });
    return data?.data
};


export const getMovieDetailRequest = async (params: IMovieDetailParams): Promise<IMovieDetailResponse> => {
    const { data } = await client({
        url: '/movie/detail',
        method: 'GET',
        params: params
    });
    return data?.data
};


export const getMovieImagesRequest = async (params: IMovieImagesParams): Promise<IImageOverview> => {
    const { data } = await client({
        url: '/movie/images',
        method: 'GET',
        params: params
    });
    return data?.data
};


export const getMoviePeoplesRequest = async (params: IMoviePeopleParams): Promise<IPeopleOverview> => {
    const { data } = await client({
        url: '/movie/peoples',
        method: 'GET',
        params: params
    });
    return data?.data
};



export const addMovieFavoriteRequest = async (params: IAddFavoriteMovieParams): Promise<IMovie> => {
    const { data } = await server({
        url: '/movies/favorite',
        method: 'POST',
        data: params
    });
    return data?.data
};


export const removeMovieFavoriteRequest = async (params: IRemoveFavoriteMovieParams): Promise<IMovie> => {
    const { data } = await server({
        url: '/movies/favorite',
        method: 'DELETE',
        data: params
    });
    return data?.data
};


export const getMyFavoriteMovies = async (params: IRemoveFavoriteMovieParams): Promise<IMovieFavorite[]> => {
    const { data } = await server({
        url: '/movies/mine',
        method: 'GET',
    });
    return data?.data
};


export const addCommentMovieRequest = async (params: IAddCommentParams): Promise<IComment> => {
    const { data } = await server({
        url: '/comments',
        method: 'POST',
        data: params

    });
    return data?.data
};


export const deleteCommentMovieRequest = async (params: { id: number }): Promise<IComment> => {
    const { data } = await server({
        url: `/comments/${params.id}`,
        method: 'DELETE',
    });
    return data?.data
}

export const getCommentByMovieRequest = async (params: IGetCommentByMovie): Promise<IComment[]> => {
    const { data } = await server({
        url: `/comments/movie/${params.movieId}`,
        method: 'GET',
    });
    return data?.data
};

