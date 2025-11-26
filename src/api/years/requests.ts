import { client } from "../client"
import { IYearListResponse } from "./types";


export const getYearListRequest = async (): Promise<IYearListResponse> => {
    const { data } = await client({
        url: `/years`,
        method: 'GET',
    });
    return data?.data
};

