'use client';

import { InfiniteQueryOptionsWithoutKeys, IPagination, QueryOptionsWithoutKeys, UseQueryInfinityParams } from "@/types/common";
import { InfiniteData, QueryFunctionContext, useInfiniteQuery, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useCallback } from "react";

interface CreateQueryProps<TParams, TResponse> {
    key: string;
    params?: TParams;
    queryFn: (params: TParams) => Promise<TResponse>;
    options?: QueryOptionsWithoutKeys<TResponse>;
}

export function createQuery<
    TParams extends Record<string, any>,
    TResponse
>({
    key,
    params,
    queryFn,
    options
}: CreateQueryProps<TParams, TResponse>) {

    const stableQueryFn = useCallback(() => queryFn(params!), [params, queryFn]);
    return useQuery<TResponse>({
        queryKey: [key, params],
        queryFn: stableQueryFn,
        ...options,
    });
}



