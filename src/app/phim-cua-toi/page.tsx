'use client';
import { useMovieListQuery, useMyFavoriteMoviesQuery } from '@/api/movie'
import FilterMenu from '@/components/common/FilterMenu';
import MovieCard from '@/components/common/MovieCard'
import MovieFavoriteCard from '@/components/common/MovieFavoriteCard';
import { PaginationControl } from '@/components/common/PaginationControl';
import MovieListSkeleton from '@/components/skeletons/MovieListSkeleton';
import { useAuth } from '@/hooks';
import { MAPPING_QUERY_FIELDS } from '@/lib/constants';
import { calculateTotalPages } from '@/lib/utils';
import { SortFieldType } from '@/types/common';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const MyMoviePage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { data, isFetching } = useMyFavoriteMoviesQuery()
    const { isLogged } = useAuth()

    if (!isLogged) {
        return (
            <section className='relative container py-20 min-h-screen flex w-full items-center justify-center'>
                <p className="text-zinc-400 text-lg">
                    Vui lòng đăng nhập để lấy danh sách phim của bạn
                </p>
            </section>
        )
    }

    return (
        <section className='relative container py-20 min-h-screen'>
            {/* Filter Menu */}
            <div className="flex items-center justify-between mb-4">
                <h1 className='text-xl font-medium text-primary'>{'Kho phim yêu thích của bạn'}</h1>
            </div>
            {isFetching ?
                <MovieListSkeleton />
                :
                <div className="grid 2xl:grid-cols-8 xl:grid-cols-6 md:grid-cols-4 grid-cols-2 xl:gap-6 gap-2">
                    {data?.map((item) => (
                        <MovieFavoriteCard key={item._id} movie={item} />
                    ))}
                </div>
            }

            {/* Hiển thị khi không có kết quả */}
            {data?.length === 0 && (
                <div className="text-center py-20 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <p className="text-zinc-400 text-lg">
                        Không tìm thấy phim yêu thích nào trong danh sách của bạn.
                    </p>
                </div>
            )}
        </section>
    )
}

export default MyMoviePage