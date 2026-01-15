import { getProfileRequest } from "./requests";
import { IUser } from "./types";
import { createQuery } from "@/lib/query";
import { UseQueryOptions } from "@tanstack/react-query";

export const useProfileQuery = (options?: Partial<UseQueryOptions<IUser>>) => createQuery({
    key: "auth/me",
    queryFn: getProfileRequest,
    options: { staleTime: 5000, ...options }
});