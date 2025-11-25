import { client } from "../client"
import { IGetPeopleListResponse, IGetPeopleListParams } from "./types";


export const getPeopleListRequest = async (params: IGetPeopleListParams): Promise<IGetPeopleListResponse> => {
    const { data } = await client({
        url: `/people`,
        method: 'GET',
        params
    });
    return {
        items: data.results,
        pagination: {
            page: data.page,
            totalItems: data.total_results,
            totalPages: data.total_pages
        }
    };
};

