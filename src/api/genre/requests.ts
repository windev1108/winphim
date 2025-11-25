import { client } from "../client"
import { IGenre, IGenreListResponse } from "./types";


export const getGenreListRequest = async (): Promise<IGenreListResponse> => {
    const { data } = await client({
        url: `/genre`,
        method: 'GET',
    });
    return data?.data
};

