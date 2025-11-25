import { IAuthResponse } from "./types";
import { client } from "../client";

export const validateAuth = async () : Promise<IAuthResponse> => {
   const { data } = await client({
    url: '/auth',
    method: 'GET',
  });
  return data;
}