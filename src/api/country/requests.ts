import { client } from "../client"
import { ICountryListResponse } from "./types";


export const getCountryListRequest = async (): Promise<ICountryListResponse> => {
    const { data } = await client({
        url: `/country`,
        method: 'GET',
    });
    return data?.data
};

